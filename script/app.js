// getting all required elements
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = document.querySelector(".button .quit");
const continueBtn = document.querySelector(".button .restart");
const quizBox = document.querySelector(".quiz-box");
const optionList = document.querySelector(".option-list");
const options = optionList.querySelectorAll(".option");
const timeCount = quizBox.querySelector(".timer-sec");
const timeLine = quizBox.querySelector("header .time-line");
const timeOff = quizBox.querySelector("header .time-text");

// if Start Quiz Button Clicked
startBtn.onclick = () => {
  console.log("BERHASIL START QUIZ");
  infoBox.classList.add("activeInfo"); //show the info box rules
};

// if Exit Button Clicked
exitBtn.onclick = () => {
  console.log("BERHASIL KELUAR");
  infoBox.classList.remove("activeInfo"); //hide the info box
};
// if continue Button Clicked
continueBtn.onclick = () => {
  console.log("BERHASIL MELANJUTKAN");
  infoBox.classList.remove("activeInfo"); //hide the info box
  quizBox.classList.add("activeQuiz"); //show the quiz box
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
};

let queCount = 0;
let queNumb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const nextBtn = quizBox.querySelector(".next-btn");
const resultBox = document.querySelector(".result-box");
const restartQuiz = resultBox.querySelector(".button .restart");
const quitQuiz = resultBox.querySelector(".button .quit");

restartQuiz.onclick = () => {
  resultBox.classList.remove("activeResult");
  quizBox.classList.add("activeQuiz");
  queCount = 0;
  queNumb = 1;
  timeValue = 15;
  widthValue = 0;
  userScore = 0;
  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  timeOff.innerText = "Time Left";
};

quitQuiz.onclick = () => {
  window.location.reload();
};

// if Next Button Clicked
nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNumb++;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
    timeOff.innerText = "Time Left";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    console.log("Questions Completed");
    showResultBox();
  }
};

// getting questions and options from array
function showQuestions(index) {
  const queText = document.querySelector(".que-text");
  let queTag = `<span> ${questions[index].numb}. ${questions[index].question}</span>`;
  let optionTag =
    `<div class="option">${questions[index].options[0]}</div>` +
    `<div class="option">${questions[index].options[1]}</div>` +
    `<div class="option">${questions[index].options[2]}</div>` +
    `<div class="option">${questions[index].options[3]}</div>`;
  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;

  const options = optionList.querySelectorAll(".option");
  //   for (let i = 0; i < option.length; i++) {
  //     option[i].setAttribute("onclick", "optionSelected(this)");
  //   }
  for (const option of options) {
    option.setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = `<div class="icon tick"><i class="fa-solid fa-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>`;

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.innerText;
  let correctAns = questions[queCount].answer;
  // let allOptions = optionList.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log(`BENAR. ${correctAns} `);
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    console.log(`SALAH. JAWABAN BENAR ADALAH ${correctAns}`);
    answer.insertAdjacentHTML("beforeend", crossIcon);
    // if answer is incorrect then automatically selected the correct answer
    for (let option of optionList.children) {
      if (option.innerText == correctAns) {
        option.setAttribute("class", "option correct");
        option.insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  // once user selected disabled all options
  for (let allOptions of optionList.children) {
    allOptions.classList.add("disabled");
  }
  nextBtn.style.display = "block";
  // for (let i = 0; i < allOptions; i++) {
  //   optionList.children[i].classList.add("disabled");
  // }
}
function showResultBox() {
  infoBox.classList.remove("activeInfo"); //hide the result box
  quizBox.classList.remove("activeQuiz"); //hide the result box
  resultBox.classList.add("activeResult"); //show the result box
  const scoreText = resultBox.querySelector(".score-text");
  if (userScore > 3) {
    let scoreTag = `<span>and, Congrats! You got <p>${userScore}</p>out of<p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag = `<span>and, Nice, You got only <p>${userScore}</p>out of<p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag = `<span>and, sorry, You got only <p>${userScore}</p>out of<p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.innerText = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.innerText;
      timeCount.innerText = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.innerText = "00";
      timeOff.innerText = "Time Off";

      let correctAns = questions[queCount].answer;
      const optionList = document.querySelector(".option-list");
      for (let option of optionList.children) {
        if (option.innerText == correctAns) {
          option.setAttribute("class", "option correct");
          option.insertAdjacentHTML("beforeend", tickIcon);
        }
      }
      for (let allOptions of optionList.children) {
        allOptions.classList.add("disabled");
      }
      nextBtn.style.display = "block";
    }
  }
}
function startTimerLine(time) {
  counterLine = setInterval(timer, 30);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}

function queCounter(index) {
  const numberPage = document.querySelector(".total-que span");
  let numberTag = `<p>${index}</p>of<p>${questions.length}</p>Questions`;
  numberPage.innerHTML = numberTag;
}
