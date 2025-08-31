import {useState} from "react";
import {Eye, EyeClosed} from "lucide-react";

export const Input = ({label, value, onChange,placeholder,type, isSelect, options}) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="mb-4">
            <label className="text-[13px] text-slate-800 block mb-1">
                {label}
            </label>
            <div className="relative">
                {isSelect ? (<select value={value} onChange={(e) => onChange(e)} className="w-full bg-transparent outline-none border cursor-pointer border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" >
                    <option value="">--- Select Type ----</option>
                    {options.map((option,index) => (
                        <option key={option.label} value={option.value}>{option.label}</option>
                    ))}
                </select>): ( <input
                   className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    type={type === 'password' ? ( showPassword ? 'text' : 'password' ) : type}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e)}
                    value={value} />)}

                {
                    type === 'password' && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                            {showPassword ? <Eye size={20} className="text-primary" onClick={togglePassword} /> : <EyeClosed size={20} className="text-primary" onClick={togglePassword} /> }

                        </span>
                    )
                }
            </div>
        </div>
    )
}
