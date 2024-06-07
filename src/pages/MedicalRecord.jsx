import { useState } from "react";
import { Link } from "react-router-dom";
import corpo  from "../assets/corpohumano.png";

//components
import { Header } from "../components/Header";
import Wrapper from "../components/Wrapper";

//icons
import { PiFilePngDuotone } from "react-icons/pi";
import { FaChevronDown, FaChevronRight, FaRegTrashCan, FaTrash } from "react-icons/fa6";
import { LuPaperclip } from "react-icons/lu";
import { TbChevronLeft } from "react-icons/tb";

export function MedicalRecord() {
    //states de config de "componentes" 
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    //states de dados
    const [groupExams, setGroupExams] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [observation, setObservation] = useState("")
    const [serviceData, setServiceData] = useState([
        {   nome: 'Atendimento 1', 
            data: '15/05/2005', 
            observacao: 'teste para volta', 
            checkboxes: { 
                C1: ['PE', 'D'] ,
                Cóccix: ['PE', 'D'],
                L2: ['PE'],
                PI: ['PE', 'D'],
                S2: ['PE', 'E'],
                T5: ['E', 'PE', 'D'],
        }},
        { nome: '', data: '', observacao: '', checkboxes: {} }
    ]);
    const [finalData, setFinalData] = useState({});


    //substituir dps
    const mockDados = {
        nome: 'Maria Aparecida Oliveira da Cruz',
        nascimento: '01/02/1954',
        proficao: 'Aposentada',
        cpf: '063.524.418-74',
        tel: '(11) 91234-5678',
        email: 'maria_ap.cruz@gmail.com',
        endereco: 'Rua Matias Lopes, 630 - Parque Boa Esperança - SP',
        comoConheceu: 'Google',
        sintomas: {
            descSintomas: 'Dor na lombar e no ombro',
            comoComeçaram: 'Má postura ou atividades diárias',
            tipoDesconforto: 'Pontada; formigamento',
            frequencia: '50% a 75%',
            desconfortoAumenta: 'Movimento; de pé; tossir/ espirrar',
            desconfortoDiminui: 'Quiropraxia; alongamento; gelo'
        },
        saudeGeral: {
            estadoGeral: 'Modificações de peso, diabetes',
            cabecaPescoço: 'Dor de cabeça; desmaios',
            toraxRespiratorio: 'Nódulo/secreção mama; Dispinéia',
            cardioVascular: '',
            gastroIntestinal: '',
            genitoUrinário: 'Cólica menstrual'
        }
    };
    const camposSelect = {
        C: ["C1", "C2", "C3", "C4", "C5", "C6", "C7",],
        T: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12",],
        L: ["L1", "L2", "L3", "L4", "L5"],
        PS: ["PS", "AI", "S2", "S3"],
        PI: ["PI" , "AS"],
        Coccix: ["Cóccix"]
    }

    const handleExamsChange = (event) => {
        const files = Array.from(event.target.files);
        const fileData = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setGroupExams(fileData);
        console.log(groupExams)
    };
    const handleRemoveFile = (fileNameToRemove, event) => {
        event.preventDefault()
        setGroupExams(prevGroupExams => prevGroupExams.filter(file => file.name !== fileNameToRemove));
    };

    const handleGalleryChange = (event) => {
        const files = Array.from(event.target.files);
        const newFiles = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setGallery(prevGallery => [...prevGallery, ...newFiles]);
        console.log(gallery)
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };
    const toggleAccordion = (i) => {
        setIsAccordionOpen(isAccordionOpen === i ? null : i);
    };

    // Função que lida com o clique em uma opção, alternando a seleção entre ela e 'null' se já estiver selecionada
    const handleOptionClick = (opcao) => {
        setSelectedOption(selectedOption === opcao ? null : opcao);
    };
    // Função que lida com a mudança de estado de um checkbox, adicionando ou removendo valores conforme necessário
    const handleCheckboxChange = (event, opcao, index) => {
        const { name, checked } = event.target;
        setServiceData(prevData => {
            const newData = [...prevData];
            const checkboxValues = newData[index].checkboxes[opcao] || [];
            if (checked) {
                if (!checkboxValues.includes(name)) {
                    newData[index].checkboxes[opcao] = [...checkboxValues, name];
                }
            } else {
                newData[index].checkboxes[opcao] = checkboxValues.filter(value => value !== name);
                if (newData[index].checkboxes[opcao].length === 0) {
                    delete newData[index].checkboxes[opcao];
                }
            }
            return newData;
        });
    };
    // Função que verifica se algum checkbox está marcado para uma opção específica
    const isAnyCheckboxChecked = (opcao, index) => {
        return serviceData[index].checkboxes[opcao] && serviceData[index].checkboxes[opcao].length > 0;
    };
    // Função que retorna a classe de cor correspondente a uma opção, com base nas categorias de camposSelect
    const getColorClass = (option) => {
        if (camposSelect.C.includes(option)) return 'bg-[#F19393]';
        if (camposSelect.T.includes(option)) return 'bg-[#F1E893]';
        if (camposSelect.L.includes(option)) return 'bg-[#C2F193]';
        if (camposSelect.PS.includes(option)) return 'bg-[#93F1EB]';
        if (camposSelect.PI.includes(option)) return 'bg-[#93C4F1]';
        if (camposSelect.Coccix.includes(option)) return 'bg-[#F1CB93]';
        return ''; // Retorna uma string vazia se a opção não corresponder a nenhuma categoria
    };
    // Função que lida com a mudança de texto na área de texto, atualizando a observação no serviceData
    const handleTextareaService = (e, index) => {
        const newValue = e.target.value;
        const checkboxPart = Object.entries(serviceData[index].checkboxes).flatMap(([opcao, values]) => values.map(value => `${opcao}-${value}`)).join(', ');
        const newObservacao = newValue.substring(checkboxPart.length + 2); // +2 para ignorar "; " após os checkboxes
        setServiceData(prevData => {
            const newData = [...prevData];
            newData[index].observacao = newObservacao;
            return newData;
        });
    };

    const handleTextareaObservation = (event) =>{
        setObservation(event.target.value)
    }

    const handleEncerrarAtendimento = (event) => {
        event.preventDefault()
        const allData = {
            groupExams,
            gallery,
            observation,
            serviceData
        };
        setFinalData(allData);
        console.log(allData);
    };


    return (
        <Wrapper>
            <div className="w-screen">
                <Header subtitle={'Prontuário de Atendimento de Quiropraxia'} />

                <main className="max-w-6xl m-auto flex flex-col px-4 lg:px-0">
                    <Link to={'/home/pacientes'} className="mb-10 outline-none w-14 h-14 rounded-full border-2 border-cinza-900/20 flex items-center justify-center hover:bg-black/10">
                        <TbChevronLeft className="size-8" />
                    </Link>

                    <section className="w-full bg-azul-700 p-3 text-base text-center bSpace rounded-lg mb-9">
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
                    </section>

                    <form>
                        <section className="w-full bg-azul-700 rounded-lg py-5 px-10 mb-9">
                            <h2 className="text-azul-900 text-2xl font-bold text-center">{gallery.length === 0 ? 'Autoavaliação' : 'Galeria'}</h2>

                            <div className="flex justify-end mb-4 min-w-[980px]:mb-0">
                                <label htmlFor="fileGallery"
                                    className="bg-azul-900 text-white py-4 px-4 cursor-pointer rounded-lg flex items-center">
                                    <LuPaperclip className="size-5 mr-3" /> Anexar documentos
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="fileGallery"
                                        name="fileGallery"
                                        className="hidden"
                                        multiple
                                        onChange={handleGalleryChange}
                                    />
                                </label>
                            </div>

                            {gallery.length === 0 ? (
                                <>
                                    <div className="flex gap-10">
                                        <img className="max-w-80 w-full max-h-80 rounded-lg" src={corpo} alt="areas desconfortaveis" />
                                        <div className="flex flex-col justify-center gap-3 bSpacexl">
                                            <p>
                                                <b>Sintomas:</b>
                                                {mockDados.sintomas.descSintomas}
                                            </p>
                                            <p>
                                                <b>Como começaram os sintomas?</b>
                                                {mockDados.sintomas.comoComeçaram}
                                            </p>
                                            <p>
                                                <b>Qual o tipo de desconforto?</b>
                                                {mockDados.sintomas.tipoDesconforto}
                                            </p>
                                            <p>
                                                <b>Qual a frequência dos sintomas?</b>
                                                {mockDados.sintomas.frequencia}
                                            </p>
                                            <p>
                                                <b>O desconforto aumenta com:</b>
                                                {mockDados.sintomas.desconfortoAumenta}
                                            </p>
                                            <p>
                                                <b>O desconforto diminui com:</b>
                                                {mockDados.sintomas.desconfortoDiminui}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-5 flex flex-col gap-4 bSpacexl">
                                        <h2 className="text-azul-900 text-2xl font-bold my-2">Informações sobre saúde em geral e qualidade de vida:</h2>
                                        <p>
                                            <b>Estado Geral:</b>
                                            {mockDados.saudeGeral.estadoGeral !== '' ? mockDados.saudeGeral.estadoGeral : '---'}
                                        </p>
                                        <p>
                                            <b>Cabeça e Pescoço:</b>
                                            {mockDados.saudeGeral.cabecaPescoço !== '' ? mockDados.saudeGeral.cabecaPescoço : '---'}
                                        </p>
                                        <p>
                                            <b>Tórax/Respiratório:</b>
                                            {mockDados.saudeGeral.toraxRespiratorio !== '' ? mockDados.saudeGeral.toraxRespiratorio : '---'}
                                        </p>
                                        <p>
                                            <b>Cardio-Vascular:</b>
                                            {mockDados.saudeGeral.cardioVascular !== '' ? mockDados.saudeGeral.cardioVascular : '---'}
                                        </p>
                                        <p>
                                            <b>Gastro-Intestinal:</b>
                                            {mockDados.saudeGeral.gastroIntestinal !== '' ? mockDados.saudeGeral.gastroIntestinal : '---'}
                                        </p>
                                        <p>
                                            <b>Gênito-Urinário:</b>
                                            {mockDados.saudeGeral.genitoUrinário !== '' ? mockDados.saudeGeral.genitoUrinário : '---'}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {gallery.map((file, index) => (

                                        <div key={index} className={`w-full max-w-52 h-36 relative flex  flex-col items-center`} onClick={() => handleImageClick(file)}>
                                            <img src={file.url} alt={file.name} className="w-full h-full rounded-lg" />
                                            <span className="text-sm absolute w-full bg-black/50 text-white p-2 bottom-0">{file.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {isModalOpen && selectedImage && (
                                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center" onClick={handleCloseModal}>
                                    <div className="relative">
                                        <img src={selectedImage.url} alt={selectedImage.name} className="max-w-full max-h-full" />
                                    </div>
                                </div>
                            )}
                        </section>

                        <section className="w-full bg-azul-700 rounded-lg py-5 px-10 mb-14">
                            <h2 className="text-azul-900 text-2xl font-bold text-center">Exames do paciente</h2>

                            <div className="flex justify-end">
                                <label htmlFor="fileExames"
                                    className="bg-azul-900 text-white py-4 px-4 cursor-pointer rounded-lg flex items-center">
                                    <LuPaperclip className="size-5 mr-3" /> Anexar documentos
                                    <input
                                        type="file"
                                        id="fileExames"
                                        name="fileExames"
                                        className="hidden"
                                        multiple
                                        onChange={handleExamsChange}
                                    />
                                </label>
                            </div>

                            <div className="flex justify-center gap-2">
                                {groupExams.map((file, index) => (
                                    <div key={index} className="bg-white px-2 py-3 my-2 rounded-lg flex justify-between items-center gap-2">
                                        <a href={file.url} download={file.name} className="flex items-center gap-2">
                                            <PiFilePngDuotone className="size-6" />
                                            <span>{file.name}</span>
                                        </a>
                                        <button
                                            className="bg-vermelho-900 text-white p-1.5 rounded-lg"
                                            onClick={(event) => handleRemoveFile(file.name, event)}
                                        >
                                            <FaRegTrashCan />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="w-full text-center mb-14">
                            <h2 className="text-azul-900 text-2xl font-bold mb-6">Observações</h2>
                            <textarea name="observacao" id="observacao" onChange={(event) => handleTextareaObservation(event)} className="custom-input w-full h-40 p-4 resize-none"></textarea>
                        </section>

                        <section className="w-full text-center mb-14">
                            <h2 className="text-azul-900 text-2xl font-bold mb-6">Atendimentos</h2>

                            {serviceData.map((atendimento, i) => (
                                <div key={i} className="mb-2 bg-white border-2 border-azul-900 rounded-lg">
                                    <div className="flex justify-between items-center py-2 px-4">
                                        <div className="flex gap-10">
                                            <input
                                                type="text"
                                                name={`nomeAtendimento${i + 1}`}
                                                id={`nomeAtendimento${i + 1}`}
                                                value={atendimento.nome}
                                                placeholder="Nome do atendimento"
                                                className="font-semibold w-full max-w-48"
                                                onChange={(e) => {
                                                    const newName = [...serviceData];
                                                    newName[i].nome = e.target.value;
                                                    setServiceData(newName);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                name={`dataAtendimento${i + 1}`}
                                                id={`dataAtendimento${i + 1}`}
                                                value={atendimento.data}
                                                placeholder="XX/XX/XXXX"
                                                className="max-w-20"
                                                onChange={(e) => {
                                                    const newData = [...serviceData];
                                                    newData[i].data = e.target.value;
                                                    setServiceData(newData);
                                                }}
                                            />
                                            <span className="w-72 overflow-hidden whitespace-nowrap text-ellipsis">
                                                {`${Object.entries(atendimento.checkboxes).flatMap(([opcao, values]) => values.map(value => `${opcao}-${value}`)).join(', ')} ${atendimento.observacao}`}
                                            </span>
                                        </div>
                                        <span className="rounded-full hover:bg-azul-900/40 p-1 cursor-pointer" onClick={() => toggleAccordion(i)}>
                                            {isAccordionOpen === i ? <FaChevronRight /> : <FaChevronDown />}
                                        </span>
                                    </div>

                                    {isAccordionOpen === i && (
                                        <div className="px-10 py-5 flex flex-col gap-2">
                                            {Object.entries(camposSelect).map(([category, options]) => (
                                                <div key={category} className="flex flex-row">
                                                    {options.map((opcao) => (
                                                        <div
                                                            key={opcao}
                                                            className={`py-1 px-3 border border-black relative ${isAnyCheckboxChecked(opcao, i) ? getColorClass(opcao) : ''}`}
                                                        >
                                                            <div onClick={() => handleOptionClick(opcao)} className="cursor-pointer">
                                                                {opcao}
                                                            </div>
                                                            {selectedOption === opcao && (
                                                                <div className="flex gap-2 border-black bg-white border w-32 p-1 rounded absolute -left-px -bottom-11 z-10">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="options-input"
                                                                        name="E"
                                                                        id={`${opcao}-E`}
                                                                        checked={atendimento.checkboxes[opcao]?.includes("E") || false}
                                                                        onChange={(event) => handleCheckboxChange(event, opcao, i)}
                                                                    />
                                                                    <label htmlFor={`${opcao}-E`} className="options-label w-1/3">E</label>

                                                                    <input
                                                                        type="checkbox"
                                                                        className="options-input"
                                                                        name="PE"
                                                                        id={`${opcao}-PE`}
                                                                        checked={atendimento.checkboxes[opcao]?.includes("PE") || false}
                                                                        onChange={(event) => handleCheckboxChange(event, opcao, i)}
                                                                    />
                                                                    <label htmlFor={`${opcao}-PE`} className="options-label w-1/3">PE</label>

                                                                    <input
                                                                        type="checkbox"
                                                                        className="options-input"
                                                                        name="D"
                                                                        id={`${opcao}-D`}
                                                                        checked={atendimento.checkboxes[opcao]?.includes("D") || false}
                                                                        onChange={(event) => handleCheckboxChange(event, opcao, i)}
                                                                    />
                                                                    <label htmlFor={`${opcao}-D`} className="options-label w-1/3">D</label>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                            <textarea
                                                className="resize-none bg-azul-800 border border-cinza-900/20 w-full h-20 rounded-lg p-4 mt-4"
                                                value={`${Object.entries(serviceData[i].checkboxes).flatMap(([opcao, values]) => values.map(value => `${opcao}-${value}`)).join(', ')}; ${serviceData[i].observacao}`}
                                                onChange={(e) => handleTextareaService(e, i)}
                                            ></textarea>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>

                        <section className="flex justify-between pb-16">
                            <button className="bg-vermelho-900 text-white px-4 py-3 font-medium rounded-lg flex justify-between items-center">
                                <FaTrash  className="mr-3"/>
                                Apagar prontuário
                            </button>

                            <button className="bg-azul-900 text-white px-4 py-3  font-medium rounded-lg" onClick={(event)=>handleEncerrarAtendimento(event)}>
                                Salvar e encerrar atendimento
                            </button>
                        </section>
                    </form>
                </main>
            </div>
        </Wrapper>
    );
}
