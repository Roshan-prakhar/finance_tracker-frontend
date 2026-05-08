const colorConfig = {
    'bg-purple-800': {
        bg: 'bg-green-50',
        text: 'text-green-600',
        badge: 'bg-green-100 text-green-700',
    },
    'bg-green-800': {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        badge: 'bg-emerald-100 text-emerald-700',
    },
    'bg-red-800': {
        bg: 'bg-red-50',
        text: 'text-red-500',
        badge: 'bg-red-100 text-red-600',
    },
};

const InfoCard = ({icon, label, value, color}) => {
    const config = colorConfig[color] || colorConfig['bg-purple-800'];
    return(
        <div className="bg-white p-5 rounded-2xl border border-gray-100 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">{label}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.bg} ${config.text}`}>
                    {icon}
                </div>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-[28px] font-bold text-gray-900 leading-none">&#8377;{value}</span>
            </div>
        </div>
    )
}

export default InfoCard;