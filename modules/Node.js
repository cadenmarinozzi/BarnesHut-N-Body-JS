import { calculateGravitationalForce, calculateDistance } from "Physics";
import { drawBounds } from "Drawing";

const THETA = 0.5;
const MAX_DEPTH = 100;

class Node {
  constructor(x, y, width, height, depth = 0) {
    this.quads = [];
    this.hasQuads = false; // Keep as a variable for optimization instead of checking if quads is empty every time

    this.depth = depth;

    this.bounds = {
      x,
      y,
      width,
      height,
    };

    this.centerOfMass = {
      x: 0,
      y: 0,
      mass: 0,
    };
  }

  subdivide() {
    // Size of new node
    const width = this.bounds.width / 2;
    const height = this.bounds.height / 2;

    // Center of parent node
    const centerX = this.bounds.x + width;
    const centerY = this.bounds.y + height;

    this.quads.push(
      new Node(this.bounds.x, this.bounds.y, width, height, this.depth + 1)
    );
    this.quads.push(
      new Node(centerX, this.bounds.y, width, height, this.depth + 1)
    );
    this.quads.push(new Node(centerX, centerY, width, height, this.depth + 1));
    this.quads.push(
      new Node(this.bounds.x, centerY, width, height, this.depth + 1)
    );

    this.hasQuads = true;
  }

  contains(body) {
    return (
      body.x >= this.bounds.x &&
      body.x <= this.bounds.x + this.bounds.width &&
      body.y >= this.bounds.y &&
      body.y <= this.bounds.y + this.bounds.height
    );
  }

  insertIntoRegion(body) {
    for (const quad of this.quads) {
      if (!quad.contains(body)) continue;

      quad.insert(body);
    }
  }

  insert(body) {
    if (this.body) {
      if (!this.hasQuads) {
        this.subdivide();
        this.insertIntoRegion(this.body);
      }

      this.insertIntoRegion(body);

      return;
    }

    this.body = body;

    this.centerOfMass.mass += body.mass;
    this.centerOfMass.x =
      (this.centerOfMass.x * this.centerOfMass.mass + body.x * body.mass) /
      this.centerOfMass.mass;
    this.centerOfMass.y =
      (this.centerOfMass.y * this.centerOfMass.mass + body.y * body.mass) /
      this.centerOfMass.mass;
  }

  calculateForce(body) {
    const { dx, dy, distance } = calculateDistance(this.centerOfMass, body);

    const sd = this.bounds.width / distance;

    if (sd < THETA || (!this.hasQuads && this.body && this.body !== body)) {
      const g = calculateGravitationalForce(
        this.centerOfMass.mass,
        body.mass,
        distance
      );

      body.fx += g * dx;
      body.fy += g * dy;

      return;
    }

    if (!this.hasQuads) {
      return;
    }

    for (const quad of this.quads) {
      quad.calculateForce(body);
    }
  }

  draw() {
    if (this.hasQuads) {
      for (const quad of this.quads) {
        quad.draw();
      }
    }

    drawBounds(
      this.bounds.x,
      this.bounds.y,
      this.bounds.width,
      this.bounds.height
    );
  }
}

export { Node };
