/* =========================================
   QUIZVERSE
   Main Game Engine
========================================= */


/* =========================================
   QUESTIONS
========================================= */

const questions = [

    {
        question: "Which planet is known as the Red Planet?",
        category: "SCIENCE",
        difficulty: "EASY",

        options: [
            "Venus",
            "Mars",
            "Jupiter",
            "Mercury"
        ],

        answer: 1,

        explanation:
            "Mars is called the Red Planet because iron minerals in its soil create its distinctive reddish appearance."
    },


    {
        question: "What is the capital city of Japan?",
        category: "GEOGRAPHY",
        difficulty: "EASY",

        options: [
            "Seoul",
            "Beijing",
            "Tokyo",
            "Bangkok"
        ],

        answer: 2,

        explanation:
            "Tokyo is the capital and largest metropolitan area of Japan."
    },


    {
        question: "Which language is primarily used for Android application development?",
        category: "PROGRAMMING",
        difficulty: "MEDIUM",

        options: [
            "Java / Kotlin",
            "HTML",
            "SQL",
            "CSS"
        ],

        answer: 0,

        explanation:
            "Java has historically been a major Android language, while Kotlin is now Google's preferred language for modern Android development."
    },


    {
        question: "What does CPU stand for?",
        category: "COMPUTER SCIENCE",
        difficulty: "MEDIUM",

        options: [
            "Central Processing Unit",
            "Computer Power Utility",
            "Central Program Utility",
            "Computer Processing User"
        ],

        answer: 0,

        explanation:
            "CPU stands for Central Processing Unit, the primary processor responsible for executing instructions."
    },


    {
        question: "Which data structure follows the FIFO principle?",
        category: "DATA STRUCTURES",
        difficulty: "MEDIUM",

        options: [
            "Stack",
            "Queue",
            "Tree",
            "Graph"
        ],

        answer: 1,

        explanation:
            "A queue follows First In, First Out, meaning the element inserted first is removed first."
    },


    {
        question: "What is the time complexity of binary search on a sorted array?",
        category: "ALGORITHMS",
        difficulty: "HARD",

        options: [
            "O(n)",
            "O(n²)",
            "O(log n)",
            "O(1)"
        ],

        answer: 2,

        explanation:
            "Binary search repeatedly divides the search space in half, giving it logarithmic time complexity."
    },


    {
        question: "Which protocol is used for secure web communication?",
        category: "NETWORKING",
        difficulty: "HARD",

        options: [
            "HTTP",
            "FTP",
            "HTTPS",
            "SMTP"
        ],

        answer: 2,

        explanation:
            "HTTPS uses TLS encryption to provide secure communication between a browser and a web server."
    },


    {
        question: "Which company originally developed the Java programming language?",
        category: "PROGRAMMING",
        difficulty: "HARD",

        options: [
            "Microsoft",
            "Sun Microsystems",
            "IBM",
            "Apple"
        ],

        answer: 1,

        explanation:
            "Java was originally developed at Sun Microsystems in the 1990s."
    },


    {
        question: "Which algorithm is commonly used to find shortest paths from a source in a graph with non-negative edge weights?",
        category: "ALGORITHMS",
        difficulty: "HARD",

        options: [
            "Dijkstra's Algorithm",
            "Bubble Sort",
            "Binary Search",
            "Merge Sort"
        ],

        answer: 0,

        explanation:
            "Dijkstra's algorithm finds shortest paths from a source vertex when edge weights are non-negative."
    },


    {
        question: "Which OOP concept allows a class to acquire properties and behavior from another class?",
        category: "OBJECT ORIENTED PROGRAMMING",
        difficulty: "HARD",

        options: [
            "Encapsulation",
            "Inheritance",
            "Abstraction",
            "Compilation"
        ],

        answer: 1,

        explanation:
            "Inheritance allows a class to derive properties and methods from another class."
    }

];


/* =========================================
   GAME STATE
========================================= */

let currentQuestion = 0;

let score = 0;

let streak = 0;

let bestStreak = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let lives = 3;

let timeLeft = 15;

let timerInterval = null;

let answered = false;

let fiftyUsed = false;

let timeUsed = false;


/* =========================================
   DOM ELEMENTS
========================================= */

const startScreen =
    document.getElementById("startScreen");

