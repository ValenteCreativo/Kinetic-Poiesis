declare module 'ml5' {
    export interface Keypoint {
      position: { x: number; y: number };
      confidence: number;
    }
  
    export interface Pose {
      keypoints: Keypoint[];
    }
  
    export interface BodyPose {
      detectStart(video: any, callback: (results: Pose[]) => void): void;
      getSkeleton(): [number, number][];
    }
  
    const bodyPose: () => BodyPose;
    export default { bodyPose };
  }
  