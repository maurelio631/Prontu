import { useState } from "react";
import  logoLogin  from "../assets/logoLogin.svg";
import logo from "../assets/logo.svg";

import { InputText } from "../components/InputText";

export function Login(){

    const [statusLogin, setStatusLogin] = useState(false);

    const [loginData, setDataLogin] = useState({})
    const [forgotPasswordData, setForgotPasswordData] = useState({})

    const changeLoginData = (id, value) => {
        setDataLogin(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const changeForgotData = (id, value) => {
        setForgotPasswordData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    return (
        <main className="flex w-full flex-col sm:flex-row h-screen">

            <div className="w-full py-10 sm:bg-azul-900 sm:p-0  sm:w-1/2 flex items-center justify-center">
                <img src={logoLogin} alt="logo" className="hidden sm:block" />
                <img src={logo} alt="logo" className="block sm:hidden" />
            </div>

            <div className="w-full sm:w-1/2 flex items-center justify-center">
                {statusLogin == false ? (
                    <form className="w-full max-w-[440px] flex flex-col gap-5 px-5">
                        <div className="mb-5">
                            <h2 className="text-4xl font-semibold text-center sm:text-left">Olá</h2>
                            <p className="text-center sm:text-left">Informe seus dados para acessar a plataforma.</p>
                        </div>

                        <InputText InputId={"codClinica"} labelName={'Código da clínica:'} onChange={changeLoginData} />
                        <InputText InputId={"codFuncionario"} labelName={'Código do funcionário:'} onChange={changeLoginData}/>
                        <InputText InputId={"senha"} labelName={'Senha:'} password={true} onChange={changeLoginData} />

                        <div className="flex flex-col gap-3 items-center  sm:gap-0 sm:flex-row sm:justify-between">
                            <button type="button" onClick={() => setStatusLogin(true)} className="border-2 border-azul-900 text-azul-900 rounded-lg py-2 px-4  hover:bg-azul-900 hover:text-white">
                                Esqueci minha senha
                            </button>

                            <button type="button" className="bg-azul-900 text-white w-20 rounded-lg py-2  hover:bg-azul-900/70">
                                Entrar
                            </button>
                        </div>
                    </form>
                )
                    :
                (
                    <form className="w-full max-w-[440px] flex flex-col gap-5 px-5">
                        <div className="mb-5">
                            <h2 className="text-xl sm:text-4xl font-semibold text-center sm:text-left">Recuperação de senha</h2>
                            <p className="text-center sm:text-left">Informe os dados necessários para recuperar sua senha</p>
                        </div>

                        <InputText InputId={"codClinica"} labelName={'Código da clínica:'} onChange={changeForgotData} />
                        <InputText InputId={"codFuncionario"} labelName={'Código do funcionário:'} onChange={changeForgotData} />

                        <div className="flex flex-col-reverse gap-3 items-center  sm:gap-0 sm:flex-row sm:justify-between">
                            <button type="button" onClick={() => setStatusLogin(false)} className="border-2 border-azul-900 text-azul-900 rounded-lg py-2 px-4 hover:bg-azul-900 hover:text-white">
                                Voltar
                            </button>

                            <button type="button" className="bg-azul-900 text-white  rounded-lg py-2 px-4 hover:bg-azul-900/70">
                                Enviar recuperação de senha
                            </button>
                        </div>
                    </form>
                )}           
            </div>      
        </main>
    )
}