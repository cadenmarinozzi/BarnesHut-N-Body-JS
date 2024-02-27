import { Node } from "Node";
import { width, height, clearScreen, createImage, drawImage } from "Drawing";
import { Spiral } from "Scene";

const bodies = Spiral(2000, width / 2, height / 2);

function renderBodies(image) {
  for (const body of bodies) {
    body.draw(image);
  }
}

function updateBodies(root) {
  for (const body of bodies) {
    body.resetForce();

    root.calculateForce(body);

    body.updateAcceleration();
    body.updateVelocity();
    body.updatePosition();
  }
}

function createTree(bodies) {
  const root = new Node(0, 0, width, height);

  for (const body of bodies) {
    root.insert(body);
  }

  return root;
}

function animate() {
  clearScreen();

  const root = createTree(bodies);
  const image = createImage();

  renderBodies(image);
  updateBodies(root);

  //   root.draw();
  drawImage(image);

  requestAnimationFrame(animate);
}

animate();
