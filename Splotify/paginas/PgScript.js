//Gustavo Cândido Projeto: Splotify
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
let currentPlayingH2 = null; // Variável para rastrear o H2 atual
const songName = document.getElementById("nameBlock") // Esta variável não está sendo usada no código original para o nome da música atual.
const createPlaylist = document.getElementById("bt4")
const profilePicture = document.getElementById("profilePicture")
const configBlock = document.querySelector('.configBlock')
const body = document.querySelector('body')
const closeConfig = document.getElementById("closeConfig")
const purpleBtn = document.getElementById("purpleBtn")
const greenBtn = document.getElementById("greenBtn")
const redBtn = document.getElementById("redBtn")
const navBar = document.querySelector('.NavBar')
const logo = document.querySelector('.logo')
const contentPlayer = document.querySelector('.contentPlayer')
const randomContent = document.querySelector('.RandomContent')
const musicNameDisplay = document.querySelector('.MusicName') // Renomeado para evitar conflito com a variável musicName usada no CSS
const cardsTemplate = document.querySelectorAll('.cardsTemplate')
const tittleCard = document.querySelectorAll('.tittleCard');
const sinopse = document.querySelectorAll('.sinopseBox');
const cardImg = document.querySelectorAll('.imgBlock')
const btnAdd = document.querySelectorAll('.btnAdd')
const addBtn = document.getElementById('addBtn')
const purpleBtnElement = document.querySelector('#purpleBtn')
const sideItens = document.querySelector('.sideItens') // Adicionado de volta de codigo1
const MatrixOnly = document.getElementById("matrixOnly")
// Variável global para a cor do efeito Matrix (padrão: roxo)
let matrixColor = "rgb(72, 50, 155)";
//variaveis biblioteca novas
const cPlaylist = document.getElementById("bt4")
const bloco1 = document.querySelector('.bloco1')
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

    ctx.fillStyle = matrixColor; // purple text
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

    if (!isDrawing) { // Only start if the animation isn't already running
        c.style.display = "block"; // Show the canvas
        setInterval(draw, 44); // Start the animation
        isDrawing = true; // Update the flag
    }
    c.style.display = "block"

cPlaylist.onclick = function () {
    bloco1.style.display = "flex"
}


// Função para atualizar o hover do templateBlock
function updateTemplateBlockHover(color) {
    // Remove qualquer regra de hover anterior
    templateBlock.classList.remove('hover-green', 'hover-red', 'hover-purple');
    // Adiciona a classe correspondente à cor (Sintaxe corrigida)
    templateBlock.classList.add(`hover-${color}`);
}

// Função para atualizar o hover dos elementos .btn
function updateBtnHover(color) {
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.classList.remove('btn-hover-green', 'btn-hover-red', 'btn-hover-purple');
        // Adiciona a classe correspondente à cor (Sintaxe corrigida)
        btn.classList.add(`btn-hover-${color}`);
    });
}

// Adiciona as classes de hover dinamicamente no CSS
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    .hover-green:hover {
        background-color: rgba(0, 128, 0, 0.7) !important;
        border: solid 2px green !important;
        box-shadow: 0px 0px 40px 20px green !important;
    }
    .hover-red:hover {
        background-color: rgba(128, 0, 0, 0.7) !important;
        border: solid 2px red !important;
        box-shadow: 0px 0px 40px 20px red !important;
    }
    .hover-purple:hover {
        background-color: rgb(60, 18, 116, 0.7) !important;
        border: solid 2px rgb(38, 6, 151) !important;
        box-shadow: 0px 0px 40px 20px rgb(38, 6, 151) !important;
    }
    .btn-hover-green:hover {
        color: green !important;
    }
    .btn-hover-red:hover {
        color: red !important;
    }
    .btn-hover-purple:hover {
        color: rgb(128, 51, 192) !important;
    }
