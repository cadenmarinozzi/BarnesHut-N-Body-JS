import { updateImagePixel } from "Drawing";
import { calculateTimeScalar } from "Physics";

class Body {
  constructor(x, y, mass) {
    this.x = x;
    this.y = y;

    this.mass = mass;

    this.vx = this.vy = 0;
    this.fx = this.fy = 0;
  }

  draw(image) {
    const x = Math.floor(this.x);
    const y = Math.floor(this.y);

    const a = Math.max(
      Math.min(
        ((this.ax + this.ay) / 2 +
          (this.vx + this.vy) / 2 / 2 +
          this.mass / 255) *
          255,
        255
      ),
      100
    );

    updateImagePixel(image, x, y, 255, 255, 255, a);
  }

  resetForce() {
    this.fx = this.fy = 0;
  }

  updateVelocity() {
    this.vx += calculateTimeScalar(this.ax);
    this.vy += calculateTimeScalar(this.ay);
  }

  updatePosition() {
    this.x += calculateTimeScalar(this.vx);
    this.y += calculateTimeScalar(this.vy);
  }

  updateAcceleration() {
    this.ax = this.fx / this.mass;
    this.ay = this.fy / this.mass;
  }
}

export { Body };
