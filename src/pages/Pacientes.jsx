import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import Wrapper from "../components/Wrapper";
import { IoIosSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";

import { ListagemPacientes } from "../components/ListagemPacientes.jsx";
import { useState } from "react";

export function Pacientes(){

    const [searchValue, setSearchValue] = useState('')

    const funcBusca = (event) => {
        setSearchValue(event.target.value.toString().toLocaleLowerCase());
    }

    return(
        <Wrapper>
            <Sidebar></Sidebar>

            <div className="w-screen">
                <Header/>
                <main className="px-4">
                    <div className=" py-2 flex justify-between border-b-2 border-cinza-escuro">
                        <div className="px-3 py-1.5  w-full max-w-80 border border-cinza-escuro rounded-lg  flex items-center gap-3">
                            <IoIosSearch className="size-7 text-cinza-escuro" />
                            <input
                                value={searchValue}
                                onChange={funcBusca}
                                className="bg-transparent outline-none  border-0 p-0 text-sm focus:ring-0"
                                type="text"
                                placeholder="Nome ou telefone"
                            /> 
                        </div>

                        <Link to={'/'} className="text-white bg-azul-principal flex items-center px-5 rounded-lg hover:bg-azul-principal/80">
                            <GoPlus className="stroke-2 mr-2" />Adicionar pacientes
                        </Link>
                    </div>

                    <ListagemPacientes valorBusca={searchValue}/>
                </main>
            </div>
        </Wrapper>
    )
}