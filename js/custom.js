const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Syntax"
        ],
        answer: "Cascading Style Sheets"
    }
];


let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);


function loadQuestions(index){
    const quiz_container = document.getElementById('quiz_container');
    const quiz_data = quizData[index];

    let quizOptions = "";
    for (let option of quiz_data.options) {
        let checked = (userAnswers[index] === option) ? 'checked' : '';

        quizOptions += `
            <label class='custom_radio'>
                <input type="radio" name="q${index}" value="${option}" ${checked}>
                <span></span> ${option}
            </label>
        `;
    }

    let buttonHTML = '';

    if(index > 0){
        buttonHTML += `
            <button class="bg-orange-800 text-white" id="prevQuestion">Previous</button>
        `;
    }
    if(index < quizData.length - 1){
        buttonHTML += `
            <button class="bg-sky-800 text-white" id="nextQuestion">Next</button>
        `;
    }
    else{
        buttonHTML += `
            <button class="bg-sky-800 text-white" id="submitQuiz">Submit</button>
        `;
    }

    quiz_container.innerHTML = `
        <div class="question">${questionData.question}</div>
        <div class="options">${quizOptions}</div>
        <div class="buttons">${buttonHTML}</div>
    `;

    updateProgressBar();
}

document.getElementById('nextQuestion').addEventListener('click', function(){
    saveAnswer();
    if(currentQuestion < quizData.length - 1){
        currentQuestion++;
        loadQuestions(currentQuestion);
    }
});


document.getElementById('prevQuestion').addEventListener('click', function(){
    saveAnswer();
    if(currentQuestion > 0){
        currentQuestion--;
        loadQuestions(currentQuestion);
    }
});



loadQuestions(currentQuestion);