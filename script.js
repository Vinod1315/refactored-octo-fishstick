const maxAttempts = 5;
let currentAttempt = 0;
const correctTeams = ["Team A", "Team B"]; // Example placeholders for teams
const clues = [
  "Clue 1: This was a Champions League match.",
  "Clue 2: The final score was 2-1.",
  "Clue 3: Played at the famous XYZ stadium.",
  "Clue 4: Team A's striker scored twice.",
  "Clue 5: It happened in 2020."
];

document.getElementById('submit').addEventListener('click', function() {
  const team1 = document.getElementById('team1').value.toLowerCase();
  const team2 = document.getElementById('team2').value.toLowerCase();
  const guess = [team1, team2];
  
  if (checkGuess(guess)) {
    displayResult("Correct! You guessed the match!");
  } else {
    currentAttempt++;
    if (currentAttempt >= maxAttempts) {
      displayResult("Unlucky! You've used all your attempts.");
    } else {
      document.getElementById('clue').textContent = clues[currentAttempt - 1];
      document.getElementById(`attempt${currentAttempt}`).style.opacity = 0.3; // Grey out the football icon
    }
  }
});

function checkGuess(guess) {
  // Example for basic matching of teams (we will expand this)
  return guess.includes(correctTeams[0].toLowerCase()) && guess.includes(correctTeams[1].toLowerCase());
}

function displayResult(message) {
  document.getElementById('score-panel').style.display = 'none';
  document.getElementById('clue-panel').style.display = 'none';
  document.getElementById('win-page').style.display = 'block';
  document.getElementById('result-message').textContent = message;
}
