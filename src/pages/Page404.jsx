import { Link } from "react-router-dom";
import  erroSvg  from "../assets/erro404.svg";

export function Page404() {
    return(
        <div className="flex flex-col items-center p-20">
            <img src={erroSvg} alt=""  className="w-full max-w-60"/>
            <h1 className="text-6xl font-bold text-azul-900 mb-5">Opa!</h1>
            <p className="text-3xl font-normal text-cinza-950 text-center">
                Não encontramos a página que você tentou acessar
            </p>

            <div className="flex gap-5 pt-4 w-full justify-center flex-wrap">
                <Link className="bg-azul-900 p-2 text-white rounded-xl font-semibold" to={'/Aquiro'}>Form</Link>
                <Link className="bg-azul-900 p-2 text-white rounded-xl font-semibold" to={'/login'}>Login</Link>
                <Link className="bg-azul-900 p-2 text-white rounded-xl font-semibold" to={'/cadastro'}>Cadastro</Link>
                <Link className="bg-azul-900 p-2 text-white rounded-xl font-semibold" to={'/home/pacientes'}>Pacientes</Link>
                <Link className="bg-azul-900 p-2 text-white rounded-xl font-semibold" to={'/home/prontuario'}>Prontuario</Link>
                <Link className="bg-azul-900 p-2 text-white rounded-xl font-semibold" to={'/home/ajustes'}>Ajustes</Link>
                <Link className="bg-azul-900 p-2 text-white rounded-xl font-semibold" to={'/home/agenda'}>Agenda</Link>
            </div>
        </div>
    )
}