import { Body } from "Body";
import { randomInRange } from "utils";

function Random(n, minX, minY, maxX, maxY) {
  const bodies = [];

  for (let i = 0; i < n; i++) {
    const x = randomInRange(minX, maxX);
    const y = randomInRange(minY, maxY);
    const mass = 1;

    const body = new Body(x, y, mass);

    bodies.push(body);
  }

  return bodies;
}

function Spiral(n, minX, minY) {
  const bodies = [];

  for (let i = 0; i < n; i++) {
    const x = minX + i * Math.cos(i);
    const y = minY + i * Math.sin(i);
    const mass = 1 + (i * Math.cos(i)) / n;

    const body = new Body(x, y, mass);

    bodies.push(body);
  }

  return bodies;
}

export { Random, Spiral };
