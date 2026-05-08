const CustomLegend = ({ payload }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 mt-6">
            {payload.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                    <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-xs text-gray-600 font-medium">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CustomLegend;
