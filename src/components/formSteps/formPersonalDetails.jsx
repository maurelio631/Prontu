import { useState, useEffect } from "react";
import { InputText } from "../InputText";

export function FormPersonalDetails({ data, onDataChange }) {
    const [localData, setLocalData] = useState(data);

    const optionComoConheceu = [
        { id: 'RedesSociais', name: 'Redes sociais'},
        { id: 'google', name:'Google'},
        { id: 'indicacao', name: 'Indicação' },
        { id: 'outros', name: 'Outros' }
    ]

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    const handleChange = (InputId, value) => {
        const updatedData = { ...localData, [InputId]: value };
        setLocalData(updatedData);
        onDataChange(updatedData);
    };

    const handleChangeRadio = (event) => {
        const { name, value } = event.target;
        const updatedData = { ...localData, [name]: value };
        setLocalData(updatedData);
        onDataChange(updatedData);
    };

    return (
        <div className="flex max-w-[1040px] m-auto flex-col gap-5 text-base font-medium">

            <InputText 
                InputId={'name'} 
                labelName={'Nome:'} 
                onChange={handleChange} 
                val={localData.name || ""}
                max={50} 
                required
            />

            <div className="flex gap-5 flex-col md:flex-row">
                <InputText 
                    InputId={'birth_date'} 
                    labelName={'Nascimento:'} 
                    onChange={handleChange} 
                    val={localData.birth_date || ""} 
                    classLabel={'md:w-1/3'}
                    mask="date"
                    maskOptions={{ delimiter: '/', datePattern: ['d', 'm', 'Y'] }}
                    required 
                />

                <InputText 
                    InputId={'phone'} 
                    labelName={'Telefone de Contato:'} 
                    onChange={handleChange} 
                    val={localData.phone || ""} 
                    classLabel={'md:w-1/3'} 
                    mask="general"
                    maskOptions={{ delimiters: [' ',], blocks: [2, 9]}}
                    required
                />

                <InputText 
                    InputId={'cpf'} 
                    labelName={'CPF:'} 
                    onChange={handleChange} 
                    val={localData.cpf || ""} 
                    classLabel={'md:w-1/3'} 
                    mask="general"
                    maskOptions={{ delimiters: ['.', '.', '-'], blocks: [3, 3, 3, 2]}}
                    required
                />
            </div>

            <div className="flex gap-5 flex-col md:flex-row">
                <InputText 
                    InputId={'profession'} 
                    labelName={'Profissão:'} 
                    onChange={handleChange} 
                    val={localData.profession || ""} 
                    classLabel={'md:w-1/4'} 
                    max={30} 
                    required
                />
                <InputText 
                    InputId={'email'} 
                    labelName={'E-mail:'} 
                    onChange={handleChange} 
                    val={localData.email || ""} 
                    classLabel={'md:w-1/2'} 
                    max={60}
                    required
                />
            </div>
            
            <InputText 
                InputId={'address'} 
                labelName={'Endereço:'} 
                onChange={handleChange} 
                val={localData.address || ""} 
                max={40}
                required
            />


            <p className="textSwitch">Como você nos conheceu? <span className="text-vermelho-900 font-bold">*</span></p>
            <div className='flex  w-full gap-2 flex-col min-[710px]:flex-row'>
                {optionComoConheceu.map((option) => (
                    <div key={option.id} >
                        <input
                            type="radio"
                            id={option.id}
                            name='how_know_us'
                            value={option.name}
                            className="radio-input"
                            checked={localData.how_know_us === option.name}
                            onChange={handleChangeRadio}
                        />
                        <label htmlFor={option.id} className="radio-label">{option.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
