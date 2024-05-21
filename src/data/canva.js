document.addEventListener('DOMContentLoaded', () => {

    const pincel = {
        ativo: false,
        movendo: false,
        pos: { x: 0, y: 0 },
        posAnterior: null
    }

    const tela = document.querySelector('#tela');
    const contexto = tela.getContext('2d');

    const buttonClear = document.querySelector(".limpar");

    tela.width = 500;
    tela.height = 425;

    contexto.lineWidth = 12;
    contexto.strokeStyle = "rgba(218, 28, 28, 0.5)"

    const desenharLinha = (linha) => {

        contexto.beginPath();
        contexto.moveTo(linha.posAnterior.x, linha.posAnterior.y);
        contexto.lineTo(linha.pos.x, linha.pos.y)
        contexto.stroke();
    }

    tela.onmousedown = (evento) => { pincel.ativo = true };
    tela.onmouseup = (evento) => { pincel.ativo = false };

    tela.onmousemove = (evento) => {
        pincel.pos.x = evento.clientX - tela.offsetLeft + scrollX
        pincel.pos.y = evento.clientY - tela.offsetTop + scrollY
        pincel.movendo = true;
    }

    tela.onmouseout = (evento) => {
        pincel.ativo = false
    }

    const ciclo = () => {
        if (pincel.ativo && pincel.movendo && pincel.posAnterior) {
            desenharLinha({ pos: pincel.pos, posAnterior: pincel.posAnterior })
            pincel.movendo = false;
        }
        pincel.posAnterior = { x: pincel.pos.x, y: pincel.pos.y }

        setTimeout(ciclo, 5);
    }

    ciclo()

    buttonClear.addEventListener("click", () => {
        contexto.clearRect(0, 0, tela.width, tela.height)
    })

})