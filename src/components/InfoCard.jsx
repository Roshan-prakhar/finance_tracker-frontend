const colorConfig = {
    'bg-purple-800': {
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
        shadow: 'rgba(124, 58, 237, 0.3)',
        bg: 'bg-purple-50',
    },
    'bg-green-800': {
        gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        shadow: 'rgba(5, 150, 105, 0.3)',
        bg: 'bg-green-50',
    },
    'bg-red-800': {
        gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        shadow: 'rgba(220, 38, 38, 0.3)',
        bg: 'bg-red-50',
    },
};

const InfoCard = ({icon, label, value, color}) => {
    const config = colorConfig[color] || colorConfig['bg-purple-800'];
    return(
        <div className="group flex gap-5 bg-white p-5 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
             style={{boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)'}}>
            <div
                className="w-13 h-13 flex items-center justify-center text-white rounded-xl transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
                style={{
                    background: config.gradient,
                    boxShadow: `0 4px 14px ${config.shadow}`,
                    width: '52px',
                    height: '52px',
                }}
            >
                {icon}
            </div>
            <div className="flex flex-col justify-center">
                <h6 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</h6>
                <span className="text-2xl font-bold text-gray-900">&#8377;{value}</span>
            </div>
        </div>
    )
}

export default InfoCard;