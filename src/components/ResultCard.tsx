import LoadingSpinner from "./LoadingSpinner.tsx";
import {translateExpressionToEmoji} from "../lib/utils.ts";
import ResultMessage from "./ResultMessage.tsx";

const ResultCard = ({
    loading,
    expression
}: {
    loading: boolean;
    expression: string;
}) => {
    return (
        <div
            className={`bg-white rounded-xl px-8 py-6 flex gap-6 lg:gap-20 items-center h-[200px] ${loading ? 'justify-center' : 'justify-between'}`}
        >
            {loading ?
                (
                    <div className='flex items-center text-6xl text-amber-300'>
                        <LoadingSpinner/>
                    </div>
                ) :
                (
                    <>
                    <span className='lg-tex-[100px] text-6xl'>
                      {expression && translateExpressionToEmoji(expression)}
                    </span>
                        <h3 className='text-3xl text-right lg:text-4xl md:text-3xl text-yellow-500 font-secondary'>
                            <ResultMessage expression={expression}/>
                        </h3>
                    </>
                )
            }

        </div>
    );
};

export default ResultCard;
