import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ProductShowcase from "../components/ProductShowcase.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import StatsSection from "../components/StatsSection.jsx";
import Footer from "../components/Footer.jsx";

const LandingPage = () => {
    return (
        <div className="bg-white text-gray-800 min-h-screen">
            <Header />
            <main>
                <HeroSection />
                <ProductShowcase />
                <FeaturesSection />
                <StatsSection />
            </main>
            <Footer />
        </div>
    )
}

export default LandingPage;