// DOM ELEMENTS
const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const qIndexEl = document.getElementById('q-index');
const qTotalEl = document.getElementById('q-total');
const qText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');

const nextBtn = document.getElementById('next-btn');
const quitBtn = document.getElementById('quit-btn');
const restartBtn = document.getElementById('restart-btn');

const liveScoreEl = document.getElementById('live-score');
const finalScoreEl = document.getElementById('final-score');
const finalMsg = document.getElementById('final-message');

let index = 0, score = 0;

// QUESTIONS
const questions = [
    { q:"What does HTML stand for?", o:["HyperText Markup Language","Home Tool Markup Language","Hyperlinks and Text Markup","HyperText Markdown Language"], a:0 },
    { q:"CSS is used for styling. (T/F)", o:["True","False"], a:0 },
    { q:"Which is a JS framework?", o:["Laravel","React","Django","Tailwind"], a:1 },
    { q:"Which attribute links CSS file?", o:["src","href","link","rel"], a:1 },
    { q:"<canvas> is used for graphics. (T/F)", o:["True","False"], a:0 }
];

qTotalEl.textContent = questions.length;

// RANDOM BACKGROUND
function randomColor(){
    const h1 = Math.floor(Math.random() * 360);
    const h2 = (h1 + Math.floor(60 + Math.random() * 140)) % 360;
    return `linear-gradient(135deg, hsl(${h1} 70% 45%), hsl(${h2} 70% 45%))`;
}

function applyRandomBackground(){ document.body.style.background = randomColor(); }
applyRandomBackground();
window.addEventListener("resize", () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => applyRandomBackground(), 180);
});

// LOAD QUESTION
function loadQuestion() {
    const q = questions[index];
    qText.textContent = q.q;
    qIndexEl.textContent = index + 1;
    optionsContainer.innerHTML = "";
    feedback.textContent = "";
    nextBtn.classList.add("hidden");

    q.o.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => selectOption(i, btn);
        optionsContainer.appendChild(btn);
    });
}

// SELECT OPTION
function selectOption(selected, btn) {
    const correct = questions[index].a;
    [...optionsContainer.children].forEach(b => b.disabled = true);

    if(selected === correct){
        btn.classList.add("correct");
        score++;
        liveScoreEl.textContent = score;
        feedback.textContent = "Correct!";
    } else {
        btn.classList.add("wrong");
        optionsContainer.children[correct].classList.add("correct");
        feedback.textContent = "Wrong!";
    }

    // Auto next question after 1s
    setTimeout(() => {
        if(index < questions.length - 1){
            index++;
            loadQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

// SHOW RESULT
function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScoreEl.textContent = `${score} / ${questions.length}`;
    finalMsg.textContent =
        score === questions.length ? "Perfect Score!" :
        score >= Math.ceil(questions.length*0.6) ? "Great Job!" : "Try Again!";
}

// EVENT HANDLERS
startBtn.onclick = () => {
    welcomeScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    index = 0; score = 0; liveScoreEl.textContent = 0;
    loadQuestion();
};

quitBtn.onclick = showResult;

restartBtn.onclick = () => {
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    index = 0; score = 0; liveScoreEl.textContent = 0;
    loadQuestion();
};
