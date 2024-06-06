import { useState, useEffect } from "react";

export function FormPersonalDetails({ data, onDataChange }) {
    const [localData, setLocalData] = useState(data);

    const optionComoConheceu = [
        { id: 'eedesSociais', name: 'Redes sociais'},
        { id: 'google', name:'Google'},
        { id: 'indicacao', name: 'Indicação' },
        { id: 'outros', name: 'Outros' }
    ]

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedData = { ...localData, [name]: value };
        setLocalData(updatedData);
        onDataChange(updatedData);
    };


    return (
        <div className="flex max-w-[1040px] m-auto flex-col gap-5 text-base font-medium">
            <label htmlFor="txt-nome" className="flex flex-col gap-2 custom-label">
                Nome:
                <input
                    id="txt-nome"
                    type="text"
                    name="nome"
                    className="custom-input"
                    value={localData.nome || ""}
                    onChange={handleChange}
                />
            </label>

            <div className="flex gap-5 flex-col md:flex-row">
                <label htmlFor="nasc" className="flex flex-col gap-2 w-full md:w-1/3 custom-label">
                    Nascimento:
                    <input
                        id="nasc"
                        type="text"
                        name="nasc"
                        className="custom-input"
                        value={localData.nasc || ""}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="txt-tel" className="flex flex-col gap-2 w-full md:w-1/3 custom-label">
                    Telefone de Contato:
                    <input
                        id="txt-tel"
                        type="text"
                        name="txt-tel"
                        className="custom-input"
                        value={localData["txt-tel"] || ""}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="txt-cpf" className="flex flex-col gap-2 w-full md:w-1/3 custom-label">
                    CPF:
                    <input
                        id="txt-cpf"
                        type="text"
                        name="txt-cpf"
                        className="custom-input"
                        value={localData["txt-cpf"] || ""}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div className="flex gap-5 flex-col md:flex-row">
                <label htmlFor="txt-profi" className="flex flex-col gap-2 w-full md:w-1/4 custom-label">
                    Profissão:
                    <input
                        id="txt-profi"
                        type="text"
                        name="txt-profi"
                        className="custom-input"
                        value={localData["txt-profi"] || ""}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="txt-email" className="flex flex-col gap-2 w-full md:w-1/2 custom-label">
                    E-mail:
                    <input
                        id="txt-email"
                        type="text"
                        name="txt-email"
                        className="custom-input"
                        value={localData["txt-email"] || ""}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <label htmlFor="txt-endr" className="flex flex-col gap-2 w-full custom-label">
                Endereço:
                <input
                    id="txt-endr"
                    type="text"
                    name="txt-endr"
                    className="custom-input"
                    value={localData["txt-endr"] || ""}
                    onChange={handleChange}
                />
            </label>

            <p>Como você nos conheceu?</p>
            <div className='flex  w-full gap-2 flex-col min-[710px]:flex-row'>
                
                {optionComoConheceu.map((option) => (
                    <div key={option.id} >
                        <input
                            type="radio"
                            id={option.id}
                            name='comoDescobriu'
                            value={option.name}
                            className="radio-input"
                            checked={localData.comoDescobriu === option.name}
                            onChange={handleChange}
                        />
                        <label htmlFor={option.id} className="radio-label">{option.name}</label>
                    </div>
                ))}
            </div>

        </div>
    );
}
