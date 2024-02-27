const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

ctx.fillStyle = "rgb(255, 255, 255)";
ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
ctx.lineWidth = 2;

function clearScreen() {
  ctx.clearRect(0, 0, width, height);
}

function drawCircle(x, y, radius) {
  ctx.fillRect(Math.round(x), Math.round(y), radius, radius);
}

function createImage() {
  return ctx.createImageData(width, height);
}

function updateImagePixel(image, x, y, r, g, b, a) {
  image.data[4 * (x + y * width) + 0] = r;
  image.data[4 * (x + y * width) + 1] = g;
  image.data[4 * (x + y * width) + 2] = b;
  image.data[4 * (x + y * width) + 3] = a;
}

function drawImage(image) {
  ctx.putImageData(image, 0, 0);
}

function drawBounds(x, y, width, height) {
  ctx.strokeRect(
    Math.round(x),
    Math.round(y),
    Math.round(width),
    Math.round(height)
  );
}

export {
  width,
  height,
  clearScreen,
  drawCircle,
  drawBounds,
  createImage,
  updateImagePixel,
  drawImage,
};
