export type ImageSlotType =
  | "main"
  | "feature_callout"
  | "benefits"
  | "lifestyle_1"
  | "lifestyle_2"
  | "size_comparison"
  | "whats_in_box";

export interface ImageSlot {
  type: ImageSlotType;
  label: string;
  description: string;
  aspectRatio: string;
  model: "marketing_studio_image" | "gpt_image";
}

export interface GeneratedImage {
  slot: ImageSlot;
  prompt: string;
  status: "pending" | "generating" | "done" | "error";
  url?: string;
  jobId?: string;
  error?: string;
}

export interface ProductAnalysis {
  name: string;
  category: string;
  keyFeatures: string[];
  targetAudience: string;
  primaryBenefit: string;
  colorScheme: string;
  mood: string;
}

export interface GenerateRequest {
  imageBase64: string;
  imageMimeType: string;
}

export interface GenerateStreamEvent {
  type: "analysis" | "slot_start" | "slot_done" | "slot_error" | "complete" | "error";
  analysis?: ProductAnalysis;
  slotType?: ImageSlotType;
  image?: GeneratedImage;
  error?: string;
}

export const IMAGE_SLOTS: ImageSlot[] = [
  {
    type: "main",
    label: "Main Hero",
    description: "Product on pure white background — Amazon main image compliant",
    aspectRatio: "1:1",
    model: "marketing_studio_image",
  },
  {
    type: "feature_callout",
    label: "Feature Callouts",
    description: "Product with numbered callout arrows highlighting key features",
    aspectRatio: "1:1",
    model: "gpt_image",
  },
  {
    type: "benefits",
    label: "Benefits Infographic",
    description: "Visual problem → solution layout showing core benefits",
    aspectRatio: "1:1",
    model: "gpt_image",
  },
  {
    type: "lifestyle_1",
    label: "Lifestyle Scene 1",
    description: "Product being used in its natural environment",
    aspectRatio: "1:1",
    model: "marketing_studio_image",
  },
  {
    type: "lifestyle_2",
    label: "Lifestyle Scene 2",
    description: "Different lifestyle context showing aspirational use",
    aspectRatio: "4:3",
    model: "marketing_studio_image",
  },
  {
    type: "size_comparison",
    label: "Size Comparison",
    description: "Product next to familiar objects for scale reference",
    aspectRatio: "1:1",
    model: "gpt_image",
  },
  {
    type: "whats_in_box",
    label: "What's in the Box",
    description: "Flat-lay of all included components and accessories",
    aspectRatio: "1:1",
    model: "gpt_image",
  },
];
