import { useRef, useState } from "react";
import { Header } from "../components/Header";
import Wrapper from "../components/Wrapper";

import { FormPersonalDetails } from "../components/formSteps/formPersonalDetails";
import { FormUncomfortableAreas } from "../components/formSteps/formUncomfortableAreas";
import { FormSymptoms } from "../components/formSteps/formSymptoms";
import { FormMoreSymptoms } from "../components/formSteps/formMoreSymptoms";
import { confirmAlert, toastErrorAlert } from "../utils/Alerts";


export function SelfEvaluation() {
  const [step, setStep] = useState(1);
  const sectionScroll = useRef(null);

  const [formData, setFormData] = useState({
    personalDetails: {},
    uncomfortableAreas: {},
    symptoms: {},
    moreSymptoms: {}
  });

  const handleDataChange = (step, data) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [step]: data
    }));
  };

  const getCompStep = () => {
    switch (step) {
      case 1:
        return <FormPersonalDetails data={formData.personalDetails} onDataChange={(data) => handleDataChange('personalDetails', data)} />;
      case 2:
        return <FormUncomfortableAreas setFormData={setFormData} />;
      case 3:
        return <FormSymptoms data={formData.symptoms} onDataChange={(data) => handleDataChange('symptoms', data)} />;
      case 4:
        return <FormMoreSymptoms data={formData.moreSymptoms} onDataChange={(data) => handleDataChange('moreSymptoms', data)} />;
      default:
        return <FormPersonalDetails data={formData.personalDetails} onDataChange={(data) => handleDataChange('personalDetails', data)} />;
    }
  };


  const scrollToTop = () => {
    if (sectionScroll.current) {
      sectionScroll.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const concluiStep = () => {
    if (step !== 4) {
      setStep(step + 1);
      scrollToTop();
    } else {
      validationForm();
    }
  };

  const retornaStep = () => {
    setStep(step - 1);
    scrollToTop();
  };

  const validationForm = () => {
    if (  
        !formData.personalDetails.name || 
        !formData.personalDetails.birth_date  || 
        !formData.personalDetails.phone ||
        !formData.personalDetails.cpf ||
        !formData.personalDetails.profession ||
        !formData.personalDetails.email ||
        !formData.personalDetails.how_know_us ||

        !formData.uncomfortableAreas.uncomfortableAreas ||

        !formData.symptoms.description ||
        !formData.symptoms.cause ||
        !formData.symptoms.discomforts.length ||
        !formData.symptoms.frequency  ||

        !formData.moreSymptoms.discomfortIncreases.length ||
        !formData.moreSymptoms.discomfortDecreases.length    
      ) {
        console.log(formData);
      toastErrorAlert('Preencha todos os campos do formulário!');
    }else {
      confirmAlert("Auto-avaliação preenchida com sucesso!", "Concluir", "Editar auto-avaliação", submitForm, () => setStep(1));
    }

    
  }

  const submitForm = () => {
    console.log(formData);
  }

  return (
    <Wrapper>
      <div className="w-screen bg-white dark:bg-dark-900">
        <Header subtitle={`Autoavaliação Prontuário de Atendimento de Quiropraxia`}/>
        <main className="p-9 flex flex-col justify-between relative min-h-[calc(100vh-162px)] min-[470px]:min-h-[calc(100vh-160px)]">
          <form ref={sectionScroll} className="overflow-y-auto min-[470px]:max-h-[calc(100vh-280px)]">
            {getCompStep()}
          </form>

          <div className="flex w-full flex-row justify-between pt-3 gap-0">
            <button
              className={`w-full rounded-md py-2 max-w-20 text-base min-[470px]:text-lg min-[470px]:max-w-32 ${step === 1 ? 'bg-gray-500/20 cursor-not-allowed text-white' : 'bg-transparent text-azul-900 border border-azul-900'}`}
              onClick={retornaStep}
              disabled={step === 1}
            >
              Voltar
            </button>

            <button
              className={`w-full text-white rounded-md py-2 max-w-20 text-base min-[470px]:text-lg min-[470px]:max-w-32 ${step === 4 ? 'bg-verde-900' : 'bg-azul-900'}`}
              onClick={concluiStep}
            >
              {step === 4 ? 'Concluir' : 'Próximo'}
            </button>
          </div>
        </main>
      </div>
    </Wrapper>
  );
}

