import { useRef, useEffect } from "react";
import "./Canvas.css";

const Canvas = (props) => {
  const canvasRef = useRef(null);

  const containerRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    let container = containerRef.current;
    let bounds = container.getBoundingClientRect();
    console.log(bounds);

    canvas.width = bounds.width;
    canvas.height = bounds.height;

    let colorArray = ["#0a9cbc"];

    let gradient = context.createLinearGradient(
      0,
      0,
      window.innerWidth,
      bounds.bottom
    );
    gradient.addColorStop(0, "#e0e0e0");
    gradient.addColorStop(0.2, "#fa9987");
    gradient.addColorStop(0.3, "#e0e0e0");
    gradient.addColorStop(1, "#fa9987");

    function Circle(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

      this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = gradient;
        context.fill();
      };

      this.update = () => {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }

        this.x += this.dx / 6;
        this.y += this.dy / 6;

        this.draw();
      };
    }

    // let ball = new Circle(50, 50, Math.random(), Math.random(), 10);
    let circleArray = [];

    for (let i = 0; i < 300; i++) {
      let radius = Math.random() * 30 + 70;
      let x = Math.random() * (canvas.width - radius * 2) + radius;
      let y = Math.random() * (canvas.height - radius * 2) + radius;
      let dx = Math.random() - 0.05;
      let dy = Math.random() - 0.08;

      circleArray.push(new Circle(x, y, dx, dy, radius));
    }

    const render = () => {
      frameCount++;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="canvas-container" ref={containerRef}>
      <canvas ref={canvasRef} {...props} />
    </div>
  );
};

export default Canvas;
