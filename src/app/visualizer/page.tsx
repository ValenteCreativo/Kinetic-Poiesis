'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Camera, HandMetal, Eraser } from 'lucide-react';

export default function HandDrawPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [model, setModel] = useState<any>(null);
  const [drawingContext, setDrawingContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load TensorFlow.js and Handpose model
    const loadLibraries = async () => {
      try {
        // Load TensorFlow.js and Handpose scripts
        const tf = document.createElement('script');
        tf.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js';
        const handpose = document.createElement('script');
        handpose.src = 'https://cdn.jsdelivr.net/npm/@tensorflow-models/handpose@0.0.7/dist/handpose.min.js';
        
        document.body.appendChild(tf);
        
        // Wait for TensorFlow to load before loading handpose
        tf.onload = () => {
          document.body.appendChild(handpose);
          handpose.onload = initializeHandpose;
        };
      } catch (error) {
        console.error('Error loading libraries:', error);
        setIsLoading(false);
      }
    };

    loadLibraries();

    return () => {
      // Cleanup
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const initializeHandpose = async () => {
    try {
      if (!videoRef.current) return;

      // Initialize camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480
        }
      });
      videoRef.current.srcObject = stream;

      // Wait for video to be ready
      await new Promise((resolve) => {
        if (videoRef.current) {
          videoRef.current.onloadeddata = resolve;
        }
      });

      // Load handpose model
      // @ts-ignore (handpose is loaded from CDN)
      const handposeModel = await handpose.load();
      setModel(handposeModel);
      setIsLoading(false);

      // Initialize canvas
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.strokeStyle = '#00ff00';
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          setDrawingContext(ctx);
        }
      }

      // Start detection loop
      detect();
    } catch (error) {
      console.error('Error initializing:', error);
      setIsLoading(false);
    }
  };

  const detect = async () => {
    if (!model || !videoRef.current) return;

    try {
      const predictions = await model.estimateHands(videoRef.current);
      
      if (predictions.length > 0 && isDrawing) {
        // Get index finger tip position
        const finger = predictions[0].landmarks[8];
        draw(finger[0], finger[1]);
      }
    } catch (error) {
      console.error('Detection error:', error);
    }

    // Continue detection loop
    requestAnimationFrame(detect);
  };

  const draw = (x: number, y: number) => {
    if (!drawingContext || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    drawingContext.lineTo(canvasX, canvasY);
    drawingContext.stroke();
    drawingContext.beginPath();
    drawingContext.moveTo(canvasX, canvasY);
  };

  const clearCanvas = () => {
    if (drawingContext && canvasRef.current) {
      drawingContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HandMetal className="w-6 h-6" />
            Hand Drawing App
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
                <div className="text-lg font-semibold">Loading model...</div>
              </div>
            )}
            <video
              ref={videoRef}
              className="w-full h-[480px] object-cover mirror-mode"
              autoPlay
              playsInline
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
              width={640}
              height={480}
            />
          </div>
          
          <div className="flex gap-4 mt-4">
            <Button
              variant={isDrawing ? "default" : "outline"}
              onClick={() => setIsDrawing(!isDrawing)}
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <HandMetal className="w-4 h-4" />
              {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
            </Button>
            
            <Button
              variant="outline"
              onClick={clearCanvas}
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <Eraser className="w-4 h-4" />
              Clear Canvas
            </Button>
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        .mirror-mode {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
}