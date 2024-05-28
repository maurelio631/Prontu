import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function InputText({ InputId, labelName, required, password, onChange }) {
    const [type, setType] = useState('password');
    const [iconPass, setIconPass] = useState(true);

    const handleToggle = () => {
        if (type === 'password') {
            setType('text');
            setIconPass(false);
        } else {
            setType('password');
            setIconPass(true);
        }
    };

    const handleChange = (event) => {
        onChange(InputId, event.target.value);
    };

    return (
        <label htmlFor={InputId} className="relative font-medium w-full">
            {required && <b className="text-vermelho">*</b>} {labelName}
            <input
                type={password ? type : "text"}
                name={InputId}
                id={InputId}
                onChange={handleChange}
                className="w-full bg-[#F6FAFD] border border-[#e0e0e0] rounded-lg p-2 outline-none hover:border-azul-principal mt-2"
            />
            {password && (
                <button type="button" className="absolute right-4 bottom-3 text-black/70" onClick={handleToggle}>
                    {iconPass ? <FaEye /> : <FaEyeSlash />}
                </button>
            )}
        </label>
    );
}
