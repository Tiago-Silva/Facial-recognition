import Header from './components/Header';
import {useRef, useState} from "react";
import * as faceapi from "face-api.js";
import useLoadModels from "./hooks/useLoadModels.tsx";
import WebcamCard from "./components/WebcamCard.tsx";
import ResultCard from "./components/ResultCard.tsx";

function App() {
  const [expression, seExpression] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
        <WebcamCard videoRef={videoRef} canvasRef={canvasRef} handleLoadedMetadata={handleLoadedMetadata} />
        <ResultCard loading={loading} expression={expression} />
      </section>
    </main>
  );
}

export default App;
