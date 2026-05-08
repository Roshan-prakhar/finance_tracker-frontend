import {ArrowRight, TrendingUp, Shield, Zap} from "lucide-react";
import {Link} from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-white">
            {/* Subtle background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-green-50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-3xl opacity-40"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-36">
                <div className="text-center max-w-3xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-8 animate-fade-in-up">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span>Empower your finances, simplified insights</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                        Manage your money{' '}
                        <span className="text-green-600">smarter</span>
                        , not harder
                    </h1>

                    {/* Subheading */}
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                        Track income, control expenses, and gain financial clarity — all in one beautiful dashboard designed for real life.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-3 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                        <Link
                            to="/signup"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white bg-green-600 px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:bg-green-700 active:scale-[0.98]"
                        >
                            Start for Free
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-gray-600 px-8 py-3.5 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                        >
                            Sign in
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-14 flex flex-wrap justify-center items-center gap-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span>Secure & Private</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span>Real-time Analytics</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Zap className="w-4 h-4 text-green-500" />
                            <span>Instant Reports</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;