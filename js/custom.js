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
    const quiz_container = document.getElementById("quiz_container");
    const quiz_data = quizData[index];

    // Generate options
    let quizOptions = "";
    for (let option of quiz_data.options){
        let checked = (userAnswers[index] === option) ? "checked" : "";
        quizOptions += `
            <label class="custom-radio">
                <input class="hidden" type="radio" name="q${index}" value="${option}" ${checked}>
                <span></span> ${option}
            </label>
        `;
    }

    // Generate buttons
    let buttonHTML = "";
    if(index > 0){
        buttonHTML += `<button class="bg-orange-800 text-white px-3 py-1" id="prevQuestion">Previous</button>`;
    }

    if(index < quizData.length - 1){
        buttonHTML += `<button class="bg-sky-800 text-white px-3 py-1" id="nextQuestion">Next</button>`;
    } 

    else{
        buttonHTML += `<button class="bg-sky-800 text-white px-3 py-1" id="submitQuiz">Submit</button>`;
    }

    // Insert into DOM
    quiz_container.innerHTML = `
        <div class="text-lg mb-5">${quiz_data.question}</div>
        <div class="options">${quizOptions}</div>
        <div class="flex justify-between mt-5">${buttonHTML}</div>
    `;

    updateProgressBar();

    // Attach event listeners after rendering
    if(index > 0){
        document.getElementById("prevQuestion").addEventListener("click", function (){
            saveAnswer();
            currentQuestion--;
            loadQuestions(currentQuestion);
        });
    }

    if(index < quizData.length - 1){
        document.getElementById("nextQuestion").addEventListener("click", function (){
            saveAnswer();
            currentQuestion++;
            loadQuestions(currentQuestion);
        });
    } 

    else{
        document.getElementById("submitQuiz").addEventListener("click", function (){
            saveAnswer();
            let score = 0;
            for (let i = 0; i < quizData.length; i++) {
                if (userAnswers[i] === quizData[i].answer) {
                    score++;
                }
            }
            quiz_container.innerHTML = `
                <div class="text-xl font-bold">
                    🎉 You scored ${score} out of ${quizData.length}!
                </div>
            `;
            document.getElementById("progress_bar").style.width = "100%";
        });
    }
}

function saveAnswer() {
    const radios = document.getElementsByName("q" + currentQuestion);
    let selected = null;

    for (let r of radios) {
        if (r.checked) {
            selected = r;
            break;
        }
    }

    if (selected) {
        userAnswers[currentQuestion] = selected.value;
    }
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById("progress_bar").style.width = progress + "%";
}

// Load first question
loadQuestions(currentQuestion);
