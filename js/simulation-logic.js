const body = document.querySelector("body");

const canva = document.querySelector(".canvas-area");
//find mouse coordinates
let xPosition = 0;
let yPosition = 0;
canva.addEventListener(
  "mousemove",
  (coordinates = (evt) => {
    xPosition = evt.clientX;
    yPosition = evt.clientY;
  })
);
let id = 0;
canva.addEventListener("click", doMagick);
function doMagick(event) {
  const headerHeight = document.querySelector(".header").offsetHeight;
  const displayWidth = body.offsetWidth;
  const canvaWidth = canva.offsetWidth;
  id += 1;
  const blockY = yPosition - headerHeight - 45;
  const blockX = xPosition - displayWidth / 2 + canvaWidth / 2 - 25;
  canva.insertAdjacentHTML(
    "beforeend",
    `<div id="${id}" class="simple-block" style="background-color: pink; top: ${blockY}px; left:${blockX}px"></div>`
  );
}
