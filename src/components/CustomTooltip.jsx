import {addThousandsSeparator} from "../util/util.js";


const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-xl shadow-gray-200/50 rounded-xl p-3 border border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-1">{payload[0].name}</p>
                <p className="text-sm font-bold text-gray-900">
                    &#8377;{addThousandsSeparator(payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;
