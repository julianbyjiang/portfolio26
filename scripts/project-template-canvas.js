let myCanvas;
let parent;
let bgColour = "#fff38a";

function setupParent() {
    parent = document.getElementById("canvas-holder");
    myCanvas.parent(parent);
    parent.style.zoom = 1;
}

function setup() {
    myCanvas = createCanvas(1280, 720);
    setupParent();

    background(bgColour);
}



function draw() {
    background(bgColour);
    // and now project specific stuff here

    fill("white");
}





function zoomOut() {
    let currentZoom = Number(parent.style.zoom);
    if (currentZoom > 0.1) {
        parent.style.zoom = currentZoom - 0.1; // or parent.style.cssText = "property: value";
    } else {
        alert("Already on smallest zoom");
    }
}

function zoomIn() {
    let currentZoom = Number(parent.style.zoom);
    parent.style.zoom = currentZoom + 0.1;
}