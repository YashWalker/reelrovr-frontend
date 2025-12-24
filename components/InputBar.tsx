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
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-xl 
                     text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent transition-all shadow-lg"
                    placeholder="Paste Instagram Reel or Post link..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !url.trim()}
                    className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 
                     text-white font-medium rounded-lg transition-colors disabled:opacity-50 
                     disabled:cursor-not-allowed flex items-center"
                >
                    {isLoading ? "Fetching..." : "Fetch"}
                </button>
            </div>
        </form>
    );
}
