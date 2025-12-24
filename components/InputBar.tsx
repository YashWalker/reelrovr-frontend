"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface InputBarProps {
    onExtract: (url: string) => void;
    isLoading: boolean;
}

export default function InputBar({ onExtract, isLoading }: InputBarProps) {
    const [url, setUrl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onExtract(url.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8 relative z-10">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted group-focus-within:text-primary transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-11 pr-32 py-5 bg-card border-2 border-muted/10 rounded-2xl 
                     text-foreground placeholder-muted focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 
                     transition-all shadow-xl hover:shadow-2xl hover:border-muted/30 text-lg"
                    placeholder="Paste Instagram Reel or Post link..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !url.trim()}
                    className="absolute right-2.5 top-2.5 bottom-2.5 px-8 bg-primary hover:bg-primary/90 
                     text-white dark:text-black font-bold rounded-xl transition-all disabled:opacity-50 
                     disabled:cursor-not-allowed flex items-center shadow-lg shadow-primary/30 
                     active:scale-95 hover:-translate-y-0.5 border border-transparent"
                >
                    {isLoading ? "Fetching..." : "Fetch"}
                </button>
            </div>
        </form>
    );
}
