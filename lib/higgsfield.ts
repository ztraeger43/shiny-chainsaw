const BASE_URL = "https://api.higgsfield.ai";

interface GenerateImageParams {
  model: string;
  prompt: string;
  aspectRatio: string;
  mediaId?: string;
  resolution?: "1k" | "2k" | "4k";
}

interface Job {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  results?: Array<{ url: string }>;
  error?: string;
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = process.env.HIGGSFIELD_API_KEY;
  if (!apiKey) throw new Error("HIGGSFIELD_API_KEY is not set");

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Higgsfield API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

export async function uploadImageToHighsfield(
  base64: string,
  mimeType: string
): Promise<string> {
  // Get a pre-signed upload URL
  const { upload_url, media_id } = await apiRequest<{
    upload_url: string;
    media_id: string;
  }>("/v1/media/upload", {
    method: "POST",
    body: JSON.stringify({ content_type: mimeType }),
  });

  // Upload the binary
  const buffer = Buffer.from(base64, "base64");
  const uploadRes = await fetch(upload_url, {
    method: "PUT",
    headers: { "Content-Type": mimeType },
    body: buffer,
  });

  if (!uploadRes.ok) {
    throw new Error(`Media upload failed: ${uploadRes.status}`);
  }

  // Confirm the upload
  await apiRequest(`/v1/media/${media_id}/confirm`, { method: "POST" });

  return media_id;
}

export async function generateImage(params: GenerateImageParams): Promise<string> {
  const body: Record<string, unknown> = {
    model: params.model,
    prompt: params.prompt,
    aspect_ratio: params.aspectRatio,
    resolution: params.resolution ?? "1k",
  };

  if (params.mediaId) {
    body.medias = [{ value: params.mediaId, role: "image" }];
  }

  const job = await apiRequest<Job>("/v1/generate/image", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return job.id;
}

export async function pollJob(jobId: string, timeoutMs = 120_000): Promise<string> {
  const start = Date.now();
  const interval = 3000;

  while (Date.now() - start < timeoutMs) {
    const job = await apiRequest<Job>(`/v1/jobs/${jobId}`);

    if (job.status === "completed") {
      const url = job.results?.[0]?.url;
      if (!url) throw new Error("Job completed but no result URL");
      return url;
    }

    if (job.status === "failed") {
      throw new Error(job.error ?? "Job failed");
    }

    await new Promise((r) => setTimeout(r, interval));
  }

  throw new Error("Job timed out");
}
