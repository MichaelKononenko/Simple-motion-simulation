const blocksStorage = [];
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
  blocksStorage.push(newSimple);
  newSimple.start();
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
  blocksStorage.push(newHighLevel);
  newHighLevel.start();
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
      blocksStorage.push(newSimple);
      newSimple.start();
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
      blocksStorage.push(newHighLevel);
      newHighLevel.start();
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
    this.xDirection = true;
    this.yDirection = true;
    this.color = "";
    this.colorSet = [];
    this.colorId = 0;
    this.health = 0;
    this.lifes = 0;
    this.makeMove;
  }

  start() {
    this.randomizePosition();
    this.randomizeDirection();
    this.chooseLevel();
    this.createBlock();
    this.setTime();
  }

  randomizePosition() {
    if (this.randomPosition === true) {
      this.newX = Math.floor(Math.random() * canvaWidth - 15);
      this.newY = Math.floor(Math.random() * canvasHeight - 15);
    } else if (this.randomPosition === false) {
      this.newY = this.yPosition - headerHeight - 45;
      this.newX = this.xPosition - displayWidth / 2 + canvaWidth / 2 - 25;
    }
  }

  randomizeDirection() {
    this.xDirection = Math.round(Math.random());
    this.yDirection = Math.round(Math.random());
  }

  chooseLevel() {
    this.color = this.type === "simple" ? "pink" : "indigo";
    if (this.type === "simple") {
      this.colorSet = ["HotPink", "DeepPink", "MediumVioletRed", "purple", "darkOrchid"];
      this.lifes = 5;
      this.health = 5;
    } else {
      this.colorSet = [
        "purple",
        "darkOrchid",
        "blueViolet",
        "MediumPurple",
        "orchid",
        "plum",
        "HotPink",
        "DeepPink",
        "MediumVioletRed",
      ];
      this.lifes = 10;
      this.health = 10;
    }
  }
  createBlock() {
    const newDiv = `<div id="${this.id}" class="block ${
      this.type
    }" style="background-image: radial-gradient(${this.color}, ${this.colorSet[this.colorId]}, ${
      this.color
    }); top: ${this.newY}px; left:${this.newX}px"><span>${this.health}</span></div>`;
    canva.insertAdjacentHTML("beforeend", newDiv);
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
        this.health += 1;
      }
    }
    if (!this.xDirection) {
      this.newX -= 1;
      if (this.newX < 0) {
        this.xDirection = !this.xDirection;
        this.health += 1;
      }
    }

    if (this.yDirection) {
      this.newY += 1;
      if (this.newY > canvasHeight - 36) {
        this.yDirection = !this.yDirection;
        this.health += 1;
      }
    }
    if (!this.yDirection) {
      this.newY -= 1;
      if (this.newY < 0) {
        this.yDirection = !this.yDirection;
        this.health += 1;
      }
    }

    if (this.health <= 0) {
      console.log("-1");
      clearInterval(this.makeMove);
      blocksStorage[this.id - 1] = 0;
      console.log(blocksStorage);
      return;
    }

    this.colorId = Math.floor(this.health / 5);
    if (this.colorId >= this.lifes) this.colorId = this.lifes - 1;
    this.createBlock();
    this.matchcheck();
  }

  setTime() {
    this.makeMove = setInterval(() => this.move(), 25);
  }

  matchcheck() {
    const match = blocksStorage.map((item) => {
      if (item.id === this.id) {
        return;
      }
      if (
        item.newX + 30 > this.newX &&
        item.newX - 30 < this.newX &&
        item.newY + 30 > this.newY &&
        item.newY - 30 < this.newY
      ) {
        if (item.type === "high-level" && this.type === "high-level") {
          this.health -= 3;
          item.health -= 3;
        } else if (item.type === "high-level" && this.type === "simple") {
          this.health -= 5;
          item.health -= 1;
        } else if (item.type === "simple" && this.type === "high-level") {
          this.health -= 1;
          item.health -= 5;
        } else {
          this.health -= 1;
          item.health -= 1;
        }
        this.xDirection = !this.xDirection;
        item.xDirection = !item.xDirection;
        this.yDirection = !this.yDirection;
        item.yDirection = !item.yDirection;

        return;
      }
    });
  }
}
