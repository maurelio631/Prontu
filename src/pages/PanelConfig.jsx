import { useState } from "react";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import Wrapper from "../components/Wrapper";

import { Conta } from "../components/optionsPanel/Conta";
import { Access } from "../components/optionsPanel/Access";
import { Payment } from "../components/optionsPanel/Payment";
import { useUser } from "../utils/UserContext";

export function PanelConfig() {
    const [controller, setController] = useState(1);
    const { user } = useUser();

    const handleController = (val) =>{
        setController(val)
    }

    const getOptions = () =>{
        switch (controller) {
            case 1:
                return <Conta/>;
            case 2:
                return <Access/>;
            case 3:
                return <Payment/>;
            default:
                return <Conta />;
        }
    }

    return (
        <Wrapper>
            <div className="w-screen">
                <Header />
                <main className="flex justify-between w-full">
                    <Sidebar/>
                    <div className="w-full h-[calc(100vh-116px)] overflow-hidden mt-4 mr-4 rounded-3xl shadow p-8">
                        <div className="flex gap-4 mb-8">
                            { user.role === 'admin' ? (
                            <>
                                <h3 onClick={() => handleController(1)} className={`text-xl font-semibold px-2 cursor-pointer ${controller === 1 ? 'text-azul-900 border-b-2 border-azul-900' : 'text-cinza-900 border-b-2 border-cinza-900'}`}>Conta e segurança</h3>
                                <h3 onClick={() => handleController(2)} className={`text-xl font-semibold px-2 cursor-pointer ${controller === 2 ? 'text-azul-900 border-b-2 border-azul-900' : 'text-cinza-900 border-b-2 border-cinza-900'}`}>Painel de acessos</h3>
                                <h3 onClick={() => handleController(3)} className={`text-xl font-semibold px-2 cursor-pointer ${controller === 3 ? 'text-azul-900 border-b-2 border-azul-900' : 'text-cinza-900 border-b-2 border-cinza-900'}`}>Pagamento</h3>
                            </>
                            ) : <h3 onClick={() => handleController(1)} className={`text-xl font-semibold px-2 cursor-pointer ${controller === 1 ? 'text-azul-900 border-b-2 border-azul-900' : 'text-cinza-900 border-b-2 border-cinza-900'}`}>Conta e segurança</h3>}
                        </div>
                        {getOptions()}
                    </div>
                </main>
            </div>
        </Wrapper>
    )
}