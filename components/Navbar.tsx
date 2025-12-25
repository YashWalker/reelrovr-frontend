"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Instagram, Sun, Moon, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-muted/20 bg-background/80 backdrop-blur-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-1.5 bg-primary rounded-lg shadow-lg group-hover:shadow-primary/30 transition-shadow">
                            <Instagram size={24} className="text-white" />
                        </div>
                        <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            ReelRovr
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
                            Home
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
                            About
                        </Link>
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-lg bg-card text-muted hover:text-foreground hover:bg-muted/10 transition-all border border-muted/20"
                            aria-label="Toggle theme"
                        >
                            {mounted && theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-lg bg-card text-muted hover:text-foreground hover:bg-muted/10 transition-all border border-muted/20"
                            aria-label="Toggle theme"
                        >
                            {mounted && theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-muted hover:text-foreground"
                            aria-label="Toggle menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-background border-b border-muted/20 absolute w-full left-0 shadow-xl">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-muted/10"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-foreground hover:bg-muted/10"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
