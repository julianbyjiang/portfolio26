let myCanvas;
let parent;

let cossetteTexteFont;

// Text symbols
let textSymbols;
const TEXT_SYMBOLS_LIFESPAN_MIN = 80; // frames
const TEXT_SYMBOLS_LIFESPAN_MAX = 140; // frames
const TEXT_SYMBOLS_SIZE_MIN = 16; // pt 12
const TEXT_SYMBOLS_SIZE_MAX = 20; // pt 16
const TEXT_SYMBOLS_DISPERSE_MIN = 0.5; 
const TEXT_SYMBOLS_DISPERSE_MAX = 1; 
const TEXT_SYMBOLS_GRAVITY = 3; 

// Bunny
let bunnyImg;

function setupCanvas() {
    myCanvas = createCanvas(windowWidth * 0.96, windowHeight);
    parent = document.getElementById("menu-canvas-holder");
    myCanvas.parent(parent);
    parent.style.zoom = 1;
}

function preload() {
  bunnyImg = {
    img: loadImage("images/bunny.png"), // 895x1278
    trueW: 895, 
    trueH: 1278,
    w: 0, // not defined yet
    h: 0, // not defined yet
    startX: 20,
    startY: 100, // this is important...
    x: 0,
    y: 0,
    t: 0,
    inc: 1 / 60,
    up: true
  } 
}

function setup() {
  setupCanvas();

  cossetteTexteFont = loadFont("https://fonts.googleapis.com/css2?family=Cossette+Texte:wght@400;700&family=Stack+Sans+Headline&family=Stack+Sans+Notch&display=swap");

  textFont(cossetteTexteFont);
  stroke(255);
  fill(255);
  textAlign(CENTER, CENTER);

  setupTextSymbols();
  setupBunny();
}

function windowResized () {
  setupCanvas();
  setupBunny();
}

function setupBunny() {
  if (width > height) {
    bunnyImg.h = height * 0.8;
    bunnyImg.w = map(bunnyImg.trueW, 0, bunnyImg.trueH, 0, bunnyImg.h); 
  } else {
    bunnyImg.w = width * 0.8;
    bunnyImg.h = map(bunnyImg.trueH, 0, bunnyImg.trueW, 0, bunnyImg.w); 
  }
  // wow that took too much thinking time to come up with this
}

function drawBunny() {
  if (bunnyImg.up) { // t is decreasing (1 to 0)
    if (bunnyImg.t <= 0) {
      bunnyImg.up = false; // start going up
    } else {
      bunnyImg.t -= bunnyImg.inc;
    }
  } else { // t is increasing (0 to 1)
    if (bunnyImg.t >= 1) {
      bunnyImg.up = true; // start going down 
    } else {
      bunnyImg.t += bunnyImg.inc;
    }
  }
  
  bunnyImg.x = -lerp(bunnyImg.startX, 0, easeInOutSine(bunnyImg.t)); // something
  bunnyImg.y = lerp(bunnyImg.startY, 0, easeInQuad(bunnyImg.t)); 
  image(bunnyImg.img, bunnyImg.x, bunnyImg.y, bunnyImg.w, bunnyImg.h);
}

// These will follow the mouse and dissolve
function setupTextSymbols() {
  textSymbols = [];
  textSymbols.push({
      txt: randomTextSymbol(),
      x: mouseX,
      y: mouseY,
      lifetime: 0,
      lifespan: random(TEXT_SYMBOLS_LIFESPAN_MIN, TEXT_SYMBOLS_LIFESPAN_MAX),
      direction: 0
    });
}

function drawTextSymbols() {
  if (frameCount % 2 === 0) {
    textSymbols.push({
      txt: randomTextSymbol(),
      x: mouseX,
      y: mouseY,
      size: random(TEXT_SYMBOLS_SIZE_MIN, TEXT_SYMBOLS_SIZE_MAX),
      lifetime: 0,
      lifespan: random(TEXT_SYMBOLS_LIFESPAN_MIN, TEXT_SYMBOLS_LIFESPAN_MAX),
      direction: 0
    });
  }
  
  if (textSymbols[0].lifetime > textSymbols[0].lifespan) {
      textSymbols.shift();
  }
  
  for (let i = 0; i < textSymbols.length; i++) {
    if (textSymbols[i].lifetime === 0) {
      textSymbols[i].direction = random(-TEXT_SYMBOLS_DISPERSE_MAX, TEXT_SYMBOLS_DISPERSE_MAX);
    }
    
    push();
    textSize(textSymbols[i].size);
    noStroke();
    fill(255, map(textSymbols[i].lifetime, textSymbols[i].lifespan, 0, 0, 255));
    text(textSymbols[i].txt, textSymbols[i].x, textSymbols[i].y);
    pop();

    textSymbols[i].lifetime++;
    textSymbols[i].x += textSymbols[i].direction; // left and right
    textSymbols[i].y += TEXT_SYMBOLS_GRAVITY; // only going down
  }
}

function randomTextSymbol() {
  return(random([".", ",", "*", "⋆", "˚", "꩜", "｡ּ", "☁︎","☾", "୨୧", "₊", "⊹", "x", "+"]));
}

function draw() {
  clear();

  push();
  translate(width / 1.75, -20);
  drawBunny();
  pop();

  drawTextSymbols();
}
