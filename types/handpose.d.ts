declare module '@tensorflow-models/handpose' {
    export interface Hand {
      handInViewConfidence: number;
      boundingBox: {
        topLeft: [number, number];
        bottomRight: [number, number];
      };
      landmarks: [number, number, number][];
      annotations: {
        thumb: [number, number, number][];
        indexFinger: [number, number, number][];
        middleFinger: [number, number, number][];
        ringFinger: [number, number, number][];
        pinky: [number, number, number][];
      };
    }
  
    export function load(): Promise<any>; // Cambia 'any' por un tipo más específico si lo conoces.
    export function estimateHands(video: HTMLVideoElement): Promise<Hand[]>;
  }
  