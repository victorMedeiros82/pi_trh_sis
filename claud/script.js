// quiz-system.js

// List of 10 quiz questions
const questions = [
    {
        text: "Qual é o líquido responsável pela lubrificação do motor?",
        answers: ["Óleo do motor", "Água do radiador", "Combustível", "Fluido de freio"],
        correctIndex: 0,
        points: 10
    },
    {
        text: "Qual é a função principal do sistema de arrefecimento de um veículo?",
        answers: ["Resfriar o motor", "Aquecer o interior do veículo", "Aumentar a potência do motor", "Controlar a emissão de poluentes"],
        correctIndex: 0,
        points: 10
    },
    {
        text: "Qual é o componente responsável por transformar a energia química do combustível em energia mecânica no motor?",
        answers: ["Vela de ignição", "Bobina de ignição", "Pistão", "Distribuidor"],
        correctIndex: 2,
        points: 10
    },
    {
        text: "Qual é a função do sistema de freios de um veículo?",
        answers: ["Acelerar o veículo", "Mudar a direção do veículo", "Diminuir a velocidade do veículo", "Desligar o motor"],
        correctIndex: 2,
        points: 10
    },
    {
        text: "Qual é o sistema responsável por converter a energia química do combustível em energia elétrica para alimentar os componentes elétricos do veículo?",
        answers: ["Sistema de ignição", "Sistema de arrefecimento", "Sistema de alimentação de combustível", "Sistema elétrico"],
        correctIndex: 3,
        points: 10
    },
    {
        text: "Qual é o componente responsável por fornecer o movimento de rotação às rodas do veículo?",
        answers: ["Embreagem", "Diferencial", "Alternador", "Transmissão"],
        correctIndex: 1,
        points: 10
    },
    {
        text: "Qual é a função do sistema de suspensão de um veículo?",
        answers: ["Controlar a direção do veículo", "Aumentar a potência do motor", "Absorver os impactos e irregularidades do solo", "Aumentar a eficiência do sistema de freios"],
        correctIndex: 2,
        points: 10
    },
    {
        text: "Qual é o componente responsável por transformar a energia mecânica em energia elétrica?",
        answers: ["Bateria", "Alternador", "Motor de partida", "Bobina de ignição"],
        correctIndex: 1,
        points: 10
    },
    {
        text: "Qual é a função do sistema de direção de um veículo?",
        answers: ["Controlar a velocidade do veículo", "Absorver os impactos e irregularidades do solo", "Transmitir o movimento do volante às rodas", "Aumentar a potência do motor"],
        correctIndex: 2,
        points: 10
    },
    {
        text: "Qual é o sistema responsável por fornecer a mistura ar-combustível adequada para o funcionamento do motor?",
        answers: ["Sistema de ignição", "Sistema de alimentação de combustível", "Sistema de arrefecimento", "Sistema de escapamento"],
        correctIndex: 1,
        points: 10
    }
];

const questionContainer = document.getElementById('question-container');
const answerOptions = document.getElementById('answer-options');
const timeRemainingEl = document.getElementById('time-remaining');
const skipBtn = document.getElementById('skip-btn');
const helpBtn = document.getElementById('help-btn');
const helpOptions = document.getElementById('help-options');
const helpUsed = document.getElementById('help-used');
const helpOptionBtns = document.querySelectorAll('.help-option');
const scoreEl = document.getElementById('score');
const resultContainer = document.getElementById('result-container');
const feedbackForm = document.getElementById('feedback-form');
const ratingStars = document.querySelectorAll('.rating-star');
const ratingInput = document.getElementById('rating');

let currentQuestionIndex = 0;
let score = 0;
let timerId;
let helpUsedForCurrentQuestion = false;

function startTimer() {
    let timeRemaining = 60;
    timerId = setInterval(() => {
        timeRemaining--;
        timeRemainingEl.textContent = `${timeRemaining} segundos`;
        if (timeRemaining === 0) {
            clearInterval(timerId);
            showNextQuestion();
            helpOptions.classList.add('d-none');
            helpUsed.classList.add('d-none');
        }
    }, 1000);
}

