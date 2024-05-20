import Clinica from "./assets/Clinica.png";
import Funcionario from "./assets/Funcionario.png";
import { Form } from "./components/Form";
import { Header } from "./components/Header";

import Sidebar from "./components/Sidebar";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Wrapper>
      <Sidebar></Sidebar>

      <div className="w-screen">
        <Header subtitle={'Auto-avaliação - Prontuário de Atendimento de Quiropraxia'}/>
        <Form/>
      </div>
    </Wrapper>
  );
}

export default App;
