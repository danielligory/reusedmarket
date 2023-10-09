let score = JSON.parse(localStorage.getItem('score')) ||
{
  wins: 0,
  loses: 0,
  ties: 0
};

/*if (!score) { //same thing as (score === null)
  score = {
    wins: 0,
    loses: 0,
    ties: 0
  };
}
*/

updateScoreElement();


console.log();

function pickComputerMove() {
  let computerMove = ''
  const randomNumber = Math.random()
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';



  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You Lose'
    } else {
      result = 'You Win'
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You Win';
    } else if (computerMove === 'paper') {
      result = 'Tie'
    } else {
      result = 'You Lose'
    }
  } else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You Lose';
    } else if (computerMove === 'paper') {
      result = 'You Win'
    } else {
      result = 'Tie'
    }
  }

  if (result === 'You Win') {
    score.wins += 1;
  } else if (result === 'You Lose') {
    score.loses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
};