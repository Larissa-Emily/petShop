const btn_Start = document.querySelector("#start");

const first = document.querySelector(".container-first");
const second = document.querySelector(".container-second");
const third = document.querySelector(".container-third");

const pontuacao1 = document.querySelector("#acerto");
const pontuacao2 = document.querySelector("#erro");
let correct = 0;
let wrong = 0;


const next = document.createElement("button");
next.style.padding = "10px";
next.style.margin = "200px 0px 20px 0px";
next.style.cursor = "pointer";
next.textContent = `Próxima pergunta`;

const questionsAndAnswers = [
  { question: "O que é 4 + 2?", answer: "6" },
  { question: "Qual é a capital da França?", answer: "Paris" },
  { question: "Quantas letras tem o alfabeto?", answer: "26" },
  { question: "Em que ano foi criada a internet?", answer: "1969" },
  {
    question: "De quem é a famosa frase “Penso, logo existo?",
    answer: "Descartes",
  },
  { question: "De onde é a invenção do chuveiro elétrico?", answer: "Brasil" },
  { question: "Qual o menor país do mundo?", answer: "Vaticano" },
];

let currentQuestionIndex = 0;

function showQuestion(index) {
  // Esconde todos os contêineres
  first.style.display = "none";
  second.style.display = "none";
  third.style.display = "none";

  // Mostra apenas o contêiner correspondente à pergunta atual
  if (index === 0) {
    first.style.display = "block";
  } else if (index === 1) {
    second.style.display = "block";
  } else if (index === 2) {
    third.style.display = "block";
  }
}

btn_Start.addEventListener("click", () => {
  first.style.display = "none";
  second.style.display = "block";
});

function clearQuestionsContainer() {
  second.innerHTML = "";
}

clearQuestionsContainer();

function seeAnswer(answer) {
  const answerElement = document.createElement("p");
  answerElement.textContent = `Resposta: ${answer}`;
  second.appendChild(answerElement);
}

function handleQuestion() {
  const item = questionsAndAnswers[currentQuestionIndex];

  const questionElement = document.createElement("p");
  questionElement.textContent = `Pergunta ${currentQuestionIndex + 1}: ${
    item.question
  }`;
  questionElement.style.marginTop = "35px";
  const input = document.createElement("input");
  input.style.padding = "10px";
  input.style.margin = "10px";
  input.placeholder = "Digite aqui sua resposta";

  const image = document.createElement("img");
  image.src = "./images/love-potion-animate.svg";
  image.style.width = "200px";

  second.appendChild(image);
  second.appendChild(questionElement);
  second.appendChild(input);

  const butResponse = document.createElement("button");
  butResponse.textContent = "Ver respostas";
  butResponse.style.padding = "10px";
  butResponse.style.margin = "0 auto";
  butResponse.style.display = "block";
  butResponse.style.cursor = "pointer";

  second.appendChild(butResponse);

  butResponse.addEventListener("click", () => {

    const inputValue = input.value;
    if (inputValue === item.answer) {
      alert("Certa resposta");
      function correctPoints() {
        let maisPontos = 1;
        correct = correct + maisPontos;
        pontuacao1.innerText = correct;
      }
      correctPoints();
    } else {
      alert("Resposta errada");

      function wrongPoints() {
        let menosPontos = 1;
        wrong = wrong + menosPontos;
        pontuacao2.innerText = wrong;
      }
      wrongPoints();
      seeAnswer(item.answer);
    }
  });
  second.appendChild(next);
}

// Adiciona um ouvinte de evento para o botão Next

next.addEventListener("click", () => {
  // Incrementa o índice da pergunta atual
  currentQuestionIndex++;

  // Verifica se há mais perguntas
  if (currentQuestionIndex < questionsAndAnswers.length) {
    // Limpa o contêiner e exibe a próxima pergunta
    clearQuestionsContainer();
    handleQuestion();
  } else {
    // Se não houver mais perguntas, exibe uma mensagem ou faz o que for necessário
    alert("Fim das perguntas");
    location.reload();
  }
});

// Exibe a primeira pergunta ao iniciar
showQuestion(currentQuestionIndex);
handleQuestion();