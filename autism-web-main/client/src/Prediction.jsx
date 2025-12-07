import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';


const calculateDistance = (point1, point2) => {
  const dx = point1[0] - point2[0];
  const dy = point1[1] - point2[1];
  return Math.sqrt(dx * dx + dy * dy);
};

const Prediction = () => {
  const webcamRef = useRef(null); 
  const canvasRef = useRef(null); 
  const [model, setModel] = useState(null); 
  const [previousLandmarks, setPreviousLandmarks] = useState(null);
  const [reactionPercentage, setReactionPercentage] = useState(0); 
  const [reactionCount, setReactionCount] = useState(0); 
  const [isReacting, setIsReacting] = useState(false); 
  const [lastReactionTimestamp, setLastReactionTimestamp] = useState(null); 


  useEffect(() => {
    const loadModel = async () => {
      const faceMeshModel = await facemesh.load();
      setModel(faceMeshModel);
    };

    loadModel();

    return () => {
      setModel(null); 
    };
  }, []);

  const getReactionPercentage = (count) => {
    if(count>30) return 100;
    if(count>=20) return 90;
    if (count >= 13) return 61; 
    if (count >= 10) return Math.min(60, 0 + Math.floor(count / 2) * 10); 
    if (count >= 3) return Math.min(0 + Math.floor(count / 2) * 10, 40); 
    return 0; 
  };


  const detectFace = async () => {
    if (webcamRef.current && model) {
      const video = webcamRef.current.video;
      const predictions = await model.estimateFaces(video);

      if (predictions.length > 0) {
        try {
          const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        predictions.forEach((prediction) => {
          const keypoints = prediction.scaledMesh;
          keypoints.forEach((point) => {
            ctx.beginPath();
            ctx.arc(point[0], point[1], 1, 0, 2 * Math.PI); 
            ctx.fillStyle = 'red';
            ctx.fill();
          });

        
          if (previousLandmarks) {
           
            const mouthLeft = keypoints[78]; 
            const mouthRight = keypoints[308];
            const leftEye = keypoints[130];
            const rightEye = keypoints[359];
            const eyebrowLeft = keypoints[70]; 
            const eyebrowRight = keypoints[300]; 

            
            const mouthDistanceCurrent = calculateDistance(mouthLeft, mouthRight);
            const mouthDistancePrevious = calculateDistance(previousLandmarks[78], previousLandmarks[308]);

            const eyeDistanceCurrent = calculateDistance(leftEye, rightEye);
            const eyeDistancePrevious = calculateDistance(previousLandmarks[130], previousLandmarks[359]);

            const eyebrowDistanceCurrent = calculateDistance(eyebrowLeft, eyebrowRight);
            const eyebrowDistancePrevious = calculateDistance(previousLandmarks[70], previousLandmarks[300]);

            
            const mouthMovement = Math.abs(mouthDistanceCurrent - mouthDistancePrevious);
            const eyeMovement = Math.abs(eyeDistanceCurrent - eyeDistancePrevious);
            const eyebrowMovement = Math.abs(eyebrowDistanceCurrent - eyebrowDistancePrevious);

           
            const totalMovement = mouthMovement + eyeMovement + eyebrowMovement;
            const reaction = Math.min(totalMovement / 50, 1); 

            
            const currentTime = Date.now();
            if (reaction > 0.1 && (!lastReactionTimestamp || currentTime - lastReactionTimestamp > 1000)) {
              setIsReacting(true);
              setReactionCount((prevCount) => prevCount + 1); 
              setLastReactionTimestamp(currentTime); 
            }

           
            const percentage = getReactionPercentage(reactionCount);
            setReactionPercentage(percentage);
            localStorage.setItem("autism-level",percentage)
          }

         
          const currentLandmarks = {
            78: keypoints[78], 
            308: keypoints[308], 
            130: keypoints[130],
            359: keypoints[359], 
            70: keypoints[70], 
            300: keypoints[300], 
          };
          setPreviousLandmarks(currentLandmarks);
        });
        } catch (error) {
          console.log(error)
        }
      }
    }
  };

  
  useEffect(() => {
    const interval = setInterval(detectFace, 100);
    return () => clearInterval(interval); 
  }, [model, previousLandmarks]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
   
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'user' }}
        width="100%"
        height="100%"
        style={{ objectFit: 'cover' }}
      />

      <canvas
        ref={canvasRef}
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1, 
          pointerEvents: 'none',
          objectFit : "cover"
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          fontSize: '24px',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 2, 
        }}
      >
        Reaction: {reactionPercentage}%
      </div>

      
      {isReacting && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            fontSize: '20px',
            color: 'yellow',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '10px',
            borderRadius: '5px',
            zIndex: 2, 
          }}
        >
          Person is reacting
        </div>
      )}
    </div>
  );
};

export default Prediction;
