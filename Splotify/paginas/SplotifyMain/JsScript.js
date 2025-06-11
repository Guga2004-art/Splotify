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
const sideItens = document.querySelector('.sideItens') // Adicionado de codigo1
const MatrixOnly = document.getElementById("matrixOnly")

// --- INÍCIO DA IMPLEMENTAÇÃO DO INDEXEDDB PARA ARMAZENAMENTO PERSISTENTE DE MÚSICAS ---
// NOTA: O JavaScript do navegador não pode criar pastas diretamente no sistema de arquivos do usuário
// por razões de segurança. Em vez disso, usamos o IndexedDB, um banco de dados do navegador,
// para atingir o objetivo de salvar músicas de forma persistente. Isso funciona como a pasta "ALLSONGS" que você queria.
let db;

function initDB() {
    const request = window.indexedDB.open("SplotifyDB", 1);

    request.onerror = function(event) {
        console.error("Erro no banco de dados: " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Banco de dados aberto com sucesso.");
        loadSongs(); // Carrega as músicas assim que o DB estiver pronto
    };

    request.onupgradeneeded = function(event) {
        let db = event.target.result;
        // O object store irá guardar os próprios objetos File.
        // Usamos o nome do arquivo como a chave (keyPath).
        if (!db.objectStoreNames.contains('songs')) {
            db.createObjectStore('songs', { keyPath: 'name' });
        }
    };
}

function saveSong(file) {
    if (!db) {
        console.error("O banco de dados não está inicializado.");
        return;
    }
    const transaction = db.transaction(['songs'], 'readwrite');
    const store = transaction.objectStore('songs');
    const request = store.put(file); // 'put' adiciona ou atualiza se a chave já existir

    request.onsuccess = function() {
        console.log(`Música "${file.name}" salva no IndexedDB.`);
    };

    request.onerror = function(event) {
        console.error(`Erro ao salvar a música "${file.name}": ${event.target.error}`);
    };
}

function loadSongs() {
    if (!db) {
        console.error("O banco de dados não está inicializado.");
        return;
    }
    const transaction = db.transaction(['songs'], 'readonly');
    const store = transaction.objectStore('songs');
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = function(event) {
        const files = event.target.result;
        files.forEach(file => {
            addSongToUI(file);
        });
        console.log(`${files.length} música(s) carregada(s) do IndexedDB.`);
    };

    getAllRequest.onerror = function(event) {
        console.error("Erro ao carregar músicas: " + event.target.error);
    };
}

// NOVA FUNÇÃO para limpar todas as músicas do IndexedDB
function clearSongsDB() {
    if (!db) {
        console.error("O banco de dados não está inicializado para limpeza.");
        return;
    }
    const transaction = db.transaction(['songs'], 'readwrite');
    const store = transaction.objectStore('songs');
    const request = store.clear();

    request.onsuccess = function() {
        console.log("Todas as músicas foram removidas do IndexedDB.");
    };

    request.onerror = function(event) {
        console.error("Erro ao limpar o banco de dados de músicas: ", event.target.error);
    };
}

function addSongToUI(file) {
    const musicsDiv = document.querySelector('.musics');
    const h2 = document.createElement('h2');
    h2.textContent = file.name;
    h2.classList.add('btn');
    musicsDiv.appendChild(h2);
    musicMap.set(h2, file);

    // adiciona click em cada item de musica
    h2.addEventListener('click', function() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.removeEventListener('ended', playNextSong);
        }
        currentAudio = new Audio(URL.createObjectURL(file));
        currentAudio.play();
        isPlaying = true;
        currentPlayingH2 = this;
        musicNameDisplay.textContent = file.name;
        pauseBtn.src = '../icons/pause.png';
        currentAudio.addEventListener('ended', playNextSong);
    });
}
// --- FIM DA IMPLEMENTAÇÃO DO INDEXEDDB ---


// Variáveis para os novos botões e elementos de imagem
const changeLogoBtn = document.getElementById('changeLogoBtn');
const changeProfileBtn = document.getElementById('changeProfileBtn');
const logoImg = document.querySelector('.logo'); // Referência à imagem da logo
const profilePictureImg = document.getElementById('profilePicture'); // Referência à imagem do perfil

// Variável global para a cor do efeito Matrix (padrão: roxo)
let matrixColor = "rgb(72, 50, 155)";

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

// --- LÓGICA DE PERSISTÊNCIA E APLICAÇÃO DE TEMA ---

