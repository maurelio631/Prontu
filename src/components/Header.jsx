import { useParams } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import { DefaultUser } from "./DefaultUser";
import { ToggleMode } from "./ToggleMode";

export function Header({ subtitle }) {
    const pathname = location.pathname;
    const { nomeClinica } = useParams() || '';
    const nomeViaParam = nomeClinica ? nomeClinica.replace("-", " ") : '';

    const {user} = useUser();

    return (
        <header>
            <nav className="bg-azul-800 border-cinza-900/20 dark:bg-dark-800 dark:border-dark-100 w-full h-20 flex justify-between  border-b-2 ">
                <div className="flex items-center">
                    <div className="border-cinza-900/20 dark:border-dark-100 h-full w-24 flex justify-center items-center border-r-2 ">
                        <DefaultUser /> 
                    </div>

                    <span className="text-xl text-azul-900 font-semibold pl-2 sm:text-2xl sm:pl-4">
                        {nomeViaParam}
                    </span>
                </div>

                {pathname !== `/${nomeClinica}` 
                ? (
                    <div className="flex items-center flex-row-reverse pr-4">
                        {
                            user.imgProfile 
                            ? <img className="w-12 h-12 rounded-full" src={user.imgProfile} alt="Foto de perfil" />
                            : <DefaultUser user/>    
                        }
                        <span className="text-black dark:text-white text-sm pr-2 sm:text-base font-medium capitalize sm:pr-4">Olá, {user.name}</span>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-between px-5">
                        <ToggleMode/>
                    </div>
                )}
            </nav>

            {subtitle && (
                <h3 className="text-xl md:text-3xl font-medium text-center px-4 pt-8 text-azul-900">
                    {subtitle}
                </h3>
            )}
        </header>
    );
}
