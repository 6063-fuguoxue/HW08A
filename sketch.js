let mImage;
let xOff, yOff;

// Use DOM elements to help determine the tolerance range of each color
let picker;
let SIMILARITY_VALUE_red = 60;
let SIMILARITY_VALUE_blue = 50;
let SIMILARITY_VALUE_yellow = 50;
let SIMILARITY_VALUE_black = 80;

// let slider_similarity;
// Define Modriaan Color objects
let Mondriaan_Red = { r: 220, g: 30, b: 20 };
let Mondriaan_Blue = { r: 40, g: 70, b: 120 };
let Mondriaan_Yellow = { r: 230, g: 200, b: 98 };
let Mondriaan_Black = { r: 0, g: 0, b: 0 };


function preload() {
  mImage = loadImage("./Piet_Mondriaan.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); 
  mImage.resize(0, height); 
  noLoop();
  xOff = (width - mImage.width) / 2;
  yOff = (height - mImage.height) / 2;

  // Place color picker on canvas
  picker = createColorPicker(color(0));
  picker.position(500, 500);
  picker.style("width", width/5 + "px");

  // Place slider to change the similarity_value
  // slider_similarity = createSlider(0, 100);
  // slider_similarity.position(10, 10);
  // slider_similarity.style("width", width - 20 + "px");
}

function draw() {
  background(0);
  // SIMILARITY_VALUE = slider_similarity.value();

  mImage.loadPixels();

  for (let y = 0; y < mImage.height; y+=1) {
    for (let x = 0; x < mImage.width; x+=1) {
      let pixelIndex = 4* (y * mImage.width + x); // Keep track of where each pixel is
      // Get the RGBA value of the current pixel
      let redVal = mImage.pixels[pixelIndex + 0];
      let greenVal = mImage.pixels[pixelIndex + 1];
      let blueVal = mImage.pixels[pixelIndex + 2];
      // let alphaVal = mImage.pixels[pixelIndex + 3];


      // Check if close to Mondriaan_Blue
      if ((abs(redVal - Mondriaan_Blue.r) < SIMILARITY_VALUE_blue) && (abs(greenVal - Mondriaan_Blue.g < SIMILARITY_VALUE_blue)) && (abs(blueVal - Mondriaan_Blue.b) < SIMILARITY_VALUE_blue)) {
        changeBlue(pixelIndex);
      }

      // Check if close to Mondriaan_Yellow
      if ((abs(redVal - Mondriaan_Yellow.r) < SIMILARITY_VALUE_yellow) && (abs(greenVal - Mondriaan_Yellow.g < SIMILARITY_VALUE_yellow)) && (abs(blueVal - Mondriaan_Yellow.b) < SIMILARITY_VALUE_yellow)) {
        changeYellow(pixelIndex);
      }

      // Check if close to Mondriaan_Red
      if ((abs(redVal - Mondriaan_Red.r) < SIMILARITY_VALUE_red) && (abs(greenVal - Mondriaan_Red.g < SIMILARITY_VALUE_red)) && (abs(blueVal - Mondriaan_Red.b) < SIMILARITY_VALUE_red)) {
        changeRed(pixelIndex);
      }

      // Check if close to Mondriaan_Black
      if ((abs(redVal - Mondriaan_Black.r) < SIMILARITY_VALUE_black) && (abs(greenVal - Mondriaan_Black.g < SIMILARITY_VALUE_black)) && (abs(blueVal - Mondriaan_Black.b) < SIMILARITY_VALUE_black)) {
        changeBlack(pixelIndex);
      }

      fill(redVal, greenVal, blueVal); 
      noStroke();
    }
  }

  mImage.updatePixels(); // Update all the pixels

  push();
  translate(xOff, yOff);
  image(mImage, 0, 0);
  pop();
}

function changeRed(pixelIndex) { // If the pixel is Modriaan red, change its color
  mImage.pixels[pixelIndex + 0] = 255; // new R value
  mImage.pixels[pixelIndex + 1] = 255; // new G value
  mImage.pixels[pixelIndex + 2] = 255; // new B value

}

function changeBlue(pixelIndex) { // If the pixel is Modriaan red, change its color
  mImage.pixels[pixelIndex + 0] = 0; // new R value
  mImage.pixels[pixelIndex + 1] = 0; // new G value
  mImage.pixels[pixelIndex + 2] = 0; // new B value
}

function changeYellow(pixelIndex) { // If the pixel is Modriaan red, change its color
  mImage.pixels[pixelIndex + 0] = 10; // new R value
  mImage.pixels[pixelIndex + 1] = 100; // new G value
  mImage.pixels[pixelIndex + 2] = 255; // new B value
}

function changeBlack(pixelIndex) { // If the pixel is Modriaan red, change its color
  mImage.pixels[pixelIndex + 0] = 220; // new R value
  mImage.pixels[pixelIndex + 1] = 120; // new G value
  mImage.pixels[pixelIndex + 2] = 20; // new B value
}