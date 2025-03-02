document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-button');
  const nextButton = document.getElementById('next-button');
  const restartButton = document.getElementById('restart-button');
  const questionContainer = document.getElementById('question-container');
  const questionText = document.getElementById('question-text');
  const optionList = document.getElementById('option-list');
  const resultContainer = document.getElementById('result-container');
  const scoreContainer = document.getElementById('result');
  const question = [
    // coding questions
    {
      question: 'What is the primary programming language used for web development?',
      options: ['JavaScript', 'Python', 'Java', 'C++'],
      answer: 'JavaScript',
    },
    {
      question: 'Which programming language is known for its simplicity and readability?',
      options: ['JavaScript', 'Python', 'Java', 'C++'],
      answer: 'Python', 
    },
    {
      question: 'What is the largest programming language in the world?',
      options: ['JavaScript', 'Python', 'Java', 'C++'],
      answer: 'Java', 
    },
    {
      question: 'Which programming language is known for its speed and performance?',
      options: ['JavaScript', 'Python', 'Java', 'C++'],
      answer: 'C++', 
    },
    {
        question: 'What tag is used to define - and place - an interactive button in the HTML?',
        options: ['button', 'link', 'div', 'form'],
        answer: 'button',
    },
    {
        question: 'What declaration Must be included in the top of your HTML file?',
        options: ['<!DOCTYPE html>', '<caption>', '<html>', '<code>'],    
        answer: '<!DOCTYPE html>',
    },
    {
        question: 'Which attribute is used to define the width and height of an HTML element?',
        options: ['width', 'height', 'size', 'style'],
        answer: 'width',
    },
    {
        question: 'In javascript, what element is used to store multiple values in a single variable?',
        options: ['arrays', 'strings', 'functions', 'variables'],
        answer: 'arrays',
    },
    {
        question: 'what is the format called that is used for storing and transporting data?',
        options: ['HTML', 'Syntax', 'JSON', 'Font'],
        answer: 'JSON',
    },
    {
        question: 'What kind of statement is used to execute actions based on a trigger or condition?',
        options: ['Fired Event', 'Trigger Event', 'Boolean Variable', 'Conditional Statement'],
        answer: 'Conditional Statement',
    },

  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startButton.addEventListener('click', startQuiz);
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    startQuiz();
  });

  function startQuiz() {
    startButton.classList.add('hidden');
    resultContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    showQuestion();
  }

  function showQuestion() {
    nextButton.classList.add('hidden');
    const currentQuestion = question[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionList.innerHTML = ''; // Clear the option list
    question[currentQuestionIndex].options.forEach((option) => {
      const li = document.createElement('li');
      li.textContent = option;
      li.addEventListener('click', () => selectOption(option));
      optionList.appendChild(li);
    });
  }

  function selectOption(option) {
    const correctAnswer = question[currentQuestionIndex].answer;
    if (option === correctAnswer) {
      score++;
    }
    nextButton.classList.remove('hidden');
  }

  function showResult() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreContainer.textContent = `Your score is ${score}/${question.length}`;
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startButton.classList.remove('hidden');
    resultContainer.classList.add('hidden');
  }
});
