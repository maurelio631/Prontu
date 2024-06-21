import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import {
    formatCreditCard,
    getCreditCardType,
    formatNumeral,
    formatGeneral,
    formatDate
} from 'cleave-zen';

export function InputText({ InputId, labelName, required, password, onChange, val, classInput, classLabel, mask, maskOptions, max, readonly }) {
    const [type, setType] = useState('password');
    const [iconPass, setIconPass] = useState(true);
    const [formattedValue, setFormattedValue] = useState('');

    useEffect(() => {
        // Atualiza formattedValue sempre que val, mask ou maskOptions mudam
        setFormattedValue(mask ? formatInput(val, mask, maskOptions) : val);
    }, [val, mask, maskOptions]);

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
        let value = event.target.value;
        // Remove todos os caracteres não numéricos se a máscara for 'general'
        if (mask === 'general') {
            value = value.replace(/\D/g, ''); // \D corresponde a qualquer caractere não numérico
        }
        const formatted = mask ? formatInput(value, mask, maskOptions) : value; // Formata o valor se uma máscara for fornecida
        setFormattedValue(formatted); // Atualiza o valor formatado
        onChange(InputId, formatted); // Chama a função onChange com o id do input e o valor formatado
    };

    // Formata o valor do input de acordo com a máscara fornecida
    const formatInput = (value, mask, options) => {
        switch (mask) {
            case 'creditCard':
                return formatCreditCard(value);
            case 'numeral':
                return formatNumeral(value, options);
            case 'general':
                return formatGeneral(value, options);
            case 'date':
                return formatDate(value, options);
            default:
                return value;
        }
    };

    return (
        <label htmlFor={InputId} className={twMerge("text-black dark:text-white relative font-medium w-full", classLabel)}>
            {labelName} {required && <span className="text-vermelho-900">*</span>}
            <input
                readOnly={readonly}
                autoComplete='off'
                maxLength={max}
                type={password ? type : "text"}
                name={InputId}
                id={InputId}
                onChange={handleChange}
                value={formattedValue || ''} // Garante que o valor seja uma string vazia, não undefined
                className={twMerge("w-full custom-input mt-2", classInput)}
            />

            {password && (
                <button type="button" className="absolute right-4 bottom-3.5 " onClick={handleToggle}>
                    {iconPass ? <FaEye className="textSwitch" /> : <FaEyeSlash className="textSwitch" />}
                </button>
            )}
        </label>
    );
}
