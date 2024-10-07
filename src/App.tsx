import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import {useEffect, useRef, useState} from "react";
import * as faceapi from "face-api.js";

function App() {
  const [epxression, seExpression] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
      const videoEl = videoRef.current;
      if (videoEl) {
        videoEl.srcObject = stream;
      }
    });
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.loadTinyFaceDetectorModel('/models');
      await faceapi.loadFaceLandmarkModel('/models');
      await faceapi.loadFaceExpressionModel('/models');
    };

    loadModels().then(() => {});
  }, []);

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
                    className='rounded-lg'
                ></video>
                <canvas ref={canvasRef} className='absolute inset-0 h-full w-full'></canvas>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`bg-white rounded-xl px-8 py-6 flex gap-6 lg:gap-20 items-center h-[200px] justify-center`}
        >
          <p className="text-4xl text-center flex justify-center items-center text-yellow-300">
            {/* Substitua pelo texto */}
            Sua expressão é: {epxression}
            {/*<LoadingSpinner />*/}
            {/* Substitua pelo texto */}
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
