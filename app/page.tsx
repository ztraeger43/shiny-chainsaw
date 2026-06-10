"use client";

import { useCallback, useRef, useState } from "react";
import { GenerateStreamEvent, GeneratedImage, IMAGE_SLOTS, ProductAnalysis } from "@/lib/types";

type Phase = "idle" | "uploading" | "generating" | "done" | "error";

export default function HomePage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ProductAnalysis | null>(null);
  const [images, setImages] = useState<Record<string, GeneratedImage>>({});
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;

    setPhase("uploading");
    setImages({});
    setAnalysis(null);
    setErrorMsg(null);

    // Convert to base64
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve(result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    });

    setPreview(URL.createObjectURL(file));
    setPhase("generating");

    // Seed pending states for all slots
    const pending: Record<string, GeneratedImage> = {};
    for (const slot of IMAGE_SLOTS) {
      pending[slot.type] = { slot, prompt: "", status: "pending" };
    }
    setImages(pending);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, imageMimeType: file.type }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`Server error: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const event = JSON.parse(line.slice(6)) as GenerateStreamEvent;

          if (event.type === "analysis" && event.analysis) {
            setAnalysis(event.analysis);
          }

          if (event.type === "slot_start" && event.slotType) {
            setImages((prev) => ({
              ...prev,
              [event.slotType!]: {
                ...prev[event.slotType!],
                status: "generating",
              },
            }));
          }

          if ((event.type === "slot_done" || event.type === "slot_error") && event.image) {
            setImages((prev) => ({
              ...prev,
              [event.image!.slot.type]: event.image!,
            }));
          }

          if (event.type === "complete") {
            setPhase("done");
          }

          if (event.type === "error") {
            throw new Error(event.error ?? "Unknown error");
          }
        }
      }

      setPhase("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
      setPhase("error");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const reset = () => {
    setPhase("idle");
    setPreview(null);
    setAnalysis(null);
    setImages({});
    setActiveSlot(null);
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const doneImages = Object.values(images).filter((i) => i.status === "done");
  const completedCount = Object.values(images).filter(
    (i) => i.status === "done" || i.status === "error"
  ).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Amazon Carousel Agent</h1>
            <p className="text-slate-400 text-sm">
              Upload a product photo → get a full listing carousel in minutes
            </p>
          </div>
          {phase !== "idle" && (
            <button
              onClick={reset}
              className="text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              Start over
            </button>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Upload zone */}
        {phase === "idle" && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`
              cursor-pointer border-2 border-dashed rounded-2xl p-16
              flex flex-col items-center justify-center gap-4 transition
              ${isDragging ? "border-indigo-400 bg-indigo-500/10" : "border-white/20 hover:border-white/40 bg-white/5"}
            `}
          >
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">Drop your product image here</p>
              <p className="text-slate-400 text-sm mt-1">PNG, JPG, or WebP — any angle works</p>
            </div>
            <span className="text-sm px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full transition font-medium">
              Choose file
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}

        {/* Analysis banner */}
        {analysis && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-start gap-6">
              {preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Product"
                  className="w-24 h-24 object-contain rounded-xl bg-white p-2 flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-lg font-semibold">{analysis.name}</h2>
                  <span className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full">
                    {analysis.category}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full">
                    {analysis.mood}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-3">{analysis.primaryBenefit}</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.keyFeatures.map((f) => (
                    <span key={f} className="text-xs px-2 py-1 bg-white/10 rounded-full text-slate-300">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              {phase === "generating" && (
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold text-indigo-400">
                    {completedCount}/{IMAGE_SLOTS.length}
                  </div>
                  <div className="text-xs text-slate-400">images done</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Uploading spinner */}
        {phase === "uploading" && (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-300">Analyzing your product…</p>
          </div>
        )}

        {/* Error state */}
        {phase === "error" && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
            <p className="text-red-400 font-medium mb-2">Something went wrong</p>
            <p className="text-slate-400 text-sm mb-4">{errorMsg}</p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm transition"
            >
              Try again
            </button>
          </div>
        )}

        {/* Carousel grid */}
        {(phase === "generating" || phase === "done") && Object.keys(images).length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {phase === "done" ? "Your Amazon Carousel" : "Generating carousel…"}
              </h2>
              {phase === "done" && doneImages.length > 0 && (
                <span className="text-sm text-emerald-400 font-medium">
                  ✓ {doneImages.length} images ready
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {IMAGE_SLOTS.map((slot, idx) => {
                const img = images[slot.type];
                const status = img?.status ?? "pending";

                return (
                  <div
                    key={slot.type}
                    onClick={() => status === "done" && setActiveSlot(slot.type)}
                    className={`
                      relative rounded-xl overflow-hidden bg-white/5 border transition
                      ${status === "done" ? "border-white/20 cursor-pointer hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10" : "border-white/10"}
                      ${activeSlot === slot.type ? "ring-2 ring-indigo-400" : ""}
                    `}
                  >
                    {/* Slot number badge */}
                    <div className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-black/60 text-xs flex items-center justify-center font-medium">
                      {idx + 1}
                    </div>

                    {/* Image area */}
                    <div className="aspect-square bg-slate-800 flex items-center justify-center">
                      {status === "done" && img?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img.url}
                          alt={slot.label}
                          className="w-full h-full object-cover"
                        />
                      ) : status === "generating" ? (
                        <div className="flex flex-col items-center gap-2 p-4">
                          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs text-slate-400 text-center">Generating…</span>
                        </div>
                      ) : status === "error" ? (
                        <div className="flex flex-col items-center gap-2 p-4 text-center">
                          <span className="text-2xl">⚠️</span>
                          <span className="text-xs text-red-400">Failed</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 p-4 text-center">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                            <span className="text-slate-500 text-sm">⋯</span>
                          </div>
                          <span className="text-xs text-slate-500">Queued</span>
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <div className="p-3">
                      <p className="text-xs font-medium text-slate-200 truncate">{slot.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-tight line-clamp-2">
                        {slot.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Lightbox */}
        {activeSlot && images[activeSlot]?.url && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setActiveSlot(null)}
          >
            <div
              className="bg-slate-900 rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[activeSlot].url!}
                alt={images[activeSlot].slot.label}
                className="w-full object-contain max-h-[60vh]"
              />
              <div className="p-5 border-t border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{images[activeSlot].slot.label}</h3>
                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                      {images[activeSlot].prompt}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <a
                      href={images[activeSlot].url!}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-medium transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Download
                    </a>
                    <button
                      onClick={() => setActiveSlot(null)}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {phase === "idle" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "📸",
                title: "Upload any product photo",
                body: "Any angle, any background. Claude analyzes the product automatically.",
              },
              {
                icon: "🤖",
                title: "Agent generates 7 images",
                body: "Main hero, feature callouts, benefits infographic, 2 lifestyle scenes, size chart, and what's in the box.",
              },
              {
                icon: "🛒",
                title: "Amazon-ready carousel",
                body: "All images sized and styled to Amazon listing best practices. Download individually.",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="font-medium mb-1">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
