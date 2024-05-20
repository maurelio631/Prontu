import { useState, useEffect } from "react";
import "./defaultForms.css";

export function FormPersonalDetails({ data, onDataChange }) {
    const [localData, setLocalData] = useState(data);

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedData = { ...localData, [name]: value };
        setLocalData(updatedData);
        onDataChange(updatedData);
    };

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    return (
        <div className="flex flex-col gap-5 text-base font-medium custom-input">
            <label htmlFor="nome">
                Nome:
                <input
                    type="text"
                    name="nome"
                    className="w-full"
                    value={localData.nome || ""}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor="nasc">
                Nascimento:
                <input
                    type="date"
                    name="nasc"
                    className="rounded-lg mr-2"
                    max={`${anoAtual - 18}-12-01`}
                    value={localData.nasc || ""}
                    onChange={handleChange}
                />
                Idade: {localData.nasc ? Math.floor((new Date() - new Date(localData.nasc)) / (365.25 * 24 * 60 * 60 * 1000)) : ''} anos
            </label>

            <label htmlFor="txt-profi">
                Profissão:
                <input
                    type="text"
                    name="txt-profi"
                    value={localData["txt-profi"] || ""}
                    onChange={handleChange}
                />
            </label>

            <div className="flex gap-5">
                <label htmlFor="txt-tel">
                    Tel. Contato:
                    <input
                        type="text"
                        name="txt-tel"
                        className="w-52"
                        value={localData["txt-tel"] || ""}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="txt-cpf">
                    CPF:
                    <input
                        type="text"
                        name="txt-cpf"
                        className="w-52"
                        value={localData["txt-cpf"] || ""}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <label htmlFor="txt-email">
                E-mail:
                <input
                    type="text"
                    name="txt-email"
                    value={localData["txt-email"] || ""}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor="txt-endr">
                Endereço:
                <input
                    type="text"
                    name="txt-endr"
                    className="w-full"
                    value={localData["txt-endr"] || ""}
                    onChange={handleChange}
                />
            </label>

            <label htmlFor="txt-como">
                Como você nos conheceu?
                <input
                    type="text"
                    name="txt-como"
                    value={localData["txt-como"] || ""}
                    onChange={handleChange}
                />
            </label>
        </div>
    );
}
