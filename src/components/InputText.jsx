import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export function InputText({ InputId, labelName, required, password, onChange }){
    const [type, setType] = useState('password');   
    const [iconPass, setIconPass] = useState(true);

    const handleToggle = () => {
        if (type === 'password') {
            setType('text')
            setIconPass(false)
        } else {
            setIconPass(true)
            setType('password')
        }
    }

    const handleChange = (event) => {
        onChange(InputId, event.target.value);
    };

    return(
        password 
        ? 
        (
            <label htmlFor={InputId} className="relative font-medium">
                {required ? <b className="text-vermelho">*</b> : null}{labelName}
                <input 
                    type={type} 
                    name={InputId}  
                    id={InputId} 
                    onChange={handleChange}
                    className="w-full bg-[#F6FAFD] border border-[#e0e0e0] rounded-lg p-2 outline-none hover:border-azul-principal mt-2" 
                />

                <button type="button" className="absolute right-4 bottom-3 text-black/70" onClick={handleToggle}>
                    {iconPass == true ? <FaEye /> : <FaEyeSlash />}
                </button>
            </label>
        )
        : 
        (
            <label htmlFor={InputId} className="font-medium w-full">
                {required ? <b className="text-vermelho">*</b> : null} {labelName}
                <input
                    type="text"
                    id={InputId}
                    name={InputId}
                    onChange={handleChange}
                    className="w-full bg-[#F6FAFD] border border-[#e0e0e0] rounded-lg p-2 outline-none hover:border-azul-principal mt-2"
                />
            </label>
        )
    )
}