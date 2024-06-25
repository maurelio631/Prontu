import { useParams } from "react-router-dom";
import { useUser } from "../utils/UserContext";

import { DefaultUser } from "./DefaultUser";
import { ToggleMode } from "./ToggleMode";

export function Header({ subtitle, clinicSettings }) {
    const pathname = location.pathname;
    const { slug } = useParams() || '';
    const { user } = useUser();

    return (
        <header>
            {pathname === `/${slug}`
                ? 
            (
                <nav className="bg-azul-800 border-cinza-900/20 dark:bg-dark-800 dark:border-dark-100 w-full h-20 flex justify-between  border-b-2 ">
                    <div className="flex items-center">
                        <div className="border-cinza-900/20 dark:border-dark-100 h-full w-24 flex justify-center items-center border-r-2 ">
                            {
                                clinicSettings.clinicLogo
                                    ? <img className="w-12 h-12 rounded-full" src={clinicSettings.clinicLogo} alt="Logo da clinica" />
                                : <DefaultUser user />
                            } 
                        </div>

                        <span className="text-xl text-azul-900 font-semibold pl-2 sm:text-2xl sm:pl-4">
                            {clinicSettings.nameClinic}
                        </span>
                    </div>

                    <div className="h-full flex items-center justify-between px-5">
                        <ToggleMode/>
                    </div>
                </nav>
            )
                : 
            (
                <nav className="bg-azul-800 border-cinza-900/20 dark:bg-dark-800 dark:border-dark-100 w-full h-20 flex justify-between  border-b-2 ">
                    <div className="flex items-center">
                        <div className="border-cinza-900/20 dark:border-dark-100 h-full w-24 flex justify-center items-center border-r-2 ">
                                {
                                    user.logoClinic
                                        ? <img className="w-12 h-12 rounded-full" src={user.logoClinic} alt="Logo da clinica" />
                                        : <DefaultUser user />
                                }
                        </div>

                        <span className="text-xl text-azul-900 font-semibold pl-2 sm:text-2xl sm:pl-4">
                            {user.nameClinic}
                        </span>
                    </div>

                    <div className="flex items-center flex-row-reverse pr-4">
                        {
                            user.imgProfile
                                ? <img className="w-12 h-12 rounded-full" src={user.imgProfile} alt="Foto de perfil" />
                                : <DefaultUser user />
                        }
                        <span className="text-black dark:text-white text-sm pr-2 sm:text-base font-medium capitalize sm:pr-4">Olá, {user.name}</span>
                    </div>
                </nav>       
            )}
             


            {subtitle && (
                <h3 className="text-xl md:text-3xl font-medium text-center px-4 pt-8 text-azul-900">
                    {subtitle}
                </h3>
            )}
        </header>
    );
}
