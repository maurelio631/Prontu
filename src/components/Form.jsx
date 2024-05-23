import { useState } from "react"
import { ViewStep } from "./ViewStep";

import { FormPersonalDetails } from "./formSteps/formPersonalDetails";
import { FormUncomfortableAreas } from "./formSteps/formUncomfortableAreas";
import { FormSymptoms } from "./formSteps/formSymptoms";
import { FormMoreSymptoms } from "./formSteps/formMoreSymptoms";
import Swal from "sweetalert2";

export function Form() {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        personalDetails: {},
        uncomfortableAreas: {},
        symptoms: {},
        moreSymptoms: {}
    });

    const getCompStep = () => {
        switch (step) {
            case 1:
                return <FormPersonalDetails data={formData.personalDetails} onDataChange={(data) => handleDataChange('personalDetails', data)} />;
            case 2:
                return <FormUncomfortableAreas setFormData={setFormData}/>;
            case 3:
                return <FormSymptoms data={formData.symptoms} onDataChange={(data) => handleDataChange('symptoms', data)} />;
            case 4:
                return <FormMoreSymptoms data={formData.moreSymptoms} onDataChange={(data) => handleDataChange('moreSymptoms', data)} />;
            default:
                return <FormPersonalDetails data={formData.personalDetails} onDataChange={(data) => handleDataChange('personalDetails', data)} />;
        }
    }

    const concluiStep = ()=>{
        if (step !== 4) {
            setStep(step + 1)
        } else(
            Swal.fire({
                title: "Auto-avaliação preenchida com sucesso!",
                confirmButtonText: "Concluir",
                showDenyButton: true,
                denyButtonText: `Editar auto-avaliação`,

            }).then((result) => {
                if (result.isConfirmed) {
                    
                    Swal.fire("Saved!", "", "success");
                    console.log(formData)
                } else if (result.isDenied) {
                   setStep(1)
                }
            })
        )
    }

    const retornaStep = () => {
        setStep(step - 1)
    }

    const handleDataChange = (step, data) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [step]: data
        }));
    };

    return (
        <main className="p-9 flex flex-col justify-between relative min-h-[calc(100vh-162px)] min-[470px]:min-h-[calc(100vh-142px)]">

            <form className="overflow-y-auto min-[470px]:max-h-[calc(100vh-270px)]">
                {getCompStep()}
            </form>

            <div className="flex w-full flex-row justify-between pt-3 gap-0">
                <button
                    className={`w-full text-white rounded-md py-2 max-w-20 text-base min-[470px]:text-lg min-[470px]:max-w-32  ${step === 1  ? 'bg-gray-500/50 cursor-not-allowed' : 'bg-azul-principal'}`}
                    onClick={() => retornaStep()}
                    disabled={step === 1}
                >
                    Voltar
                </button>

                <ViewStep step={step} />

                <button
                    className={`w-full text-white rounded-md py-2 max-w-20 text-base min-[470px]:text-lg min-[470px]:max-w-32  ${step === 4 ? 'bg-verde-claro' : 'bg-azul-principal'}`}
                    onClick={() => concluiStep()}
                >
                    {step === 4 ? 'Concluir' : 'Próximo'}
                </button>
            </div>
        </main>
    )
}