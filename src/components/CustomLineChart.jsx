import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import {addThousandsSeparator} from "../util/util.js";

const CustomLineChart = ({ data }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;

            // Group items by category for the tooltip display
            const groupedItemsForTooltip = dataPoint.items.reduce((acc, item) => {
                const { categoryName, amount } = item;
                if (!acc[categoryName]) {
                    acc[categoryName] = {
                        categoryName: categoryName,
                        totalAmount: 0,
                    };
                }
                acc[categoryName].totalAmount += amount;
                return acc;
            }, {});

            // Convert grouped object to array for mapping
            const categoriesInTooltip = Object.values(groupedItemsForTooltip);

            return (
                <div className="bg-white shadow-xl shadow-gray-200/50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
                    <p className="text-sm text-gray-900 font-bold">
                        &#8377;{addThousandsSeparator(dataPoint.totalAmount)}
                    </p>

                    {categoriesInTooltip && categoriesInTooltip.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                            {categoriesInTooltip.map((groupedItem, index) => (
                                <div key={index} className="flex justify-between gap-4 text-xs">
                                    <span className="text-gray-500">{groupedItem.categoryName}</span>
                                    <span className="text-gray-700 font-medium">&#8377;{addThousandsSeparator(groupedItem.totalAmount)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-transparent">
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} stroke="none" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} stroke="none" axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />

                    <Area
                        type="monotone"
                        dataKey="totalAmount"
                        stroke="#7c3aed"
                        fill="url(#expenseGradient)"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "#7c3aed", strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 6, fill: "#7c3aed", strokeWidth: 2, stroke: "#fff" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;