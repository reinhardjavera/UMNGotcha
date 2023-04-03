// Variables
let petName = localStorage.getItem("petName");
let chosenPet = localStorage.getItem("chosenPet");
let level = parseInt(localStorage.getItem("level"));
let day = parseInt(localStorage.getItem("day"));
let lastDayAfterLevelUp = day;
let i = 0;
let hour = parseInt(localStorage.getItem("hour"));
let minute = parseInt(localStorage.getItem("minute"));
let imgDir = "img/Pet" + chosenPet + ".jpg";

let hungerMultiplier = 1;
let energyMultiplier = 1;
let boredomMultiplier = 1;
let healthMultiplier = 0;

let hungerDB = false;
let energyDB = false;
let boredomDB = false;
let healthDB = false;

let sleeping = false;
let playing = false;

let hunger = parseInt(localStorage.getItem("hunger"));
let energy = parseInt(localStorage.getItem("energy"));
let boredom = parseInt(localStorage.getItem("boredom"));
let health = parseInt(localStorage.getItem("health"));

// ID Element
let foodBar = document.getElementById("foodBar");
let energyBar = document.getElementById("energyBar");
let boredBar = document.getElementById("boredBar");
let healthBar = document.getElementById("healthBar");
let homePage = document.getElementById("homePage");
let controller = document.getElementById("controller");

let playtxt = document.getElementById("play");
let greet = document.getElementById("greet");
let levelText = document.getElementById("level");
let clock = document.getElementById("clock");
let pet = document.getElementById("Pet");
//test passing variable + debug

// Check jika nama dan pet telah di input, jika belum, lempar user ke halaman awal
if (petName == "" || petName == null || chosenPet == null) {
  window.location.href = "./index.html";
}
if (
  isNaN(hunger) == true &&
  isNaN(energy) == true &&
  isNaN(boredom) == true &&
  isNaN(health) == true
) {
  hunger = 50;
  energy = 50;
  boredom = 50;
  health = 50;
  localStorage.setItem("hunger", hunger);
  localStorage.setItem("energy", energy);
  localStorage.setItem("boredom", boredom);
  localStorage.setItem("health", health);
}
// Initialize
Initialize();
// Functions and shit
function Initialize() {
  pet.src = imgDir;
  if (level == 3) {
    levelText.innerText = "Level " + level + " (MAX LEVEL)";
  } else {
    levelText.innerText = "Level " + level;
  }
  clock.innerHTML =
    String(hour).padStart(2, "0") +
    ":" +
    String(minute).padStart(2, "0") +
    ", day : " +
    day;
  greetings(hour);
  foodBar.style.width = hunger + "%";
  energyBar.style.width = energy + "%";
  boredBar.style.width = boredom + "%";
  healthBar.style.width = health + "%";
}

// Time and Level functionality
function greetings(n) {
  if (n >= 0) {
    if (n >= 7) {
      if (n >= 12) {
        if (n >= 18) {
          if (n >= 21) {
            greet.innerHTML = "Good night, " + petName;
            homePage.style.backgroundImage = "url('img/night1.png')";
            homePage.style.color = "white";
          } else {
            greet.innerHTML = "Good evening, " + petName;
            homePage.style.backgroundImage = "url('img/evening.jpg')";
            homePage.style.color = "white";
          }
        } else {
          greet.innerHTML = "Good afternoon, " + petName;
          homePage.style.backgroundImage = "url('img/afternoon.png')";
          homePage.style.color = "white";
        }
      } else {
        greet.innerHTML = "Good morning, " + petName;
        homePage.style.backgroundImage = "url('img/morning.png')";
        homePage.style.color = "black";
      }
    } else {
      homePage.style.backgroundImage = "url('img/night2.jpg')";
      greet.innerHTML = "Good night, " + petName;
      homePage.style.color = "white";
    }
  }
}
let clockInterval = setInterval(timeChange, 100);
function timeChange() {
  if (minute >= 60) {
    minute = 0;
    hour += 1;
    if (hour >= 24) {
      hour = 0;
      localStorage.setItem("hour", hour);
      localStorage.setItem("minute", minute);
      changeDay(day + 1);
      greetings(hour);
    } else {
      localStorage.setItem("hour", hour);
      localStorage.setItem("minute", minute);
      greetings(hour);
    }
  } else {
    minute += 1;
    localStorage.setItem("minute", minute);
  }
  clock.innerHTML =
    String(hour).padStart(2, "0") +
    ":" +
    String(minute).padStart(2, "0") +
    ", day : " +
    day;
}
function changeDay(n) {
  day = n;
  localStorage.setItem("day", day);
  if (day >= lastDayAfterLevelUp + 2) {
    lastDayAfterLevelUp = day;
    changeLevel(level + 1);
  }
}
function changeLevel(n) {
  if (level == 3) {
  } else {
    level = n;
    if (n == 3) {
      localStorage.setItem("level", level);
      levelText.innerHTML = "Level " + level + " (MAX LEVEL)";
    } else {
      localStorage.setItem("level", level);
      levelText.innerText = "Level " + level;
    }
  }
}
// Bar functionality
let hungerInterval = setInterval(lowerHunger, 1000);
let energyInterval = setInterval(lowerEnergy, 1200);
let healthInterval = setInterval(lowerHealth, 1000);
let boredomInterval = setInterval(lowerBoredom, 1100);

