import { Simulation } from "Simulation";
import { width, height } from "Drawing";
import { Galaxy } from "Scene";

const sceneSteps = [Galaxy(0, 0, width / 2, height / 2)];

const simulation = new Simulation({
  dt: 2,
  //   dt: 0.1,
  shouldAnimate: true,
  shouldDrawVelocity: false,
  shouldDrawTree: false,
});

simulation.createScene(sceneSteps);

simulation.animate();
