import { Form } from "../components/Form";
import { Header } from "../components/Header";

import Wrapper from "../components/Wrapper";

export function Ficha() {

  return (
    <Wrapper>
      <div className="w-screen">
        <Header subtitle={`Autoavaliação Prontuário de Atendimento de Quiropraxia`}/>
        <Form/>
      </div>
    </Wrapper>
  );
}

