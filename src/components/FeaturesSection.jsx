import {BarChart3, PieChart, Download, Mail, Shield, Smartphone} from "lucide-react";

const features = [
    {
        icon: BarChart3,
        title: "Expense Tracking",
        description: "Track every penny with categorized expenses and visual breakdowns of your spending patterns.",
        color: "bg-purple-50 text-purple-600",
    },
    {
        icon: PieChart,
        title: "Visual Analytics",
        description: "Beautiful charts and graphs that make understanding your finances intuitive and effortless.",
        color: "bg-cyan-50 text-cyan-600",
    },
    {
        icon: Download,
        title: "Export Reports",
        description: "Download detailed Excel reports of your income and expenses anytime you need them.",
        color: "bg-green-50 text-green-600",
    },
    {
        icon: Mail,
        title: "Email Reports",
        description: "Get your financial summaries delivered straight to your inbox with one click.",
        color: "bg-amber-50 text-amber-600",
    },
    {
        icon: Shield,
        title: "Secure & Private",
        description: "Your financial data is encrypted and protected with industry-standard security measures.",
        color: "bg-red-50 text-red-600",
    },
    {
        icon: Smartphone,
        title: "Responsive Design",
        description: "Access your finances from any device — desktop, tablet, or mobile, anywhere anytime.",
        color: "bg-indigo-50 text-indigo-600",
    },
];

const FeaturesSection = () => {
    return (
        <section id="features" className="py-20 md:py-28 bg-gray-50/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Everything you need to{' '}
                        <span className="gradient-text">manage money</span>
                    </h2>
                    <p className="text-lg text-gray-500">
                        Powerful features designed to help you take control of your financial life with ease and confidence.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="group relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-purple-100 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1"
                            style={{animationDelay: `${index * 0.1}s`}}
                        >
                            <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
