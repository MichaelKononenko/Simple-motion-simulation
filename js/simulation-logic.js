const body = document.querySelector("body");

const canva = document.querySelector(".canvas-area");
let id = 0;
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
//click handling inside canvas
canva.addEventListener("click", () => renderBox("simple"));
canva.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  renderBox("high-level");
});

//buttons click handling
body.addEventListener("click", buttonEvent);
function buttonEvent(event) {
  const target = event.target.id;
  console.log(target);
  switch (target) {
    case "simple-cube":
      renderBox("simple", true);
      break;
    case "high-level-cube":
      renderBox("high-level", true);
      break;
  }
}

//rendering new box
function renderBox(level, center) {
  const color = level === "simple" ? "pink" : "purple";
  const headerHeight = document.querySelector(".header").offsetHeight;
  const displayWidth = body.offsetWidth;
  const canvaWidth = canva.offsetWidth;
  if (center) {
    xPosition = displayWidth / 2 + 7;
    yPosition = headerHeight + 30 + 150;
  }
  id += 1;
  const blockY = yPosition - headerHeight - 45;
  const blockX = xPosition - displayWidth / 2 + canvaWidth / 2 - 25;
  canva.insertAdjacentHTML(
    "beforeend",
    `<div id="${id}" class="simple-block" style="background-color:${color}; top: ${blockY}px; left:${blockX}px"></div>`
  );
}
