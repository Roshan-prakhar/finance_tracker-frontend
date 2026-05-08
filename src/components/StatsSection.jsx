import {Users, TrendingUp, Globe, Award} from "lucide-react";

const stats = [
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: TrendingUp, value: "₹50Cr+", label: "Tracked" },
    { icon: Globe, value: "99.9%", label: "Uptime" },
    { icon: Award, value: "4.9/5", label: "User Rating" },
];

const StatsSection = () => {
    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl overflow-hidden p-10 md:p-14" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 50%, #1e1b4b 100%)' }}>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm mb-4">
                                    <stat.icon className="w-6 h-6 text-purple-200" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-purple-200">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
