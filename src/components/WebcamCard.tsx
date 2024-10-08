import React from 'react';
import useWebcam from "../hooks/useWebcam.tsx";

const WebcamCard = ({
    videoRef,
    canvasRef,
    handleLoadedMetadata}: {
    videoRef: React.RefObject<HTMLVideoElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    handleLoadedMetadata: () => void
}) => {
    useWebcam(videoRef);
    return (
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
    );
};

export default WebcamCard;
