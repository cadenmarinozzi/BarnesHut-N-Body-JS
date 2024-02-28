import { Body } from "Body";
import { randomInRange } from "utils";

function Random(n, minX, minY, maxX, maxY) {
  const bodies = [];

  for (let i = 0; i < n; i++) {
    const x = randomInRange(minX, maxX);
    const y = randomInRange(minY, maxY);
    const mass = Math.random();

    const body = new Body({ x, y, mass });

    bodies.push(body);
  }

  return bodies;
}

function Spiral(n, minX, minY) {
  const bodies = [];

  for (let i = 0; i < n; i++) {
    const x = minX + i * Math.cos(i);
    const y = minY + i * Math.sin(i);

    const a = 100;
    const vx = (a / (i + a + 1)) * Math.cos(i);
    const vy = (a / (i + a + 1)) * Math.sin(i);

    const mass = 1 + (i * Math.cos(i)) / n;

    const body = new Body({ x, y, mass, vx, vy });

    bodies.push(body);
  }

  return bodies;
}

function Galaxy(minX, minY, centerX, centerY) {
  const bodies = [];

  for (let i = 0; i < 1; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 100;
    const x = centerX + radius * Math.cos(theta);
    const y = centerY + radius * Math.sin(theta);

    const body = new Body({
      x: centerX,
      y: centerY,
      //   x,
      //   y,
      mass: 20,
    });

    bodies.push(body);
  }

  const bulgeTotalMass = bodies.length * 10;

  for (let r = 0; r < 100; r++) {
    for (let i = 0; i < 20; i++) {
      const theta = Math.random() * 2 * Math.PI;

      let A = 100 * (40 / r);
      let radius = 100 + Math.random() * (A - 100);

      const x = centerX + radius * Math.cos(theta);
      const y = centerY + radius * Math.sin(theta);

      const orbitalVelocity =
        Math.sqrt((30 * bulgeTotalMass) / radius) + Math.random() * 2;

      const velX = orbitalVelocity * Math.cos(theta - Math.PI / 2);
      const velY = orbitalVelocity * Math.sin(theta - Math.PI / 2);

      const body = new Body({
        x,
        y,
        mass: (1 / radius) * 0.001,
        vx: velX,
        vy: velY,
      });

      bodies.push(body);
    }
  }

  // Arms
  let armTheta = 0;
  const NARMS = 2;

  for (let i = 0; i < NARMS; i++) {
    armTheta += Math.PI / (NARMS / 2);

    let a = 0;
    for (let r = 1; r < 200; r += a) {
      a += 0.0001;
      const theta = armTheta + r / 100 + Math.random() * 0.5;
      const radius = 50 + r + (Math.random() * r) / 4;
      const x = centerX + radius * Math.cos(theta);
      const y = centerY + radius * Math.sin(theta);

      const orbitalVelocity =
        (radius / 100) * Math.sqrt((100 * bulgeTotalMass) / radius);

      const velX = orbitalVelocity * Math.cos(theta - Math.PI / 2);
      const velY = orbitalVelocity * Math.sin(theta - Math.PI / 2);

      const body = new Body({
        x,
        y,
        mass: 0.000001,
        vx: velX,
        vy: velY,
      });

      bodies.push(body);
    }
  }

  return bodies;
}

export { Random, Spiral, Galaxy };
