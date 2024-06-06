import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { InputText } from "../InputText";
import { DefaultUser } from "../DefaultUser";

export function Access() {
    const [access, setAccess] = useState([
        { nome: 'Natalia dos Santos', email: 'natalia_dossantos@prontueponto.com.br', cargo: 'secretaria', id: 123 },
        { nome: 'Joana dos Santos', email: 'joanadossantos@prontueponto.com.br', cargo: 'quiropraxista', id: 4324 }
    ]);
    const [newAccess, setNewAccess] = useState({});

    const changeNewAccess = (id, value) => {
        setNewAccess(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSelectChange = (event) => {
        const { id, value } = event.target;
        changeNewAccess(id, value);
    };

    const addAccess = () => {
        setAccess(prevArray => [...prevArray, newAccess]);
    };

    return (
        <section className="overflow-y-auto max-h-full px-1 pb-20">
            <h2 className="text-2xl font-semibold">Acessos</h2>
            <p className="mb-5">Você poderá escolher até 5 acessos para o aplicativo.</p>

            <div className="flex flex-col gap-5 max-w-4xl">
                {access.map(pessoa => (
                    <div key={pessoa.id} className="rounded-lg py-3 px-5 shadow-[0px_1px_6px_0px_#00000040]">
                        <h3 className="text-lg font-bold mb-3">{pessoa.nome}</h3>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-8">
                                {/* <img className="w-12 h-12 bg-slate-400 rounded-full" alt="Foto de perfil" /> */}
                                <DefaultUser user/>
                                <div>
                                    <p><b>Email:</b> {pessoa.email}</p>
                                    <p><b>Tipo de acesso:</b> {pessoa.cargo}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-vermelho font-semibold p-2">Excluir</button>
                                <button className="text-white bg-azul-principal p-2 rounded-lg font-semibold">Editar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-semibold my-8">Novo acesso</h2>

            <div className="max-w-xl flex flex-col gap-5">
                <InputText InputId="nome" labelName="Nome completo do funcionário:" required onChange={changeNewAccess} />
                <div className="flex gap-3">
                    <InputText InputId="email" labelName="E-mail:" required onChange={changeNewAccess} />
                    <label htmlFor="cargo">
                        <b className="text-vermelho">*</b> Tipo de acesso:
                        <select
                            id="cargo"
                            name="cargo"
                            onChange={handleSelectChange}
                            className="max-h-[42px] h-full w-full bg-[#F6FAFD] border border-[#e0e0e0] rounded-lg p-2 outline-none hover:border-azul-principal mt-2"
                        >
                            <option value="secretaria">Secretaria</option>
                            <option value="quiropraxista">Quiropraxista</option>
                        </select>
                    </label>
                </div>
                <button className="bg-azul-principal flex items-center text-white rounded-lg p-3 w-52 justify-center" onClick={addAccess}>
                    <FaPlus className="mr-2" /> Criar mais acessos
                </button>
            </div>
        </section>
    );
}
