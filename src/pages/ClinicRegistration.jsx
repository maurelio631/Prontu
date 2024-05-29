import { useState } from "react";
import logoLogin from "../assets/logoLogin.svg";
import logo from "../assets/logo.svg";

import { GoUpload } from "react-icons/go";
import { InputText } from "../components/InputText";

export function ClinicRegistration() {

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
        <main className="flex w-full flex-col sm:flex-row h-screen">
            <div className="w-full py-10 sm:bg-azul-principal sm:p-0  sm:w-1/2 flex items-center justify-center">
                <img src={logoLogin} alt="logo" className="hidden sm:block" />
                <img src={logo} alt="logo" className="block sm:hidden" />
            </div>

            <div className="w-full sm:w-1/2 flex items-center justify-center">
                <form className="w-full max-w-[628px] flex flex-col gap-3 px-5">
                    <div>
                        <h2 className="text-4xl font-semibold text-center sm:text-left">Crie uma conta</h2>
                        <p className="text-center sm:text-left">Por favor, preencha os campos abaixo com as informações necessárias.</p>
                    </div>

                    <InputText InputId={"nome"} labelName={'Nome completo:'} required={true} onChange={changeRegister} />


                    <div className="flex justify-between gap-10">
                        <InputText InputId={"dataNascimento"} labelName={'Data de Nascimento:'} required={true} onChange={changeRegister} />
                        <InputText InputId={"CNPJ"} labelName={'CPF/CNPJ:'} required={true} onChange={changeRegister} />
                    </div>

                    <InputText InputId={"endereco"} labelName={'Endereço:'} required={true} onChange={changeRegister} />

                    <div className="flex justify-between gap-10">
                        <InputText InputId={"email"} labelName={'E-mail:'} required={true} onChange={changeRegister} />
                        <InputText InputId={"tel"} labelName={'Telefone:'} required={true} onChange={changeRegister} />
                    </div>

                    <hr className="my-3 border-black/40"/>

                    <div className="flex justify-between gap-10">
                        <InputText InputId={"nomeClinica"} labelName={'Nome da clinica:'} required={true} onChange={changeRegister} />

                        <label htmlFor="logoEmpresa" className="font-medium w-1/2">
                            Logo da clínica
                            <label 
                                htmlFor="logoEmpresa" 
                                className="flex items-center justify-center text-gray-500 bg-[#F6FAFD] border-dashed border-2 border-[#e0e0e0] rounded-lg p-2 w-full mt-2 cursor-pointer">
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

                    <div className="flex flex-col gap-3 items-center  sm:gap-0 sm:flex-row sm:justify-between">
                        <button type="button" className="border-2 border-azul-principal text-azul-principal rounded-lg py-2 px-4  hover:bg-azul-principal hover:text-white">
                            voltar
                        </button>

                        <button type="button" className="bg-azul-principal text-white w-20 rounded-lg py-2  hover:bg-azul-principal/70">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}