let c = document.getElementById("c");
let ctx = c.getContext("2d");

// Making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

// Chinese characters - taken from the unicode charset
let carac = "Library";
// Converting the string into an array of single characters
carac = carac.split("");

var font_size = 16;
var columns = c.width / font_size; // Number of columns for the rain
// An array of drops - one per column
var drops = [];
// x below is the x coordinate
// 1 = y co-ordinate of the drop (same for every drop initially)
for (var x = 0; x < columns; x++) {
    drops[x] = 3;
}

// Drawing the characters
function draw() {
    // Black BG for the canvas
    // Translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.13)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "rgb(72, 50, 155)"; // purple text
    ctx.font = font_size + "px Pixelify Sans, sans-serif";
    // Looping over drops
    for (var i = 0; i < drops.length; i++) {
        // A random Chinese character to print
        var text = carac[Math.floor(Math.random() * carac.length)];
        // x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        // Sending the drop back to the top randomly after it has crossed the screen
        // Adding randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Incrementing Y coordinate
        drops[i]++;
    }
}

