import "./App.css";
import Clinica from "./assets/Clinica.png";
import Funcionario from "./assets/Funcionario.png";

import Sidebar from "./components/Sidebar";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Wrapper>
      <Sidebar></Sidebar>

      <div className="w-screen">
        <div className="flex flex-row justify-between p-4">
          <div className="flex items-center gap-4">
            <img src={Clinica} alt="logo da clínica" />
            <h2>Nome da Clínica</h2>
          </div>

          <div className="flex items-center gap-4">
            <p>Nome do Funcionário</p>
            <img src={Funcionario} alt="foto do funcionário" />
          </div>
        </div>

        <div className="text-center border-t-[1px] border-b-[1px] border-black">
          <h1>Auto-avaliação - Prontuário de Atendimento de Quiropraxia</h1>
        </div>

        <div>
          <form>
            <div className="flex">
              <p>Nome completo:</p>
              <input
                type="text"
                name="nome"
                className="border border-solid rounded-sm b-[#6A8795]"
              />
            </div>

            <div>
              <p>Data de nascimento:</p>
              <input type="date" name="data" />
              <p>Idade: XX anos</p>
            </div>

            <div>
              <p>Profissão:</p>
              <input type="text" name="profissao" />
            </div>

            <div>
              <p>Tel. Contato:</p>
              <input type="tel" name="contato" />
            </div>

            <div>
              <p>CPF:</p>
              <input type="number" name="cpf" />
            </div>

            <div>
              <p>E-mail:</p>
              <input type="email" name="email" />
            </div>

            <div>
              <p>Endereço:</p>
              <input type="text" name="endereco" />
            </div>

            <div>
              <p>Como você nos conheceu?</p>
              <input type="text" name="indicacao" />
            </div>
          </form>

          <div className="flex justify-around">
            <button className="bg-[#A3A3A3] text-white px-3 py-2 rounded-md">
              Cancelar
            </button>
            <button className="bg-[#5A9CDA] text-white px-3 py-2 rounded-md">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