`;
document.head.appendChild(styleSheet);

//color changes neon
greenBtn.addEventListener("click", function() {
    profilePicture.style.border = "solid 2px green"
    navBar.style.border = "solid 3px green"
    templateBlock.style.border = "solid 2px green"
    contentPlayer.style.border = "solid 2px green"
    logo.style.border = "solid 2px green"
    randomContent.style.border = "solid 2px green"
    musicNameDisplay.style.border = "solid 2px green" // Use musicNameDisplay
    cardsTemplate.forEach(card => card.style.border = "solid 2px green")
    tittleCard.forEach(card => { card.style.border = "solid 2px green"; card.style.backgroundColor = "rgba(0, 128, 0, 0.7)"; })
    sinopse.forEach(card => card.style.border = "solid 2px green")
    cardImg.forEach(img => img.style.border = "solid 2px green")
    btnAdd.forEach(btn => { btn.style.border = "solid 1px green"; btn.style.boxShadow = "-15px -10px 50px 2px green"; })
    addBtn.style.border = "solid 2px green"; addBtn.style.boxShadow = "0px 0px 70px 8px green"
    navBar.style.boxShadow = "5px 10px 50px 2px green"
    profilePicture.style.boxShadow = "0px 0px 50px 2px green"
    templateBlock.style.boxShadow = "0px 0px 50px 2px green"
    contentPlayer.style.boxShadow = "0px 0px 70px 10px green"
    randomContent.style.boxShadow = "-15px -10px 50px 2px green"
    musicNameDisplay.style.boxShadow = "-15px -10px 50px 2px green" // Use musicNameDisplay
    cardsTemplate.forEach(card => card.style.boxShadow = "0px 6px 50px 2px green")
    tittleCard.forEach(card => card.style.boxShadow = "-15px -10px 50px 2px green")
    sinopse.forEach(card => card.style.boxShadow = "5px 0px 30px 6px green")
    logo.style.boxShadow = "-7px 3px 85px 0px green"
    updateTemplateBlockHover("green")
    updateBtnHover("green")
    matrixColor = "green"; // Muda a cor do Matrix para verde
})
redBtn.addEventListener("click", function() {
    profilePicture.style.border = "solid 2px red"
    navBar.style.border = "solid 3px red"
    templateBlock.style.border = "solid 2px red"
    contentPlayer.style.border = "solid 2px red"
    logo.style.border = "solid 2px red"
    randomContent.style.border = "solid 2px red"
    musicNameDisplay.style.border = "solid 2px red" // Use musicNameDisplay
    cardsTemplate.forEach(card => card.style.border = "solid 2px red")
    tittleCard.forEach(card => { card.style.border = "solid 2px red"; card.style.backgroundColor = "rgba(128, 0, 0, 0.7)"; })
    sinopse.forEach(card => card.style.border = "solid 2px red")
    cardImg.forEach(img => img.style.border = "solid 2px red")
    btnAdd.forEach(btn => { btn.style.border = "solid 1px red"; btn.style.boxShadow = "-15px -10px 50px 2px red"; })
    addBtn.style.border = "solid 2px red"; addBtn.style.boxShadow = "0px 0px 70px 8px red"
    navBar.style.boxShadow = "5px 10px 50px 2px red"
    profilePicture.style.boxShadow = "0px 0px 50px 2px red"
    templateBlock.style.boxShadow = "0px 0px 50px 2px red"
    contentPlayer.style.boxShadow = "0px 0px 70px 10px red"
    randomContent.style.boxShadow = "-15px -10px 50px 2px red"
    musicNameDisplay.style.boxShadow = "-15px -10px 50px 2px red" // Use musicNameDisplay
    cardsTemplate.forEach(card => card.style.boxShadow = "0px 6px 50px 2px red")
    tittleCard.forEach(card => card.style.boxShadow = "-15px -10px 50px 2px red")
    sinopse.forEach(card => card.style.boxShadow = "5px 0px 30px 6px red")
    logo.style.boxShadow = "-7px 3px 85px 0px red"
    updateTemplateBlockHover("red")
    updateBtnHover("red")
    matrixColor = "red"; // Muda a cor do Matrix para vermelho
})
purpleBtn.addEventListener("click", function() {
    profilePicture.style.border = "solid 2px rgb(38, 6, 151)"
    navBar.style.border = "solid 3px rgb(38, 6, 151)"   
    templateBlock.style.border = "solid 2px rgb(38, 6, 151)"
    contentPlayer.style.border = "solid 2px rgb(38, 6, 151)"
    logo.style.border = "solid 2px rgb(38, 6, 151)"
    randomContent.style.border = "solid 2px rgb(38, 6, 151)"
    musicNameDisplay.style.border = "solid 2px rgb(38, 6, 151)" // Use musicNameDisplay
    cardsTemplate.forEach(card => card.style.border = "solid 2px rgb(38, 6, 151)")
    tittleCard.forEach(card => { card.style.border = "solid 2px rgb(38, 6, 151)"; card.style.backgroundColor = "rgb(92, 35, 138)"; })
    sinopse.forEach(card => card.style.border = "solid 2px rgb(38, 6, 151)")
    cardImg.forEach(img => img.style.border = "solid 2px rgb(38, 6, 151)")
    btnAdd.forEach(btn => { btn.style.border = "solid 1px rgb(38, 6, 151)"; btn.style.boxShadow = "-15px -10px 50px 2px rgb(38, 6, 151)"; })
    addBtn.style.border = "solid 2px rgb(38, 6, 151)"; addBtn.style.boxShadow = "0px 0px 70px 8px rgb(38, 6, 151)"
    purpleBtnElement.style.border = "solid 3px rgb(38, 6, 151)"; purpleBtnElement.style.boxShadow = "0px 0px 40px 5px rgb(38, 6, 221)"
    navBar.style.boxShadow = "5px 10px 50px 2px rgb(38, 6, 151)"
    profilePicture.style.boxShadow = "0px 0px 50px 2px rgb(38, 6, 151)"
    templateBlock.style.boxShadow = "0px 0px 50px 2px rgb(38, 6, 151)"
    contentPlayer.style.boxShadow = "0px 0px 70px 10px rgb(38, 6, 151)"
    randomContent.style.boxShadow = "-15px -10px 50px 2px rgb(38, 6, 151)"
    musicNameDisplay.style.boxShadow = "-15px -10px 50px 2px rgb(38, 6, 151)" // Use musicNameDisplay
    cardsTemplate.forEach(card => card.style.boxShadow = "0px 6px 50px 2px rgb(38, 6, 151)")
    tittleCard.forEach(card => card.style.boxShadow = "-15px -10px 50px 2px rgb(38, 6, 151)")
    sinopse.forEach(card => card.style.boxShadow = "5px 0px 30px 6px rgb(38, 6, 151)")
    logo.style.boxShadow = "-7px 3px 85px 0px rgb(38, 6, 151)"
    updateTemplateBlockHover("purple")
    updateBtnHover("purple")
    matrixColor = "rgb(72, 50, 155)"; // Restaura a cor do Matrix para roxo
})

closeConfig.addEventListener("click", function() {
    configBlock.style.display = "none"
    cards.style.display = "flex"
})

profilePicture.addEventListener("click", function (){
    configBlock.style.display = "block"
    cards.style.display = "none"
})

createPlaylist.addEventListener("click", function () {
    // Lógica para criar playlist, se houver
})
