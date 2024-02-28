import { Node } from "Node";
import { width, height, clearScreen, createImage, drawImage } from "Drawing";

class Simulation {
  constructor({
    dt = 1,
    shouldUpdate = true,
    shouldRender = true,
    shouldDrawTree = false,
    shouldAnimate = true,
    shouldDrawBodies = true,
    shouldDrawVelocity = false,
    colorMethod,
  }) {
    this.dt = dt;

    this.image = createImage();

    this.shouldAnimate = shouldAnimate;
    this.shouldDrawBodies = shouldDrawBodies;
    this.shouldDrawTree = shouldDrawTree;
    this.shouldRender = shouldRender;
    this.shouldUpdate = shouldUpdate;
    this.shouldDrawVelocity = shouldDrawVelocity;

    this.colorMethod = colorMethod;
  }

  createScene(sceneSteps) {
    this.bodies = [];

    for (const sceneStep of sceneSteps) {
      this.bodies = this.bodies.concat(sceneStep);
    }
  }

  createTree() {
    this.root = new Node(0, 0, width, height);

    for (const body of this.bodies) {
      this.root.insert(body);
    }
  }

  updateBodies() {
    for (const body of this.bodies) {
      body.resetForce();

      this.root.calculateForce(body);

      body.updateAcceleration();
      body.updateVelocity(this.dt);
      body.updatePosition(this.dt);
    }
  }

  renderBodies() {
    for (const body of this.bodies) {
      body.draw(this.image, this.colorMethod);
    }
  }

  renderVelocities() {
    for (const body of this.bodies) {
      body.drawVelocity();
    }
  }

  update() {
    this.createTree();
    this.updateBodies();
  }

  render() {
    if (this.shouldDrawBodies) {
      this.renderBodies();

      drawImage(this.image);
    }

    if (this.shouldDrawTree) {
      this.root.draw();
    }

    if (this.shouldDrawVelocity) {
      this.renderVelocities();
    }
  }

  clear() {
    clearScreen();

    this.image = createImage();
  }

  animate() {
    this.clear();

    if (this.shouldUpdate) {
      this.update();
    }

    if (this.shouldRender) {
      this.render();
    }

    if (this.shouldAnimate) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

export { Simulation };
