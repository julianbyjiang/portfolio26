let myCanvas;
let parent;

let cossetteTexteFont;

let textSymbols;
const TEXT_SYMBOLS_LIFESPAN_MIN = 80; // frames
const TEXT_SYMBOLS_LIFESPAN_MAX = 140; // frames
const TEXT_SYMBOLS_SIZE_MIN = 16; // pt 12
const TEXT_SYMBOLS_SIZE_MAX = 20; // pt 16
const TEXT_SYMBOLS_DISPERSE_MIN = 0.5; 
const TEXT_SYMBOLS_DISPERSE_MAX = 1; 
const TEXT_SYMBOLS_GRAVITY = 3; 


function setupParent() {
    parent = document.getElementById("menu-canvas-holder");
    myCanvas.parent(parent);
    parent.style.zoom = 1;
}

function setup() {
  myCanvas = createCanvas(windowWidth * 0.96, windowHeight);

  setupParent();

  cossetteTexteFont = loadFont("https://fonts.googleapis.com/css2?family=Cossette+Texte:wght@400;700&family=Stack+Sans+Headline&family=Stack+Sans+Notch&display=swap");

  textFont(cossetteTexteFont);
  stroke(255);
  fill(255);
  textAlign(CENTER, CENTER);

  setupTextSymbols();
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

  drawTextSymbols();
}
