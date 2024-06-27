import { Link } from "react-router-dom";
import erroSvg from "../assets/erro403.svg";
import { useUser } from "../context/UserContext";

export function Page403() {
    const { user } = useUser();
    return (
        <div className="flex flex-col items-center pt-32">
            <img src={erroSvg} alt="Erro 403" className="w-full max-w-32" />
            <h2 className="text-6xl font-bold text-azul-900 mb-5 text-center">Acesso negado!</h2>
            <span className="text-cinza-950 dark:text-cinza-700 text-3xl font-normal text-center">
                Não encontramos a página que você tentou acessar
            </span>
            <span className="text-cinza-950 dark:text-cinza-700 text-2xl font-semibold text-center">
                Verifique se seu login está correto ou se possui autorização de acesso
            </span>

            <div className="flex gap-5 pt-4 w-full justify-center flex-wrap">
                <Link
                    className="bg-azul-900 p-3 text-white rounded-full font-semibold w-full max-w-64 text-center"
                    to={!user.role ? '/Aquiro' : '/home/agenda'}
                >
                    Voltar ao início
                </Link>
            </div>
        </div>
    );
}
