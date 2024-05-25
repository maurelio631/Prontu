import { useState } from "react";
import { Link } from "react-router-dom";
import '../assets/styles/prontuario.css';
import corpo  from "../assets/corpohumano.png";

//components
import { Header } from "../components/Header";
import Wrapper from "../components/Wrapper";

//icons
import { PiFilePngDuotone } from "react-icons/pi";
import { FaChevronDown, FaChevronRight, FaRegTrashCan, FaTrash } from "react-icons/fa6";
import { LuPaperclip } from "react-icons/lu";
import { TbChevronLeft } from "react-icons/tb";

export function Prontuario() {
    const [groupExams, setGroupExams] = useState([]);
    const [gallery, setGallery] = useState([]);

    //modalState
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
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

    const [atendimentoData, setAtendimentoData] = useState([
        { nome: 'Atendimento 1', data: '12/12/2012', observacao:'C1-D; C4-E; C6-PE; L1-PE; S2-E;AS-E; Cóccix; T5-' },
        { nome: '', data: '', observacao:'' }
    ]);

    const handleExamsChange = (event) => {
        const files = Array.from(event.target.files);
        const fileData = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setGroupExams(fileData);
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

    return (
        <Wrapper>
            <div className="w-screen">
                <Header subtitle={'Prontuário de Atendimento de Quiropraxia'} />

                <main className="max-w-6xl m-auto flex flex-col px-4 lg:px-0">
                    <Link to={'/home/pacientes'} className="outline-none w-14 h-14 rounded-full border-2 border-cinza-escuro/20 flex items-center justify-center hover:bg-black/10">
                        <TbChevronLeft className="size-8" />
                    </Link>

                    <section className="w-full bg-prontuario p-3 text-base text-center bSpace rounded-lg mb-9">
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
                        <section className="w-full bg-prontuario rounded-lg py-5 px-10 mb-9">
                            <h2 className="text-azul-principal text-2xl font-bold text-center">{gallery.length === 0 ? 'Autoavaliação' : 'Galeria'}</h2>

                            <div className="flex justify-end mb-4 min-w-[980px]:mb-0">
                                <label htmlFor="fileGallery"
                                    className="bg-azul-principal text-white py-4 px-4 cursor-pointer rounded-lg flex items-center">
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
                                        <h2 className="text-azul-principal text-2xl font-bold my-2">Informações sobre saúde em geral e qualidade de vida:</h2>
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

                        <section className="w-full bg-prontuario rounded-lg py-5 px-10 mb-14">
                            <h2 className="text-azul-principal text-2xl font-bold text-center">Exames do paciente</h2>

                            <div className="flex justify-end">
                                <label htmlFor="fileExames"
                                    className="bg-azul-principal text-white py-4 px-4 cursor-pointer rounded-lg flex items-center">
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
                                            className="bg-vermelho text-white p-1.5 rounded-lg"
                                            onClick={(event) => handleRemoveFile(file.name, event)}
                                        >
                                            <FaRegTrashCan />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="w-full text-center mb-14">
                            <h2 className="text-azul-principal text-2xl font-bold mb-6">Observações</h2>
                            <textarea name="observacao" id="observacao" className="resize-none bg-[#F6FAFD] border border-cinza-escuro/20 w-full h-40 rounded-lg p-4"></textarea>
                        </section>

                        <section className="w-full text-center mb-14">
                            <h2 className="text-azul-principal text-2xl font-bold mb-6">Atendimentos</h2>

                            {atendimentoData.map((atendimento , i) => (
                                <div key={i} className="mb-2 bg-white border-2 border-azul-principal rounded-lg">
                                    <div className="flex justify-between items-center py-2 px-4">
                                        <div className=" flex gap-10">
                                            <input 
                                                type="text" 
                                                name={`nomeAtendimento${i + 1}`} 
                                                id={`nomeAtendimento${i + 1}`}  
                                                value={atendimento.nome}
                                                placeholder="Nome do atendimento"
                                                className="font-semibold w-full max-w-48 "
                                                onChange={(e) => {
                                                    const newName = [...atendimentoData];
                                                    newName[i].nome = e.target.value;
                                                    setAtendimentoData(newName);
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
                                                    const newData = [...atendimentoData];
                                                    newData[i].data = e.target.value;
                                                    setAtendimentoData(newData);
                                                }}
                                            />
                                            <span className="w-72 overflow-hidden whitespace-nowrap text-ellipsis">{atendimento.observacao}</span>
                                        </div>
                                        <span className="rounded-full hover:bg-azul-principal/40 p-1 cursor-pointer" onClick={() => toggleAccordion(i)}>{isAccordionOpen === i ? <FaChevronRight /> : <FaChevronDown />}</span>
                                    </div>


                                    {isAccordionOpen === i && (
                                        <div className="px-10 py-5 flex-1">
                                            <div className="flex">
                                                <select name="select">
                                                    <option value="valor1">Valor 1</option>
                                                    <option value="valor2" selected>Valor 2</option>
                                                    <option value="valor3">Valor 3</option>
                                                </select>
                                            </div>
                                            
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>

                        <section className="flex justify-between pb-16">
                            <button className="bg-vermelho text-white px-4 py-3 font-medium rounded-lg flex justify-between items-center">
                                <FaTrash  className="mr-3"/>
                                Apagar prontuário
                            </button>

                            <button className="bg-azul-principal text-white px-4 py-3  font-medium rounded-lg">
                                Salvar e encerrar atendimento
                            </button>
                        </section>
                    </form>
                </main>
            </div>
        </Wrapper>
    );
}
