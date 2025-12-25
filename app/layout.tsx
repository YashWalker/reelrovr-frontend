import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as requested for premium look
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram Reel Downloader - ReelRovr | Free & Fast",
  description: "Download Instagram Reels, Videos, and Photos in 1080p URL. Free unlimited Instagram downloader tool. No watermark, works on mobile and PC.",
  keywords: ["instagram reel download", "insta save", "reels downloader", "instagram video download", "ig saver", "reelrovr"],
  openGraph: {
    title: "ReelRovr - Download Instagram Reels & Videos",
    description: "The fastest way to download Instagram content. Free, unlimited, and no watermark.",
    type: "website",
  },
  verification: {
    google: "w6DkuqvO9aDRRNDBzaGHBiFSZ60HQl1qzKqqRsduFpQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
