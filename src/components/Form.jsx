import { useState } from "react"
import { ViewStep } from "./ViewStep";

import { FormPersonalDetails } from "./formSteps/formPersonalDetails";
import { FormUncomfortableAreas } from "./formSteps/formUncomfortableAreas";
import { FormSymptoms } from "./formSteps/formSymptoms";
import { FormMoreSymptoms } from "./formSteps/formMoreSymptoms";

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
                return <FormUncomfortableAreas data={formData.uncomfortableAreas} onDataChange={(data) => handleDataChange('uncomfortableAreas', data)} />;
            case 3:
                return <FormSymptoms data={formData.symptoms} onDataChange={(data) => handleDataChange('symptoms', data)} />;
            case 4:
                return <FormMoreSymptoms data={formData.moreSymptoms} onDataChange={(data) => handleDataChange('moreSymptoms', data)} />;
            default:
                return <FormPersonalDetails data={formData.personalDetails} onDataChange={(data) => handleDataChange('personalDetails', data)} />;
        }
    }

    const handleDataChange = (step, data) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [step]: data
        }));
    };

    return (
        <main className="p-9 flex flex-col justify-between relative min-h-[calc(100vh-142px)]">

            <form className="max-h-[calc(100vh-270px)] overflow-y-auto ">
                {getCompStep()}
            </form>

            <div className="w-full flex flex-col justify-between pt-3 md:flex-row">
                <button
                    className={`text-lg text-white py-2 w-full max-w-32 rounded-md ${step === 1 ? 'bg-gray-500/50 cursor-not-allowed' : 'bg-azul-principal'}`}
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1}
                >
                    Voltar
                </button>

                <ViewStep step={step} />

                <button
                    className={`text-lg text-white py-2 w-full max-w-32 rounded-md ${step === 4 ? 'bg-verde-claro' : 'bg-azul-principal'}`}
                    onClick={() => step !== 4 && setStep(step + 1)}
                >
                    {step === 4 ? 'Concluir' : 'Próximo'}
                </button>
            </div>
        </main>
    )
}