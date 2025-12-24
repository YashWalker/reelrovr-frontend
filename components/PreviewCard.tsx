"use client";

import { Download, Video, Image as ImageIcon, ExternalLink } from "lucide-react";

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
        <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 animate-fade-in">
            <div className="relative aspect-video bg-gray-900">
                <img
                    src={data.thumbnail}
                    alt={data.title}
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 text-xs font-medium text-white">
                    {data.is_video ? <Video size={14} /> : <ImageIcon size={14} />}
                    <span>{data.is_video ? "Reel" : "Image"}</span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-2 line-clamp-2" title={data.title}>
                    {data.title}
                </h3>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onDownload}
                        disabled={isDownloading}
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-70"
                    >
                        <Download size={20} />
                        {isDownloading ? "Downloading..." : "Download"}
                    </button>

                    <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors"
                        title="Open original"
                    >
                        <ExternalLink size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
}
