import Anthropic from "@anthropic-ai/sdk";
import { generateImage, pollJob, uploadImageToHighsfield } from "./higgsfield";
import {
  GenerateStreamEvent,
  IMAGE_SLOTS,
  ImageSlotType,
  ProductAnalysis,
} from "./types";

const client = new Anthropic();

// ── Step 1: Analyse the product image ────────────────────────────────────────

export async function analyzeProduct(
  imageBase64: string,
  imageMimeType: string
): Promise<ProductAnalysis> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: imageMimeType as "image/jpeg" | "image/png" | "image/webp" | "image/gif",
              data: imageBase64,
            },
          },
          {
            type: "text",
            text: `Analyze this product image for an Amazon listing. Return a JSON object (no markdown, just raw JSON) with these exact fields:
{
  "name": "short product name",
  "category": "product category",
  "keyFeatures": ["feature 1", "feature 2", "feature 3", "feature 4"],
  "targetAudience": "who buys this",
  "primaryBenefit": "the #1 problem it solves or value it provides",
  "colorScheme": "dominant colors in the product",
  "mood": "premium | practical | fun | professional | wellness | outdoor | tech"
}`,
          },
        ],
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "{}";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch?.[0] ?? text) as ProductAnalysis;
}

// ── Step 2: Generate image-specific prompts ───────────────────────────────────

export async function buildPrompts(
  analysis: ProductAnalysis,
  imageBase64: string,
  imageMimeType: string
): Promise<Record<ImageSlotType, string>> {
  const slotsJson = IMAGE_SLOTS.map((s) => ({
    type: s.type,
    label: s.label,
    purpose: s.description,
  }));

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: imageMimeType as "image/jpeg" | "image/png" | "image/webp" | "image/gif",
              data: imageBase64,
            },
          },
          {
            type: "text",
            text: `Product analysis:
${JSON.stringify(analysis, null, 2)}

Write a Higgsfield image-generation prompt for EACH Amazon listing carousel slot below.
Be specific to THIS product — use its actual name, colors, features, and target audience.

Slots:
${JSON.stringify(slotsJson, null, 2)}

Prompt guidelines per slot:
- main: Pure white (#FFFFFF) seamless background, professional studio lighting, multiple angles visible, crisp edges, no drop shadows, Amazon main-image compliant, photorealistic
- feature_callout: Clean white background, numbered callout lines with bold labels pointing to 4 key product features, minimal flat infographic style, brand accent colors
- benefits: Split infographic — left shows the pain/problem, right shows the product solving it — bold headline, clean icons, brand colors, modern layout
- lifestyle_1: Candid lifestyle photography of the product in natural daily use, warm authentic lighting, aspirational but realistic
- lifestyle_2: Different lifestyle context (different setting, time of day, or activity), natural light, real-world environment matching the product mood
- size_comparison: Product displayed next to a common household object (e.g. smartphone, hand, coffee mug) for scale, neutral background, measurement callout labels
- whats_in_box: Overhead flat-lay of every included component neatly arranged on white background, each item labeled with clean typography

Return ONLY a raw JSON object with no markdown fences:
{"main": "...", "feature_callout": "...", "benefits": "...", "lifestyle_1": "...", "lifestyle_2": "...", "size_comparison": "...", "whats_in_box": "..."}`,
          },
        ],
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "{}";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch?.[0] ?? text) as Record<ImageSlotType, string>;
}

// ── Step 3: Stream-friendly orchestrator ─────────────────────────────────────

export async function* runCarouselAgent(
  imageBase64: string,
  imageMimeType: string
): AsyncGenerator<GenerateStreamEvent> {
  // 1. Analyse
  const analysis = await analyzeProduct(imageBase64, imageMimeType);
  yield { type: "analysis", analysis };

  // 2. Build tailored prompts
  const prompts = await buildPrompts(analysis, imageBase64, imageMimeType);

  // 3. Upload reference image once (used by marketing_studio_image slots)
  let mediaId: string | undefined;
  try {
    mediaId = await uploadImageToHighsfield(imageBase64, imageMimeType);
  } catch {
    // non-fatal — text-based slots work without it
  }

  // 4. Signal all slots as "generating"
  for (const slot of IMAGE_SLOTS) {
    yield { type: "slot_start", slotType: slot.type };
  }

  // 5. Generate all slots in parallel
  const results = await Promise.all(
    IMAGE_SLOTS.map(async (slot) => {
      const prompt = prompts[slot.type];
      const useReference = slot.model === "marketing_studio_image";

      try {
        const jobId = await generateImage({
          model: slot.model,
          prompt,
          aspectRatio: slot.aspectRatio,
          mediaId: useReference ? mediaId : undefined,
          resolution: "1k",
        });

        const url = await pollJob(jobId);

        return {
          type: "slot_done" as const,
          slotType: slot.type,
          image: { slot, prompt, status: "done" as const, url, jobId },
        } satisfies GenerateStreamEvent;
      } catch (err) {
        return {
          type: "slot_error" as const,
          slotType: slot.type,
          image: {
            slot,
            prompt,
            status: "error" as const,
            error: err instanceof Error ? err.message : String(err),
          },
        } satisfies GenerateStreamEvent;
      }
    })
  );

  for (const result of results) {
    yield result;
  }

  yield { type: "complete" };
}