const quizScreen =
    document.getElementById("quizScreen");

const resultScreen =
    document.getElementById("resultScreen");

const startButton =
    document.getElementById("startButton");

const playAgainButton =
    document.getElementById("playAgainButton");

const homeButton =
    document.getElementById("homeButton");

const questionElement =
    document.getElementById("question");

const questionHint =
    document.getElementById("questionHint");

const answersContainer =
    document.getElementById("answers");

const currentQuestionElement =
    document.getElementById("currentQuestion");

const categoryElement =
    document.getElementById("category");

const difficultyElement =
    document.getElementById("difficulty");

const progressBar =
    document.getElementById("progressBar");

const timerElement =
    document.getElementById("timer");

const timerCircle =
    document.getElementById("timerCircle");

const timer =
    document.querySelector(".timer");

const scoreElement =
    document.getElementById("score");

const streakElement =
    document.getElementById("streak");

const livesElement =
    document.getElementById("lives");

const explanation =
    document.getElementById("explanation");

const explanationTitle =
    document.getElementById("explanationTitle");

const explanationText =
    document.getElementById("explanationText");

const fiftyButton =
    document.getElementById("fiftyButton");

const timeButton =
    document.getElementById("timeButton");

const skipButton =
    document.getElementById("skipButton");

const finalScore =
    document.getElementById("finalScore");

const correctCount =
    document.getElementById("correctCount");

const wrongCount =
    document.getElementById("wrongCount");

const accuracy =
    document.getElementById("accuracy");

const bestStreakElement =
    document.getElementById("bestStreak");

const resultTitle =
    document.getElementById("resultTitle");

const resultMessage =
    document.getElementById("resultMessage");

const newRecord =
    document.getElementById("newRecord");

const startBestScore =
    document.getElementById("startBestScore");


/* =========================================
   BEST SCORE
========================================= */

function getBestScore() {

    return Number(
        localStorage.getItem("quizverseBestScore")
    ) || 0;
}


function updateBestScoreDisplay() {

    startBestScore.textContent =
        getBestScore();
}


updateBestScoreDisplay();


/* =========================================
   START GAME
========================================= */

function startGame() {

    currentQuestion = 0;

    score = 0;

    streak = 0;

    bestStreak = 0;

    correctAnswers = 0;

    wrongAnswers = 0;

    lives = 3;

    fiftyUsed = false;

    timeUsed = false;

    scoreElement.textContent = "0";

    streakElement.textContent = "0 🔥";

    updateLives();

    startScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    fiftyButton.disabled = false;

    timeButton.disabled = false;

    loadQuestion();

}


/* =========================================
   LOAD QUESTION
========================================= */

function loadQuestion() {

    clearInterval(timerInterval);

    answered = false;

    explanation.classList.add("hidden");

    const question =
        questions[currentQuestion];


    /* Question number */

    currentQuestionElement.textContent =
        String(currentQuestion + 1).padStart(2, "0");


    /* Category */

    categoryElement.textContent =
        question.category;


    /* Difficulty */

    difficultyElement.textContent =
        question.difficulty;

    difficultyElement.className =
        "difficulty";


    if (question.difficulty === "MEDIUM") {

        difficultyElement.classList.add("medium");

    }


    if (question.difficulty === "HARD") {

        difficultyElement.classList.add("hard");

    }


    /* Question */

    questionElement.textContent =
        question.question;


    questionHint.textContent =
        "Choose the best answer from the options below.";


    /* Progress */

    const progress =
        ((currentQuestion + 1) /
            questions.length) * 100;

    progressBar.style.width =
        `${progress}%`;


    /* Answers */

    answersContainer.innerHTML = "";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer";

            button.dataset.index =
                index;

            button.innerHTML = `

                <span class="answer-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span class="answer-text">
                    ${option}
                </span>

                <span class="answer-check">
                    ✓
                </span>

            `;


            button.addEventListener(
                "click",
                () => selectAnswer(index)
            );


            answersContainer.appendChild(
                button
            );

        }
    );


    /* Reset powerups */

    fiftyUsed = false;

    timeUsed = false;

    fiftyButton.disabled = false;

    timeButton.disabled = false;


    /* Timer */

    startTimer();

}


/* =========================================
   ANSWER
========================================= */

