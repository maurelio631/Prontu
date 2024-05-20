import etapa1 from '../assets/etapas1.svg'
import etapa2 from '../assets/etapas2.svg'
import etapa3 from '../assets/etapas3.svg'
import etapa4 from '../assets/etapas4.svg'
export function ViewStep({ step }) {

    const returnImg = () => {
        switch (step) {
            case 1:
                return <img src={etapa1} alt="primeiro form" className='max-w-28' />;
            case 2:
                return <img src={etapa2} alt="segundo form" className='max-w-28' />;
            case 3:
                return <img src={etapa3} alt="terceiro form" className='max-w-28' />;
            case 4:
                return <img src={etapa4} alt="quarto form" className='max-w-28' />;
            default:
                return <img src={etapa1} alt="primeiro form" className='max-w-28' />;
        }
    }

    return returnImg();
}