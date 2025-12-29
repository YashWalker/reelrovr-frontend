import { useState } from "react";
import { Download, Video, Image as ImageIcon, ExternalLink, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

interface MediaItem {
    type: "image" | "video";
    url: string;
    thumbnail?: string;
    width?: number;
    height?: number;
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

interface PreviewCardProps {
    data: MediaInfo | null;
    onDownload: (url: string, filename?: string) => void;
    isDownloading: boolean;
}

export default function PreviewCard({ data, onDownload, isDownloading }: PreviewCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showFullDesc, setShowFullDesc] = useState(false);

    if (!data) return null;

    const currentMedia = data.media[currentIndex];
    const hasMultiple = data.media.length > 1;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? data.media.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === data.media.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="w-full max-w-sm md:max-w-md mx-auto bg-card rounded-2xl overflow-hidden shadow-2xl border border-muted/20 animate-fade-in my-4 flex flex-col">
            {/* Carousel / Media Container */}
            <div className="relative bg-black/5 flex justify-center items-center group aspect-[4/5] max-h-[60vh]">
                {currentMedia.type === "video" ? (
                    <video
                        src={currentMedia.url}
                        controls
                        poster={`${API_BASE_URL}/api/proxy?url=${encodeURIComponent(currentMedia.thumbnail || data.thumbnail)}`}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <img
                        src={`${API_BASE_URL}/api/proxy?url=${encodeURIComponent(currentMedia.url)}`}
                        alt={`Slide ${currentIndex + 1}`}
                        className="w-full h-full object-contain"
                    />
                )}

                {/* Media Type Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 text-xs font-medium text-white shadow-sm pointer-events-none">
                    {currentMedia.type === "video" ? <Video size={14} /> : <ImageIcon size={14} />}
                    <span>{currentMedia.type === "video" ? "Video" : "Image"}</span>
                    {hasMultiple && <span className="ml-1 opacity-75">({currentIndex + 1}/{data.media.length})</span>}
                </div>

                {/* Navigation Buttons for Carousel */}
                {hasMultiple && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 px-4 pointer-events-none">
                            {data.media.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 rounded-full shadow-sm transition-all ${idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="p-4 md:p-6 flex flex-col gap-4">
                {/* Title */}
                <h3 className="text-base md:text-lg font-bold text-foreground line-clamp-1" title={data.title}>
                    {data.title}
                </h3>

                {/* Description (Caption) */}
                {data.description && (
                    <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg relative">
                        <p className={`whitespace-pre-line ${showFullDesc ? '' : 'line-clamp-3'}`}>
                            {data.description}
                        </p>
                        {data.description.length > 150 && (
                            <button
                                onClick={() => setShowFullDesc(!showFullDesc)}
                                className="text-primary text-xs font-semibold mt-1 hover:underline focus:outline-none"
                            >
                                {showFullDesc ? "Show less" : "Show more"}
                            </button>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-2">
                    <button
                        onClick={() => onDownload(currentMedia.url, currentMedia.filename || `${data.title}-${currentIndex}`)}
                        disabled={isDownloading}
                        className="flex-1 flex items-center justify-center gap-2 bg-foreground text-card py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-70 shadow-md transform active:scale-[0.98]"
                    >
                        <Download size={20} />
                        {isDownloading ? "Downloading..." : "Download"}
                    </button>

                    <a
                        href={currentMedia.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-muted/20 text-muted hover:text-foreground hover:bg-muted/30 rounded-xl transition-colors shrink-0"
                        title="Open in new tab"
                    >
                        <ExternalLink size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
}
