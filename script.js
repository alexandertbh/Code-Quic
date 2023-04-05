var startBtn = document.getElementById("start");
var startPage = document.getElementById("start-page");
var questionSection = document.getElementById("questions-quiz");
var questionNumber = document.getElementById("question-number");
var questionOne = document.getElementById("question-one");
var questionTwo = document.getElementById("question-two");
var questionThree = document.getElementById("question-three");
var answerA = document.getElementById("a");
var answerB = document.getElementById("b");
var answerC = document.getElementById("c");
var answerD = document.getElementById("d");
var timer = document.getElementById("timer");
var scoreText = document.getElementById("score");
var newQuestion = document.getElementById("question");
var questionNumber = document.getElementById("questionNum");
var highScoreLi = document.getElementById("high-scores-li");
var addScore = document.getElementById("add-score");
var scoreBoardEl = document.getElementById("score-board");
var currentScore = document.getElementById("current-score");
var ScoreName = document.getElementById("ScoreName").value;
var highScoreLink = document.getElementById("high-score");
var heading = document.getElementById("heading");

scoreBoardEl.style.display = "none";
questionOne.style.display = "none";
questionOne.setAttribute("class", "shown");

var nameScore = "";
var secondsLeft = 60;
var indexNum = 0;
var score = 0;

var questions = [
  {
    questionText:
      " What is it called when a camera sensor is given more power to increase its sensitivity to light?",
    possibleAnswers: ["ISO", "Shutter Speed", "Aperture", "White-Balance"],
    Answer: "ISO",
  },
  {
    questionText: "What setting controls the color temperature of your image?",
    possibleAnswers: ["ISO", "Shutter Speed", "Aperture", "White-Balance"],
    Answer: "White-Balance",
  },
  {
    questionText: "What setting controls the speed at which a photo is taken?",
    possibleAnswers: ["ISO", "Shutter Speed", "Aperture", "White-Balance"],
    Answer: "Shutter Speed",
  },
  {
    questionText: "What setting controls the depth of field?",
    possibleAnswers: ["ISO", "Shutter Speed", "Aperture", "White-Balance"],
    Answer: "Aperture",
  },
];

var questionTwo = {
  question: "question 1",
  A: "Option A",
  B: "Option B",
  C: "Obtion C",
  D: "Option D",
  Answer: "Option D",
};

function startGame(event) {
  event.preventDefault();
  setTime();
  startPage.style.display = "none";
  questionOne.style.display = "flex";
  RotateQuestions();
}

function scorePage(event) {
  event.preventDefault();
  startPage.style.display = "none";
  questionOne.style.display = "none";
  scoreBoardEl.style.display = "flex";
  var lastScore = localStorage.getItem("score");
  var LastName = localStorage.getItem("name");
  highScoreLi.innerHTML = "<li>" + LastName + ": " + lastScore + "</li>";
}

function RotateQuestions() {
  var question = questions[indexNum];
  questionNumber.textContent = question.questionText;
  newQuestion.textContent = question.questionText;
  answerA.textContent = question.possibleAnswers[0];
  answerB.textContent = question.possibleAnswers[1];
  answerC.textContent = question.possibleAnswers[2];
  answerD.textContent = question.possibleAnswers[3];

  answerA.style.color = "black";
  answerB.style.color = "black";
  answerC.style.color = "black";
  answerD.style.color = "black";
}

function determineAnswer(event) {
  event.preventDefault();

  if (event.target.textContent === questions[indexNum].Answer) {
    event.target.style.color = "green";
    score = score + 10;
    scoreText.textContent = "Score: " + score;
    secondsLeft = secondsLeft + 5;
    alert("You got it Right! The answer is: " + questions[indexNum].Answer);
  } else {
    event.target.style.color = "red";
    secondsLeft = secondsLeft - 5;
    alert("You got it wrong! The answer is: " + questions[indexNum].Answer);
  }
  indexNum++;
  RotateQuestions();

  if (indexNum >= questions.length - 1) {
    questionOne.style.display = "none";
    scoreBoardEl.style.display = "flex";
    score = score + secondsLeft;
    currentScore.textContent = "High-Score: " + score;
    secondsLeft = 1;
  }
}

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Timer: " + secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      questionOne.style.display = "none";
      scoreBoardEl.style.display = "flex";
      currentScore.textContent = "High-Score: " + score;
    }
  }, 1000);
}

function SaveScore(event) {
  event.preventDefault();
  var ScoreName = document.getElementById("ScoreName").value;
  console.log(ScoreName);
  localStorage.setItem("score", score);
  localStorage.setItem("name", ScoreName);
  highScoreLi.innerHTML = "<li>" + ScoreName + ": " + score + "</li>";
}

function resetPage(event) {
  event.preventDefault();
  indexNum = 0;
  secondsLeft = 60;
  score = 0;
  startPage.style.display = "flex";
  questionOne.style.display = "none";
  scoreBoardEl.style.display = "none";
}

startBtn.addEventListener("click", startGame);
answerA.addEventListener("click", determineAnswer);
answerB.addEventListener("click", determineAnswer);
answerC.addEventListener("click", determineAnswer);
answerD.addEventListener("click", determineAnswer);
addScore.addEventListener("click", SaveScore);
highScoreLink.addEventListener("click", scorePage);
heading.addEventListener("click", resetPage);
