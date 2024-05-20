import { useState, useEffect } from "react";
import './defaultForms.css';

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

    const sintomas = [
        { id: 1, name: 'Queda ou trauma' },
        { id: 2, name: 'Sem causa aparente' },
        { id: 3, name: 'Má postura ou atividades diárias' },
        { id: 4, name: 'Outros' }
    ];

    const desconfortos = [
        { id: 5, name: 'Pontada' },
        { id: 6, name: 'Queimação' },
        { id: 7, name: 'Peso' },
        { id: 8, name: 'Pressão' },
        { id: 9, name: 'Latejante' },
        { id: 10, name: 'Difusa' },
        { id: 11, name: 'Formigamento' },
        { id: 12, name: 'Inflamação' }
    ];

    const frequencias = [
        { id: 13, name: '1% a 25%' },
        { id: 14, name: '25% a 50%' },
        { id: 15, name: '50% a 75%' },
        { id: 16, name: '75% a 100%' }
    ];

    return (
        <div className='text-base font-medium custom-input'>
            <h2 className='text-2xl text-center font-bold mb-5'>Descreva seus sintomas abaixo</h2>
            <label htmlFor="txt-sintoma">
                Sintomas:
                <input
                    type="text"
                    name='txt-sintoma'
                    id='txt-sintoma'
                    className="w-full"
                    value={localData['txt-sintoma'] || ""}
                    onChange={handleChange}
                />
            </label>

            <h3 className='text-xl text-center font-medium my-5'>Como começaram os sintomas?</h3>
            <div className='flex w-full justify-center gap-2'>
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

            <h3 className='text-xl text-center font-medium my-5'>Qual o tipo de desconforto? (selecione todas as opções compatíveis)</h3>
            <div className='flex flex-wrap max-w-[700px] w-full gap-1 m-auto justify-center'>
                {desconfortos.map((desconforto) => (
                    <div className='w-[23%]' key={desconforto.id}>
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

            <h3 className='text-xl text-center font-medium my-5'>Qual a frequência dos sintomas?</h3>
            <div className='flex w-full justify-center gap-2'>
                {frequencias.map((frequencia) => (
                    <div key={frequencia.id}>
                        <input
                            type="radio"
                            id={frequencia.id}
                            name="frequencia"
                            value={frequencia.name}
                            className="radio-input"
                            checked={localData.frequencia === frequencia.name}
                            onChange={handleChange}
                        />
                        <label htmlFor={frequencia.id} className="radio-label">{frequencia.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
