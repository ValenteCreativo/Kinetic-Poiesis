'use client';

import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

const HandPose: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await handpose.load();
        return model;
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    };

    const startVideo = async (model: any) => {
      if (!videoRef.current) return;

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = async () => {
        videoRef.current!.play();
        await new Promise((resolve) => {
          videoRef.current!.onloadeddata = resolve;
        });
        detectHands(model);
      };
    };

    const detectHands = async (model: any) => {
      if (!videoRef.current || !canvasRef.current) return;

      try {
        const predictions = await model.estimateHands(videoRef.current);
        drawPredictions(predictions);
        requestAnimationFrame(() => detectHands(model));
      } catch (error) {
        console.error('Error detecting hands:', error);
      }
    };

    const drawPredictions = (predictions: any[]) => {
      const ctx = canvasRef.current!.getContext('2d');
      ctx!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

      predictions.forEach((prediction) => {
        const landmarks = prediction.landmarks;
        for (let i = 0; i < landmarks.length; i++) {
          const [x, y] = landmarks[i];
          ctx!.beginPath();
          ctx!.arc(x, y, 5, 0, 2 * Math.PI);
          ctx!.fillStyle = 'red';
          ctx!.fill();
        }
      });
    };

    const initializeTensorFlow = async () => {
      await tf.setBackend('webgl'); // O 'cpu', según lo que prefieras
      const model = await loadModel(); // Cargar el modelo después de establecer el backend
      if (model) {
        startVideo(model);
      }
    };

    initializeTensorFlow();

    return () => {
      const video = videoRef.current;
      if (video && video.srcObject) {
        const tracks = (video.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} autoPlay playsInline />
      <canvas ref={canvasRef} width={640} height={480} />
    </div>
  );
};

export default HandPose;
