import { GoUpload } from "react-icons/go";
import { useState } from "react";

import { InputText } from "../../components/InputText";

export function Conta(params) {
    const [inputFileData, setInputFileData] = useState("");
    const [editProfile,setEditProfile] = useState({})

    
    const handleFileName = (event) => {
        const files = Array.from(event.target.files);
        const fileData = files.map(file => ({
            name: file.name
        }));
        setInputFileData(fileData);
        setEditProfile('fotoPerfil', fileData)
    }

    const changeDataProfile = (id, value) => {
        setEditProfile(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };
    
    return(
        <section className="overflow-y-auto max-h-full px-1 pb-14">
            <h2 className="text-2xl font-semibold mb-3">Conta</h2>

           <form action="">
                <label htmlFor="fotoPerfil" className="font-medium block w-60">
                    Foto de Perfil:
                    <label
                        htmlFor="fotoPerfil"
                        className="flex items-center justify-center text-gray-500 bg-[#F6FAFD] border-dashed border-2 border-[#e0e0e0] rounded-lg p-2 mt-2 cursor-pointer">
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
                    <InputText InputId={'nome'} labelName={'Nome:'} onChange={changeDataProfile}/>
                    <InputText InputId={'email'} labelName={'E-mail:'} onChange={changeDataProfile} />
                </div>

                <h2 className="text-2xl font-semibold my-5">Redefinição de senha</h2>

                <div className="flex gap-5 w-full">
                    <InputText InputId={'novaSenha'} labelName={'Nova senha:'} password onChange={changeDataProfile} />
                    <InputText InputId={'confirmaSenha'} labelName={'Confirme sua senha:'} password onChange={changeDataProfile} />
                </div>

                <div className="w-full flex justify-end mt-5">
                    <button className="bg-azul-principal text-white px-4 py-3 rounded-lg">
                        Salva alterações
                    </button>
                </div>
           </form>

        </section>
    )
}