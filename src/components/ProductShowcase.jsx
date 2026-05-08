import {assets} from "../assets/assets.js";

const ProductShowcase = () => {
    return (
        <section className="pb-20 md:pb-32 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative max-w-5xl mx-auto">
                    {/* Glow behind image */}
                    <div className="absolute -inset-4 bg-green-100/40 rounded-3xl blur-2xl"></div>

                    {/* Image container */}
                    <div className="relative rounded-2xl overflow-hidden border border-gray-200/50 shadow-2xl shadow-gray-300/30">
                        <img
                            src={assets.landing}
                            className="w-full h-auto object-cover"
                            alt="MoneyWise App Dashboard"
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1200x600/E2E8F0/4A5568?text=Image+Not+Found'; }}
                        />
                        {/* Overlay gradient at bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/80 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;