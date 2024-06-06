import { Link } from "react-router-dom";
import erroSvg from "../assets/erro403.svg";
import { useUser } from "../utils/UserContext";

export function Page403() {
    const { user } = useUser();

    return (
        <div className="flex flex-col items-center pt-32">
            <img src={erroSvg} alt="Erro 403" className="w-full max-w-32" />
            <h1 className="text-6xl font-bold text-azul-900 mb-5 text-center">Acesso negado!</h1>
            <p className="text-3xl font-normal text-cinza-950 text-center">
                Não encontramos a página que você tentou acessar
            </p>
            <p className="text-2xl font-semibold text-cinza-950 text-center">
                Verifique se seu login está correto ou se possui autorização de acesso
            </p>

            <div className="flex gap-5 pt-4 w-full justify-center flex-wrap">
                <Link
                    className="bg-azul-900 p-3 text-white rounded-full font-semibold w-full max-w-64 text-center"
                    to={!user ? '/Aquiro' : '/home/agenda'}
                >
                    Voltar ao início
                </Link>
            </div>
        </div>
    );
}
