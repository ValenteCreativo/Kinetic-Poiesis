// MyP5Component.tsx
'use client';

import React, { useEffect, useState } from 'react';
import p5 from 'p5';

const MyP5Component: React.FC = () => {
  const [strokeColor, setStrokeColor] = useState('red'); // Color de trazo predeterminado

  useEffect(() => {
    const sketch = (s: p5) => {
      let drawing = false;

      s.setup = () => {
        s.createCanvas(400, 400);
        s.background(200);
      };

      s.draw = () => {
        if (drawing) {
          s.fill(s.color(strokeColor)); // Usa el color de trazo seleccionado
          s.noStroke();
          s.ellipse(s.mouseX, s.mouseY, 20, 20);
        }
      };

      s.mousePressed = () => {
        drawing = true;
      };

      s.mouseReleased = () => {
        drawing = false;
      };
    };

    const canvas = new p5(sketch);

    return () => {
      canvas.remove();
    };
  }, [strokeColor]); // Añade strokeColor como dependencia

  return (
    <div>
      <h2>Selecciona un color:</h2>
      <button onClick={() => setStrokeColor('red')}>Rojo</button>
      <button onClick={() => setStrokeColor('blue')}>Azul</button>
      <button onClick={() => setStrokeColor('green')}>Verde</button>
      <button onClick={() => setStrokeColor('yellow')}>Amarillo</button>
      <button onClick={() => setStrokeColor('black')}>Negro</button>
    </div>
  );
};

export default MyP5Component;
