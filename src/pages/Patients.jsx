import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { IoIosSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { toastErrorAlert } from "../utils/Alerts.js";

import { useUser } from "../utils/UserContext.jsx";

import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import Wrapper from "../components/Wrapper";
import { PatientListing } from "../components/PatientListing.jsx";
import { Loading } from "../components/Loading";

export function Patients() {
    const [searchValue, setSearchValue] = useState('');
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, refreshTokenFunc, token } = useUser();

    const funcBusca = (event) => {
        setSearchValue(event.target.value.toString().toLowerCase());
    }

    useEffect(() => {
        getAllPatients(token);
    }, [token]);

    const getAllPatients = async (token) => {
        try {
            const res = await axios.get('http://localhost:3000/patients', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPatients(res.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                const newAccessToken = await refreshTokenFunc();
                if (newAccessToken) {
                    await getAllPatients(newAccessToken);
                }
            } else {
                toastErrorAlert('Erro ao buscar dados dos pacientes');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <div className="w-screen bg-white dark:bg-dark-900">
                <Header />
                <main className="flex justify-between w-full min-h-[calc(100vh-162px)] min-[470px]:min-h-[calc(100vh-160px)]">
                    <Sidebar />
                    <div className="w-full px-4 md:w-11/12">
                        <div className="flex justify-between py-4">
                            <label className="bg-azul-800 border-cinza-900/20 dark:bg-dark-800 dark:border-dark-100 px-3 py-1.5 w-full max-w-80 border-2 rounded-full flex items-center gap-3" htmlFor="inputBusca">
                                <IoIosSearch className="size-7 text-cinza-900" />
                                <input
                                    id="inputBusca"
                                    value={searchValue}
                                    onChange={funcBusca}
                                    className="bg-transparent text-black dark:text-white outline-none border-0 p-0 text-sm focus:ring-0 w-full"
                                    type="search"
                                    placeholder="Nome ou telefone"
                                />
                            </label>

                            <Link to={'/home/preregistro'} className="text-white bg-azul-900 w-full max-w-56 flex items-center px-5 rounded-full hover:bg-azul-900/80">
                                <GoPlus className="stroke-2 mr-2" />Adicionar pacientes
                            </Link>
                        </div>

                        {
                        loading 
                            ? <Loading minSize={'h-[calc(100%-76px)]'} />
                            : <PatientListing valorBusca={searchValue} patients={patients} role={user.role} /> 
                        }
                    </div>
                </main>
            </div>
        </Wrapper>
    )
}
