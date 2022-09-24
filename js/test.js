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
canva.addEventListener("click", () => {
  id += 1;
  const newHighLevel = new Block({
    type: "simple",
    xPosition: xPosition,
    yPosition: yPosition,
    randomPosition: false,
    id: id,
  });
  newHighLevel.randomizePosition();
  newHighLevel.foo();
  newHighLevel.createBlock();
});
canva.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  id += 1;
  const newSimple = new Block({
    type: "high-level",
    xPosition: xPosition,
    yPosition: yPosition,
    randomPosition: false,
    id: id,
  });
  newSimple.randomizePosition();
  newSimple.foo();
  newSimple.createBlock();
});

//buttons click handling
body.addEventListener("click", buttonEvent);
function buttonEvent(event) {
  const target = event.target.id;
  const backdrop = document.querySelector(".backdrop");
  switch (target) {
    case "simple-cube":
      id += 1;
      const newSimple = new Block({
        type: "simple",
        xPosition: xPosition,
        yPosition: yPosition,
        id: id,
        randomPosition: true,
      });
      newSimple.randomizePosition();
      newSimple.foo();
      newSimple.createBlock();
      break;
    case "high-level-cube":
      id += 1;
      const newHighLevel = new Block({
        type: "high-level",
        xPosition: xPosition,
        yPosition: yPosition,
        id: id,
        randomPosition: true,
      });
      newHighLevel.randomizePosition();
      newHighLevel.foo();
      newHighLevel.createBlock();
      break;
    case "about-button":
      backdrop.classList.remove("is-hidden");
      break;
  }
  if (event.target === backdrop) {
    backdrop.classList.add("is-hidden");
  }
}

const headerHeight = document.querySelector(".header").offsetHeight;
const displayWidth = body.offsetWidth;
const canvaWidth = canva.offsetWidth;
const canvasHeight = canva.offsetHeight;

class Block {
  constructor({ type, xPosition, yPosition, id, randomPosition }) {
    this.type = type;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.id = id;
    this.randomPosition = randomPosition;
    this.newX = 0;
    this.newY = 0;
  }
  randomizePosition() {
    console.log(this.randomPosition);

    if (this.randomPosition === true) {
      this.newX = Math.floor(Math.random() * canvaWidth - 15);
      this.newY = Math.floor(Math.random() * canvasHeight - 15);
    } else if (this.randomPosition === false) {
      this.newY = this.yPosition - headerHeight - 45;
      this.newX = this.xPosition - displayWidth / 2 + canvaWidth / 2 - 25;
    }
    console.log("x = ", this.newY);
  }

  foo() {
    console.log(this);
    console.log(this.type);
    console.log(this.xPosition);
    console.log(this.yPosition);
    console.log(this.id);
  }
  createBlock() {
    const color = this.type === "simple" ? "pink" : "purple";
    canva.insertAdjacentHTML(
      "beforeend",
      `<div id="${id}" class="simple-block" style="background-color:${color}; top: ${this.newY}px; left:${this.newX}px"></div>`
    );
  }
}
