import { useParams } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import { DefaultUser } from "./DefaultUser";
import { FaHospital } from "react-icons/fa";

export function Header({ subtitle }) {
    const pathname = location.pathname;
    const { nomeClinica } = useParams() || '';
    const nomeViaParam = nomeClinica ? nomeClinica.replace("-", " ") : '';

    const {user} = useUser();

    return (
        <header>
            <nav className="w-full h-20 flex justify-between bg-[#F6FAFD] border-b-2 border-cinza-escuro/20">
                <div className="flex items-center">
                    <div className="h-full w-24 flex justify-center items-center border-r-2 border-cinza-escuro/20">
                        <DefaultUser /> 
                    </div>

                    <span className="text-xl text-azul-principal font-semibold pl-2 sm:text-2xl sm:pl-4">
                        {nomeViaParam}
                    </span>
                </div>

                {pathname !== `/${nomeClinica}` && (
                    <div className="flex items-center flex-row-reverse pr-4">
                        {
                            user.imgProfile 
                            ? <img className="w-12 h-12 rounded-full" src={user.imgProfile} alt="Foto de perfil" />
                            : <DefaultUser user/>    
                        }
                        <span className="text-sm pr-2 sm:text-base font-medium capitalize sm:pr-4">Olá, {user.name}</span>
                    </div>
                )}
            </nav>

            {subtitle && (
                <h3 className="text-xl md:text-3xl font-medium text-center px-4 pt-8 text-azul-principal">
                    {subtitle}
                </h3>
            )}
        </header>
    );
}
