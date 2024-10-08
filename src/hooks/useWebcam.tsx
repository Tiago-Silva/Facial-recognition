import React, {useEffect} from "react";

const UseWebcam = (videoRef: React.RefObject<HTMLVideoElement>) => {

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
            const videoEl = videoRef.current;
            if (videoEl) {
                videoEl.srcObject = stream;
            }
        });
    }, []);
};

export default UseWebcam;
