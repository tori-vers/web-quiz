const questions = [
    {
        question: "Which planet in the milky way is the hottest?",
        answers:[
            {text: "Mercury", correct: false},
            {text: "Venus", correct: true},
            {text: "Neptune", correct: false},
            {text: "Earth", correct: false},

        ]
    },
    {       
        question: "Which planet has the most moons??",
        answers:[
        {text: "Earth", correct: false},
        {text: "Jupiter", correct: false},
        {text: "Neptune", correct: false},
        {text: "Saturn", correct: true},

    ]

    }, 
    {       
        question: "Am I good at programming?",
        answers:[
        {text: "no", correct: false},
        {text: "yes", correct: true},
        {text: "no", correct: false},
        {text: "no", correct: false},

    ]

    },
    {       
        question: "How many bones do we have in an ear?",
        answers:[
        {text: "Two", correct: false},
        {text: "Three", correct: true},
        {text: "Seven", correct: false},
        {text: "Thirteen", correct: false},

    ]

    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currrentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currrentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currrentQuestion = questions[currrentQuestionIndex];
    let questionNo = currrentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currrentQuestion.question;

    currrentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currrentQuestionIndex++;
    if(currrentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currrentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();