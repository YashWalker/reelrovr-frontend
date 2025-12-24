"use client";

import { useState } from "react";
import InputBar from "@/components/InputBar";
import PreviewCard from "@/components/PreviewCard";
import { extractMedia, getDownloadUrl } from "@/lib/api";
import { Instagram } from "lucide-react";

interface MediaInfo {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  is_video: boolean;
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

  const handleDownload = async () => {
    if (!data) return;

    setIsDownloading(true);
    try {
      // Trigger download by navigating to the proxy endpoint
      window.location.href = getDownloadUrl(data.url);
    } catch (err) {
      console.error(err);
      setError("Download failed.");
    } finally {
      // Small delay to reset state since window.location doesn't block
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-4xl mx-auto text-center space-y-12">

        {/* Header */}
        <div className="space-y-4 animate-fade-in-down">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-primary rounded-2xl shadow-xl shadow-primary/20">
              <Instagram size={40} className="text-white" />
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
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted animate-pulse">Fetching media info...</p>
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
      <footer className="fixed bottom-6 text-muted text-sm">
        Powered by Antigravity
      </footer>
    </main>
  );
}
