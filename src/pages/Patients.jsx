import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import Wrapper from "../components/Wrapper";
import { IoIosSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";

import { PatientListing } from "../components/PatientListing.jsx";
import { useState } from "react";

export function Patients(){

    const [searchValue, setSearchValue] = useState('')

    const funcBusca = (event) => {
        setSearchValue(event.target.value.toString().toLocaleLowerCase());
    }

    return(
        <Wrapper>
            <div className="w-screen">
                <Header/>
                <main className="flex justify-between w-full">
                    <Sidebar/>
                    
                    <div className="w-full px-4 md:w-11/12 ">
                        <div className="flex justify-between py-4"> 
                            <label className="px-3 py-1.5 w-full max-w-80 bg-azul-800  border-2 border-cinza-900/20 rounded-full  flex items-center gap-3" htmlFor="inputBusca" >
                                <IoIosSearch className="size-7 text-cinza-900" />
                                <input
                                    id="inputBusca"
                                    value={searchValue}
                                    onChange={funcBusca}
                                    className="bg-transparent outline-none  border-0 p-0 text-sm focus:ring-0 w-full"
                                    type="search"
                                    placeholder="Nome ou telefone"
                                />
                            </label>

                            <Link to={'/home/preregistro'} className="text-white bg-azul-900 w-full max-w-56 flex items-center px-5 rounded-full hover:bg-azul-900/80">
                                <GoPlus className="stroke-2 mr-2" />Adicionar pacientes
                            </Link>
                        </div>


                        <PatientListing valorBusca={searchValue} />
                    </div> 
                </main>
            </div>
        </Wrapper>
    )
}