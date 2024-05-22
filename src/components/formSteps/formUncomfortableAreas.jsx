import { useEffect, useRef } from 'react';
import lixeira from '../../assets/lixeira.png';
import './canvaCorpo.css'

export function FormUncomfortableAreas() {

    const tela = useRef(null);

    useEffect(() => {
        const canvas = tela.current;
        const contexto = canvas.getContext("2d");
        const pincel = {
            ativo: false,
            movendo: false,
            pos: { x: 0, y: 0 },
            posAnterior: null
        }

        canvas.width = 500;
        canvas.height = 425;

        contexto.lineWidth = 12;
        contexto.strokeStyle = "rgba(218, 28, 28, 0.5)";

        const desenharLinha = (linha) => {
            contexto.beginPath();
            contexto.moveTo(linha.posAnterior.x, linha.posAnterior.y);
            contexto.lineTo(linha.pos.x, linha.pos.y);
            contexto.stroke();
        }

        const obterPosicaoMouse = (evento) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: evento.clientX - rect.left,
                y: evento.clientY - rect.top
            };
        }

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
        }

        canvas.onmouseout = () => {
            pincel.ativo = false
        }

    }, []);

    const buttonClear = useRef(null);
    const buttonCapture = useRef(null);

    const limparCanvas = (evento) => {
        evento.preventDefault();
        const canvas = tela.current;
        const contexto = canvas.getContext("2d");
        contexto.clearRect(0, 0, canvas.width, canvas.height);
    }

    const captureScreenshot = async(evento) => {
        evento.preventDefault();
        const canvas = tela.current;
        const contexto = canvas.getContext("2d");
        const video = document.createElement('video');

        try {
            const captureStream = await navigator.mediaDevices.getDisplayMedia({audio:false,video:true});
            video.srcObject = captureStream;
            contexto.drawImage(video, 0, 0, window.width, window.height);

            const frame = canvas.toDataURL('image/png');
            captureStream.getTracks().forEach(track => track.stop());

            console.log(frame)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className="m-auto">
            <h2 className='text-2xl text-center font-medium mb-4'>Marque as áreas de desconforto na imagem abaixo</h2>

            <div className="flex items-center gap-12 justify-center">
                <button className="limpar hover:bg-azul-principal/10 rounded-md" onClick={limparCanvas} ref={buttonClear}>
                    <img className="pincel-borracha" src={lixeira} alt="desfazer" />
                    <p className='font-semibold'>Desfazer</p>
                </button>
                <button className="limpar hover:bg-azul-principal/10 rounded-md" onClick={captureScreenshot} ref={buttonCapture}>
                    <img className="pincel-borracha" src={lixeira} alt="desfazer" />
                    <p className='font-semibold'>Capturar</p>
                </button>
                
                <canvas ref={tela} id='tela'></canvas>
            </div>
        </div>
    );
}
