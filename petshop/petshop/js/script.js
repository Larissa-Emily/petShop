const scheduling = document.querySelector("#scheduling"); //botao de cadastro
const register = document.querySelector("#register");
const close = document.querySelectorAll(".close");

const schedule = document.querySelector("#schedule");
const sectionSchedule = document.querySelector("#section-schedule");

const customerRegistration = document.querySelector(".customer-registration");
const animalRegistration = document.querySelector(".animal-registration");

const client = document.querySelector(".client");
const animal = document.querySelector(".animal");

//area do cadastro
const salvarCadastro = document.querySelector("#salvarCadastro");

//area serviços
// Seleciona o elemento onde você deseja adicionar a lista de serviços
const listJobs = document.querySelector(".listJobs");
const totalValue = document.getElementById("totalValue");

const butCheck = document.querySelector("#consultarCEP");

//lista os serviços oferecidos
function listServicos() {
  const listArrayJobs = [
    { job: "Tosa simples", answer: 45 },
    { job: "Tosa higiênica", answer: 80 },
    { job: "Banho e tosa", answer: 100 },
    { job: "Banho com hidratação", answer: 110 },
    { job: "Banho carrapaticida", answer: 55 },
    { job: "Hospedagem", answer: 85 },
    { job: "Transporte", answer: 69 },
  ];

  const listJobs = document.querySelector(".listJobs");
  const totalValue = document.querySelector("#totalValue");
  const ulJobs = document.createElement("ul"); //cria ul

  for (const servico of listArrayJobs) {
    const liJobs = document.createElement("li"); //cria li

    const checkbox = document.createElement("input"); //cria o checkbox
    checkbox.style.marginRight = "5px";
    checkbox.type = "checkbox";
    checkbox.value = servico.answer;
    checkbox.addEventListener("change", calcularTotal);

    const label = document.createElement("label");
    label.appendChild(checkbox);
    label.appendChild(
      document.createTextNode(`${servico.job}: R$ ${servico.answer.toFixed(2)}`)
    );

    liJobs.appendChild(label);
    ulJobs.appendChild(liJobs);
  }

  listJobs.appendChild(ulJobs);
}

function calcularTotal() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let total = 0;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      total += parseFloat(checkbox.value);
    }
  });

  const formattedTotal = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  document.getElementById(
    "totalValue"
  ).textContent = `Total: ${formattedTotal}`;
}

listServicos();

schedule.addEventListener("click", () => {
  sectionSchedule.style.display = "block";
});

function clearAreaRegister() {
  register.style.display = "none";
  sectionSchedule.style.display = "none";
}

let listDados = [];
function buscarPets() {
  // Exemplo: Mostrar os pets em um alerta (você pode ajustar conforme necessário)
  console.log("Dados dos Pets: " + JSON.stringify(listDados, null, 2));
}

scheduling.addEventListener("click", () => {
  register.style.display = "block";
});

close.forEach((button) => {
  button.addEventListener("click", clearAreaRegister);
});

animalRegistration.addEventListener("click", () => {
  client.style.display = "none";
  animal.style.display = "block";
});

customerRegistration.addEventListener("click", () => {
  client.style.display = "block";
  animal.style.display = "none";
});

salvarCadastro.addEventListener("click", (e) => {
  e.preventDefault();
  //cliente
  const nameClient = document.querySelector("#nameClient").value;
  const emailClient = document.querySelector("#emailClient").value;
  const cpfClient = document.querySelector("#cpfClient").value;
  const telClient = document.querySelector("#telClient").value;
  //animal

  const nameAnimal = document.querySelector("#nameAnimal").value;
  const pesoAnimal = document.querySelector("#pesoAnimal").value;
  const tamanhoAnimal = document.querySelector("#tamanhoAnimal").value;
  const idadeAnimal = document.querySelector("#idadeAnimal").value;

  let listData = {
    nameClient: nameClient,
    cpfClient: cpfClient,
    emailClient: emailClient,
    telClient: telClient,
    nameAnimal: nameAnimal,
    pesoAnimal: pesoAnimal,
    tamanhoAnimal: tamanhoAnimal,
    idadeAnimal: idadeAnimal,
  };
  listDados.push(listData);
  localStorage.setItem("listData", JSON.stringify(listDados));

  // Verifica se todos os campos estão preenchidos
  if (
    nameClient !== "" &&
    cpfClient !== "" &&
    emailClient !== "" &&
    telClient !== "" &&
    nameAnimal !== "" &&
    pesoAnimal !== "" &&
    tamanhoAnimal !== "" &&
    idadeAnimal !== ""
  ) {
    // Todos os campos estão preenchidos, faça algo aqui
    alert("Dados inseridos com sucesso!");
    buscarPets();
    clearAreaRegister();
    // Limpar os campos de entrada
    document.querySelector("#nameClient").value = "";
    document.querySelector("#emailClient").value = "";
    document.querySelector("#cpfClient").value = "";
    document.querySelector("#telClient").value = "";
    document.querySelector("#nameAnimal").value = "";
    document.querySelector("#pesoAnimal").value = "";
    document.querySelector("#tamanhoAnimal").value = "";
    document.querySelector("#idadeAnimal").value = "";
  } else {
    // Algum campo está vazio, faça algo aqui
    alert("Por favor, preencha todos os campos.");
  }
});

butCheck.addEventListener("click", (e) => {
  e.preventDefault();
  // Obtenha o valor do campo de input do CEP
  var cep = document.getElementById("cepInput").value;

  // Construa a URL da API do ViaCEP
  var url = `https://viacep.com.br/ws/${cep}/json/`;

  // Faça a requisição usando a função fetch
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Exiba os resultados
      var resultadoDiv = document.getElementById("resultado");
      if (data.localidade !== "Santa Luzia") {
        alert(`Cep referente a cidade ${data.localidade}, trabalhamos somente na cidade de Santa luzia`);
      } else {
        resultadoDiv.innerHTML = `<p>CEP: ${data.cep}</p>
      <p>Logradouro: ${data.logradouro}</p>
      <p>Bairro: ${data.bairro}</p>
      <p>Cidade: ${data.localidade}</p>
      <p>Estado: ${data.uf}</p>`;
      }
    })
    .catch((error) => {
      // Exiba uma mensagem de erro se houver problemas na requisição
      console.error("Erro ao consultar o CEP:", error);
      var resultadoDiv = document.getElementById("resultado");
      resultadoDiv.innerHTML =
        "Erro ao consultar o CEP. Verifique se o CEP é válido.";
    });
});
