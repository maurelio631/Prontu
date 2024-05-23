import { useState, useEffect } from "react";
import { cabecaPescoco, cardioVascular, desconfortoAumenta, desconfortoDiminui, estadoGeral, gastroIntestinal, genitoUrinário, toraxRespiratorio } from '../../data/arraySintomas';
import './defaultForms.css';

export function FormMoreSymptoms({ data, onDataChange }) {
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
        <div className="text-base font-medium">
            <div className="flex flex-col items-center lg:flex-row lg:justify-between">
                <div className="w-full  lg:w-[47%]">
                    <h3 className="font-medium my-5 text-xl text-center ">
                        O desconforto aumenta com:<br />
                        (selecione todas as opções compatíveis)
                    </h3>
                    <div className="flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:flex-wrap">
                        {desconfortoAumenta.map((desconforto) => (
                            <div key={desconforto.id} className='w-full sm:w-[24%] text-xs sm:text-sm'>
                                <input
                                    type="checkbox"
                                    id={desconforto.id}
                                    name='desconfortoAumenta'
                                    value={desconforto.name}
                                    className="radio-input"
                                    checked={(localData.desconfortoAumenta || []).includes(desconforto.name)}
                                    onChange={handleChange}
                                />
                                <label htmlFor={desconforto.id} className="radio-label">{desconforto.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-[47%]">
                    <h3 className="font-medium my-5 text-xl text-center">
                        O desconforto diminui com:<br />
                        (selecione todas as opções compatíveis)
                    </h3>
                    <div className="flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:flex-wrap">
                        {desconfortoDiminui.map((desconforto) => (
                            <div key={desconforto.id} id={`ajusteInput${desconforto.id}`} className='w-full sm:w-[24%] text-xs sm:text-sm'>
                                <input
                                    type="checkbox"
                                    id={desconforto.id}
                                    name='desconfortoDiminui'
                                    value={desconforto.name}
                                    className="radio-input"
                                    checked={(localData.desconfortoDiminui || []).includes(desconforto.name)}
                                    onChange={handleChange}
                                />
                                <label htmlFor={desconforto.id} className="radio-label">{desconforto.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <h2 className='text-center font-medium mt-9 text-xl md:text-2xl '>Selecione as informações sobre sua saúde em geral e qualidade de vida:</h2>

            <div className='flex flex-col items-center min-[860px]:items-stretch min-[860px]:flex-row min-[860px]:justify-between'>
                
                <div className='w-full min-[860px]:w-[19%]'>
                    <h3 className='text-base text-center font-medium mt-9'>Estado Geral</h3>
                    {estadoGeral.map((estado) => (
                        <div key={estado.id} className='text-sm text-center mb-2'>
                            <input
                                type="checkbox"
                                id={estado.id}
                                name='estadoGeral'
                                value={estado.name}
                                className="radio-input"
                                checked={(localData.estadoGeral || []).includes(estado.name)}
                                onChange={handleChange}
                            />
                            <label htmlFor={estado.id} className="radio-label">{estado.name}</label>
                        </div>
                    ))}
                </div>

                <div className='w-full min-[860px]:w-[19%]'>
                    <h3 className='text-base text-center font-medium mt-9'>Cabeça e Pescoço</h3>
                    {cabecaPescoco.map((estado) => (
                        <div key={estado.id} className='text-sm text-center mb-2'>
                            <input
                                type="checkbox"
                                id={estado.id}
                                name='cabecaPescoco'
                                value={estado.name}
                                className="radio-input"
                                checked={(localData.cabecaPescoco || []).includes(estado.name)}
                                onChange={handleChange}
                            />
                            <label htmlFor={estado.id} className="radio-label">{estado.name}</label>
                        </div>
                    ))}
                </div>

                <div className='w-full min-[860px]:w-[19%]'>
                    <h3 className='text-base text-center font-medium mt-9'>Tórax/Respiratório</h3>
                    {toraxRespiratorio.map((estado) => (
                        <div key={estado.id} className='text-sm text-center mb-2'>
                            <input
                                type="checkbox"
                                id={estado.id}
                                name='toraxRespiratorio'
                                value={estado.name}
                                className="radio-input"
                                checked={(localData.toraxRespiratorio || []).includes(estado.name)}
                                onChange={handleChange}
                            />
                            <label htmlFor={estado.id} className="radio-label">{estado.name}</label>
                        </div>
                    ))}
                </div>

                <div className='w-full min-[860px]:w-[19%]'>
                    <h3 className='text-base text-center font-medium mt-9'>Cardio-Vascular</h3>
                    {cardioVascular.map((estado) => (
                        <div key={estado.id} className='text-sm text-center mb-2'>
                            <input
                                type="checkbox"
                                id={estado.id}
                                name='cardioVascular'
                                value={estado.name}
                                className="radio-input"
                                checked={(localData.cardioVascular || []).includes(estado.name)}
                                onChange={handleChange}
                            />
                            <label htmlFor={estado.id} className="radio-label">{estado.name}</label>
                        </div>
                    ))}

                    <div>
                        <h3 className='text-base text-center font-medium mt-9'>Gastro-Intestinal</h3>
                        {gastroIntestinal.map((estado) => (
                            <div key={estado.id} className='text-sm text-center mb-2'>
                                <input
                                    type="checkbox"
                                    id={estado.id}
                                    name='gastroIntestinal'
                                    value={estado.name}
                                    className="radio-input"
                                    checked={(localData.gastroIntestinal || []).includes(estado.name)}
                                    onChange={handleChange}
                                />
                                <label htmlFor={estado.id} className="radio-label">{estado.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='w-full min-[860px]:w-[19%]'>
                    <h3 className='text-base text-center font-medium mt-9'>Gênito-Urinário</h3>
                    {genitoUrinário.map((estado) => (
                        <div key={estado.id} className='text-sm text-center mb-2'>
                            <input
                                type="checkbox"
                                id={estado.id}
                                name='genitoUrinário'
                                value={estado.name}
                                className="radio-input"
                                checked={(localData.genitoUrinário || []).includes(estado.name)}
                                onChange={handleChange}
                            />
                            <label htmlFor={estado.id} className="radio-label">{estado.name}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
