const CHARACTERS = [
  {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
  },
  {
    nome: "Peach",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
  },
  {
    nome: "Yoshi",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
  },
  {
    nome: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
  },
  {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
  },
  {
    nome: "Donkey Kong",
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
  },
];

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
  const blocks = ["RETA", "CURVA", "CONFRONTO"];

  return blocks[Math.floor(Math.random() * blocks.length)];
}

function logRollResult(playerName, block, diceResult, attribute) {
  console.log(
    `${playerName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`
  );
}

function playRaceEngine(player1, player2) {
  for (let index = 1; index <= 5; index++) {
    const block = getRandomBlock();

    console.log(`🏁 Rodada ${index}`);
    console.log(`Bloco: ${block}`);

    let diceResult1 = rollDice();
    let diceResult2 = rollDice();

    let totalResult1 = 0;
    let totalResult2 = 0;

    if (block == "RETA") {
      totalResult1 = diceResult1 + player1.velocidade;
      totalResult2 = diceResult2 + player2.velocidade;
      logRollResult(player1.nome, "velocidade", diceResult1, player1.velocidade);
      logRollResult(player2.nome, "velocidade", diceResult2, player2.velocidade);
    } else if (block == "CURVA") {
      totalResult1 = diceResult1 + player1.manobrabilidade;
      totalResult2 = diceResult2 + player2.manobrabilidade;
      logRollResult(player1.nome, "manobrabilidade", diceResult1, player1.manobrabilidade);
      logRollResult(player2.nome, "manobrabilidade", diceResult2, player2.manobrabilidade);
    } else if (block == "CONFRONTO") {
      totalResult1 = diceResult1 + player1.poder;
      totalResult2 = diceResult2 + player2.poder;
      console.log(`${player1.nome} confrontou com ${player2.nome}! 🥊`);
      logRollResult(player1.nome, "poder", diceResult1, player1.poder);
      logRollResult(player2.nome, "poder", diceResult2, player2.poder);

      if (totalResult1 > totalResult2 && player2.pontos > 0) {
        player2.pontos -= 1;
        console.log(`${player2.nome} perdeu um ponto! 😢`);
      } else if (totalResult2 > totalResult1 && player1.pontos > 0) {
        player1.pontos -= 1;
        console.log(`${player1.nome} perdeu um ponto! 😢`);
      }
    }

    if (totalResult1 > totalResult2) {
      player1.pontos += 1;
      console.log(`${player1.nome} venceu a rodada!`);
    } else if (totalResult2 > totalResult1) {
      player2.pontos += 1;
      console.log(`${player2.nome} venceu a rodada!`);
    } else {
      console.log("Empate na rodada!");
    }

    console.log("-----------------------------");
  }
}

function declareWinner(player1, player2) {
  console.log("Resultado final:");
  console.log(`${player1.nome}: ${player1.pontos} ponto(s)`);
  console.log(`${player2.nome}: ${player2.pontos} ponto(s)`);

  if (player1.pontos > player2.pontos) console.log(`\n${player1.nome} venceu a corrida! Parabéns! 🏆`);
  else if (player2.pontos > player1.pontos) console.log(`\n${player2.nome} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate! 🤝");
}

(function main() {
  console.log("Bem-vindo ao Mario Kart!");
  console.log("Escolha 2 personagens:");

  CHARACTERS.forEach((character, index) => {
    console.log(
      `${index + 1}. ${character.nome} - Velocidade: ${character.velocidade}, Manobrabilidade: ${
        character.manobrabilidade
      }, Poder: ${character.poder}`
    );
  });

  let player1 = { ...CHARACTERS[0], pontos: 0 };
  let player2 = { ...CHARACTERS[3], pontos: 0 };

  console.log(`\nVocê escolheu ${player1.nome} e ${player2.nome}.\n`);

  playRaceEngine(player1, player2);
  declareWinner(player1, player2);
})();
