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
        <label htmlFor={InputId} className="text-black dark:text-white relative font-medium w-full">
            {required && <b className="text-vermelho-900">*</b>} {labelName}
            <input
                autoComplete='off'
                type={password ? type : "text"}
                name={InputId}
                id={InputId}
                onChange={handleChange}
                className="w-full custom-input mt-2"
            />
            {password && (
                <button type="button" className="absolute right-4 bottom-3.5 " onClick={handleToggle}>
                    {iconPass ? <FaEye className="textSwitch" /> : <FaEyeSlash className="textSwitch"/>}
                </button>
            )}
        </label>
    );
}