function selectAnswer(selectedIndex) {

    if (answered) return;

    answered = true;

    clearInterval(timerInterval);


    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer");


    buttons.forEach(
        button => {

            button.style.pointerEvents =
                "none";

        }
    );


    const selectedButton =
        buttons[selectedIndex];

    const correctButton =
        buttons[question.answer];


    if (
        selectedIndex ===
        question.answer
    ) {

        handleCorrect(
            selectedButton,
            correctButton,
            question
        );

    } else {

        handleWrong(
            selectedButton,
            correctButton,
            question
        );

    }


    showExplanation(question);

    showNextButton();

}


/* =========================================
   CORRECT
========================================= */

function handleCorrect(
    selectedButton,
    correctButton,
    question
) {

    selectedButton.classList.add(
        "correct"
    );


    streak++;

    correctAnswers++;


    if (streak > bestStreak) {

        bestStreak = streak;

    }


    /*
       Base score = 100

       Speed bonus = remaining seconds × 5

       Streak bonus = streak × 25
    */

    const speedBonus =
        timeLeft * 5;

    const streakBonus =
        streak * 25;

    const points =
        100 +
        speedBonus +
        streakBonus;


    score += points;


    scoreElement.textContent =
        score;


    streakElement.textContent =
        `${streak} 🔥`;


    explanationTitle.textContent =
        `Correct! +${points} points`;


    explanation.classList.add(
        "correct-explanation"
    );

}


/* =========================================
   WRONG
========================================= */

function handleWrong(
    selectedButton,
    correctButton,
    question
) {

    selectedButton.classList.add(
        "wrong"
    );


    correctButton.classList.add(
        "correct"
    );


    streak = 0;

    wrongAnswers++;


    lives--;

    updateLives();


    streakElement.textContent =
        "0 🔥";


    explanationTitle.textContent =
        "Not quite this time";

}


/* =========================================
   EXPLANATION
========================================= */

function showExplanation(question) {

    explanationText.textContent =
        question.explanation;

    explanation.classList.remove(
        "hidden"
    );

}


/* =========================================
   NEXT BUTTON
========================================= */

function showNextButton() {

    skipButton.innerHTML =
        currentQuestion ===
        questions.length - 1

        ? `FINISH <span>✓</span>`

        : `NEXT <span>→</span>`;


    skipButton.style.color =
        "white";


    skipButton.style.background =
        "rgba(108,99,255,.12)";


    skipButton.style.padding =
        "9px 14px";


    skipButton.style.borderRadius =
        "8px";
}


/* =========================================
   NEXT QUESTION
========================================= */

function nextQuestion() {

    if (!answered) {

        return;

    }


    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        endGame();

        return;

    }


    loadQuestion();

}


/* =========================================
   SKIP
========================================= */

function skipQuestion() {

    if (answered) {

        nextQuestion();

        return;

    }


    clearInterval(timerInterval);

    wrongAnswers++;

    streak = 0;

    streakElement.textContent =
        "0 🔥";


    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        endGame();

        return;

    }


    loadQuestion();

}


/* =========================================
   TIMER
========================================= */

function startTimer() {

    clearInterval(timerInterval);


    timeLeft = 15;

    updateTimer();


    timerInterval =
        setInterval(
            () => {

                timeLeft--;

                updateTimer();


                if (
                    timeLeft <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );

                    timeUp();

                }

            },
            1000
        );

}


/* =========================================
   UPDATE TIMER
========================================= */

function updateTimer() {

    timerElement.textContent =
        timeLeft;


    const circumference =
        270;

    const offset =
        circumference -
        (timeLeft / 15) *
        circumference;


    timerCircle.style.strokeDashoffset =
        offset;


    timer.classList.remove(
        "warning",
        "danger"
    );


    if (timeLeft <= 7) {

        timer.classList.add(
            "warning"
        );

    }


    if (timeLeft <= 3) {

        timer.classList.remove(
            "warning"
        );

        timer.classList.add(
            "danger"
        );

    }

}


/* =========================================
   TIME UP
========================================= */

function timeUp() {

    if (answered) return;

    answered = true;


    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(
            ".answer"
        );


    buttons.forEach(
        button => {

            button.style.pointerEvents =
                "none";

        }
    );


    buttons[
        question.answer
    ].classList.add(
        "correct"
    );


    wrongAnswers++;

    streak = 0;

    streakElement.textContent =
        "0 🔥";


    explanationTitle.textContent =
        "Time's up!";


    showExplanation(question);

    showNextButton();

}