function showQuestion(index) {
    const question = questions[index];
    document.getElementById('question-text').textContent = question.text;

    answerOptions.innerHTML = '';
    question.answers.forEach((answer, i) => {
        const answerEl = document.createElement('button');
        answerEl.textContent = answer;
        answerEl.classList.add('btn', 'btn-outline-primary', 'me-2', 'mb-2');
        answerEl.addEventListener('click', () => checkAnswer(i));
        answerOptions.appendChild(answerEl);
    });

    helpUsedForCurrentQuestion = false;
    startTimer();
}

function checkAnswer(selectedIndex) {
    clearInterval(timerId);
    const question = questions[currentQuestionIndex];
    if (selectedIndex === question.correctIndex) {
        score += question.points;
        scoreEl.textContent = score;
    } else {
        // Lidar com resposta incorreta
    }
    showNextQuestion();
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.classList.add('d-none');
    resultContainer.classList.remove('d-none');
}

function handleSkip() {
    clearInterval(timerId);//reseta o temporizaddor
    showNextQuestion();//mostra a proxima pergunta
    helpOptions.classList.add('d-none');
    helpUsed.classList.add('d-none');
}

function handleHelp() {
    if (!helpUsedForCurrentQuestion) {
        helpOptions.classList.remove('d-none');
    } else {
        helpUsed.classList.remove('d-none');
    }
}

function handleHelpOption(color) {
    helpOptions.classList.add('d-none');
    helpUsedForCurrentQuestion = true;

    const question = questions[currentQuestionIndex];
    let numOptionsToRemove = 0;
    let optionIndexToRemove = -1;

    switch (color) {
        case 'verde':
            numOptionsToRemove = getRandomInt(0, 1);
            optionIndexToRemove = getRandomInt(0, question.answers.length);
            while (optionIndexToRemove === question.correctIndex) {
                optionIndexToRemove = getRandomInt(0, question.answers.length);
            }
            break;
        case 'vermelho':
            numOptionsToRemove = getRandomInt(1, 2);
            for (let i = 0; i < numOptionsToRemove; i++) {
                optionIndexToRemove = getRandomInt(0, question.answers.length);
                while (optionIndexToRemove === question.correctIndex) {
                    optionIndexToRemove = getRandomInt(0, question.answers.length);
                }
                const optionButton = answerOptions.children[optionIndexToRemove];
                optionButton.classList.add('d-none');
            }
            break;
        case 'azul':
            numOptionsToRemove = getRandomInt(2, 3);
            for (let i = 0; i < numOptionsToRemove; i++) {
                optionIndexToRemove = getRandomInt(0, question.answers.length);
                while (optionIndexToRemove === question.correctIndex) {
                    optionIndexToRemove = getRandomInt(0, question.answers.length);
                }
                const optionButton = answerOptions.children[optionIndexToRemove];
                optionButton.classList.add('d-none');
            }
            break;
        case 'amarelo':
            numOptionsToRemove = getRandomInt(3, 4);
            for (let i = 0; i < numOptionsToRemove; i++) {
                optionIndexToRemove = getRandomInt(0, question.answers.length);
                while (optionIndexToRemove === question.correctIndex) {
                    optionIndexToRemove = getRandomInt(0, question.answers.length);
                }
                const optionButton = answerOptions.children[optionIndexToRemove];
                optionButton.classList.add('d-none');
            }
            break;
    }

    score -= 3;
    scoreEl.textContent = score;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

helpBtn.addEventListener('click', handleHelp);
helpOptionBtns.forEach((btn) => {
    btn.addEventListener('click', () => handleHelpOption(btn.textContent));
});
skipBtn.addEventListener('click', handleSkip);

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Lidar com o envio do formulário e enviar os dados para o servidor
});

ratingStars.forEach((star, index) => {
    star.addEventListener('click', () => {
        ratingInput.value = index + 1;
        ratingStars.forEach((s, i) => s.classList.toggle('active', i <= index));
    });
});

// Inicializar o quiz
showQuestion(currentQuestionIndex);