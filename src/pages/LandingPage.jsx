import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ProductShowcase from "../components/ProductShowcase.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import StatsSection from "../components/StatsSection.jsx";
import Footer from "../components/Footer.jsx";

const LandingPage = () => {
    return (
        <div className="bg-[#F9FAFB] text-gray-800 min-h-screen font-['Inter',_'Segoe_UI',_sans-serif] antialiased">
            <Header />
            <main className="relative overflow-hidden">
                {/* Subtle decorative gradient orbs inspired by the fintech dashboard aesthetic */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-50 via-transparent to-transparent rounded-full blur-3xl opacity-60 pointer-events-none -z-0" />
                <div className="absolute top-[60vh] right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-50/40 via-transparent to-transparent rounded-full blur-3xl opacity-50 pointer-events-none -z-0" />
                
                <div className="relative z-10">
                    <HeroSection />
                    <ProductShowcase />
                    <FeaturesSection />
                    <StatsSection />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;