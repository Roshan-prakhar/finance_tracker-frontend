import {BarChart2, Shield, Download, SlidersHorizontal} from "lucide-react";

const highlights = [
    { icon: BarChart2,        title: "Visual Analytics",   desc: "Line and pie charts show exactly where your money flows each month." },
    { icon: Shield,           title: "Secure & Private",   desc: "JWT-based auth keeps your data accessible only to you." },
    { icon: Download,         title: "Export to Excel",    desc: "Download your income or expense records as .xlsx with one click." },
    { icon: SlidersHorizontal, title: "Smart Filters",     desc: "Filter transactions by type, date range, keyword, and sort order." },
];

const StatsSection = () => {
    return (
        <section id="about" className="py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl overflow-hidden p-10 md:p-14 bg-green-600">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
                        {highlights.map((item) => (
                            <div key={item.title} className="flex flex-col gap-3">
                                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/15">
                                    <item.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-base font-bold text-white">{item.title}</div>
                                <div className="text-sm text-green-100 leading-relaxed">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
