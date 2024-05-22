import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import Wrapper from "../components/Wrapper";

export function Prontuario(){
    return(
        <Wrapper>
            <Sidebar></Sidebar>


            <div className="w-screen">
                <Header subtitle={'Prontuário de Atendimento de Quiropraxia'} />

            </div>
        </Wrapper>
    )
}