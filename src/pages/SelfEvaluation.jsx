import { Form } from "../components/Form";
import { Header } from "../components/Header";

import Wrapper from "../components/Wrapper";

export function SelfEvaluation() {

  return (
    <Wrapper>
      <div className="w-screen bg-white dark:bg-dark-900">
        <Header subtitle={`Autoavaliação Prontuário de Atendimento de Quiropraxia`}/>
        <Form/>
      </div>
    </Wrapper>
  );
}