// Define as paletas de cores para facilitar a troca
const colorThemes = {
    purple: {
        main: 'rgb(38, 6, 151)',
        glow: 'rgb(38, 6, 221)',
        titleBg: 'rgb(92, 35, 138)',
        matrix: 'rgb(72, 50, 155)'
    },
    red: {
        main: 'red',
        glow: 'rgb(211, 38, 6)',
        titleBg: 'rgba(128, 0, 0, 0.7)',
        matrix: 'red'
    },
    green: {
        main: 'green',
        glow: 'rgb(38, 151, 6)',
        titleBg: 'rgba(0, 128, 0, 0.7)',
        matrix: 'green'
    }
};

// Função refatorada que aplica um tema com base no nome da cor
function applyTheme(colorName) {
    const theme = colorThemes[colorName];
    if (!theme) return; // Se o nome da cor for inválido, não faz nada

    // Aplica os estilos a todos os elementos
    profilePicture.style.border = `solid 2px ${theme.main}`;
    navBar.style.border = `solid 3px ${theme.main}`;
    templateBlock.style.border = `solid 2px ${theme.main}`;
    contentPlayer.style.border = `solid 2px ${theme.main}`;
    logo.style.border = `solid 2px ${theme.main}`;
    randomContent.style.border = `solid 2px ${theme.main}`;
    musicNameDisplay.style.border = `solid 2px ${theme.main}`;
    cardsTemplate.forEach(card => card.style.border = `solid 2px ${theme.main}`);
    tittleCard.forEach(card => {
        card.style.border = `solid 2px ${theme.main}`;
        card.style.backgroundColor = theme.titleBg;
    });
    sinopse.forEach(card => card.style.border = `solid 2px ${theme.main}`);
    cardImg.forEach(img => img.style.border = `solid 2px ${theme.main}`);
    btnAdd.forEach(btn => {
        btn.style.border = `solid 1px ${theme.main}`;
        btn.style.boxShadow = `-15px -10px 50px 2px ${theme.main}`;
    });
    addBtn.style.border = `solid 2px ${theme.main}`;
    addBtn.style.boxShadow = `0px 0px 70px 8px ${theme.main}`;
    purpleBtnElement.style.border = colorName === 'purple' ? `solid 3px ${theme.main}` : 'none'; // Estilo especial para o botão roxo
    
    // Aplica as sombras com a cor de 'brilho' apropriada
    purpleBtnElement.style.boxShadow = `0px 0px 40px 5px ${colorThemes.purple.glow}`; // Mantem o brilho de cada botão de cor
    redBtn.style.boxShadow = `0px 0px 40px 5px ${colorThemes.red.glow}`;
    greenBtn.style.boxShadow = `0px 0px 40px 5px ${colorThemes.green.glow}`;
    navBar.style.boxShadow = `5px 10px 50px 2px ${theme.main}`;
    profilePicture.style.boxShadow = `0px 0px 50px 2px ${theme.main}`;
    templateBlock.style.boxShadow = `0px 0px 50px 2px ${theme.main}`;
    contentPlayer.style.boxShadow = `0px 0px 70px 10px ${theme.main}`;
    randomContent.style.boxShadow = `-15px -10px 50px 2px ${theme.main}`;
    musicNameDisplay.style.boxShadow = `-15px -10px 50px 2px ${theme.main}`;
    cardsTemplate.forEach(card => card.style.boxShadow = `0px 6px 50px 2px ${theme.main}`);
    tittleCard.forEach(card => card.style.boxShadow = `-15px -10px 50px 2px ${theme.main}`);
    sinopse.forEach(card => card.style.boxShadow = `5px 0px 30px 6px ${theme.main}`);
    logo.style.boxShadow = `-7px 3px 85px 0px ${theme.main}`;

    // Atualiza os estilos de hover e a cor da Matrix
    updateTemplateBlockHover(colorName);
    updateBtnHover(colorName);
    matrixColor = theme.matrix;
}

// Event Listeners para os botões de cor
// Agora eles chamam a função applyTheme e salvam a escolha no localStorage
greenBtn.addEventListener("click", function() {
    applyTheme('green');
    localStorage.setItem('splotifyTheme', 'green');
});

redBtn.addEventListener("click", function() {
    applyTheme('red');
    localStorage.setItem('splotifyTheme', 'red');
});

purpleBtn.addEventListener("click", function() {
    applyTheme('purple');
    localStorage.setItem('splotifyTheme', 'purple');
});

