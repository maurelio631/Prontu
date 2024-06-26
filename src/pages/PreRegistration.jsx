import { useState } from "react";
import { Header } from "../components/Header";
import Wrapper from "../components/Wrapper";
import { FormPersonalDetails } from "../components/formSteps/formPersonalDetails";
import { Link } from "react-router-dom";
import { confirmAlert, toastErrorAlert } from "../utils/Alerts";
import { useUser } from "../utils/UserContext";
import { Loading } from "../components/Loading";
import axios from "axios";
import { isValidCPF, isValidDate, isValidEmail } from "../utils/ValidateFunctions";
import Swal from "sweetalert2";

export function PreRegistration() {

    const { refreshTokenFunc, token} = useUser();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        personalDetails: {},
    });

    const handleDataChange = (step, data) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [step]: data
        }));
    };

    const validationForm = () => {
        const { personalDetails } = formData;

        if (!personalDetails.name ||
            !personalDetails.birth_date ||
            !personalDetails.phone ||
            !personalDetails.cpf ||
            !personalDetails.profession ||
            !personalDetails.email ||
            !personalDetails.how_know_us) {
            toastErrorAlert(`Preencha todos os campos obrigatórios!`);
        } else if (!isValidCPF(personalDetails.cpf)) {
            toastErrorAlert('CPF inválido!');
        } else if (!isValidEmail(personalDetails.email)) {
            toastErrorAlert('Email inválido!');
        } else if (!isValidDate(personalDetails.birth_date)) {
            toastErrorAlert('Data de nascimento inválida!');
        } else if (personalDetails.phone.length < 14) {
            toastErrorAlert('Telefone inválido!');
        } else {
            submitForm(token)
        }
    }

    const submitForm = async (token) => {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3000/registerPatient', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            Swal.fire("Salvo com sucesso!", "", "success");
            clearFormData();
        } catch (err) {
            if (err.response && err.response.status === 401) {
                const newAccessToken = await refreshTokenFunc();
                if (newAccessToken) {
                    await submitForm(newAccessToken);
                } else {
                    toastErrorAlert('Erro ao renovar o token. Faça login novamente.');
                }
            } else if (err.response && err.response.status === 400) {
                toastErrorAlert(err.response.data.error || 'Erro de validação');
            } else {
                toastErrorAlert(err.response?.data?.error || 'Erro ao salvar os dados do paciente');
            }
        } finally {
            setLoading(false);
        }
    };


    const clearFormData = () => {
        setFormData({
            personalDetails: {},
        });
    }

    return (
            <Wrapper>
                <div className="w-screen bg-white dark:bg-dark-900">
                    <Header subtitle={`Pré-cadastro - Prontuário de Atendimento de Quiropraxia`} />


                    <main className="p-9 flex flex-col justify-between relative min-h-[calc(100vh-162px)] min-[470px]:min-h-[calc(100vh-160px)]">
                        <form action="" className="overflow-y-auto min-[470px]:max-h-[calc(100vh-280px)]">
                            <FormPersonalDetails data={formData.personalDetails} onDataChange={(data) => handleDataChange('personalDetails', data)} />
                        </form>

                        <div className="flex w-full flex-row justify-between pt-3 gap-0">
                            <Link to={'/home/pacientes'}
                                className={`w-full rounded-md bg-transparent text-azul-900 py-2 max-w-20 text-base min-[470px]:text-lg min-[470px]:max-w-32 border border-azul-900 text-center`}
                            >
                                Cancelar
                            </Link>

                            <button
                                onClick={validationForm}
                                disabled={loading}
                                className={`w-full rounded-md text-white py-2 max-w-20 text-base min-[470px]:text-lg  ${loading ? 'min-[470px]:max-w-40 bg-verde-900/50 cursor-not-allowed' : 'min-[470px]:max-w-32 bg-verde-900'}`}
                            >
                            
                            {loading 
                                ? (
                                    <span className="flex justify-center">  
                                        Cadastrando
                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white ml-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    </span>
                                )
                                :'Concluir'
                            }   

                            </button>
                        </div>
                    </main>
                </div>
            </Wrapper>
    )
}
