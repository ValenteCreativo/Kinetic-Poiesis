// src/app/types/p5-custom.d.ts
import * as p5 from 'p5';

declare module 'p5' {
    interface p5 {
        VIDEO: number;
        handpose: (video: any, callback: () => void) => any; // Agregar declaración de handpose
    }
}
