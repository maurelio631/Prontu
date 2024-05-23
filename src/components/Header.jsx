import { useParams } from "react-router-dom";
import logo from '../assets/logo.svg'

export function Header({ subtitle }) {

    const pathname = location.pathname;
    const urlParams = useParams()
    const { nomeClinica } = urlParams ? urlParams : '';
    var res = nomeClinica ? nomeClinica.replace("-", " ") : '';

    return (
        <header className="px-4">
            <nav className="min-h-24 w-full flex justify-between border-b-2 border-cinza-escuro ">
                <div className="flex items-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-600 rounded-full"></div> 
                    <span className="text-sm pl-2 sm:text-2xl font-semibold sm:pl-4">{res ? res : '' }</span>
                </div>
                {   
                    pathname == '/' ?
                        <div className="flex items-center flex-row-reverse">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-600 rounded-full"></div>
                            <span className="text-sm pr-2 sm:text-base font-medium sm:pr-4">Nome funcionário</span>
                        </div>
                    :
                        <div className="sm:hidden flex items-center flex-row-reverse ">
                            <img src={logo} alt="logo" className="w-14 h-14"/>
                            <span className="text-sm text-azul-principal pr-2 sm:text-base font-medium sm:pr-4">Prontu & Ponto</span>
                        </div>
                }
            </nav>

            {
                subtitle ?
                    <div className="subtitle border-b-2 border-cinza-escuro py-2 text-center">
                        <h3 className="text-base sm:text-xl font-medium">{subtitle}</h3>
                    </div>
                    : null
            }
        </header>
    )
}