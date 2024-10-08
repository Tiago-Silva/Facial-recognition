import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import {useRef, useState} from "react";
import * as faceapi from "face-api.js";
import {translateExpressionToEmoji} from "./lib/utils.ts";
import ResultMessage from "./components/ResultMessage.tsx";
import useWebcam from "./hooks/useWebcam.tsx";
import useLoadModels from "./hooks/useLoadModels.tsx";

function App() {
  const [expression, seExpression] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useWebcam(videoRef);
  useLoadModels();

  const handleLoadedMetadata = async () => {
    const videoEl = videoRef.current;
    const canvasEl = canvasRef.current;
    if (!videoEl || !canvasEl) return;

    const detection = await faceapi.detectSingleFace(
        videoEl as HTMLVideoElement, new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks().withFaceExpressions();

    if (detection) {
      const dominantExpression = detection.expressions.asSortedArray()[0];
      seExpression(dominantExpression.expression);

      faceapi.matchDimensions(canvasEl, {
        width: videoEl?.offsetWidth,
        height: videoEl?.offsetHeight
      });
      const resizeResults = faceapi.resizeResults(detection, {
        width: videoEl?.offsetWidth,
        height: videoEl?.offsetHeight,
      });
      faceapi.draw.drawDetections(canvasEl as HTMLCanvasElement, resizeResults);
      faceapi.draw.drawFaceLandmarks(canvasEl as HTMLCanvasElement, resizeResults);
      faceapi.draw.drawFaceExpressions(canvasEl as HTMLCanvasElement, resizeResults);

      setLoading(false);
    }

    setTimeout(() => handleLoadedMetadata(), 100);
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row md:justify-between gap-14 xl:gap-40 p-10 items-center container mx-auto">
      <Header />
      <section className="flex flex-col gap-6 flex-1 w-full">
        <div className="bg-white rounded-xl p-2">
          <div className="relative flex items-center justify-center aspect-video w-full">
            <div className="aspect-video rounded-lg bg-gray-300 w-full">
              <div className='relative flex items-center justify-center w-full aspect-video'>
                <video
                    onLoadedMetadata={handleLoadedMetadata}
                    autoPlay
                    ref={videoRef}
                    className='rounded-lg w-full'
                ></video>
                <canvas ref={canvasRef} className='absolute inset-0 h-full w-full'></canvas>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`bg-white rounded-xl px-8 py-6 flex gap-6 lg:gap-20 items-center h-[200px] ${loading ? 'justify-center' : 'justify-between'}`}
        >
            {loading ?
                (
                    <div className='flex items-center text-6xl text-amber-300'>
                      <LoadingSpinner />
                    </div>
                )  :
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
      </section>
    </main>
  );
}

export default App;
