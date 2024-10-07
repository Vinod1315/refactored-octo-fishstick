// Function to format and display today's date
function formatDate() {
  const today = new Date();
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  document.getElementById('date').textContent = today.toLocaleDateString('en-GB', options);
}

// Call the date function on page load
window.onload = formatDate;

// Ensure the buttons are working correctly
document.addEventListener('DOMContentLoaded', () => {
  // Play button on the first page
  document.getElementById('play-btn').addEventListener('click', function() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('how-to-play-page').style.display = 'block';
  });

  // Play now button on the second page
  document.getElementById('play-now-btn').addEventListener('click', function() {
    document.getElementById('how-to-play-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
  });

  // Handle the guessing of teams
  document.getElementById('submit').addEventListener('click', function() {
    const team1 = document.getElementById('team1').value.toLowerCase();
    const team2 = document.getElementById('team2').value.toLowerCase();
    const guess = [team1, team2];

    if (checkGuess(guess)) {
      // Teams guessed correctly, move to guessing the year
      displayResult("Great work! Now guess the year for a bonus.");
      document.getElementById('game-page').style.display = 'none';
      document.getElementById('year-guess-page').style.display = 'block';
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

  // Handle the guessing of the year
  document.getElementById('submit-year').addEventListener('click', function() {
    const year = document.getElementById('year').value;
    
    if (year == correctYear) {
      // Correct year guessed
      displayFinalMessage("Congratulations! You got the year bonus!");
    } else {
      // Incorrect year guessed
      displayFinalMessage("Close, but no bonus! See you tomorrow for another classic match.");
    }
  });
});

// Variables for game logic
const maxAttempts = 5;
let currentAttempt = 0;
const correctTeams = ["manchester united", "barcelona"];
const correctYear = 2011;
const clues = [
  "Tournament: Champions League",
  "Venue: Wembley Stadium",
  "Scorers: Messi, Rooney",
  "Players: Xavi, Giggs"
];

// Function to check if the guessed teams are correct
function checkGuess(guess) {
  return guess.includes(correctTeams[0]) && guess.includes(correctTeams[1]);
}

// Display the result message
function displayResult(message) {
  alert(message); // Temporary alert, update to proper display if needed
}

// Display the final message after guessing the year
function displayFinalMessage(message) {
  document.getElementById('year-guess-page').style.display = 'none';
  document.getElementById('final-result').style.display = 'block';
  document.getElementById('final-message').textContent = message;
}
