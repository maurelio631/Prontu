import { useState } from "react";
import logo from "../assets/logo.svg";
import logoLogin from "../assets/logoLogin.svg";


import { GoUpload } from "react-icons/go";
import { InputText } from "../components/InputText";
import { useDarkMode } from "../utils/DarkModeContext";

export function ClinicRegistration() {
    const { darkMode } = useDarkMode();

    const [inputFileData, setInputFileData] = useState("");
    const [register, setRegister] = useState({})

    const handleFileName = (event) => {
        const files = Array.from(event.target.files);
        const fileData = files.map(file => ({
            name: file.name
        }));
        setInputFileData(fileData);
        changeRegister('logoEmpresa', fileData)
    }
    const changeRegister = (id, value) => {
        setRegister(prevData => ({
            ...prevData,
            [id]: value,
        }));
        console.log(register)
    };

    return (
        <main className={`flex w-full flex-col sm:flex-row h-screen ${darkMode && 'dark'}`}>
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

                    <InputText InputId={"nome"} labelName={'Nome completo:'} required={true} onChange={changeRegister} />

                    <div className="flex justify-between gap-10">
                        <InputText InputId={"CNPJ"} labelName={'CPF/CNPJ:'} required={true} onChange={changeRegister} />
                        <InputText InputId={"endereco"} labelName={'Endereço:'} required={true} onChange={changeRegister} />
                    </div>

                    <div className="flex justify-between gap-10">
                        <InputText InputId={"email"} labelName={'E-mail:'} required={true} onChange={changeRegister} />
                        <InputText InputId={"tel"} labelName={'Telefone:'} required={true} onChange={changeRegister} />
                    </div>

                    <div className="flex justify-between  gap-10">
                        <InputText InputId={"password"} labelName={'Senha:'} required={true} onChange={changeRegister} />
                        <InputText InputId={"passwordConfirm"} labelName={'Confirme sua senha:'} required={true} onChange={changeRegister} />
                    </div>

                    <hr className="my-3  border-black/40 dark:border-zinc-50/40"/>

                    <div className="flex justify-between gap-10">
                        <InputText InputId={"nomeClinica"} labelName={'Nome da clinica:'} required={true} onChange={changeRegister} />

                        <label htmlFor="logoEmpresa" className="font-medium w-1/2">
                            Logo da clínica
                            <label 
                                htmlFor="logoEmpresa" 
                                className="file-prontuario">
                                    <GoUpload className="size-5 stroke-1 mr-3"/> 
                                    {inputFileData.length === 0 ? 'Subir Imagem' : inputFileData[0].name}
                            </label>
                            <input
                                type="file"
                                id="logoEmpresa"
                                name="logoEmpresa"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileName}
                            />
                        </label>
                    </div>

                    <div className="flex flex-col gap-3 items-center  sm:gap-0 sm:flex-row sm:justify-end">
                        {/* <button type="button" className="border-2 border-azul-900 text-azul-900 rounded-lg py-2 px-4 font-medium">
                            Voltar
                        </button> */}

                        <button type="button" className="bg-azul-900 text-white min-w-20 rounded-lg py-2.5 px-5 hover:bg-azul-900/70 font-medium">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}