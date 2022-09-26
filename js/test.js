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
  const newSimple = new Block({
    type: "simple",
    xPosition: xPosition,
    yPosition: yPosition,
    randomPosition: false,
    id: id,
  });
  newSimple.randomizePosition();
  newSimple.foo();
  newSimple.createBlock();
  const makeMove = setInterval(() => newSimple.move(), 10);
});
canva.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  id += 1;
  const newHighLevel = new Block({
    type: "high-level",
    xPosition: xPosition,
    yPosition: yPosition,
    randomPosition: false,
    id: id,
  });
  newHighLevel.randomizePosition();
  newHighLevel.foo();
  newHighLevel.createBlock();
  const makeMove = setInterval(() => newHighLevel.move(), 10);
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
      const makeMoveSimpleBlock = setInterval(() => newSimple.move(), 10);
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
      const makeMoveHighLevelBlock = setInterval(() => newHighLevel.move(), 10);
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

console.log(canvaWidth);
class Block {
  constructor({ type, xPosition, yPosition, id, randomPosition }) {
    this.type = type;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.id = id;
    this.randomPosition = randomPosition;
    this.newX = 0;
    this.newY = 0;
    this.xDirection = true;
    this.yDirection = true;
    this.color = "";
    this.colorSet = [];
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
    this.color = this.type === "simple" ? "pink" : "purple";
    if (this.type === "simple") {
      this.colorSet = ["pink", "aqua", "orange", "yellow"];
    } else {
      this.colorSet = ["purple", "navy", "brown", "teal"];
    }
    console.log(this);
    console.log(this.type);
    console.log(this.xPosition);
    console.log(this.yPosition);
    console.log(this.id);
  }
  createBlock() {
    let symbol = this.type === "simple" ? "S" : "H";
    const newDiv = `<div id="${this.id}" class="block ${this.type}" style="background-color:${this.color}; top: ${this.newY}px; left:${this.newX}px"><span></span>${symbol}</div>`;
    canva.insertAdjacentHTML(
      "beforeend",
      newDiv
      // `<div id="${id}" class="simple-block" style="background-color:${color}; top: ${this.newY}px; left:${this.newX}px"></div>`
    );
    // canva.innerHTML += `<div id="${id}" class="simple-block" style="background-color:${color}; top: ${this.newY}px; left:${this.newX}px"></div>`;
  }
  removeBlock() {
    const removedBlock = document.getElementById(`${this.id}`);
    canva.removeChild(removedBlock);
  }
  move() {
    this.removeBlock();
    if (this.xDirection) {
      this.newX += 1;
      if (this.newX > canvaWidth - 36) {
        this.xDirection = !this.xDirection;
        this.color = this.colorSet[0];
      }
    }
    if (!this.xDirection) {
      this.newX -= 1;
      if (this.newX < 0) {
        this.xDirection = !this.xDirection;

        this.color = this.colorSet[1];
      }
    }

    if (this.yDirection) {
      this.newY += 1;
      if (this.newY > canvasHeight - 36) {
        this.yDirection = !this.yDirection;
        this.color = this.colorSet[2];
      }
    }
    if (!this.yDirection) {
      this.newY -= 1;
      if (this.newY < 0) {
        this.yDirection = !this.yDirection;
        this.color = this.colorSet[3];
      }
    }
    this.createBlock();
    // console.log("x = ", this.newX, "y = ", this.newY);
  }
}
