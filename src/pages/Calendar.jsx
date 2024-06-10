import { CalendarComponent } from "../components/CalendarComponent";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import Wrapper from "../components/Wrapper";


export function Calendar() {

    return (
        <Wrapper>
            <div className="w-screen  bg-white dark:bg-dark-900">
                <Header />

                <main className="flex justify-between w-full overflow-hidden max-h-[calc(100vh-80px)]">
                    <Sidebar/>
                    <CalendarComponent />
                </main>
            </div>
        </Wrapper>
    );
}

