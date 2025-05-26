const addMusic = document.getElementById("bt5")
const templateBlock = document.querySelector('.templateBlock')
let inside = false
const cards = document.querySelector('.boxCard')
const closeBtn = document.querySelector('.close')
const player = document.querySelector('.Player')
let c = document.getElementById("c");
let ctx = c.getContext("2d");
const btn = document.getElementById("btn")
const pauseBtn = document.querySelector('.btnPause')
let musicMap = new Map()
let currentAudio = null
let isPlaying = false

addMusic.onclick = function () {
    cards.style.display = "none"
    addMusic.style.color = "rgb(128, 51, 192)"
    player.style.display = "none"
    templateBlock.style.display = "grid"   
        if (!isDrawing) { // Only start if the animation isn't already running
        c.style.display = "block"; // Show the canvas
        setInterval(draw, 44); // Start the animation
        isDrawing = true; // Update the flag
    }
    c.style.display = "block"
}
//makes templateBlock disapear in a outside click
//add clique = block 

// Making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

// Chinese characters - taken from the unicode charset
let carac = "000000110100111010010000011111010101110101000101010010011";
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

// Get the "Add music" button
var isDrawing = false; // Flag to track if the animation is running

// Add click event to the "Add music" button
closeBtn.addEventListener("click", function () {
    addMusic.style.color = "rgb(218, 221, 224)"
    cards.style.display = "flex"
    templateBlock.style.display = "none"
    player.style.display = "inline-flex"
    c.style.display = "none"
})

// Cria o input de arquivo programaticamente
const musicInput = document.createElement('input');
musicInput.type = 'file';
musicInput.accept = '.mp3'; // Aceita apenas arquivos .mp3
musicInput.multiple = true; // Permite selecionar múltiplos arquivos
musicInput.style.display = 'none'; // Esconde o input
document.body.appendChild(musicInput);

// Seleciona o botão "Upload Song" pela id "upBtn"
const uploadBtn = document.getElementById('upBtn');

// Aciona o input de arquivo quando o botão "Upload Song" é clicado
uploadBtn.addEventListener('click', function() {
    musicInput.click();
});

// Lida com a seleção de arquivos
musicInput.addEventListener('change', function() {
    const files = this.files;
    const musicsDiv = document.querySelector('.musics'); // Div onde as músicas aparecem
    for (let file of files) {
        const h2 = document.createElement('h2');
        h2.textContent = file.name; // Nome do arquivo como texto
        h2.classList.add('btn'); // Adiciona uma classe para estilização, se necessário
        musicsDiv.appendChild(h2); // Adiciona o elemento à div
            musicMap.set(h2, file);

        // adiciona click em cada item de musica
        h2.addEventListener('click', function() {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
                isPlaying = false;
            }
            currentAudio = new Audio(URL.createObjectURL(file));
            currentAudio.play();
            isPlaying = true;
            document.querySelector('.MusicName').textContent = file.name;
            // atualiza o botão de pausa
            pauseBtn.src = './icons/pause.png';
        });
    }
});

pauseBtn.addEventListener('click', function() {
    if (currentAudio) {
        if (isPlaying) {
            currentAudio.pause();
            isPlaying = false;
            pauseBtn.src = './icons/play.png';
        } else {
            currentAudio.play();
            isPlaying = true;
            pauseBtn.src = './icons/pause.png';
        }
    }
});

// Evento de clique do <h2> alterado (substitua o existente)
h2.addEventListener('click', function() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        isPlaying = false;
    }
    currentAudio = new Audio(URL.createObjectURL(file));
    currentAudio.play();
    isPlaying = true;
    document.querySelector('.MusicName').textContent = file.name;
    // pauseBtn.src = './icons/pause.png'; // Linha comentada para ignorar troca de ícones
});
