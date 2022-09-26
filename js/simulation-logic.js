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
  const backdrop = document.querySelector(".backdrop");
  switch (target) {
    case "simple-cube":
      renderBox("simple", true);
      break;
    case "high-level-cube":
      renderBox("high-level", true);
      break;
    case "about-button":
      backdrop.classList.remove("is-hidden");

      break;
  }
  if (event.target === backdrop) {
    backdrop.classList.add("is-hidden");
  }
}

//rendering new box
function renderBox(level, randomPosition) {
  const color = level === "simple" ? "pink" : "purple";
  const headerHeight = document.querySelector(".header").offsetHeight;
  const displayWidth = body.offsetWidth;
  const canvaWidth = canva.offsetWidth;
  const canvasHeight = canva.offsetHeight;
  if (randomPosition) {
    xPosition = displayWidth / 2 - canvaWidth / 2 + Math.floor(Math.random() * canvaWidth);
    yPosition = headerHeight + 30 + Math.floor(Math.random() * canvasHeight);
  }
  id += 1;
  const blockY = yPosition - headerHeight - 45;
  const blockX = xPosition - displayWidth / 2 + canvaWidth / 2 - 25;
  canva.insertAdjacentHTML(
    "beforeend",
    `<div id="${id}" class="simple-block" style="background-color:${color}; top: ${blockY}px; left:${blockX}px"></div>`
  );
}

//open modal window with about info
function aboutModal() {
  body.innerHTML = ``;
}
