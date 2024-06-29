import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { InputText } from "../InputText";
import { DefaultUser } from "../DefaultUser";
import { useUser } from "../../context/UserContext";
import { confirmAlert, toastErrorAlert, toastSuccessAlert } from "../../utils/Alerts";
import axios from "../../utils/axiosConfig";
import { Loading } from "../Loading";
import { LoadingIcon } from "../LoadingIcon";

export function Access() {
    const [access, setAccess] = useState([]);
    const [newAccess, setNewAccess] = useState({ name: '', email: '', role: '' });
    const [loading, setLoading] = useState(true);
    const [loadingForm, setLoadingForm] = useState(false);
    const { refreshToken } = useUser();
    const [refreshKey, setRefreshKey] = useState(0);

    const changeNewAccess = (id, value) => {
        setNewAccess(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const changeNewAccessList = (event) => {
        let val = event.target.value;
        changeNewAccess('role', val.toLowerCase());
    };

    const getAccess = async (retryCount = 0) => {
        try {
            const res = await axios.get('/getUsers');
            setAccess(res.data);
            setLoading(false);
        } catch (err) {
            if (err.response && err.response.status === 401 && retryCount < 1) {
                await refreshToken();
                getAccess(retryCount + 1);
            } else {
                setLoading(false);
            }
        }
    }

    const addAccess = async (retryCount = 0) => {
        try {
            setLoadingForm(true);
            await axios.post('/registerUsers', newAccess);
            toastSuccessAlert('Usuário criado com sucesso!');
            clearForm();
            setRefreshKey(prevKey => prevKey + 1);
            setLoadingForm(false);
        } catch (err) {
            if (err.response && err.response.status === 401 && retryCount < 1) {
                await refreshToken();
                addAccess(retryCount + 1);
            } else {
                toastErrorAlert(err.response?.data?.error);
            }
        } finally {
            setLoadingForm(false);
        }
    };

    const confirmDel = (id) => {
        confirmAlert('Deseja realmente deletar esse usuário?', 'Sim', 'Cancelar', () => deleteAccess(id));
    }

    const deleteAccess = async (id, retryCount = 0) => {
        try {
            await axios.delete(`/deleteUser/${id}`);
            toastSuccessAlert('Usuário deletado com sucesso!');
            setRefreshKey(prevKey => prevKey + 1);
        } catch (err) {
            if (err.response && err.response.status === 401 && retryCount < 1) {
                await refreshToken();
                deleteAccess(id, retryCount + 1);
            }
        }
    }

    const validateForm = () => {
        console.log(newAccess);
        if (!newAccess.name || !newAccess.email || !newAccess.role) {
            return toastErrorAlert('Preencha todos os campos');
        } else if (newAccess.role !== 'secretaria' && newAccess.role !== 'quiropraxista') {
            return toastErrorAlert('O tipo de acesso deve ser "Secretaria" ou "Quiropraxista"');
        } else {
            addAccess();
        }
    }

    const clearForm = () => {
        setNewAccess({
            name: '',
            email: '',
            role: ''
        });
    }

    useEffect(() => {
        getAccess();
    }, [refreshKey]);

    return (
        <section className="overflow-y-auto max-h-full px-1 pb-20">
            <h2 className="text-2xl font-semibold">Acessos</h2>
            <p className="mb-5">Você poderá escolher até 5 acessos para o aplicativo.</p>

            <div className="flex flex-col gap-5 max-w-4xl max-h-64 p-2 overflow-y-auto">
                {loading
                    ? <Loading minSize={'h-32'} />
                    : (
                        access.length === 1
                            ? (
                                <div className="border rounded-lg py-8 shadow-[0px_1px_6px_0px_#00000040] dark:shadow-[0px_0px_6px_0px_#ffffff0] dark:border dark:border-dark-600/30">
                                    <h3 className="text-lg text-center font-bold ">Nenhum acesso encontrado</h3>
                                </div>
                            ) : (
                                access.slice(1).map(pessoa => (
                                    <div key={pessoa.idUser} className="rounded-lg py-3 px-5 shadow-[0px_1px_6px_0px_#00000040] dark:shadow-[0px_0px_6px_0px_#ffffff0] dark:border dark:border-dark-600/30">
                                        <h3 className="text-lg font-bold mb-3">{pessoa.name}</h3>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-8">
                                                <DefaultUser user />
                                                <div>
                                                    <p><b>Email:</b> {pessoa.email}</p>
                                                    <p><b>Tipo de acesso:</b> {pessoa.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => confirmDel(pessoa.idUser)} className="text-vermelho-900 font-semibold p-2 ">Excluir</button>
                                                <button className="text-white bg-azul-900 p-2 rounded-lg font-semibold">Editar</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                    )
                }
            </div>

            <h2 className="text-2xl font-semibold my-8">Novo acesso</h2>

            <div className="max-w-xl flex flex-col gap-5">
                <InputText
                    InputId="name"
                    labelName="Nome completo do funcionário:"
                    required
                    onChange={changeNewAccess}
                    val={newAccess.name}
                />

                <div className="flex gap-3">
                    <InputText
                        InputId="email"
                        labelName="E-mail:"
                        required
                        onChange={changeNewAccess}
                        val={newAccess.email}
                    />

                    <label htmlFor="role">
                        Tipo de acesso: <b className="text-vermelho-900">*</b>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            className="w-full custom-input mt-2 capitalize"
                            onChange={changeNewAccessList}
                            list="roles"
                            value={newAccess.role}
                        />
                        <datalist id="roles">
                            <option value="Secretaria" />
                            <option value="Quiropraxista" />
                        </datalist>

                    </label>
                </div>

                <button
                    className={`bg-azul-900 font-medium flex items-center text-white rounded-lg p-3 w-52 justify-center
                    ${loadingForm ? ' bg-azul-900/50 cursor-not-allowed w-36' : ' bg-azul-900 w-52'}`}
                    onClick={validateForm}
                >
                    {loadingForm ? (
                        <span className="w-full flex justify-center z-0">
                            Criando
                            <LoadingIcon />
                        </span>
                    ) : (
                        <span className="w-full flex justify-center items-center">
                            Criar mais acessos <FaPlus className="ml-2" />
                        </span>
                    )}
                </button>
            </div>
        </section>
    );
}
