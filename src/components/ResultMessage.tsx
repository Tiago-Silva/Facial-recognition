import {JSX} from "react";

const ResultMessage = ({ expression = 'angry' }: { expression: string }) => {
    const message: { [key: string]: JSX.Element } = {
        happy: (<>Você está <span className='text-black'>feliz.</span> aproveite!</>),
        sad: (<>Você está um pouco <span className='text-black'>triste</span> hoje...</>),
        angry: (<>Por que a expressão: <span className='text-black'>brava?</span></>),
        surprised: (<>Parece que há alguma <span className='text-black'>surpresa</span> por ai!</>),
        disgusted: (<>Sua expressão é <span className='text-black'>enjoada.</span></>),
        fearful: (<>Do que você têm <span className='text-black'>medo?</span></>),
        neutral: (<>Você está <span className='text-black'>neutro.</span></>)
    };

    return <>{message[expression]}</>;
};

export default ResultMessage;
