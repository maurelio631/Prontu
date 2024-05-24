import { useParams } from "react-router-dom";

export function Header({ subtitle }) {

    const pathname = location.pathname;
    const urlParams = useParams()
    const { nomeClinica } = urlParams ? urlParams : '';
    var nomeViaParam = nomeClinica ? nomeClinica.replace("-", " ") : '';

    return (
        <header >
            <nav className="w-full h-20 flex justify-between bg-[#F6FAFD] border-b-2 border-cinza-escuro/20">
                
                <div className="flex items-center">
                    <div className="h-full w-24 flex justify-center items-center border-r-2 border-cinza-escuro/20">
                        <div className="w-12 h-12 bg-slate-600 rounded-full"></div>
                    </div> 
                    <span className="text-xl text-azul-principal font-semibold pl-2 sm:text-2xl sm:pl-4">{nomeViaParam ? nomeViaParam : '' }</span>
                </div>
                {   
                    pathname == `/${nomeClinica}` ?
                        null
                    :
                        <div className="flex items-center flex-row-reverse pr-4">
                            <div className="w-12 h-12 bg-slate-600 rounded-full"></div>
                            <span className="text-sm pr-2 sm:text-base font-medium sm:pr-4">Ola, Joana</span>
                        </div>
                }
            </nav>

                    
            {
                subtitle ?
                        <h3 className="text-xl md:text-3xl font-medium text-center px-4 pt-8 text-azul-principal">{subtitle}</h3>
                    : 
                        null
            }
        </header>
    )
}