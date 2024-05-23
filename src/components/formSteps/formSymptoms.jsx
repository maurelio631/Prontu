import './defaultForms.css';
import { useState, useEffect } from "react";
import { desconfortos, frequencias, sintomas } from "../../data/arraySintomas";

export function FormSymptoms({ data, onDataChange }) {
    const [localData, setLocalData] = useState(data);

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        let updatedData;

        if (type === 'checkbox') {
            const currentValues = localData[name] || [];
            updatedData = {
                ...localData,
                [name]: checked
                    ? [...currentValues, value]
                    : currentValues.filter(item => item !== value)
            };
        } else {
            updatedData = { ...localData, [name]: value };
        }

        setLocalData(updatedData);
        onDataChange(updatedData);
    };


    return (
        <div className='text-base font-medium custom-input'>
            <h2 className='text-2xl text-center font-bold mb-5'>Descreva seus sintomas abaixo</h2>
            <label htmlFor="txt-sintoma" className='flex flex-col gap-2'>
                Sintomas:
                <textarea
                    type="text"
                    name='txt-sintoma'
                    id='txt-sintoma'
                    className="w-full h-24"
                    value={localData['txt-sintoma'] || ""}
                    onChange={handleChange}
                ></textarea>
            </label>

            <h3 className='text-center font-medium my-5 text-lg md:text-xl'>Como começaram os sintomas?</h3>
            <div className='flex  w-full justify-center gap-2 flex-col min-[710px]:flex-row'>
                {sintomas.map((sintoma) => (
                    <div key={sintoma.id}>
                        <input
                            type="radio"
                            id={sintoma.id}
                            name='causa'
                            value={sintoma.name}
                            className="radio-input"
                            checked={localData.causa === sintoma.name}
                            onChange={handleChange}
                        />
                        <label htmlFor={sintoma.id} className="radio-label">{sintoma.name}</label>
                    </div>
                ))}
            </div>

            <h3 className='text-center font-medium my-5 text-lg md:text-xl'>Qual o tipo de desconforto? (selecione todas as opções compatíveis)</h3>
            <div className='flex flex-wrap gap-1 m-auto justify-center max-w-[700px] w-full flex-col min-[520px]:flex-row'>
                {desconfortos.map((desconforto) => (
                    <div className='w-full min-[520px]:w-[24%]' key={desconforto.id}>
                        <input
                            type="checkbox"
                            id={desconforto.id}
                            name='desconfortos'
                            value={desconforto.name}
                            className="radio-input"
                            checked={(localData.desconfortos || []).includes(desconforto.name)}
                            onChange={handleChange}
                        />
                        <label htmlFor={desconforto.id} className="radio-label justify-center">{desconforto.name}</label>
                    </div>
                ))}
            </div>

            <h3 className='text-center font-medium my-5 text-lg md:text-xl'>Qual a frequência dos sintomas?</h3>


            {/* className='flex gap-2 items-center  flex-col sm:flex-row  sm:justify-center sm:items-baseline' */}

            <div className='flex justify-center gap-2 items-baseline'>
                {frequencias.map((frequencia) => (
                    <div key={frequencia.id} className='input-escada'>
                        <input
                            type="radio"
                            id={frequencia.id}
                            name="frequencia"
                            value={frequencia.name}
                            className="radio-input"
                            checked={localData.frequencia === frequencia.name}
                            onChange={handleChange}
                        />
                        <label htmlFor={frequencia.id} className="radio-label ">{frequencia.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
