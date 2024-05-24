import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import Wrapper from "../components/Wrapper";

export function Agenda() {
    return(
        <Wrapper>
            <div className="w-screen">
                <Header />
                <main className="flex justify-between">
                    <Sidebar></Sidebar>


                    <div className="w-full px-4 ">
                    </div>
                </main>
            </div>
        </Wrapper>
    )
}