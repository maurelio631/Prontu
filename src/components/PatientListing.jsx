import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../utils/UserContext";

import { ArrayPacientes } from "../data/fakes";

import { LuPencil } from "react-icons/lu";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TbChevronLeft, TbChevronRight, TbChevronsLeft, TbChevronsRight } from "react-icons/tb";



export function PatientListing({ valorBusca }) {
    const [page, setPage] = useState(1);
    const { user } = useUser();

    const filteredPacientes = ArrayPacientes.filter(paciente =>
        valorBusca === '' ||
        paciente.name.toLowerCase().includes(valorBusca.toLowerCase()) ||
        paciente.telefone.toLowerCase().includes(valorBusca.toLowerCase())
    );

    const totalPages = Math.max(Math.ceil(filteredPacientes.length / 9), 1);
    const paginatedPacientes = filteredPacientes.slice((page - 1) * 9, page * 9);

    const goToNextPage = () => setPage(page + 1);
    const goToLastPage = () => setPage(totalPages);
    const goToFirstPage = () => setPage(1);
    const goToPreviousPage = () => setPage(page - 1);

    return (
        <table className="w-full bg-azul-700">
            <thead>
                <tr className="bg-white text-base min-[790px]:text-xl">
                    <th className="py-3 font-medium">ID</th>
                    <th className="py-3 font-medium">Nome</th>
                    <th className="py-3 font-medium">CPF</th>
                    <th className="py-3 font-medium">Telefone</th>
                    <th className="py-3 font-medium">Data Nascimento</th>
                    <th className="py-3 font-medium">Ações</th>
                </tr>
            </thead>

            <tbody>
                {paginatedPacientes.length > 0 ? (
                    paginatedPacientes.map(paciente => (
                        <tr key={paciente.id} className="even:bg-white text-sm min-[790px]:text-base">
                            <td className="text-center h-11">{paciente.id}</td>
                            <td className="text-center h-11">
                                <span className="m-auto truncate max-w-[120px] block">
                                    {paciente.name}
                                </span>
                            </td>
                            <td className="text-center h-11">{paciente.cpf}</td>
                            <td className="text-center h-11">{paciente.telefone}</td>
                            <td className="text-center h-11">{paciente.nascimento}</td>
                            <td className="bg-white flex gap-1 justify-center h-11">
                                {user.role === 'secretaria' && 
                                    <button className="bg-azul-900 text-white h-full px-2.5 rounded-lg">
                                        <LuPencil />
                                    </button>
                                }
                                {user.role === 'quiropraxista' &&
                                    <Link to={'/home/prontuario'} className="bg-azul-900 text-white h-full px-2.5 rounded-lg flex items-center">
                                        <FaExternalLinkAlt />
                                    </Link>
                                }
                                {user.role === 'admin' &&
                                    <>
                                        <button className="bg-azul-900 text-white h-full px-2.5 rounded-lg">
                                            <LuPencil />
                                        </button>
                                        <Link to={'/home/prontuario'} className="bg-azul-900 text-white h-full px-2.5 rounded-lg flex items-center">
                                            <FaExternalLinkAlt />
                                        </Link>
                                    </> 
                                }
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="text-center py-4">
                            Paciente não encontrado
                        </td>
                    </tr>
                )}
            </tbody>

            <tfoot>
                <tr className="bg-white">
                    <td colSpan={3} className="py-2 pl-6 font-semibold">
                        {filteredPacientes.length} itens
                    </td>
                    <td className="text-right py-2 pr-12" colSpan={3}>
                        <div className="items-center gap-8 inline-flex">
                            <span>Página {page} de {totalPages}</span>

                            <div className="flex gap-1.5">
                                <button
                                    onClick={goToFirstPage}
                                    disabled={page === 1}
                                    className={`p-2 rounded border-[1px] border-azul-900 ${page === 1 ? 'bg-azul-900/50' : ''}`}
                                >
                                    <TbChevronsLeft className={`size-4 ${page === 1 ? 'stroke-black/50' : ''}`} />
                                </button>

                                <button
                                    onClick={goToPreviousPage}
                                    disabled={page === 1}
                                    className={`p-2 rounded border-[1px] border-azul-900 ${page === 1 ? 'bg-azul-900/50' : ''}`}
                                >
                                    <TbChevronLeft className={`size-4 ${page === 1 ? 'stroke-black/50' : ''}`} />
                                </button>

                                <button
                                    onClick={goToNextPage}
                                    disabled={page === totalPages}
                                    className={`p-2 rounded border-[1px] border-azul-900 ${page === totalPages ? 'bg-azul-900/50' : ''}`}
                                >
                                    <TbChevronRight className={`size-4 ${page === totalPages ? 'stroke-black/50' : ''}`} />
                                </button>

                                <button
                                    onClick={goToLastPage}
                                    disabled={page === totalPages}
                                    className={`p-2 rounded border-[1px] border-azul-900 ${page === totalPages ? 'bg-azul-900/50' : ''}`}
                                >
                                    <TbChevronsRight className={`size-4 ${page === totalPages ? 'stroke-black/50' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}
