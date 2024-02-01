const listArrayJobs = [
    {job: "Tosa simples", answer: 45},
    {job: "Tosa higiênica", answer: 80},
    {job: "Banho e tosa", answer: 100},
    {job: "Banho com hidratação", answer: 110},
    {job: "Banho carrapaticida", answer: 55},
    {job: "Hospedagem", answer: 85},
    {job: "Transporte", answer: 69},
];

let indexJob = 0;

const item = listArrayJobs[indexJob];

for (teste of listArrayJobs){
    console.log(teste.job, teste.answer)
}