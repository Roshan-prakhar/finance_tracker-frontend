import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";

const Input = ({label, value, onChange, placeholder, type, isSelect, options}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className="mb-1">
            <label className="text-[13px] font-medium text-gray-700 block mb-1.5">
                {label}
            </label>
            <div className={`relative rounded-xl border transition-all duration-200 ${isFocused ? 'border-purple-400 ring-2 ring-purple-100' : 'border-gray-200 hover:border-gray-300'}`}>
                {isSelect ? (
                    <select
                        className="w-full bg-transparent outline-none rounded-xl py-2.5 px-3.5 text-gray-700 text-sm appearance-none cursor-pointer"
                        value={value}
                        onChange={(e) => onChange(e)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ): (
                    <input
                        className="w-full bg-transparent outline-none rounded-xl py-2.5 px-3.5 pr-10 text-gray-700 text-sm placeholder:text-gray-400"
                        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                )}

                {type === 'password' && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                        {showPassword ? (
                            <Eye
                                size={18}
                                className="text-purple-500 hover:text-purple-600 transition-colors"
                                onClick={toggleShowPassword}
                            />
                        ) : (
                            <EyeOff
                                size={18}
                                className="text-gray-400 hover:text-gray-500 transition-colors"
                                onClick={toggleShowPassword}
                            />
                        )}
                    </span>
                )}
            </div>
        </div>
    )
}

export default Input;