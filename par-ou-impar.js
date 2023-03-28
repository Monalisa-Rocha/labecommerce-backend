// Capturando os argumentos do terminal
const args = process.argv.slice(2);
const escolhaDoJogador = args[0];
const numeroEscolhido = parseInt(args[1]);

// Função para gerar um número aleatório entre 0 e 10
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Gerando a escolha aleatória do computador
const escolhaDoComputador = getRndInteger(0, 1) === 0 ? 'par' : 'impar';

// Somando as escolhas do jogador e do computador
const soma = numeroEscolhido + getRndInteger(0, 10);

// Verificando se a soma é par ou ímpar
const resultado = soma % 2 === 0 ? 'par' : 'impar';

// Verificando quem ganhou
if (escolhaDoJogador === resultado) {
  console.log(`Você escolheu ${escolhaDoJogador} e o computador escolheu ${escolhaDoComputador}. O resultado foi ${soma}. Você ganhou!`);
} else {
  console.log(`Você escolheu ${escolhaDoJogador} e o computador escolheu ${escolhaDoComputador}. O resultado foi ${soma}. Você perdeu!`);
}
