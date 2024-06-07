import { useState } from "react";
import { GoUpload } from "react-icons/go";
import { InputText } from "../../components/InputText";
import { ToggleMode } from "../ToggleMode";

export function Conta() {
    const [inputFileData, setInputFileData] = useState("");
    const [editProfile, setEditProfile] = useState({});

    const handleFileName = (event) => {
        const files = Array.from(event.target.files);
        const fileData = files.map(file => ({
            name: file.name
        }));
        setInputFileData(fileData);
        changeDataProfile('fotoPerfil', fileData);
    };

    const changeDataProfile = (id, value) => {
        setEditProfile(prevData => ({
            ...prevData,
            [id]: value,
        }));
        console.log(editProfile)
    };

    return (
        <section className="overflow-y-auto max-h-full px-1 pb-14">
            <div className="flex justify-between items-center">
                <h2 className="text-black dark:text-white text-2xl font-semibold mb-2">Conta</h2>
                <ToggleMode/>
            </div>

            <form>
                <label htmlFor="fotoPerfil" className="text-black dark:text-white font-medium block w-60">
                    Foto de Perfil:
                    <label
                        htmlFor="fotoPerfil"
                        className="file-prontuario"
                    >
                        <GoUpload className="size-5 stroke-1 mr-3" />
                        {inputFileData.length === 0 ? 'Subir Imagem' : inputFileData[0].name}
                    </label>
                    <input
                        type="file"
                        id="fotoPerfil"
                        name="fotoPerfil"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileName}
                    />
                </label>

                <div className="flex gap-5 w-full mt-4">
                    <InputText InputId="nome" labelName="Nome:" onChange={changeDataProfile} />
                    <InputText InputId="email" labelName="E-mail:" onChange={changeDataProfile} />
                </div>

                <h2 className="text-black dark:text-white text-2xl font-semibold my-5">Redefinição de senha</h2>

                <div className="flex gap-5 w-full">
                    <InputText InputId="novaSenha" labelName="Nova senha:" password onChange={changeDataProfile} />
                    <InputText InputId="confirmaSenha" labelName="Confirme sua senha:" password onChange={changeDataProfile} />
                </div>

                <div className="w-full flex justify-end mt-5">
                    <button className="bg-azul-900 text-white px-4 font-medium py-3 rounded-lg">
                        Salvar alterações
                    </button>
                </div>
            </form>
        </section>
    );
}
