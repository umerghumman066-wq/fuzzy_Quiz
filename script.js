// DOM Elements
const startBtn=document.getElementById('start-btn');
const nameInput=document.getElementById('name-input');
const welcomeScreen=document.getElementById('welcome-screen');
const quizScreen=document.getElementById('quiz-screen');
const resultScreen=document.getElementById('result-screen');
const playerNameEl=document.getElementById('player-name');
const qIndexEl=document.getElementById('q-index');
const qTotalEl=document.getElementById('q-total');
const questionText=document.getElementById('question-text');
const optionsContainer=document.getElementById('options-container');
const feedback=document.getElementById('feedback');
const nextBtn=document.getElementById('next-btn');
const quitBtn=document.getElementById('quit-btn');
const liveScoreEl=document.getElementById('live-score');
const resultName=document.getElementById('result-name');
const finalScoreEl=document.getElementById('final-score');
const finalMessage=document.getElementById('final-message');
const participantCountEl=document.getElementById('participant-count');
const restartBtn=document.getElementById('restart-btn');
const homeBtn=document.getElementById('home-btn');

let current=0,score=0,playerName="";
const questions=[
{question:"What does HTML stand for?",options:["HyperText Markup Language","Home Tool Markup Language","Hyperlinks and Text Markup","HyperText Markdown Language"],answer:0},
{question:"CSS is used for styling web pages. (True/False)",options:["True","False"],answer:0},
{question:"Which of the following is a JavaScript framework?",options:["Laravel","React","Django","Tailwind"],answer:1},
{question:"Which attribute links an external CSS file?",options:["src","href","link","rel"],answer:1},
{question:"The <canvas> element is used for graphics. (True/False)",options:["True","False"],answer:0}
];
qTotalEl.textContent=questions.length;

function randomColor(){const h1=Math.floor(Math.random()*360);const h2=(h1+Math.floor(60+Math.random()*140))%360;return`linear-gradient(135deg,hsl(${h1} 70% 45%),hsl(${h2} 70% 45%))`;}

function applyRandomBackground(){document.body.style.background=randomColor();}
applyRandomBackground();
let resizeTimeout;
window.addEventListener("resize",()=>{clearTimeout(resizeTimeout);resizeTimeout=setTimeout(()=>applyRandomBackground(),180);});

function loadQuestion(){feedback.textContent="";nextBtn.classList.add("hidden");const q=questions[current];questionText.textContent=q.question;qIndexEl.textContent=current+1;optionsContainer.innerHTML="";q.options.forEach((opt,i)=>{const btn=document.createElement("button");btn.textContent=opt;btn.addEventListener("click",()=>selectOption(i,btn));optionsContainer.appendChild(btn);});}

function selectOption(selectedIndex,buttonEl){const btns=optionsContainer.querySelectorAll("button");btns.forEach(b=>b.disabled=true);const correct=questions[current].answer;if(selectedIndex===correct){score++;buttonEl.classList.add("correct");feedback.textContent="Correct!";feedback.style.color="#b7f5c6";liveScoreEl.textContent=score;}else{buttonEl.classList.add("wrong");btns[correct].classList.add("correct");feedback.textContent="Wrong!";feedback.style.color="#ffd6d6";}nextBtn.classList.remove("hidden");setTimeout(()=>{if(current<questions.length-1){current++;loadQuestion();}else{showResult();}},1200);}

startBtn.addEventListener("click",()=>{const name=nameInput.value.trim();playerName=name?name:"Guest";playerNameEl.textContent=playerName;welcomeScreen.classList.add("hidden");quizScreen.classList.remove("hidden");current=0;score=0;liveScoreEl.textContent=score;loadQuestion();});
quitBtn.addEventListener("click",showResult);

function showResult(){quizScreen.classList.add("hidden");resultScreen.classList.remove("hidden");resultName.textContent=playerName;finalScoreEl.textContent=`${score} / ${questions.length}`;if(score===questions.length) finalMessage.textContent="Excellent! Perfect Score!";else if(score>=Math.ceil(questions.length*0.6)) finalMessage.textContent="Great Job!";else finalMessage.textContent="Try Again!";const KEY="quiz_participants";const prev=parseInt(localStorage.getItem(KEY)||"0",10);localStorage.setItem(KEY,prev+1);participantCountEl.textContent=localStorage.getItem(KEY);}
restartBtn.addEventListener("click",()=>{current=0;score=0;liveScoreEl.textContent=0;resultScreen.classList.add("hidden");quizScreen.classList.remove("hidden");loadQuestion();});
homeBtn.addEventListener("click",()=>{resultScreen.classList.add("hidden");welcomeScreen.classList.remove("hidden");nameInput.value="";});
