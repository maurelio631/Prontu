import { useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useClinic } from "../context/GetClinicContext";

import { Header } from "../components/Header";
import Wrapper from "../components/Wrapper";
import { Loading } from "../components/Loading";
import { FormPersonalDetails } from "../components/formSteps/formPersonalDetails";
import { FormUncomfortableAreas } from "../components/formSteps/formUncomfortableAreas";
import { FormSymptoms } from "../components/formSteps/formSymptoms";
import { FormMoreSymptoms } from "../components/formSteps/formMoreSymptoms";

import { confirmAlert, toastErrorAlert, toastSuccessAlert } from "../utils/Alerts";
import { isValidCPF, isValidDate, isValidEmail } from "../utils/ValidateFunctions";





export function SelfEvaluation() {
  const [step, setStep] = useState(1);
  const { loading, setLoading, clinic } = useClinic();
  const [loadingForm, setLoadingForm] = useState(false);
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

  const submitForm = async () => {
    try {
      setLoadingForm(true);
      const res = await axios.post(`http://localhost:3000/registerSelfEvaluation/${clinic.idClinic}`, formData);
      Swal.fire("Salvo com sucesso!", "", "success");
      clearFormData();
    } catch (err) {
      toastErrorAlert(err.response.data.error);
    } finally {
      setLoadingForm(false);
    }
  }

  const clearFormData = () => {
    setFormData({
      personalDetails: {},
      uncomfortableAreas: {},
      symptoms: {},
      moreSymptoms: {}
    });
  }

  return (
    loading ? <Loading /> : (
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
                className={`w-full rounded-md text-white py-2 max-w-20 text-base min-[470px]:text-lg 
                ${step === 4 ? 'bg-verde-900' : 'bg-azul-900'} 
                ${loadingForm ? 'min-[470px]:max-w-40 bg-verde-900/50 cursor-not-allowed' : step === 4 ? 'min-[470px]:max-w-32' : 'min-[470px]:max-w-32 bg-azul-900'}`}
                onClick={concluiStep}
              >
                {loadingForm ? (
                  <span className="flex justify-center">
                    Cadastrando
                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white ml-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </span>
                ) : (
                  step === 4 ? 'Concluir' : 'Próximo'
                )}
              </button>
            </div>
          </main>
        </div>
      </Wrapper>
    )
  );
}