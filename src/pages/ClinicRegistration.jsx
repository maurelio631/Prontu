import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import logoLogin from "../assets/logoLogin.svg";
import { GoUpload } from "react-icons/go";
import { InputText } from "../components/InputText";
import axios from "axios";
import { toastErrorAlert } from "../utils/Alerts";
import Swal from "sweetalert2";

export function ClinicRegistration() {
    const [inputFileData, setInputFileData] = useState("");
    const [register, setRegister] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleFileName = (event) => {
        const files = Array.from(event.target.files);
        const fileData = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setInputFileData(fileData);
        changeRegister('logoClinic', fileData[0].url);
    };

    const changeRegister = (id, value) => {
        setRegister(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const formValidation = () => {
        if (
            !register.responsibleName ||
            !register.cpfCnpj ||
            !register.address ||
            !register.email ||
            !register.phone ||
            !register.password ||
            !register.passwordConfirm ||
            !register.nameClinic
        ) {
            toastErrorAlert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        if (register.password !== register.passwordConfirm) {
            toastErrorAlert("As senhas não coincidem.");
            return;
        }
        formSubmit(register);
    };

    const formSubmit = (data) => {
        setIsSubmitting(true);
        axios.post('http://localhost:3000/signup', data)
        .then(function (res) {
            let clinic = res.data.codeClinic;
            let msg = res.data.msg;

            Swal.fire({
                title: `${msg}`,
                text: `O código da sua clínica é ${clinic}`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate('/login');
            });
        })
        .catch(function (err) {
            toastErrorAlert(err.response.data.error);
        })
        .finally(() => {
            setIsSubmitting(false); 
        });
    };

    return (
        <main className={`flex w-full flex-col sm:flex-row h-screen`}>
            <div className="w-full py-10 sm:bg-azul-900 sm:p-0  sm:w-1/2 flex items-center justify-center">
                <img src={logoLogin} alt="logo" className="hidden sm:block" />
                <img src={logo} alt="logo" className="block sm:hidden" />
            </div>

            <div className="w-full bg-white dark:bg-dark-900 sm:w-1/2 flex items-center justify-center textSwitch">
                <form className="w-full max-w-[628px] flex flex-col gap-3 px-5">
                    <div>
                        <h2 className="text-4xl font-semibold text-center sm:text-left">Crie uma conta</h2>
                        <p className="text-center sm:text-left">Por favor, preencha os campos abaixo com as informações necessárias.</p>
                    </div>

                    <InputText InputId={"responsibleName"} labelName={'Nome completo:'} required={true} onChange={changeRegister} />

                    <div className="flex justify-between gap-10">
                        <InputText InputId={"cpfCnpj"} labelName={'CPF/CNPJ:'} required={true} onChange={changeRegister} />
                        <InputText InputId={"address"} labelName={'Endereço:'} required={true} onChange={changeRegister} />
                    </div>

                    <div className="flex justify-between gap-10">
                        <InputText InputId={"email"} labelName={'E-mail:'} required={true} onChange={changeRegister} />
                        <InputText InputId={"phone"} labelName={'Telefone:'} required={true} onChange={changeRegister} />
                    </div>

                    <div className="flex justify-between  gap-10">
                        <InputText InputId={"password"} password labelName={'Senha:'} required={true} onChange={changeRegister} />
                        <InputText InputId={"passwordConfirm"} password labelName={'Confirme sua senha:'} required={true} onChange={changeRegister} />
                    </div>

                    <hr className="my-3  border-black/40 dark:border-zinc-50/40" />

                    <div className="flex justify-between gap-10">
                        <InputText InputId={"nameClinic"} labelName={'Nome da clinica:'} required={true} onChange={changeRegister} />

                        <label htmlFor="logoClinic" className="font-medium w-1/2">
                            Logo da clínica
                            <label
                                htmlFor="logoClinic"
                                className="file-prontuario">
                                <GoUpload className="size-5 stroke-1 mr-3" />
                                {inputFileData.length === 0 ? 'Subir Imagem' : inputFileData[0].name}
                            </label>
                            <input
                                type="file"
                                id="logoClinic"
                                name="logoClinic"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileName}
                            />
                        </label>
                    </div>

                    <div className="flex flex-col gap-3 items-center  sm:gap-0 sm:flex-row sm:justify-end">
                        <button
                            onClick={formValidation}
                            type="button"
                            className={`bg-azul-900 text-white min-w-20 rounded-lg py-2.5 px-5 font-medium ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-azul-900/70'}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
