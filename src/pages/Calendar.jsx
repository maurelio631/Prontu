import { CalendarComponent } from "../components/CalendarComponent";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import Wrapper from "../components/Wrapper";


export function Calendar() {

    return (
        <Wrapper>
            <div className="w-screen">
                <Header />

                <main className="flex justify-between w-full">
                    <Sidebar/>
                    <CalendarComponent />

                </main>
            </div>
        </Wrapper>
    );
}

