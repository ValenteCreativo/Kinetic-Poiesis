declare module 'ml5' {
    const imageClassifier: (model: string, callback?: () => void) => any;
    const poseNet: (video: any, callback?: () => void) => any;
    const handpose: (video: any, callback?: () => void) => any; // Agrega handpose
    
    export { imageClassifier, poseNet, handpose };
  }
  