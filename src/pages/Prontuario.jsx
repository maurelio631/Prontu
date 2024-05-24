import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import Wrapper from "../components/Wrapper";
import { TbChevronLeft } from "react-icons/tb";

import '../assets/styles/prontuario.css'

export function Prontuario(){

    const mockDados = {
        nome: 'Maria Aparecida Oliveira da Cruz',
        nascimento: '01/02/1954',
        proficao: 'Aposentada',
        cpf: '063.524.418-74',
        tel: '(11) 91234-5678',
        email: 'maria_ap.cruz@gmail.com',
        endereco: 'Rua Matias Lopes, 630 - Parque Boa Esperança - SP',
        comoConheceu: 'Google'

    }

    return(
        <Wrapper>
            <div className="w-screen">
                <Header subtitle={'Prontuário de Atendimento de Quiropraxia'} />

                <main className="max-w-6xl m-auto flex flex-col gap-8">
                    <Link to={'/home/pacientes'} className="w-14 h-14 rounded-full border-2 border-cinza-escuro/20  flex items-center justify-center hover:bg-black/10">
                        <TbChevronLeft className="size-8" />
                    </Link>


                    <div className="w-full bg-prontuario p-3 text-base text-center bSpace">
                        <h2 className="font-bold text-2xl">{mockDados.nome}</h2>
                        <h4 className="m-5"><b>{mockDados.nascimento ? Math.floor((new Date() - new Date(mockDados.nascimento)) / (365.25 * 24 * 60 * 60 * 1000)) : ''} anos </b> - {mockDados.nascimento}</h4>
                        <div className="flex justify-center gap-5">
                            <span><b>Profissão:</b> {mockDados.proficao}</span>
                            <span><b>CPF:</b> {mockDados.cpf}</span>
                            <span><b>Tel. Contato:</b> {mockDados.tel}</span>
                            <span><b>E-mail:</b> {mockDados.email}</span>
                        </div>
                        <p className="my-5"><b>Endereço:</b> {mockDados.endereco}</p>
                        <p><b>Como você nos conheceu?</b> {mockDados.comoConheceu}</p>
                    </div>



                    <form>

                        <img src="blob:http://localhost:4000/60f40d4c-d50b-4319-a06a-ffee5410e3f8" alt=" foto" />
                    </form>

                </main>


            </div>
        </Wrapper>
    )
}