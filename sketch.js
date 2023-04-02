let images = []; // an array to store the uploaded images
let uploadButton; // a button to upload images
let saveButton; // a button to save the final outcome
let videoCapturer; // a video capturer object
let isCapturing = false; // a boolean flag to check if the video is being captured

function preload() {
  // load any necessary assets here
}

function setup() {
  createCanvas(1000, 1100); // set the canvas size
  background(255); // set the background to white

  uploadButton = createFileInput(handleFile); // create a file input button
  uploadButton.attribute('multiple', 'true'); // allow users to upload multiple files
  uploadButton.position(10, 10); // position the button on the canvas

  // saveButton = createButton('Save'); // create a button to save the final outcome
  // saveButton.position(10, 10); // position the button on the canvas
  // saveButton.mousePressed(saveImageOrVideo); // set the saveImageOrVideo function to be called when the button is pressed
  
  frameRate(1);
}

function draw() {
  
  
  if (images.length > 0) { // if there are images uploaded
    let tileSize = mouseX; // set the size of each tile
    for (let y = 50; y < height; y += tileSize) { // loop through rows of tiles
      for (let x = 0; x < width; x += tileSize) { // loop through columns of tiles
        let img = random(images); // select a random image from the array
        let sx = floor(random(img.width - tileSize)); // select a random starting x position
        let sy = floor(random(img.height - tileSize)); // select a random starting y position
        let tile = img.get(sx, sy, tileSize, tileSize); // extract the tile from the image
        image(tile, x, y); // draw the tile to the canvas
      }
    }
  }

  if (isCapturing) { // if the video is being captured
    videoCapturer.capture(canvas); // capture the canvas to the video
  }
}


function handleFile(file) {
  if (file.type === 'image') { // if the uploaded file is an image
    loadImage(file.data, function(img) { // create a p5.Image object from the file
      images.push(img); // add the image to the array
    });
  }
}

function keyPressed() {

  // If you hit the s key, save an image
  if (key === 's' || key === 'S') {
    saveImageOrVideo();
  }
}


function saveImageOrVideo() {
  if (!isCapturing) { // if the video is not being captured
    let extension = ''; // initialize the file extension
    let now = new Date(); // get the current date and time
    let timestamp = now.toISOString().slice(0, 19).replace(/:/g, '-'); // format the date and time
    if (keyCode === ENTER || keyCode === RETURN) { // if the user presses the Enter or Return key
      extension = '.mp4'; // set the file extension to MP4
      videoCapturer = new CCapture({ format: 'ffmpeg', framerate: 30 }); // create a video capturer object
      videoCapturer.start(); // start capturing the canvas to the video
      isCapturing = true; // set the boolean flag to true
    } else { // otherwise
      extension = '.jpg'; // set the file extension to JPEG
      saveCanvas('DataWeaving-' + timestamp, 'jpg');
                 }   
  }
}
