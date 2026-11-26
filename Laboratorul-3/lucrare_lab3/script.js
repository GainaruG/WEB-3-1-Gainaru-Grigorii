'use strict';
function calculateSum(a, b) {
  return a + b;
}

console.log('Exercițiul 1 — suma 4 + 7 =', calculateSum(4, 7));
console.log('Exercițiul 1 — suma 12 + 8 =', calculateSum(12, 8));

const sumForm = document.querySelector('#sum-form');
const sumResult = document.querySelector('#sum-result');
sumForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const a = Number(document.querySelector('#number-a').value);
  const b = Number(document.querySelector('#number-b').value);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    sumResult.textContent = 'Introdu două valori numerice valide.';
    return;
  }
  sumResult.textContent = `Suma numerelor ${a} și ${b} este ${calculateSum(a, b)}.`;
});
const student = {
  name: 'Alexandra Popescu',
  age: 17,
  grade: 9,
  introduce() {
    const message = `Sunt ${this.name} și am ${this.age} ani.`;
    console.log(message);
    return message;
  }
};

document.querySelector('#introduce-button').addEventListener('click', () => {
  document.querySelector('#student-introduction').textContent = student.introduce();
});
document.querySelector('#grade-button').addEventListener('click', (event) => {
  student.grade = 10;
  document.querySelector('#student-grade').textContent = student.grade;
  event.currentTarget.textContent = 'Nota a fost actualizată ✓';
  event.currentTarget.disabled = true;
  console.log('Noua notă a elevului:', student.grade);
});
const gameScore = {
  player1: 0,
  player2: 0,
  draws: 0,
  rounds: 0,
  finished: false,
  displayScore() {
    return `Jucătorul 1: ${this.player1} | Jucătorul 2: ${this.player2} | Egalități: ${this.draws}`;
  }
};

const choiceLabels = { piatra: 'Piatra', hartia: 'Hârtia', foarfeca: 'Foarfeca' };
const choiceButtons = [...document.querySelectorAll('.choice-button')];
const choiceGroup = document.querySelector('.choice-buttons');
const playerOneChoiceOutput = document.querySelector('#player-choice');
const playerTwoChoiceOutput = document.querySelector('#player-two-choice');
const roundMessage = document.querySelector('#round-message');
const leaderMessage = document.querySelector('#leader-message');
const gamePrompt = document.querySelector('#game-prompt');
const advanceButton = document.querySelector('#advance-button');
const newGameButton = document.querySelector('#new-game-button');
let firstChoice = null;
let phase = 'player1';

function determineWinner(playerOneChoice, playerTwoChoice) {
  if (playerOneChoice === playerTwoChoice) return 'draw';
  const playerOneWins =
    (playerOneChoice === 'piatra' && playerTwoChoice === 'foarfeca') ||
    (playerOneChoice === 'foarfeca' && playerTwoChoice === 'hartia') ||
    (playerOneChoice === 'hartia' && playerTwoChoice === 'piatra');
  return playerOneWins ? 'player1' : 'player2';
}

function updateScoreboard() {
  document.querySelector('#player-score').textContent = gameScore.player1;
  document.querySelector('#player-two-score').textContent = gameScore.player2;
  document.querySelector('#draw-score').textContent = gameScore.draws;
  document.querySelector('#rounds-played').textContent = gameScore.rounds;

  if (gameScore.player1 > gameScore.player2) {
    leaderMessage.textContent = 'Jucătorul 1 conduce.';
  } else if (gameScore.player2 > gameScore.player1) {
    leaderMessage.textContent = 'Jucătorul 2 conduce.';
  } else {
    leaderMessage.textContent = 'Scor egal.';
  }
}

function showChoiceButtons(player) {
  choiceGroup.hidden = false;
  choiceButtons.forEach((button) => { button.disabled = false; });
  gamePrompt.textContent = `Jucătorul ${player}, alege:`;
}

function finishRound(playerTwoChoice) {
  playerOneChoiceOutput.textContent = choiceLabels[firstChoice];
  playerTwoChoiceOutput.textContent = choiceLabels[playerTwoChoice];

  const winner = determineWinner(firstChoice, playerTwoChoice);
  if (winner === 'player1') {
    gameScore.player1 += 1;
    roundMessage.textContent = 'Jucătorul 1 câștigă runda.';
  } else if (winner === 'player2') {
    gameScore.player2 += 1;
    roundMessage.textContent = 'Jucătorul 2 câștigă runda.';
  } else {
    gameScore.draws += 1;
    roundMessage.textContent = 'Egalitate.';
  }

  gameScore.rounds += 1;
  updateScoreboard();
  choiceGroup.hidden = true;
  phase = 'result';

  if (gameScore.player1 >= 5 || gameScore.player2 >= 5) {
    gameScore.finished = true;
    const winnerName = gameScore.player1 >= 5 ? 'Jucătorul 1' : 'Jucătorul 2';
    roundMessage.textContent = `${winnerName} câștigă jocul!`;
    gamePrompt.textContent = 'Joc încheiat.';
    advanceButton.hidden = true;
  } else {
    gamePrompt.textContent = `Runda ${gameScore.rounds}`;
    advanceButton.textContent = 'Runda următoare';
    advanceButton.hidden = false;
    advanceButton.focus();
  }
  console.log(gameScore.displayScore());
}

choiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (gameScore.finished) return;
    if (phase === 'player1') {
      firstChoice = button.dataset.choice;
      phase = 'handoff';
      choiceGroup.hidden = true;
      gamePrompt.textContent = 'Alegeri ascunse.';
      roundMessage.textContent = 'Predă rândul jucătorului 2.';
      advanceButton.textContent = 'Jucătorul 2 → alege';
      advanceButton.hidden = false;
      advanceButton.focus();
      return;
    }
    if (phase === 'player2') finishRound(button.dataset.choice);
  });
});

advanceButton.addEventListener('click', () => {
  if (phase === 'handoff') {
    phase = 'player2';
    roundMessage.textContent = 'Jucătorul 2, alege.';
    advanceButton.hidden = true;
    showChoiceButtons(2);
    choiceButtons[0].focus();
    return;
  }
  if (phase === 'result' && !gameScore.finished) {
    phase = 'player1';
    firstChoice = null;
    playerOneChoiceOutput.textContent = '—';
    playerTwoChoiceOutput.textContent = '—';
    roundMessage.textContent = 'Rândul jucătorului 1.';
    advanceButton.hidden = true;
    showChoiceButtons(1);
    choiceButtons[0].focus();
  }
});

newGameButton.addEventListener('click', () => {
  gameScore.player1 = 0;
  gameScore.player2 = 0;
  gameScore.draws = 0;
  gameScore.rounds = 0;
  gameScore.finished = false;
  firstChoice = null;
  phase = 'player1';
  playerOneChoiceOutput.textContent = '—';
  playerTwoChoiceOutput.textContent = '—';
  roundMessage.textContent = 'Rândul jucătorului 1.';
  advanceButton.hidden = true;
  showChoiceButtons(1);
  updateScoreboard();
});

updateScoreboard();
