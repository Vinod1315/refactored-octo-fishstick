// Function to format and display today's date
function formatDate() {
  const today = new Date();
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  document.getElementById('date').textContent = today.toLocaleDateString('en-GB', options);
}

// Call the date function on page load
window.onload = formatDate;

// Add event listeners to control page transitions
document.getElementById('play-btn').addEventListener('click', function() {
  document.getElementById('home-page').style.display = 'none';
  document.getElementById('how-to-play-page').style.display = 'block';
});

document.getElementById('play-now-btn').addEventListener('click', function() {
  document.getElementById('how-to-play-page').style.display = 'none';
  document.getElementById('game-page').style.display = 'block';
});

// Existing logic for gameplay, clues, and guesses
const maxAttempts = 5;
let currentAttempt = 0;
const correctTeams = ["Team A", "Team B"]; // Placeholder teams
const clues = [
  "Tournament: Champions League",
  "Venue: Stadium XYZ",
  "Scorers: Team A's striker scored twice",
  "Players: Team B had a famous midfielder"
];

// Display the match score and team colors on first load
document.getElementById('match-score').textContent = "2-1"; // Example score

document.getElementById('submit').addEventListener('click', function() {
  const team1 = document.getElementById('team1').value.toLowerCase();
  const team2 = document.getElementById('team2').value.toLowerCase();
  const guess = [team1, team2];
  
  if (checkGuess(guess)) {
    displayResult("Correct! You guessed the match!");
  } else {
    currentAttempt++;
    if (currentAttempt >= maxAttempts) {
      displayResult("Sorry, out of guesses this time. Try a new match tomorrow! Thanks for playing");
    } else {
      document.getElementById('clue').textContent = clues[currentAttempt - 1];
      document.getElementById(`attempt${currentAttempt}`).style.opacity = 0.3; // Grey out the football icon
    }
  }
});

function checkGuess(guess) {
  return guess.includes(correctTeams[0].toLowerCase()) && guess.includes(correctTeams[1].toLowerCase());
}

function displayResult(message) {
  document.getElementById('game-page').style.display = 'none';
  alert(message); // Temporary result display. Replace with proper UI display as needed.
}
