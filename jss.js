var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var score = 0;

// kocka atributi
var x = canvas.width / 2;
var y = canvas.height / 2;
var speed = 6;
var sideLength = 50;
var speed2 = 30;

// kocka za hvatanje
var targetX = 0;
var targetY = 0;
var targetLength = 30;
// promjenljive za kretanje

var down = false;
var up = false;
var right = false;
var left = false;

//Ucitavanje zvukova
let pocetak_igre = new Audio();
let time = new Audio();
let end = new Audio();

pocetak_igre.src = "pocetak_igre.mp3";
time.src = "remainding.mp3";
end.src = "end_game2.mp3";

let wallpaper = new Image();
wallpaper.src = "wallpaper.jpg";

// Tajmer
var countdown = 30;
var id = null;
var br = 0;

function isWithin(a, b, c) {
  return a > b && a < c;
}

// Ocistiti canvas
function erase() {
  context.drawImage(wallpaper, 0, 0, 1920, 1080);
}

var ship = makeSquare(50, canvas.height / 2 - 25, 50, 5);

function makeSquare(x2, y2, length, speed) {
  return {
    x2: 0,
    y2: canvas.height / 2,
    l2: length,
    s2: speed2,
    s3: speed,
    draw: function() {
      context.fillRect(this.x2, this.y2, this.l2, this.l2);
    }
  };
}

// Flags to tracked which keys are pressed
var w = false;
var s = false;
var space = false;

// Is a bullet already on the canvas?
var shooting = false;

// The bulled shot from the ship
var bullet = makeSquare(0, 0, 10, 10);

// Listen for keydown events
canvas.addEventListener("keydown", function(event) {
  event.preventDefault();
  if (event.keyCode === 87) {
    // UP
    w = true;
  }
  if (event.keyCode === 83) {
    // DOWN
    s = true;
  }
  if (event.keyCode === 32) {
    // SPACE
    shoot();
  }
});

// Listen for keyup events
canvas.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 87) {
    // UP
    w = false;
  }
  if (event.keyCode === 83) {
    // DOWN
    s = false;
  }
});

// Shoot the bullet (if not already on screen)
function shoot() {
  if (!shooting) {
    shooting = true;
    bullet.x2 = ship.x2 + ship.l2;
    bullet.y2 = ship.y2 + ship.l2 / 2;
  }
}

// pritisak dolje
canvas.addEventListener("keydown", function(event) {
  event.preventDefault();
  console.log(event.key, event.keyCode);
  if (event.keyCode === 40) {
    // DOWN
    down = true;
  }
  if (event.keyCode === 38) {
    // UP
    up = true;
  }
  if (event.keyCode === 37) {
    // LEFT
    left = true;
  }
  if (event.keyCode === 39) {
    // RIGHT
    right = true;
  }
});

// pritisak gore
canvas.addEventListener("keyup", function(event) {
  event.preventDefault();
  console.log(event.key, event.keyCode);
  if (event.keyCode === 40) {
    // DOWN
    down = false;
  }
  if (event.keyCode === 38) {
    // UP
    up = false;
  }
  if (event.keyCode === 37) {
    // LEFT
    left = false;
  }
  if (event.keyCode === 39) {
    // RIGHT
    right = false;
  }
});

// Prikaz Start menu-a
function menu() {
  erase();
  context.fillStyle = "#0096FE ";
  context.font = "150px Impact";
  context.textAlign = "center";
  context.fillText("Grab and Run", canvas.width / 2, canvas.height / 3);
  context.font = "50px Impact";
  context.fillText(" Click to start", canvas.width / 2, canvas.height / 2);
  context.font = "18px Impact";

  // Start igirce na pritisak
  canvas.addEventListener("click", startGame);
}

// Start igice
function startGame() {
  pocetak_igre.play();
  // Smanjuj countdown svake sekunde
  id = setInterval(function() {
    countdown--;
  }, 1000);
  // Blokiranje Click
  canvas.removeEventListener("click", startGame);
  // poziv funkcij move target(random spavn kocke)
  moveTarget();
  // poziv funkcije draw
  draw();
}

