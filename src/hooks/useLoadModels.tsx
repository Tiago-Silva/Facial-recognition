import {useEffect} from "react";
import * as faceapi from "face-api.js";

const UseLoadModels = () => {
    useEffect(() => {
        const loadModels = async () => {
            await faceapi.loadTinyFaceDetectorModel('/models');
            await faceapi.loadFaceLandmarkModel('/models');
            await faceapi.loadFaceExpressionModel('/models');
        };

        loadModels().then(() => {});
    }, []);
};

export default UseLoadModels;