/* =========================================
   LIVES
========================================= */

function updateLives() {

    const hearts =
        livesElement.querySelectorAll(
            "span"
        );


    hearts.forEach(
        (heart, index) => {

            if (index >= lives) {

                heart.classList.add(
                    "lost"
                );

            } else {

                heart.classList.remove(
                    "lost"
                );

            }

        }
    );

}


/* =========================================
   50 / 50
========================================= */

function useFiftyFifty() {

    if (
        fiftyUsed ||
        answered
    ) return;


    fiftyUsed = true;

    fiftyButton.disabled = true;


    const question =
        questions[currentQuestion];


    const buttons =
        [...document.querySelectorAll(
            ".answer"
        )];


    const incorrectButtons =
        buttons.filter(
            (_, index) =>
                index !== question.answer
        );


    /*
       Shuffle incorrect answers
    */

    incorrectButtons.sort(
        () => Math.random() - .5
    );


    /*
       Remove two
    */

    incorrectButtons
        .slice(0, 2)
        .forEach(
            button => {

                button.classList.add(
                    "disabled"
                );

            }
        );

}


/* =========================================
   +10 SECONDS
========================================= */

function useExtraTime() {

    if (
        timeUsed ||
        answered
    ) return;


    timeUsed = true;

    timeButton.disabled = true;


    timeLeft += 10;


    if (timeLeft > 25) {

        timeLeft = 25;

    }


    updateTimer();

}


/* =========================================
   END GAME
========================================= */

function endGame() {

    clearInterval(timerInterval);


    quizScreen.classList.add(
        "hidden"
    );


    resultScreen.classList.remove(
        "hidden"
    );


    finalScore.textContent =
        score;


    correctCount.textContent =
        correctAnswers;


    wrongCount.textContent =
        wrongAnswers;


    const accuracyValue =
        Math.round(
            (
                correctAnswers /
                questions.length
            ) * 100
        );


    accuracy.textContent =
        `${accuracyValue}%`;


    bestStreakElement.textContent =
        bestStreak;


    /* Result message */

    if (accuracyValue === 100) {

        resultTitle.textContent =
            "Absolutely flawless!";

        resultMessage.textContent =
            "You conquered every question.";

    }

    else if (accuracyValue >= 80) {

        resultTitle.textContent =
            "Brilliant work!";

        resultMessage.textContent =
            "Your knowledge game is seriously strong.";

    }

    else if (accuracyValue >= 60) {

        resultTitle.textContent =
            "Great effort!";

        resultMessage.textContent =
            "You're getting there. Keep sharpening your mind.";

    }

    else {

        resultTitle.textContent =
            "Good attempt!";

        resultMessage.textContent =
            "Every challenge is another chance to improve.";

    }


    /* Personal best */

    const oldBest =
        getBestScore();


    if (score > oldBest) {

        localStorage.setItem(
            "quizverseBestScore",
            score
        );

        newRecord.classList.remove(
            "hidden"
        );

    } else {

        newRecord.classList.add(
            "hidden"
        );

    }

}


/* =========================================
   EVENTS
========================================= */

startButton.addEventListener(
    "click",
    startGame
);


playAgainButton.addEventListener(
    "click",
    startGame
);


homeButton.addEventListener(
    "click",
    () => {

        resultScreen.classList.add(
            "hidden"
        );

        startScreen.classList.remove(
            "hidden"
        );

        updateBestScoreDisplay();

    }
);


skipButton.addEventListener(
    "click",
    skipQuestion
);


fiftyButton.addEventListener(
    "click",
    useFiftyFifty
);


timeButton.addEventListener(
    "click",
    useExtraTime
);


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            quizScreen.classList.contains(
                "hidden"
            )
        ) return;


        const key =
            event.key.toLowerCase();


        const keyMap = {
            a: 0,
            b: 1,
            c: 2,
            d: 3
        };


        if (
            keyMap[key] !== undefined &&
            !answered
        ) {

            selectAnswer(
                keyMap[key]
            );

        }


        if (
            event.key === "Enter" &&
            answered
        ) {

            nextQuestion();

        }

    }
);