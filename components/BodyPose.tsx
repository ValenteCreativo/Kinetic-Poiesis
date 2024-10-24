import { useEffect } from 'react';
import ml5 from 'ml5';
import p5 from 'p5';

declare const VIDEO: any; // Declarar VIDEO como cualquier cosa

const BodyPose = () => {
  useEffect(() => {
    const sketch = (p: any) => {
      let video: any;
      let bodyPose: any;
      let poses: any[] = [];
      let connections: any;
      let particles: any[] = [];
      let trailColors: any[] = [];

      class Particle {
        pos: any;
        lifespan: number;
        color: any;
        size: number;

        constructor(x: number, y: number, color: any) {
          this.pos = p.createVector(x, y);
          this.lifespan = 255;
          this.color = color;
          this.size = p.random(4, 12);
        }

        update() {
          this.lifespan -= 2;
          this.size *= 0.97;
        }

        display() {
          p.noStroke();
          const c = p.color(this.color);
          c.setAlpha(this.lifespan);
          p.fill(c);
          p.circle(this.pos.x, this.pos.y, this.size);
        }

        isDead() {
          return this.lifespan < 0;
        }
      }

      p.preload = () => {
        bodyPose = ml5.bodyPose();
      };

      p.setup = () => {
        p.createCanvas(640, 480);
        video = p.createCapture(p.VIDEO);  // Usar p.VIDEO en lugar de VIDEO
        video.size(640, 480);
        video.hide();

        bodyPose.detectStart(video, gotPoses);
        connections = bodyPose.getSkeleton();

        trailColors = [
          p.color(255, 102, 179, 150), // pink
          p.color(102, 178, 255, 150), // blue
          p.color(255, 178, 102, 150), // orange
          p.color(178, 255, 102, 150), // lime
          p.color(178, 102, 255, 150), // purple
        ];

        p.background(0);
      };

      p.draw = () => {
        p.background(0, 20);

        for (let i = particles.length - 1; i >= 0; i--) {
          particles[i].update();
          particles[i].display();
          if (particles[i].isDead()) {
            particles.splice(i, 1);
          }
        }

        for (let i = 0; i < poses.length; i++) {
          const pose = poses[i];

          for (let j = 0; j < connections.length; j++) {
            const pointAIndex = connections[j][0];
            const pointBIndex = connections[j][1];
            const pointA = pose.keypoints[pointAIndex];
            const pointB = pose.keypoints[pointBIndex];

            if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
              const steps = 5;
              for (let t = 0; t <= steps; t++) {
                const x = p.lerp(pointA.x, pointB.x, t / steps);
                const y = p.lerp(pointA.y, pointB.y, t / steps);
                const colorIndex = (j + p.frameCount / 30) % trailColors.length;
                particles.push(new Particle(x, y, trailColors[p.floor(colorIndex)]));
              }
            }
          }
        }

        p.tint(255, 30);
        p.image(video, 0, 0, p.width, p.height);
        p.noTint();
      };

      function gotPoses(results: any) {
        poses = results;
      }
    };

    const myp5 = new p5(sketch);

    return () => {
      myp5.remove(); // Limpiar p5 cuando el componente se desmonte
    };
  }, []);

  return <div></div>;
};

export default BodyPose;
