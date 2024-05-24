import { useEffect, useRef } from 'react';
import corpo from '../../assets/corpohumano.png';
import { FaCamera, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

export function FormUncomfortableAreas({ setFormData }) {

    const tela = useRef(null);
    const background = useRef(new Image());
    background.current.src = corpo; // Caminho para a sua imagem de fundo
    //alert
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    useEffect(() => {
        const canvas = tela.current;
        const contexto = canvas.getContext("2d");
        const pincel = {
            ativo: false,
            movendo: false,
            pos: { x: 0, y: 0 },
            posAnterior: null
        };

        const ajustarCanvas = () => {
            const proporcao = 500 / 425; // Proporção da imagem original (500 / 425)
            const largura = Math.min(window.innerWidth, 500);
            const altura = largura / proporcao;
            canvas.width = largura;
            canvas.height = altura;

            contexto.lineWidth = 12 * (largura / 500);
            contexto.strokeStyle = "rgba(218, 28, 28, 0.5)";
            drawBackground();
        };

        const drawBackground = () => {
            contexto.drawImage(background.current, 0, 0, canvas.width, canvas.height);
        };

        const desenharLinha = (linha) => {
            contexto.beginPath();
            contexto.moveTo(linha.posAnterior.x, linha.posAnterior.y);
            contexto.lineTo(linha.pos.x, linha.pos.y);
            contexto.stroke();
        };

        const obterPosicao = (evento) => {
            const rect = canvas.getBoundingClientRect();
            const escalaX = canvas.width / rect.width;
            const escalaY = canvas.height / rect.height;
            const x = (evento.clientX || evento.touches[0].clientX) - rect.left;
            const y = (evento.clientY || evento.touches[0].clientY) - rect.top;
            return {
                x: x * escalaX,
                y: y * escalaY
            };
        };

        const iniciarDesenho = (evento) => {
            evento.preventDefault();
            pincel.ativo = true;
            pincel.posAnterior = obterPosicao(evento);
        };

        const finalizarDesenho = (evento) => {
            evento.preventDefault();
            pincel.ativo = false;
        };

        const moverDesenho = (evento) => {
            evento.preventDefault();
            if (pincel.ativo) {
                pincel.pos = obterPosicao(evento);
                pincel.movendo = true;
                desenharLinha({ pos: pincel.pos, posAnterior: pincel.posAnterior });
                pincel.posAnterior = { x: pincel.pos.x, y: pincel.pos.y };
            }
        };

        // Eventos de mouse
        canvas.onmousedown = iniciarDesenho;
        canvas.onmouseup = finalizarDesenho;
        canvas.onmousemove = moverDesenho;
        canvas.onmouseout = finalizarDesenho;

        // Eventos de toque
        canvas.ontouchstart = iniciarDesenho;
        canvas.ontouchend = finalizarDesenho;
        canvas.ontouchmove = moverDesenho;
        canvas.ontouchcancel = finalizarDesenho;

        // Ajusta o canvas inicialmente
        window.addEventListener('resize', ajustarCanvas);
        ajustarCanvas();
        background.current.onload = drawBackground;

        return () => {
            window.removeEventListener('resize', ajustarCanvas);
        };
    }, []);

    const buttonClear = useRef(null);
    const buttonCapture = useRef(null);

    const limparCanvas = (evento) => {
        evento.preventDefault();
        const canvas = tela.current;
        const contexto = canvas.getContext("2d");
        contexto.clearRect(0, 0, canvas.width, canvas.height);
        contexto.drawImage(background.current, 0, 0, canvas.width, canvas.height);
    };

    const captureScreenshot = (evento) => {
    evento.preventDefault();
    const canvas = tela.current;

    // Reduzindo a imagem capturada
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = canvas.width / 2; // Ajuste o fator de escala conforme necessário
    scaledCanvas.height = canvas.height / 2;
    const scaledContext = scaledCanvas.getContext('2d');
    scaledContext.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);

    scaledCanvas.toBlob((blob) => {
        if (blob) {
            // Converta o Blob para um URL de objeto para visualização ou download
            const url = URL.createObjectURL(blob);

            // Para fins de depuração, exiba o URL ou o Blob no console
            console.log(url);
            console.log(blob);

            // Supondo que você tenha um estado chamado `formData` para armazenar a imagem capturada
            setFormData(prevState => ({
                ...prevState,
                uncomfortableAreas: {
                    scaledFrame: url
                }
            }));

            Toast.fire({
                icon: "success",
                title: "Captura feita com sucesso!"
            });
        }
    }, 'image/jpeg', 0.2); // Use JPEG com menor qualidade (0.2)
};

    return (
        <div className="m-auto">
            <h2 className='text-center font-medium mb-4 text-xl md:text-2xl '>Marque as áreas de desconforto na imagem abaixo</h2>

            <div className="flex flex-col items-center min-[875px]:flex-row min-[875px]:items-center min-[875px]:gap-12 min-[875px]:justify-center">

                <button className="hover:bg-azul-principal/60 bg-azul-principal p-2 rounded-md hidden min-[875px]:block" onClick={limparCanvas} ref={buttonClear}>
                    <FaTrash className='size-12 m-auto text-white' />
                    <p className='font-semibold text-white'>Desfazer</p>
                </button>

                <canvas ref={tela} className='w-full h-full max-w-[500px] max-h-[400px]'></canvas>

                <button className="hover:bg-azul-principal/60 bg-azul-principal p-2 rounded-md hidden min-[875px]:block" onClick={captureScreenshot} ref={buttonCapture}>
                    <FaCamera className='size-9 m-auto text-white' />
                    <p className='font-semibold text-white'>Salvar Áreas</p>
                </button>

                <div className='flex min-[875px]:hidden gap-10'>
                    <button className="limpar hover:bg-azul-principal/60 bg-azul-principal p-2 rounded-md" onClick={limparCanvas} ref={buttonClear}>
                        <FaTrash className='size-9 m-auto text-white' />
                        <p className='font-semibold text-white'>Desfazer</p>
                    </button>

                    <button className="limpar hover:bg-azul-principal/60 bg-azul-principal p-2 rounded-md" onClick={captureScreenshot} ref={buttonCapture}>
                        <FaCamera className='size-12 m-auto text-white' />
                        <p className='font-semibold text-white'>Salvar Áreas</p>
                    </button>
                </div>

            </div>
        </div>
    );
}
