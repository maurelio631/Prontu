import { useRef, useState } from "react";
import { Header } from "../components/Header";
import Wrapper from "../components/Wrapper";

import { FormPersonalDetails } from "../components/formSteps/formPersonalDetails";
import { FormUncomfortableAreas } from "../components/formSteps/formUncomfortableAreas";
import { FormSymptoms } from "../components/formSteps/formSymptoms";
import { FormMoreSymptoms } from "../components/formSteps/formMoreSymptoms";
import { confirmAlert, toastErrorAlert } from "../utils/Alerts";
import { isValidCPF, isValidDate, isValidEmail } from "../utils/ValidateFunctions";
import { Loading } from "../components/Loading";
import { useClinic } from "../utils/GetClinicContext";


export function SelfEvaluation() {
  const [step, setStep] = useState(1);
  const { loading, clinic } = useClinic();
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
    const { personalDetails, uncomfortableAreas, symptoms, moreSymptoms } = formData;
    const missingFields = [];

    if (!personalDetails.name) missingFields.push('Nome');
    if (!personalDetails.birth_date) missingFields.push('Data de Nascimento');
    if (!personalDetails.phone) missingFields.push('Telefone');
    if (!personalDetails.cpf) missingFields.push('CPF');
    if (!personalDetails.profession) missingFields.push('Profissão');
    if (!personalDetails.email) missingFields.push('Email');
    if (!personalDetails.how_know_us) missingFields.push('Como nos conheceu');

    if (!uncomfortableAreas.uncomfortableAreas) missingFields.push('Áreas de desconforto');

    if (!symptoms.description) missingFields.push('Descrição dos sintomas');
    if (!symptoms.cause) missingFields.push('Causa dos sintomas');
    if (!symptoms.discomforts || symptoms.discomforts.length === 0) missingFields.push('Desconfortos');
    if (!symptoms.frequency) missingFields.push('Frequência dos sintomas');

    if (!moreSymptoms.discomfortIncreases || moreSymptoms.discomfortIncreases.length === 0) missingFields.push('Aumentos de desconforto');
    if (!moreSymptoms.discomfortDecreases || moreSymptoms.discomfortDecreases.length === 0) missingFields.push('Diminuições de desconforto');


    if (missingFields.length > 5 ) {
      toastErrorAlert(`Preencha todos os campos obrigatórios!`);
    } else if (missingFields.length > 0) {
      toastErrorAlert(`Campos a serem preenchidos: ${missingFields.join(', ')}`);
    } else if (!isValidCPF(personalDetails.cpf)) {
      toastErrorAlert('CPF inválido!');
    } else if (!isValidEmail(personalDetails.email)) {
      toastErrorAlert('Email inválido!');
    } else if (!isValidDate(personalDetails.birth_date)) {
      toastErrorAlert('Data de nascimento inválida!');
    } else if (personalDetails.phone.length < 14){
      toastErrorAlert('Telefone inválido!');
    }else {
      confirmAlert("Auto-avaliação preenchida com sucesso!", "Concluir", "Editar auto-avaliação", submitForm, () => setStep(1));
    }
  }

  const submitForm = () => {
    console.log(formData);
  }

  return (
    loading ? <Loading/> : 
    (
      <Wrapper>
        <div className="w-screen bg-white dark:bg-dark-900">
            <Header subtitle={`Autoavaliação Prontuário de Atendimento de Quiropraxia`} clinicSettings={clinic} />
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
    )
  );
}