// Prikaz Game Over-a
function endGame() {
  end.play();
  // Zaustavi tajmer
  clearInterval(id);
  // Prikazi rezultat
  erase();
  context.fillStyle = "#0096FE ";
  context.font = "100px Impact";
  context.textAlign = "center";
  context.fillText("Player 1 WINS!!! ", canvas.width / 2, 400);
}

// Prikaz Game Over-a
function endGame2() {
  end.play();
  // Zaustavi tajmer
  clearInterval(id);
  // Prikazi rezultat
  erase();
  context.fillStyle = "#0096FE ";
  context.font = "100px Impact";
  context.textAlign = "center";
  context.fillText("Player 2 WINS!!!", canvas.width / 2, canvas.height / 2);
  context.fillText("Score:" + score, canvas.width / 2, canvas.height / 2 + 100);
}

// random pozicija kockice
function moveTarget() {
  targetX = Math.round(Math.random() * canvas.width - targetLength);
  targetY = Math.round(Math.random() * canvas.height - targetLength);
}

// Funkcija za crtanje
function draw() {
  erase();

  // Sudaranje sa drugom kockom
  if (
    isWithin(targetX, x, x + sideLength) ||
    isWithin(targetX + targetLength, x, x + sideLength)
  ) {
    // Poklapanje x
    if (
      isWithin(targetY, y, y + sideLength) ||
      isWithin(targetY + targetLength, y, y + sideLength)
    ) {
      // Poklapanje y

      //povecavanje
      sideLength = sideLength + 2;
      countdown = countdown + 1;
      // Ponovno kreiranje random kocke
      moveTarget();
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
      // Povecati score
      score++;
    }
  }

  // Sudaranje sa drugom kockom
  if (
    isWithin(bullet.x2, x, x + sideLength) ||
    isWithin(bullet.x2 + sideLength, x, x + sideLength)
  ) {
    // Poklapanje x
    if (
      isWithin(bullet.y2, y, y + sideLength) ||
      isWithin(bullet.y2 + sideLength, y, y + sideLength)
    ) {
      // Poklapanje y

      br++;
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
    }
  }

  // Move the ship
  if (s) {
    ship.y2 += ship.s3;
  }
  if (w) {
    ship.y2 -= ship.s3;
  }

  // Don't go out of bounds
  if (ship.y2 < 0) {
    ship.y2 = 0;
  }
  if (ship.y2 > canvas.height - ship.l2) {
    ship.y2 = canvas.height - ship.l2;
  }

  // Pomjeranje kocke
  if (down) {
    y += speed;
  }
  if (up) {
    y -= speed;
  }
  if (right) {
    x += speed;
  }
  if (left) {
    x -= speed;
  }

  // Drzi kvadrat unutar canvasa
  if (y + sideLength > canvas.height) {
    y = canvas.height - sideLength;
  }
  if (y < 0) {
    y = 0;
  }
  if (x < 0) {
    x = 0;
  }
  if (x + sideLength > canvas.width) {
    x = canvas.width - sideLength;
  }

  // Move and draw the bullet
  if (shooting) {
    // Move the bullet
    bullet.x2 += bullet.s2;
    // Collide with the wall
    if (bullet.x2 > canvas.width) {
      shooting = false;
    }
    // Draw the bullet
    context.fillStyle = "#FE00EB";
    bullet.draw();
  }

  // Draw the ship
  context.fillStyle = "#FE00EB";
  ship.draw();

  // Nacrtati kocku
  context.fillStyle = "#0096FE";
  context.fillRect(x, y, sideLength, sideLength);

  // Nacrtati random kocku
  context.fillStyle = "#00FEAD ";
  context.fillRect(targetX, targetY, targetLength, targetLength);

  // Prikazivanje scor-a i preostalog vremenaa
  context.fillStyle = "#0096FE ";
  context.font = "25px Impact";
  context.textAlign = "left";
  context.fillText("Score: " + score, 10, 24);
  context.fillText("Time Remaining: " + countdown, 10, 50);
  if (countdown <= 5) {
    time.play();
  }

  if (br === 1) {
    endGame();
  }

  // Zavrsavanje igre
  else if (countdown <= 0) {
    endGame2();
  } else {
    window.requestAnimationFrame(draw);
  }
}

// Start igre
menu();
canvas.focus();
