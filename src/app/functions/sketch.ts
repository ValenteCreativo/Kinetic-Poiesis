import p5 from 'p5';

const sketch = (s: p5) => {
  s.setup = () => {
    s.createCanvas(800, 800);
  };

  s.draw = () => {
    s.fill(255);
    s.noStroke();
    s.circle(s.width / 2, s.height / 2, 50);
  };
};

export default sketch;