let hungerEmpty = false;
function lowerHunger() {
  hunger -= hungerMultiplier;
  if (hunger <= 0) {
    hunger = 0;
    if (hungerEmpty == false) {
      hungerEmpty = true;
      healthMultiplier += 2;
    }
    foodBar.style.width = parseInt(hunger) + "%";
    localStorage.setItem("hunger", hunger);
  } else {
    if (hungerEmpty == true) {
      hungerEmpty = false;
      healthMultiplier -= 2;
    }
    foodBar.style.width = parseInt(hunger) + "%";
    localStorage.setItem("hunger", hunger);
  }
}
let energyEmpty = false;
function lowerEnergy() {
  if (sleeping == false) {
    energy -= energyMultiplier;
    if (energy <= 0) {
      energy = 0;
      if (energyEmpty == false) {
        energyEmpty = true;
        healthMultiplier += 2;
      }
      energyBar.style.width = parseInt(energy) + "%";
      localStorage.setItem("energy", energy);
    } else {
      energyBar.style.width = parseInt(energy) + "%";
      localStorage.setItem("energy", energy);
    }
  } else {
    if (energy > 0) {
      if (energyEmpty == true) {
        energyEmpty = false;
        healthMultiplier -= 2;
      }
    }
  }
}

function lowerHealth() {
  health -= healthMultiplier;
  if (health <= 0) {
    health = 0;
    healthBar.style.width = parseInt(health) + "%";
    localStorage.setItem("health", health);
    clearInterval(healthInterval);
    clearInterval(clockInterval);
    clearInterval(hungerInterval);
    clearInterval(energyInterval);
    clearInterval(boredomInterval);
    clearInterval(addBoredomInterval);
    clearInterval(addEnergyInterval);
    energyDB = true;
    healthDB = true;
    hungerDB = true;
    boredomDB = true;
    indexedDB = true;

    alert("Your pet died!");
  } else {
    healthBar.style.width = parseInt(health) + "%";
    localStorage.setItem("health", health);
  }
}
let boredomEmpty = false;
function lowerBoredom() {
  if (playing == false) {
    boredom -= boredomMultiplier;
    if (boredom <= 0) {
      boredom = 0;
      if (boredomEmpty == false) {
        boredomEmpty = true;
        healthMultiplier += 2;
      }
      boredBar.style.width = parseInt(boredom) + "%";
      localStorage.setItem("boredom", boredom);
    } else {
      boredBar.style.width = parseInt(boredom) + "%";
      localStorage.setItem("boredom", boredom);
    }
  } else {
    if (boredom > 0) {
      if (boredomEmpty == true) {
        boredomEmpty = false;
        healthMultiplier -= 2;
      }
    }
  }
}

// Buttons functionality
let addBoredomInterval;
function playingToggle() {
  if (boredomDB == false) {
    if (playing == false) {
      energyMultiplier += 1;
      hungerDB = true;
      energyDB = true;
      healthDB = true;
      playing = true;
      greet.style.display = "none";
      pet.style.display = "none";
      playtxt.style.display = "block";
      canvasParent.style.display = "block";
      controller.style.display = "flex";
      addBoredomInterval = setInterval(addBoredom, 750);
    } else if (playing == true) {
      controller.style.display = "none";
      playtxt.style.display = "none";
      canvasParent.style.display = "none";
      pet.style.display = "block";
      greet.style.display = "block";
      energyMultiplier -= 1;
      hungerDB = false;
      energyDB = false;
      healthDB = false;
      playing = false;
      clearInterval(addBoredomInterval);
    }
  }
}
function addBoredom(n) {
  boredom += 4;
  if (boredom >= 100) {
    boredom = 100;
    localStorage.setItem("boredom", boredom);
    boredBar.style.width = parseInt(boredom) + "%";
  } else {
    localStorage.setItem("boredom", boredom);
    boredBar.style.width = parseInt(boredom) + "%";
  }
}

