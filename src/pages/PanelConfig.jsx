import { useState } from "react";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import Wrapper from "../components/Wrapper";

import { Conta } from "../components/optionsPanel/Conta";
import { Access } from "../components/optionsPanel/Access";
import { Payment } from "../components/optionsPanel/Payment";


export function PanelConfig() {
    const [controller, setController] = useState(1);

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
                            <h3 onClick={() => handleController(1)} className={`text-xl font-semibold px-2 cursor-pointer ${controller === 1 ? 'text-azul-principal border-b-2 border-azul-principal' : 'text-cinza-escuro border-b-2 border-cinza-escuro'}`}>Conta e segurança</h3>
                            <h3 onClick={() => handleController(2)} className={`text-xl font-semibold px-2 cursor-pointer ${controller === 2 ? 'text-azul-principal border-b-2 border-azul-principal' : 'text-cinza-escuro border-b-2 border-cinza-escuro'}`}>Painel de acessos</h3>
                            <h3 onClick={() => handleController(3)} className={`text-xl font-semibold px-2 cursor-pointer ${controller === 3 ? 'text-azul-principal border-b-2 border-azul-principal' : 'text-cinza-escuro border-b-2 border-cinza-escuro'}`}>Pagamento</h3>
                        </div>

                        {getOptions()}

                    </div>
                </main>
            </div>
        </Wrapper>
    )
}