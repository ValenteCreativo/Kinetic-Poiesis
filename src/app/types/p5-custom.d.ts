// src/app/types/p5-custom.d.ts
import p5 from 'p5'; // Asegúrate de importar la clase p5

declare module 'p5' {
    interface p5 {
        VIDEO: number;
        handpose: (video: HTMLVideoElement, callback: () => void) => unknown;
    }
}
