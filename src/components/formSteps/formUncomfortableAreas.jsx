import { useEffect, useRef } from 'react';
import lixeira from '../../assets/lixeira.png';
import corpo from '../../assets/corpohumano.png';
import { FaCamera, FaTrash } from 'react-icons/fa';

export function FormUncomfortableAreas() {

    const tela = useRef(null);
    const background = new Image();
    background.src = corpo; // Replace with the path to your background image

    useEffect(() => {
        const canvas = tela.current;
        const contexto = canvas.getContext("2d");
        const pincel = {
            ativo: false,
            movendo: false,
            pos: { x: 0, y: 0 },
            posAnterior: null
        };

        canvas.width = 500;
        canvas.height = 425;

        contexto.lineWidth = 12;
        contexto.strokeStyle = "rgba(218, 28, 28, 0.5)";

        const drawBackground = () => {
            contexto.drawImage(background, 0, 0, canvas.width, canvas.height);
        };

        const desenharLinha = (linha) => {
            contexto.beginPath();
            contexto.moveTo(linha.posAnterior.x, linha.posAnterior.y);
            contexto.lineTo(linha.pos.x, linha.pos.y);
            contexto.stroke();
        };

        const obterPosicaoMouse = (evento) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: evento.clientX - rect.left,
                y: evento.clientY - rect.top
            };
        };

        canvas.onmousedown = (evento) => {
            pincel.ativo = true;
            pincel.posAnterior = obterPosicaoMouse(evento);
        };

        canvas.onmouseup = () => { pincel.ativo = false };

        canvas.onmousemove = (evento) => {
            if (pincel.ativo) {
                pincel.pos = obterPosicaoMouse(evento);
                pincel.movendo = true;
                desenharLinha({ pos: pincel.pos, posAnterior: pincel.posAnterior });
                pincel.posAnterior = { x: pincel.pos.x, y: pincel.pos.y };
            }
        };

        canvas.onmouseout = () => {
            pincel.ativo = false;
        };

        // Draw the background initially
        background.onload = drawBackground;

    }, []);

    const buttonClear = useRef(null);
    const buttonCapture = useRef(null);

    const limparCanvas = (evento) => {
        evento.preventDefault();
        const canvas = tela.current;
        const contexto = canvas.getContext("2d");
        contexto.clearRect(0, 0, canvas.width, canvas.height);
        const background = new Image();
        background.src = 'path_to_your_background_image';
        background.onload = () => {
            contexto.drawImage(background, 0, 0, canvas.width, canvas.height);
        };
    };

    const captureScreenshot = (evento) => {
        evento.preventDefault();
        const canvas = tela.current;

        // Option 1: Scale down the image further
        const scaledCanvas = document.createElement('canvas');
        scaledCanvas.width = canvas.width / 1; // Adjust the scaling factor as needed
        scaledCanvas.height = canvas.height / 1;
        const scaledContext = scaledCanvas.getContext('2d');
        scaledContext.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);
        const scaledFrame = scaledCanvas.toDataURL('image/jpeg', 0.5); // Use JPEG with lower quality (0.5)

        console.log(scaledFrame);
    };

    return (
        <div className="m-auto">
            <h2 className='text-2xl text-center font-medium mb-4'>Marque as áreas de desconforto na imagem abaixo</h2>

            <div className="flex items-center gap-12 justify-center">
                <button className="limpar hover:bg-azul-principal/10 rounded-md" onClick={limparCanvas} ref={buttonClear}>
                    <FaTrash className='size-12 m-auto text-black/80' />
                    <p className='font-semibold'>Desfazer</p>
                </button>

                <canvas ref={tela} className='w-full h-full max-w-[500px] max-h-[400px]'></canvas>


                <button className="limpar hover:bg-azul-principal/10 rounded-md" onClick={captureScreenshot} ref={buttonCapture}>
                    <FaCamera className='size-12 m-auto text-black/80'/>
                    <p className='font-semibold'>Capturar</p>
                </button>

            </div>
        </div>
    );
}