// Função para carregar e aplicar o tema salvo ao iniciar a página
function loadAndApplyTheme() {
    const savedTheme = localStorage.getItem('splotifyTheme');
    if (savedTheme) { // Se um tema foi salvo
        applyTheme(savedTheme);
    } else {
        applyTheme('purple'); // Aplica o tema roxo por padrão se nada for salvo
    }
}
// --- FIM DA LÓGICA DE TEMA ---

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

addMusic.onclick = function () {
    cards.style.display = "none"
    player.style.display = "none"
    sideItens.style.display = "none" // Mantido de codigo1
    navBar.style.display = "none" // Mantido de codigo1
    templateBlock.style.display = "grid" 
    configBlock.style.display = "none"
    if (!isDrawing) { // Only start if the animation isn't already running
        c.style.display = "block"; // Show the canvas
        setInterval(draw, 44); // Start the animation
        isDrawing = true; // Update the flag
    }
    c.style.display = "block"
}
MatrixOnly.addEventListener("click", function() {
        navBar.style.display =  "none"
        cards.style.display = "none"
        if (!isDrawing) { // Only start if the animation isn't already running
        c.style.display = "block"; // Show the canvas
        setInterval(draw, 44); // Start the animation
        isDrawing = true; // Update the flag
    }
    c.style.display = "block"
})
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

// Add click event to the "Add music" button
closeBtn.addEventListener("click", function () {
    addMusic.style.color = "rgb(218, 221, 224)"
    cards.style.display = "flex"
    templateBlock.style.display = "none"
    player.style.display = "inline-flex"
    c.style.display = "none"
    sideItens.style.display = "block" // Mantido de codigo1
    navBar.style.display = "flex" // Mantido de codigo1
})

// Cria o input de arquivo programaticamente para músicas
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

// FUNÇÃO PARA TOCAR A PRÓXIMA MÚSICA (Adicionado de codigo2)
function playNextSong() {
    const songElements = Array.from(document.querySelectorAll('.musics .btn')); 
    if (songElements.length === 0) return; // Nenhuma música na lista

    let currentIndex = -1;
    if (currentPlayingH2) {
        currentIndex = songElements.indexOf(currentPlayingH2);
    }
    
    let nextIndex;
    if (currentIndex === -1) { // Se nenhuma música estiver tocando ou a atual não for encontrada
        nextIndex = 0; // Começa da primeira música
    } else {
        nextIndex = (currentIndex + 1) % songElements.length; // Loop para a próxima, ou volta ao início
    }
    
    songElements[nextIndex].click(); // Simula o clique na próxima música
}

// Lida com a seleção de arquivos de música
musicInput.addEventListener('change', function() {
    const files = this.files;
    for (const file of files) {
        // Verifica se a música já existe na UI para não adicionar duplicatas
        const existingElements = document.querySelectorAll('.musics h2.btn');
        const alreadyExists = Array.from(existingElements).some(el => el.textContent === file.name);
        
        if (!alreadyExists) {
            addSongToUI(file); // Adiciona na interface e torna tocável
            saveSong(file);   // Salva no banco de dados para persistência
        } else {
            console.warn(`A música "${file.name}" já está na playlist.`);
        }
    }
    this.value = ''; // Limpa o valor do input para permitir selecionar o mesmo arquivo novamente
});


pauseBtn.addEventListener('click', function() {
        navBar.style.display =  "flex"
        cards.style.display = "flex"
        c.style.display = "none"
    if (currentAudio) {
        if (isPlaying) {
            currentAudio.pause();
            isPlaying = false;
            pauseBtn.src = '../icons/play.png';
        } else {
            currentAudio.play();
            isPlaying = true;
            pauseBtn.src = '../icons/pause.png';
        }
    }
});


const btnNext = document.querySelector('.btnNext'); 

if (btnNext) { 
    // Agora o btnNext chama a mesma função que o evento 'ended' (Alterado para usar playNextSong de codigo2)
    btnNext.addEventListener('click', playNextSong);
}

const btnBack = document.querySelector('.btnBack'); // Seleciona o botão/imagem btnBack

