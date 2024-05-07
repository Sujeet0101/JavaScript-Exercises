function getComputerChoice() {
  const choices = ["rock", "paper", "scissor"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function getHumanChoice() {
  let choice = prompt("Please choose: rock, paper or scissor");
  return choice.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
  let result;
  if (
    (humanChoice === "rock" && computerChoice === "scissor") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissor" && computerChoice === "paper")
  ) {
    result = `You win! ${humanChoice} beats ${computerChoice}.`;
    return result;
  } else if (
    (computerChoice === "rock" && humanChoice === "scissor") ||
    (computerChoice === "paper" && humanChoice === "rock") ||
    (computerChoice === "scissor" && humanChoice === "paper")
  ) {
    result = `You lose! ${computerChoice} beats ${humanChoice}.`;
    return result;
  } else {
    result = "It's a tie!";
    return result;
  }
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  for (let i = 0; i < 5; i++) {
    let humanChoice = getHumanChoice();
    console.log(humanChoice);
    let computerChoice = getComputerChoice();
    console.log(computerChoice);
    let result = playRound(humanChoice, computerChoice);
    console.log(result);

    if (result.includes("win")) {
      humanScore++;
    } else if (result.includes("lose")) {
      computerScore++;
    }
  }

  console.log("Game Over!");
  console.log("Human score: " + humanScore);
  console.log("Computer score:: " + computerScore);

  if (humanScore > computerScore) {
    console.log("You won the game!");
  } else if (humanScore < computerScore) {
    console.log("You lost the game!");
  } else {
    console.log("It's a tie!");
  }
}
