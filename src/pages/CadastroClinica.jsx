import { useState } from "react";
import logoLogin from "../assets/logoLogin.svg";
import logo from "../assets/logo.svg";

import { GoUpload } from "react-icons/go";

export function CadastroClinica() {

    const [inputData, setInputData] = useState("");
    const [type, setType] = useState('password');


    const handleToggle = () => {
        if (type === 'password') {
            setType('text')
            setIconPass(false)
        } else {
            setIconPass(true)
            setType('password')
        }
    }

    const handleFileName = (event) => {
        const files = Array.from(event.target.files);
        const fileData = files.map(file => ({
            name: file.name
        }));
        setInputData(fileData);
    }

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

                    <label htmlFor="nome" className="font-medium">
                        <b className="text-vermelho">*</b>Nome completo:
                        <input 
                            type="text" 
                            id="nome" 
                            name="nome" 
                            className="w-full bg-[#F6FAFD] border border-[#e0e0e0] rounded-lg p-2 outline-none hover:border-azul-principal mt-2" 
                        />
                    </label>

                    <div className="flex justify-between gap-10">
                        <label htmlFor="dataNascimento"  className="font-medium w-1/2">
                            <b className="text-vermelho">*</b> Data de Nascimento:
                            <input 
                                type="text" 
                                id="dataNascimento" 
                                name="dataNascimento" 
                                className="w-full bg-[#F6FAFD] border border-[#e0e0e0] rounded-lg p-2 outline-none hover:border-azul-principal mt-2"
                            />
                        </label>

                        <label htmlFor="CNPJ"  className="font-medium w-1/2">
                            <b className="text-vermelho">*</b> CPF/CNPJ:
                            <input 
                                type="text" 
                                id="CNPJ" 
                                name="CNPJ" 
                                className="w-full bg-[#F6FAFD] border border-[#e0e0e0] rounded-lg p-2 outline-none hover:border-azul-principal mt-2"
                            />
                        </label>
                    </div>

                    <label htmlFor="endereco" className="font-medium">
                        <b className="text-vermelho">*</b> Endereço:
                        <input 
                            type="text" 
                            id="endereco" 
                            name="endereco" 
                            className="w-full bg-[#F6FAFD] border border-[#e0e0e0] rounded-lg p-2 outline-none hover:border-azul-principal mt-2" 
                        />
                    </label>

                    <div className="flex justify-between gap-10">
                        <label htmlFor="email" className="font-medium w-1/2">
                            <b className="text-vermelho">*</b> E-mail:
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="w-full bg-[#F6FAFD] border border-[#e0e0e0] rounded-lg p-2 outline-none hover:border-azul-principal mt-2"
                            />
                        </label>

                        <label htmlFor="tel" className="font-medium w-1/2">
                            <b className="text-vermelho">*</b> Telefone:
                            <input
                                type="text"
                                id="tel"
                                name="tel"
                                className="w-full bg-[#F6FAFD] border border-[#e0e0e0] rounded-lg p-2 outline-none hover:border-azul-principal mt-2"
                            />
                        </label>
                    </div>

                    <hr className="my-3 border-black/40"/>

                    <div className="flex justify-between gap-10">
                        <label htmlFor="nomeClinica" className="font-medium w-1/2">
                            <b className="text-vermelho">*</b> Nome da clinica:
                            <input
                                type="text"
                                id="nomeClinica"
                                name="nomeClinica"
                                className="w-full bg-[#F6FAFD] border border-[#e0e0e0] rounded-lg p-2 outline-none hover:border-azul-principal mt-2"
                            />
                        </label>

                        <label htmlFor="" className="font-medium w-1/2">
                            Logo da clínica
                            <label 
                                htmlFor="logo" 
                                className="flex items-center justify-center text-gray-500 bg-[#F6FAFD] border-dashed border-2 border-[#e0e0e0] rounded-lg p-2 w-full mt-2 cursor-pointer">
                                    <GoUpload className="size-5 stroke-1 mr-3"/> 
                                {inputData.length === 0 ? 'Subir Imagem' : inputData[0].name}
                            </label>
                            <input
                                type="file"
                                id="logo"
                                name="logo"
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