if (btnBack) { // Verifica se o elemento existe antes de adicionar o listener
    btnBack.addEventListener('click', function() {
        if (!currentPlayingH2) { // Se nenhuma música estiver tocando
            // Opcional: tocar a última música da lista se existir (Completo de codigo2)
            const songElements = Array.from(document.querySelectorAll('.musics .btn'));
            if (songElements.length > 0) {
                songElements[songElements.length - 1].click(); // Clica na última música
            }
            return;
        }

        const songElements = Array.from(document.querySelectorAll('.musics .btn')); // Pega todos os H2 de música
        if (songElements.length === 0) return; // Nenhuma música na lista

        let currentIndex = songElements.indexOf(currentPlayingH2);

        if (currentIndex === -1) { // Caso algo dê errado e não encontre o H2 atual
             // Toca a última música como fallback
            if (songElements.length > 0) {
                songElements[songElements.length - 1].click();
            }
            return;
        }

        // Calcula o índice anterior, com loop para o final se for a primeira
        let prevIndex = (currentIndex - 1 + songElements.length) % songElements.length; 
        songElements[prevIndex].click(); // Simula o clique no H2 anterior para tocar a música
    });
}


// --- INÍCIO DO CÓDIGO PARA TROCA DE IMAGENS (LOGO E PERFIL) ---

// Cria o input de arquivo programaticamente para a logo
const logoInput = document.createElement('input');
logoInput.type = 'file';
logoInput.accept = 'image/*'; // Aceita apenas arquivos de imagem
logoInput.style.display = 'none'; // Esconde o input
document.body.appendChild(logoInput);

// Cria o input de arquivo programaticamente para a foto de perfil
const profilePictureInput = document.createElement('input');
profilePictureInput.type = 'file';
profilePictureInput.accept = 'image/*'; // Aceita apenas arquivos de imagem
profilePictureInput.style.display = 'none'; // Esconde o input
document.body.appendChild(profilePictureInput);

// Adiciona listener para o botão "Change Logo"
changeLogoBtn.addEventListener('click', function() {
    logoInput.click(); // Aciona o input de arquivo da logo
});

// Lida com a seleção de arquivo para a logo
logoInput.addEventListener('change', function() {
    const file = this.files[0]; // Pega o primeiro arquivo selecionado
    if (file) {
        // Revoga o URL do objeto anterior para evitar vazamento de memória (opcional, mas boa prática)
        if (logoImg.src && logoImg.src.startsWith('blob:')) {
            URL.revokeObjectURL(logoImg.src);
        }
        logoImg.src = URL.createObjectURL(file); // Define a nova imagem da logo
    }
});

// Adiciona listener para o botão "Change Profile"
changeProfileBtn.addEventListener('click', function() {
    profilePictureInput.click(); // Aciona o input de arquivo do perfil
});

// Lida com a seleção de arquivo para a foto de perfil
profilePictureInput.addEventListener('change', function() {
    const file = this.files[0]; // Pega o primeiro arquivo selecionado
    if (file) {
        // Revoga o URL do objeto anterior para evitar vazamento de memória
        if (profilePictureImg.src && profilePictureImg.src.startsWith('blob:')) {
            URL.revokeObjectURL(profilePictureImg.src);
        }
        profilePictureImg.src = URL.createObjectURL(file); // Define a nova imagem do perfil
    }
});


// --- LÓGICA PARA LIMPAR TODAS AS MÚSICAS AO CLICAR NA SINOPSE DO PRIMEIRO CARD ---
const firstCardSinopseBox = document.querySelector('.cardsTemplate .sinopseBox');
const firstCardSinopseText = document.querySelector('.cardsTemplate .sinopse');

if (firstCardSinopseBox && firstCardSinopseText) {
    // Atualiza o texto para indicar a nova funcionalidade
    firstCardSinopseText.textContent = "Delete_All_Songs";

    firstCardSinopseBox.addEventListener('click', function() {
        // Pede confirmação para evitar cliques acidentais
        if (confirm("Are you sure you want to delete all added songs?")) {
            // 1. Parar a música atual e resetar o player
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }
            isPlaying = false;
            currentPlayingH2 = null;
            musicNameDisplay.textContent = 'Null';
            pauseBtn.src = '../icons/play.png';

            // 2. Limpar os elementos de música (h2) da UI, exceto os templates
            const songElements = document.querySelectorAll('.musics h2.btn:not(#templateMusic1)');
            songElements.forEach(el => el.remove());

            // 3. Limpar o Map de músicas em memória
            musicMap.clear();

            // 4. Limpar o IndexedDB
            clearSongsDB();

            alert("All songs have been cleared.");
        }
    });
}

// INICIALIZAÇÃO DA PÁGINA
loadAndApplyTheme(); // Carrega o tema salvo
initDB(); // Inicia o banco de dados para as músicas