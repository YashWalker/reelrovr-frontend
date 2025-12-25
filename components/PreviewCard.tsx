"use client";

import { Download, Video, Image as ImageIcon, ExternalLink } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

interface MediaInfo {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
    is_video: boolean;
}

interface PreviewCardProps {
    data: MediaInfo | null;
    onDownload: () => void;
    isDownloading: boolean;
}

export default function PreviewCard({ data, onDownload, isDownloading }: PreviewCardProps) {
    if (!data) return null;

    return (
        <div className="w-full max-w-sm md:max-w-md mx-auto bg-card rounded-2xl overflow-hidden shadow-2xl border border-muted/20 animate-fade-in my-4">
            {/* Container for media preview - adaptive height */}
            <div className="relative bg-background/50 flex justify-center items-center min-h-[300px] max-h-[60vh]">
                <img
                    src={`${API_BASE_URL}/api/proxy?url=${encodeURIComponent(data.thumbnail)}`}
                    alt={data.title}
                    className="w-full h-full object-contain max-h-[60vh]"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 text-xs font-medium text-white shadow-sm">
                    {data.is_video ? <Video size={14} /> : <ImageIcon size={14} />}
                    <span>{data.is_video ? "Reel" : "Image"}</span>
                </div>
            </div>

            <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 line-clamp-2" title={data.title}>
                    {data.title}
                </h3>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onDownload}
                        disabled={isDownloading}
                        className="flex-1 flex items-center justify-center gap-2 bg-foreground text-card py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-70 shadow-md"
                    >
                        <Download size={20} />
                        {isDownloading ? "Downloading..." : "Download"}
                    </button>

                    <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-muted/20 text-muted hover:text-foreground hover:bg-muted/30 rounded-xl transition-colors"
                        title="Open original"
                    >
                        <ExternalLink size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
}
