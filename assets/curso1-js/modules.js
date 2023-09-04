
//Verb "to be" Quiz

const questions = [
    {
        question: "__ she from Spain?",
        options: ["Are", "Am", "Is"],
        correctAnswer: "Is"
    },
    {
        question: "Where __ you from?",
        options: ["am", "are", "is"],
        correctAnswer: "are"
    },
    {
        question: "We __ from Spain. We're from Portugal!",
        options: ["not", "are", "aren't"],
        correctAnswer: "aren't"
    },
    {
        question: "He __ rich. He's poor!",
        options: ["not", "is", "isn't"],
        correctAnswer: "isn't"
    },
    {
        question: "Are you English? Yes I __.",
        options: ["be", "am", "is"],
        correctAnswer: "am"
    },
    {
        question: "She __ a student. She's a teacher.",
        options: ["is", "isn't", "was"],
        correctAnswer: "isn't"
    },
    {
        question: "Are they students? No, they __.",
        options: ["not", "am", "aren't"],
        correctAnswer: "aren't"
    },
    {
        question: "Is he a doctor? Yes, he __.",
        options: ["is", "be", "was"],
        correctAnswer: "is"
    },
    {
        question: "Are you all on holiday here? No, we __.",
        options: ["am", "are", "aren't"],
        correctAnswer: "aren't"
    },
    {
        question: "Are you a teacher here? No, I'm __.",
        options: ["was", "not", "am"],
        correctAnswer: "not"
    },
    {
        question: "Was she on holiday last week? No, she __.",
        options: ["not", "was", "wasn't"],
        correctAnswer: "wasn't"
    },
    {
        question: "Where __ you yesterday?",
        options: ["were", "are", "was"],
        correctAnswer: "were"
    },
    {
        question: "Were they at work? Yes, they __.",
        options: ["were", "weren't", "was"],
        correctAnswer: "were"
    },
    {
        question: "Were you pleased to see her? Yes, I __.",
        options: ["was", "were", "am"],
        correctAnswer: "was"
    },
    {
        question: "Was it cold at the football match? Yes, it __.",
        options: ["was", "wasn't", "is"],
        correctAnswer: "was"
    },
    {
        question: "We __ happy. We were sad!",
        options: ["aren't", "weren't", "are"],
        correctAnswer: "weren't"
    },
    {
        question: "__ you happy with the exam? No, I wasn't.",
        options: ["Were", "Are", "Aren't"],
        correctAnswer: "Were"
    },
    {
        question: "__ John in the team? No, he wasn't.",
        options: ["Weren't", "Was", "Is"],
        correctAnswer: "Was"
    },
    {
        question: "Were Jim and Sue at the match? No, they __.",
        options: ["wasn't", "aren't", "weren't"],
        correctAnswer: "Weren't"
    },
    {
        question: "Was Deborah there? No, she __.",
        options: ["wasn't", "is", "weren't"],
        correctAnswer: "wasn't"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const resultContainer = document.getElementById("result-container");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-button");

function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;

    optionsContainer.innerHTML = "";
    question.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(answer) {
    const question = questions[currentQuestion];
    if (answer === question.correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.style.display = "none";
    optionsContainer.style.display = "none";
    nextButton.style.display = "none";

    resultContainer.style.display = "block";
    resultElement.innerHTML = `Você acertou ${score} de ${questions.length}!<br><br>Confira as respostas abaixo:<br>`;

        // Display correct answers for each question
        questions.forEach((question, index) => {
            resultElement.innerHTML += `<strong>Questão ${index + 1}:</strong> ${question.correctAnswer}<br>`;
        });  
}

nextButton.addEventListener("click", () => {
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Start the quiz
showQuestion();

//end of quiz