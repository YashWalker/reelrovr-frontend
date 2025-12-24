import { Download, Shield, Zap, Globe } from "lucide-react";

export const metadata = {
    title: "About ReelRovr - Best Instagram Downloader",
    description: "Learn why ReelRovr is the best free tool to download Instagram Reels, Videos, and Photos.",
};

export default function About() {
    return (
        <main className="min-h-screen bg-background text-foreground py-16 px-6 transition-colors duration-300">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Hero Section */}
                <section className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        About ReelRovr
                    </h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto">
                        The most advanced, free, and secure tool for downloading Instagram content.
                        Built for creators, by creators.
                    </p>
                </section>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    <FeatureCard
                        icon={<Zap className="text-yellow-500" size={32} />}
                        title="Lightning Fast"
                        description="Our advanced extraction engine fetches high-quality media links in milliseconds."
                    />
                    <FeatureCard
                        icon={<Shield className="text-success" size={32} />}
                        title="100% Secure & Privacy Focused"
                        description="We don't store your history or require any login. Your downloads are completely anonymous."
                    />
                    <FeatureCard
                        icon={<Download className="text-primary" size={32} />}
                        title="Unlimited Downloads"
                        description="No daily limits. Download as many Reels, Photos, and IGTV videos as you want."
                    />
                    <FeatureCard
                        icon={<Globe className="text-secondary" size={32} />}
                        title="Works Everywhere"
                        description="Fully responsive design that works perfectly on iPhone, Android, Mac, and Windows."
                    />
                </div>

                {/* SEO Content Section */}
                <section className="bg-card rounded-2xl p-8 border border-muted/20 shadow-xl">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">How to Download Instagram Reels?</h2>
                    <ol className="list-decimal list-inside space-y-4 text-muted">
                        <li>Open the Instagram app or website and find the Reel you want to save.</li>
                        <li>Tap the three dots (...) or share icon and select <strong className="text-foreground">Copy Link</strong>.</li>
                        <li>Paste the URL into ReelRovr's search bar.</li>
                        <li>Click <strong className="text-primary">Fetch</strong> and verify the preview.</li>
                        <li>Hit <strong className="text-success">Download</strong> to save the video to your gallery.</li>
                    </ol>
                </section>

            </div>
        </main>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-6 bg-card rounded-xl border border-muted/20 hover:border-primary/30 hover:shadow-lg transition-all">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
            <p className="text-muted">{description}</p>
        </div>
    );
}
