"use client";

import { useState } from "react";
import InputBar from "@/components/InputBar";
import PreviewCard from "@/components/PreviewCard";
import { extractMedia, getDownloadUrl } from "@/lib/api";
import { Instagram } from "lucide-react";
import Image from "next/image";

interface MediaItem {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  filename?: string;
}

interface MediaInfo {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  is_sidecar: boolean;
  media: MediaItem[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MediaInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleExtract = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await extractMedia(url);
      setData(result);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to fetch media. Please check the URL.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (url: string, filename?: string) => {
    if (!url) return;

    setIsDownloading(true);
    try {
      // Trigger download by navigating to the proxy endpoint
      // Ensure we have a valid filename (allow dots and hyphens)
      const safeName = filename ? filename.replace(/[^a-z0-9.-]/gi, '_').toLowerCase() : 'reelrovr-media';
      window.location.href = getDownloadUrl(url, safeName);
    } catch (err) {
      console.error(err);
      setError("Download failed.");
    } finally {
      // Small delay to reset state since window.location doesn't block
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-4xl mx-auto text-center space-y-12 flex-grow flex flex-col justify-center">

        {/* Header */}
        <div className="space-y-4 animate-fade-in-down">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative w-16 h-16 rounded-2xl shadow-xl shadow-primary/20 overflow-hidden">
              <img
                src="/logo.png"
                alt="ReelRovr Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-5xl font-bold text-foreground tracking-tight">
              ReelRovr
            </h1>
          </div>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Download Instagram Reels, Posts, and Videos in highest quality.
            Free, unlimited, and no watermark.
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-8">
          <InputBar onExtract={handleExtract} isLoading={isLoading} />

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl animate-shake">
              {error}
            </div>
          )}

          {/* Results Section */}
          <div className="min-h-[200px] flex items-center justify-center">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-6 py-12">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 border-4 border-muted/30 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Instagram className="text-primary animate-pulse" size={24} />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-medium animate-pulse">Analyzing ...</p>
                  <p className="text-sm text-muted">This might take a moment</p>
                </div>
              </div>
            ) : (
              <PreviewCard
                data={data}
                onDownload={handleDownload}
                isDownloading={isDownloading}
              />
            )}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-12 text-muted text-sm pb-6">
        ReelRovr © 2026
      </footer>
    </main>
  );
}
