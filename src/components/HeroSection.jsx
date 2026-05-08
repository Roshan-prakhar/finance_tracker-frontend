import {ArrowRight, Sparkles, TrendingUp, Shield, Zap} from "lucide-react";
import {Link} from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-32">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-8 animate-fade-in-up">
                        <Sparkles className="w-4 h-4" />
                        <span>Smart Finance Tracking Made Simple</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                        Take Control of{' '}
                        <span className="gradient-text">Your Finances</span>
                    </h1>

                    {/* Subheading */}
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                        Your foundation for secure, intelligent financial management. Effortlessly track income and expenses to achieve your financial goals.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                        <Link
                            to="/signup"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]"
                            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}
                        >
                            Start Tracking Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border border-gray-200 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300"
                        >
                            I have an account
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span>Bank-level Security</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <TrendingUp className="w-4 h-4 text-purple-500" />
                            <span>Real-time Analytics</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span>Instant Reports</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;