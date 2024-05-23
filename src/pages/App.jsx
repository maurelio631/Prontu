import { Form } from "../components/Form";
import { Header } from "../components/Header";

import Sidebar from "../components/Sidebar";
import Wrapper from "../components/Wrapper";

function App() {

  return (
    <Wrapper>

      <div className="w-screen">
        <Header subtitle={`Autoavaliação Prontuário de Atendimento de Quiropraxia`}/>
        <Form/>
      </div>
    </Wrapper>
  );
}

export default App;