let addEnergyInterval;
function energyToggle() {
  if (energyDB == false) {
    if (playing == false && sleeping == false) {
      boredomMultiplier += 1;
      hungerDB = true;
      boredomDB = true;
      healthDB = true;
      sleeping = true;
      addEnergyInterval = setInterval(addEnergy, 750, 4);
    } else if (sleeping == true) {
      boredomMultiplier -= 1;
      hungerDB = false;
      boredomDB = false;
      healthDB = false;
      sleeping = false;
      clearInterval(addEnergyInterval);
    }
  }
}

function addEnergy(n) {
  if (energyDB == false) {
    energy += n;
    if (energy >= 100) {
      energy = 100;
      localStorage.setItem("energy", energy);
      energyBar.style.width = parseInt(energy) + "%";
    } else {
      localStorage.setItem("energy", energy);
      energyBar.style.width = parseInt(energy) + "%";
    }
  }
}

function addHunger(n) {
  if (hungerDB == false) {
    hunger += n;
    if (hunger >= 100) {
      hunger = 100;
      localStorage.setItem("hunger", hunger);
      foodBar.style.width = parseInt(hunger) + "%";
    } else {
      localStorage.setItem("hunger", hunger);
      foodBar.style.width = parseInt(hunger) + "%";
    }
  }
}
function addHealth(n) {
  if (healthDB == false) {
    health = health + n;
    if (health >= 100) {
      health = 100;
      localStorage.setItem("health", health);
      healthBar.style.width = health + "%";
    } else {
      localStorage.setItem("health", health);
      healthBar.style.width = health + "%";
    }
  }
}

// Variables

// Gameplay

var myGamePiece;

function startGame() {
  myGamePiece = new component(50, 50, imgDir, 10, 120, "image");
  myGameArea.start();
}

var myGameArea = {
  canvasParent: document.getElementById("canvasParent"),
  canvas: document.getElementById("canvasId"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.canvas.style.display = "block";
    this.context = this.canvas.getContext("2d");
    this.canvasParent.insertBefore(this.canvas, null);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener("keydown", function (e) {
      myGameArea.key = e.keyCode;
    });
    window.addEventListener("keyup", function (e) {
      myGameArea.key = false;
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
};

function component(width, height, color, x, y, type) {
  this.gamearea = myGameArea;
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  };
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.newPos();
  myGamePiece.update();
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (myGameArea.key && myGameArea.key == 37) {
    myGamePiece.speedX = -1;
  }
  if (myGameArea.key && myGameArea.key == 39) {
    myGamePiece.speedX = 1;
  }
  if (myGameArea.key && myGameArea.key == 38) {
    myGamePiece.speedY = -1;
  }
  if (myGameArea.key && myGameArea.key == 40) {
    myGamePiece.speedY = 1;
  }
}

function move(dir) {
  myGamePiece.image.src = imgDir;
  if (dir == "up") {
    myGamePiece.speedY = -1;
  }
  if (dir == "down") {
    myGamePiece.speedY = 1;
  }
  if (dir == "left") {
    myGamePiece.speedX = -1;
  }
  if (dir == "right") {
    myGamePiece.speedX = 1;
  }
}

let upInterval;
let downInterval;
let leftInterval;
let rightInterval;

let movingUp = false;
let movingDown = false;
let movingLeft = false;
let movingRight = false;
function moveup(bool) {
  if (bool) {
    if (movingUp == false) {
      movingUp = true;
      upInterval = setInterval(move, 20, "up");
    }
  } else {
    if (movingUp) {
      movingUp = false;
      clearInterval(upInterval);
    }
  }
}

function movedown(bool) {
  if (bool) {
    if (movingDown == false) {
      movingDown = true;
      downInterval = setInterval(move, 20, "down");
    }
  } else {
    if (movingDown) {
      movingDown = false;
      clearInterval(downInterval);
    }
  }
}

function moveleft(bool) {
  if (bool) {
    if (movingLeft == false) {
      movingLeft = true;
      leftInterval = setInterval(move, 20, "left");
    }
  } else {
    if (movingLeft) {
      movingLeft = false;
      clearInterval(leftInterval);
    }
  }
}

function moveright(bool) {
  if (bool) {
    if (movingRight == false) {
      movingRight = true;
      rightInterval = setInterval(move, 20, "right");
    }
  } else {
    if (movingRight) {
      movingRight = false;
      clearInterval(rightInterval);
    }
  }
}
