import { updateImagePixel, drawLine } from "Drawing";
import { calculateTimeScalar } from "Physics";
import { hslToRgb } from "utils";

class Body {
  constructor({ x, y, mass, vx = 0, vy = 0 }) {
    this.x = x;
    this.y = y;

    this.mass = mass;

    this.vx = vx;
    this.vy = vy;

    this.fx = this.fy = 0;
  }

  drawVelocity() {
    drawLine(this.x, this.y, this.x + this.vx, this.y + this.vy);
  }

  draw(image, colorMethod) {
    let r = 255;
    let g = 255;
    let b = 255;
    let a = 255;

    const velocity = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const acceleration = Math.sqrt(this.ax * this.ax + this.ay * this.ay);

    if (colorMethod === "mass") {
      [r, g, b] = hslToRgb(this.mass, this.mass * 105000, 255);
      a = 255;
    } else if (colorMethod === "velocity") {
      [r, g, b] = hslToRgb(0.3, velocity / 5, 255);

      a = 255;
    } else if (colorMethod === "acceleration") {
      [r, g, b] = hslToRgb(acceleration, acceleration * 10, 255);

      a = 255;
    }

    updateImagePixel(image, this.x, this.y, r, g, b, a);
  }

  resetForce() {
    this.fx = this.fy = 0;
  }

  updateVelocity(dt) {
    this.vx += calculateTimeScalar(this.ax, dt);
    this.vy += calculateTimeScalar(this.ay, dt);
  }

  updatePosition(dt) {
    this.x += calculateTimeScalar(this.vx, dt);
    this.y += calculateTimeScalar(this.vy, dt);
  }

  updateAcceleration() {
    this.ax = this.fx / this.mass;
    this.ay = this.fy / this.mass;
  }
}

export { Body };
