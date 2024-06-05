import { useState } from "react";
import { Header } from "../components/Header";
import Wrapper from "../components/Wrapper";
import { FormPersonalDetails } from "../components/formSteps/formPersonalDetails";

export function PreRegistration(){

    const [formData, setFormData] = useState({
        personalDetails: {},
    });

    const handleDataChange = (step, data) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [step]: data
        }));
    };

    const handleSubmit = () =>{
        console.log(formData)
    }

    return (
        <Wrapper>
            <div className="w-screen">
                <Header subtitle={`Pré-cadastro - Prontuário de Atendimento de Quiropraxia`} />
                

                <main className="p-9 flex flex-col justify-between relative min-h-[calc(100vh-162px)] min-[470px]:min-h-[calc(100vh-160px)]">
                    <form action="" className="overflow-y-auto min-[470px]:max-h-[calc(100vh-280px)]">
                        <FormPersonalDetails data={formData.personalDetails} onDataChange={(data) => handleDataChange('personalDetails', data)} />
                    </form>

                    <div className="flex w-full flex-row justify-between pt-3 gap-0">
                        <a
                            className={`w-full rounded-md text-azul-principal py-2 max-w-20 text-base min-[470px]:text-lg min-[470px]:max-w-32 bg-white  border border-azul-principal text-center`}
                        >
                            Cancelar
                        </a>

                        <button
                            onClick={handleSubmit}
                            className={`w-full rounded-md  text-white py-2 max-w-20 text-base min-[470px]:text-lg min-[470px]:max-w-32 bg-verde-claro`}
                        >
                            Concluir
                        </button>
                    </div>
                </main>
            </div>
        </Wrapper>
    )
}