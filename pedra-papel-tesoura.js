// Capturando o argumento do terminal
const escolhaDoJogador = process.argv[2];

// Função para gerar um número aleatório entre 0 e 2
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Gerando a escolha aleatória do computador
const escolhasPossiveis = ['pedra', 'papel', 'tesoura'];
const indiceEscolhaDoComputador = getRndInteger(0, 2);
const escolhaDoComputador = escolhasPossiveis[indiceEscolhaDoComputador];

// Verificando quem ganhou
if (escolhaDoJogador === escolhaDoComputador) {
  console.log(`Você escolheu ${escolhaDoJogador} e o computador escolheu ${escolhaDoComputador}. Empate!`);
} else if (
  (escolhaDoJogador === 'pedra' && escolhaDoComputador === 'tesoura') ||
  (escolhaDoJogador === 'papel' && escolhaDoComputador === 'pedra') ||
  (escolhaDoJogador === 'tesoura' && escolhaDoComputador === 'papel')
) {
  console.log(`Você escolheu ${escolhaDoJogador} e o computador escolheu ${escolhaDoComputador}. Você ganhou!`);
  
}

