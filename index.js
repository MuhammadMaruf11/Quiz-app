// question var start

let question = [
    {
        numb: 1,
        question: 'What is the national bird of Bangladesh?',
        answer: 'Magpie Robin',
        option: [
            "Peacock",
            "Parrot",
            "Woodpecker",
            "Magpie Robin"
        ]
    },
    {
        numb: 2,
        question: 'What is the national fruit of Bangladesh ?',
        answer: 'Jackfruit',
        option: [
            "Mango",
            "Orange",
            "Jackfruit",
            "Banana"
        ]
    },
    {
        numb: 3,
        question: 'What is the national flower of Bangladesh?',
        answer: 'The water lily',
        option: [
            "The water lily",
            "Lotus",
            "Sunflower",
            "Gardenia"

        ]
    },
    {
        numb: 4,
        question: 'What is the Capital of Bangladesh?',
        answer: 'Dhaka',
        option: [
            "Noakhali",
            "Dhaka",
            "Barishal",
            "Rajshahi"
        ]
    },
    {
        numb: 5,
        question: 'Who is the national poet of Bangladesh ?',
        answer: 'Kazi Nazrul Islam',
        option: [
            "Kazem Ali Quereshi",
            "Kazi Nazrul Islam",
            "Rabindranath Tagore",
            "Jashim uddin"
        ]
    }
]

// question var end

// button var start

const startBtn = document.querySelector('.myBtn .startQuiz');
const exitBtn = document.querySelector('.exitQuiz');
const continueBtn = document.querySelector('.myBtn .continueQuiz');
const nextBtn = document.querySelector('.myBtn .nextQuestion');
const ruleBox = document.querySelector('.ruleBox');
const firstQuestion = document.querySelector('.firstQuestion');
const totalQuestion = document.querySelector('.totalQuestion');
const clueList = document.querySelector('.clueList');
const timeCount = document.querySelector('.timeCount .seconds');
const timeLine = document.querySelector('.timeLine');
const resultBox = document.querySelector('.resultBox');
// const restartBtn = document.querySelector('.restartBtn');
const quitQuiz = document.querySelector('.quitQuiz');




const tickIcon = `<i class="fa fa-check" aria-hidden="true"></i>`;
const crossIcon = `<i class="fa fa-times" aria-hidden="true"></i>`;


startBtn.onclick = (e) => {
    e.preventDefault();

    ruleBox.classList.add('activeInfo');
}

exitBtn.onclick = (e) => {
    e.preventDefault();
    ruleBox.classList.remove('activeInfo');
}

continueBtn.onclick = (e) => {
    e.preventDefault();
    firstQuestion.classList.add('activeQuiz');
    showQuestion(0);
    startTimer(timeValue);
    startTimerLine(0);
}

// restartBtn.onclick = (e) =>{
//     e.preventDefault();
//     resultBox.classList.remove('activeResult');
//     ruleBox.classList.add('activeInfo');
// }

quitQuiz.onclick = () => {
    window.location.reload();
}

let questionCount = 0;
let counter;
let timeValue = 15;

let counterLine;
let widthValue = 0;
let userScore = 0;


nextBtn.onclick = (e) => {
    e.preventDefault();
    if (questionCount < question.length - 1) {
        questionCount++;
        showQuestion(questionCount);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        clueList.classList.remove('timesUp');
        nextBtn.style.display = 'none';
    }
    else {
        showResult();
    }
}



// button var end



// question formula start 

function showQuestion(index) {
    const questionTitle = document.querySelector('.questionTitle');

    let clueTag = `<ul>
                        <li>${question[index].option[0]}</li>
                        <li>${question[index].option[1]}</li>
                        <li>${question[index].option[2]}</li>
                        <li>${question[index].option[3]}</li>
                    </ul>`;

    let questionTag = `<h1>${question[index].numb}. ${question[index].question}</h1>`;
    questionTitle.innerHTML = questionTag;
    clueList.innerHTML = clueTag;
    let totalQuestionTag = `<h4>${question[index].numb} of 5 Questions</h4>`;
    totalQuestion.innerHTML = totalQuestionTag;

    const clue = clueList.querySelectorAll('ul > li');
    for (let i = 0; i < clue.length; i++) {
        clue[i].setAttribute('onclick', 'clueSelected(this)');
    }
}

function clueSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAns = question[questionCount].answer;
    const clue = clueList.querySelectorAll('ul > li');
    let allClues = clue.length;
    if (userAnswer == correctAns) {
        userScore += 1;
        answer.classList.add('correct');
        answer.insertAdjacentHTML('beforeend', tickIcon)
        nextBtn.style.display = 'block';
    } else {
        answer.classList.add('incorrect');
        answer.insertAdjacentHTML('beforeend', crossIcon)

        for (let i = 0; i < allClues; i++) {
            if (clue[i].textContent == correctAns) {
                clue[i].setAttribute('class', 'correct');
                clue[i].insertAdjacentHTML('beforeend', tickIcon);
                nextBtn.style.display = 'block';
            }
        }
    }
    for (let i = 0; i < clue.length; i++) {
        clueList.children[i].classList.add('disabled');
    }
}

function showResult() {
    ruleBox.classList.remove('activeInfo');
    firstQuestion.classList.remove('activeQuiz');
    resultBox.classList.add('activeResult');
    const scoreText = document.querySelector('.scoreText');
    if (userScore > 3) {
        let scoreTag = `<p>Cpngratulations on You got <br> ${userScore} out of ${question.length}</p>`;
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1) {
        let scoreTag = `<p>Carry on You got <br> ${userScore} out of ${question.length}</p>`;
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = `<p>Sorry try again You got <br> ${userScore} out of ${question.length}</p>`;
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = 0 + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            clueList.classList.add('timesUp');
            nextBtn.style.display = 'block';
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 50);
    function timer() {
        time += 1;
        timeLine.style.width = time + 'px';
        if (time > 374) {
            clearInterval(counterLine);
        }
    }
}


// question formula end