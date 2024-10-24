// src/app/types/ml5.d.ts
declare module 'ml5' {
    type Ml5Callback<T = unknown> = (result: T) => void;

    interface Handpose {
        video: HTMLVideoElement;
        predict: () => Promise<HandposePrediction[]>;
    }

    interface HandposePrediction {
        landmarks: [number, number, number][];
        annotations: Record<string, [number, number, number][]>;
    }

    function handpose(video: HTMLVideoElement, callback: Ml5Callback<HandposePrediction[]>): Handpose;
}
