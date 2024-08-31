const questions = [
    {
        question: "I have lived here ____ 2010.",
        answer: "since"
    },
    {
        question: "I have known her ____ 5 years.",
        answer: "for"
    },
    {
        question: "____ the new CEO took over the company, there has been a noticeable shift in corporate culture",
        answer: "since"
    },
    {
        question: "I have ____ eaten.",
        answer: "just"
    },
    {
        question: "I haven't seen her _____ Monday.",
        answer: "since"
    },
    {
        question: "He has been working on this project _____ hours.",
        answer: "for"
    },
    {
        question: "They haven't called me _____.",
        answer: "yet"
    },
    {   question: "She had been working on that project ____ years when it was finally completed.",
        answer: "for"
    },
    {
        question: "By the time we got to the station, the train had ____ left, so we had to wait for the next one.",
        answer: "already"
    },  
    {
        question: "She had ____ locked the door when she heard a strange noise outside.",
        answer: "just"
    },
    {
        question: "I ______ know Mr. Parker. He was my teacher.",
        answer: "already"
    },
    {
        question: "I've been working on this coding challenge ______ yesterday, and it's finally starting to make sense",
        answer: "since"
    },
    {
        question: "The team hasn’t received feedback on the proposal ______, but they're optimistic about its approval",
        answer: "yet"
    },
    {
    question: "The committee has _______ approved the new curriculum, so it will be implemented next semester.",
    answer: "already"
    }
];

let currentQuestion = 0;
let catPosition = 0;
let errors = 0;
let questionsCopy = shuffle([...questions]); // Embaralha as perguntas uma vez

// Carrega os sons
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const victorySound = document.getElementById('victorySound');
const backgroundMusic = document.getElementById('backgroundMusic');

backgroundMusic.volume = 0.1; // Define o volume em 20%
// Define o volume (entre 0.0 e 1.0)
correctSound.volume = 0.2; // Volume mais baixo
wrongSound.volume = 0.2;
victorySound.volume = 0.3;

// Função de celebração (efeito de confete)
function celebrate() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function loadQuestion() {
    document.getElementById('question').textContent = questionsCopy[currentQuestion].question;
}

function checkAnswer(answer) {
    if (answer === questionsCopy[currentQuestion].answer) {
        catPosition += 90;
        document.getElementById('feedback').textContent = "Correct! The kitten is almost home!";
        const correctSoundClone = correctSound.cloneNode();
        correctSoundClone.play();  // Toca o som de acerto
    } else {
        errors++;
        document.getElementById('feedback').textContent = "Wrong! Try again.";
        const wrongSoundClone = wrongSound.cloneNode();
        wrongSoundClone.play();  // Toca o som de erro clone
    }

    document.getElementById('cat').style.left = catPosition + "px";

    if (errors >= 4) {
        document.getElementById('feedback').textContent = "Oh no! The kitten got lost!";
        document.getElementById('choices').classList.add('hidden');
    } else if (catPosition >= 800) {  // Distância até a casa
        document.getElementById('feedback').textContent = "Congratulations! The kitten has come home!";
        victorySound.play();  // Toca o som de vitória
        document.getElementById('choices').classList.add('hidden');
        celebrate();  // Chama a função de confete
    } else {
        currentQuestion++;
        if (currentQuestion < questionsCopy.length) {
            loadQuestion();
        } else {
            document.getElementById('feedback').textContent = "The kitten got lost. Try again.";
            document.getElementById('choices').classList.add('hidden');
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

// Desativa o zoom com CTRL + +/- e CTRL + 0
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0'))) {
        e.preventDefault();
    }
}, { passive: false });

// Previne o zoom em dispositivos móveis com pinça ou duplo toque
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// Habilitar o scroll
function enableScroll() {
    document.body.style.overflow = 'auto'; // ou 'scroll' se você quiser que apareça a barra de rolagem
}

// Chame disableScroll() para desativar e enableScroll() para reativar
disableScroll();

window.onload = function() {
    loadQuestion();
};
