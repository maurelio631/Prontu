import { cabecaPescoco, cardioVascular, desconfortoAumenta, desconfortoDiminui, estadoGeral, gastroIntestinal, genitoUrinário, toraxRespiratorio } from '../../data/arraySintomas';
import './defaultForms.css';

export function FormMoreSymptoms() {

    
    return (
        <div className="text-base font-medium ">
            <div className="flex justify-between">
                <div className="w-[47%] ">
                    <h3 className="text-xl text-center font-medium my-5">
                        O desconforto aumenta com:<br />
                        (selecione todas as opções compatíveis)
                    </h3>
                    <div className="flex flex-wrap gap-1 justify-center">
                        {desconfortoAumenta.map((desconforto) => (
                            <div key={desconforto.id} className='w-[24%] text-sm'>
                                <input
                                    type="checkbox"
                                    id={desconforto.id}
                                    name='desconfortoAumenta'
                                    value={desconforto.name}
                                    className="radio-input"
                                />
                                <label htmlFor={desconforto.id} className="radio-label">{desconforto.name}</label>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="w-[47%]">
                    <h3 className="text-xl text-center font-medium my-5">
                        O desconforto diminui com:<br />
                        (selecione todas as opções compatíveis)
                    </h3>
                    <div className="flex flex-wrap gap-1 justify-center">
                        {desconfortoDiminui.map((desconforto) => (
                            <div key={desconforto.id} id={`ajusteInput${desconforto.id}`} className='w-[24%] text-sm'>
                                <input
                                    type="checkbox"
                                    id={desconforto.id}
                                    name='desconfortoAumenta'
                                    value={desconforto.name}
                                    className="radio-input"
                                />
                                <label htmlFor={desconforto.id} className="radio-label">{desconforto.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <h2 className='text-2xl text-center font-medium mt-9'>Selecione as informações sobre sua saúde em geral e qualidade de vida:</h2>

            <div className='flex justify-between'>
                <div className='w-[19%]'>
                    <h3 className='text-base text-center font-medium mt-9'>Estado Geral</h3>
                        {estadoGeral.map((estado) => (
                            <div key={estado.id} className='text-sm mb-2'>
                                <input
                                    type="checkbox"
                                    id={estado.id}
                                    name='estadoGeral'
                                    value={estado.name}
                                    className="radio-input"
                                />
                                <label htmlFor={estado.id} className="radio-label">{estado.name}</label>
                            </div>
                        ))}
                </div>

                <div className='w-[19%]'>
                    <h3 className='text-base text-center font-medium mt-9'>Cabeça e Pescoço</h3>
                        {cabecaPescoco.map((estado) => (
                            <div key={estado.id} className='text-sm mb-2'>
                                <input
                                    type="checkbox"
                                    id={estado.id}
                                    name='cabecaPescoco'
                                    value={estado.name}
                                    className="radio-input"
                                />
                                <label htmlFor={estado.id} className="radio-label">{estado.name}</label>
                            </div>
                        ))}
                </div>
                
                <div className='w-[19%]'>
                    <h3 className='text-base text-center font-medium mt-9'>Tórax/Respiratório</h3>
                        {toraxRespiratorio.map((estado) => (
                            <div key={estado.id} className='text-sm mb-2'>
                                <input
                                    type="checkbox"
                                    id={estado.id}
                                    name='toraxRespiratorio'
                                    value={estado.name}
                                    className="radio-input"
                                />
                                <label htmlFor={estado.id} className="radio-label">{estado.name}</label>
                            </div>
                        ))}
                </div>

                <div className='w-[19%]'>
                    <h3 className='text-base text-center font-medium mt-9'>Cardio-Vascular</h3>
                        {cardioVascular.map((estado) => (
                            <div key={estado.id} className='text-sm mb-2'>
                                <input
                                    type="checkbox"
                                    id={estado.id}
                                    name='estadoGeral'
                                    value={estado.name}
                                    className="radio-input"
                                />
                                <label htmlFor={estado.id} className="radio-label">{estado.name}</label>
                            </div>
                        ))}

                    <div> 
                        <h3 className='text-base text-center font-medium mt-9'>Cardio-Vascular</h3>
                            {gastroIntestinal.map((estado) => (
                                <div key={estado.id} className='text-sm mb-2'>
                                    <input
                                        type="checkbox"
                                        id={estado.id}
                                        name='estadoGeral'
                                        value={estado.name}
                                        className="radio-input"
                                    />
                                    <label htmlFor={estado.id} className="radio-label">{estado.name}</label>
                                </div>
                            ))}
                    </div>
                </div>

                <div className='w-[19%]'>
                    <h3 className='text-base text-center font-medium mt-9'>Gênito-Urinário</h3>
                        {genitoUrinário.map((estado) => (
                            <div key={estado.id} className='text-sm mb-2'>
                                <input
                                    type="checkbox"
                                    id={estado.id}
                                    name='estadoGeral'
                                    value={estado.name}
                                    className="radio-input"
                                />
                                <label htmlFor={estado.id} className="radio-label">{estado.name}</label>
                            </div>
                        ))}
                </div>
            </div>


       </div>
    )
}