import { useState } from "react";
import  logoLogin  from "../assets/logoLogin.svg";
import logo from "../assets/logo.svg";

import { FaEye, FaEyeSlash } from "react-icons/fa";

export function Login(){

    const [statusLogin, setStatusLogin] = useState(false);
    const [iconPass, setIconPass] = useState(true);
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

    return (
        <main className="flex w-full flex-col sm:flex-row h-screen">

            <div className="w-full py-10 sm:bg-azul-principal sm:p-0  sm:w-1/2 flex items-center justify-center">
                    <img src={logoLogin} alt="logo" className="hidden sm:block" />
                    <img src={logo} alt="logo" className="block sm:hidden" />

                </div>

                <div className="w-full sm:w-1/2 flex items-center justify-center">
                    {statusLogin == false ? (
                        <div className="w-full max-w-[440px] flex flex-col gap-5 px-5">
                            <div className="mb-5">
                                <h2 className="text-4xl font-semibold text-center sm:text-left">Olá</h2>
                                <p className="text-center sm:text-left">Informe seus dados para acessar a plataforma.</p>
                            </div>

                            <input type="text" placeholder="Código da clínica" className="w-full border-2 border-cinza-escuro rounded-lg p-2 outline-none hover:border-black/70" />
                            <input type="text" placeholder="Código do funcionário" className="w-full border-2 border-cinza-escuro rounded-lg p-2 outline-none hover:border-black/70" />

                            <div className="relative">
                                <input type={type} name="" id="" placeholder="Senha"
                                    className="w-full border-2 border-cinza-escuro rounded-lg p-2 outline-none hover:border-black/70" />

                                <button type="button" className="absolute right-4 top-3.5 text-black/70" onClick={handleToggle}>
                                    {iconPass == true ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>

                            <div className="flex flex-col gap-3 items-center  sm:gap-0 sm:flex-row sm:justify-between">
                                <button type="button" onClick={() => setStatusLogin(true)} className="border-2 border-azul-principal text-azul-principal rounded-lg py-2 px-4  hover:bg-azul-principal hover:text-white">
                                    Esqueci minha senha
                                </button>

                                <button type="button" className="bg-azul-principal text-white w-20 rounded-lg py-2  hover:bg-azul-principal/70">
                                    Entrar
                                </button>
                            </div>
                        </div>
                    )
                        :
                    (
                        <div className="w-full max-w-[440px] flex flex-col gap-5 px-5">
                            <div className="mb-5">
                                <h2 className="text-xl sm:text-4xl font-semibold text-center sm:text-left">Recuperação de senha</h2>
                                <p className="text-center sm:text-left">Informe os dados necessários para recuperar sua senha</p>
                            </div>

                            <input type="text" placeholder="Código da clínica" className="w-full border-2 border-cinza-escuro rounded-lg p-2 outline-none hover:border-black/70" />
                            <input type="text" placeholder="Código do funcionário" className="w-full border-2 border-cinza-escuro rounded-lg p-2 outline-none hover:border-black/70" />


                            <div className="flex flex-col-reverse gap-3 items-center  sm:gap-0 sm:flex-row sm:justify-between">
                                <button type="button" onClick={() => setStatusLogin(false)} className="border-2 border-azul-principal text-azul-principal rounded-lg py-2 px-4 hover:bg-azul-principal hover:text-white">
                                    Voltar
                                </button>

                                <button type="button" className="bg-azul-principal text-white  rounded-lg py-2 px-4 hover:bg-azul-principal/70">
                                    Enviar recuperação de senha
                                </button>
                            </div>
                        </div>
                    )}           
                </div>      
        </main>
    )
}