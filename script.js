document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");  // This message should appear in the browser console
});

document.getElementById('play-btn').addEventListener('click', function() {
  alert("Play button works!");  // Check if the Play button works without DOMContentLoaded
});

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
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('play-btn').addEventListener('click', function() {
    alert("Play button works!");  // This alert will pop up when the button is clicked
  });
});

  
  // Play Now button on the second page
  document.getElementById('play-now-btn').addEventListener('click', function() {
    document.getElementById('how-to-play-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';

    // Dynamically update the match score based on the correctTeamsWithScores array
    document.getElementById('match-score').textContent = 
      correctTeamsWithScores[0].score + "-" + correctTeamsWithScores[1].score;
  });

  // Handle the guessing of teams with correct score matching or draw
  document.getElementById('submit').addEventListener('click', function() {
    const team1 = document.getElementById('team1').value.toLowerCase(); // Team in first input field
    const team2 = document.getElementById('team2').value.toLowerCase(); // Team in second input field
    
    // Check if the game is a draw
    const isDraw = correctTeamsWithScores[0].score === correctTeamsWithScores[1].score;
    
    if (isDraw) {
      // Use checkGuessForDraw if the game is a draw
      if (checkGuessForDraw(team1, team2)) {
        displayResult("Great work! Now guess the year for a bonus.");
        document.getElementById('game-page').style.display = 'none';
        document.getElementById('year-guess-page').style.display = 'block';
      } else {
        handleWrongGuess();
      }
    } else {
      // Otherwise, use regular checkGuess
      if (checkGuess(team1, team2)) {
        displayResult("Great work! Now guess the year for a bonus.");
        document.getElementById('game-page').style.display = 'none';
        document.getElementById('year-guess-page').style.display = 'block';
      } else {
        handleWrongGuess();
      }
    }
  });
});


// Function to handle incorrect guesses
function handleWrongGuess() {
  currentAttempt++;
  if (currentAttempt >= maxAttempts) {
    displayResult("Sorry, out of guesses this time. Try a new match tomorrow! Thanks for playing");
  } else {
    document.getElementById('clue').textContent = clues[currentAttempt - 1];
    document.getElementById(`attempt${currentAttempt}`).style.opacity = 0.3; // Grey out the football icon
  }
}


  // Function to check the guessed teams with score matching
function checkGuess(team1, team2) {
  return (team1 === correctTeamsWithScores[0].team && team2 === correctTeamsWithScores[1].team);
}

  // Function to check guessed teams for a draw (score is the same for both teams)
function checkGuessForDraw(team1, team2) {
  return (
    (team1 === correctTeamsWithScores[0].team && team2 === correctTeamsWithScores[1].team) ||
    (team1 === correctTeamsWithScores[1].team && team2 === correctTeamsWithScores[0].team)
  );
}
  
  // Handle the guessing of the year
  document.getElementById('submit-year').addEventListener('click', function() {
    const year = document.getElementById('year').value;
    
    if (year == correctYear) {
      // Correct year guessed
      displayFinalMessage("Congratulations! You got the year bonus! See you tomorrow for another classic match.");
    } else {
      // Incorrect year guessed
      displayFinalMessage("Unlucky with the year but Congratulations! See you tomorrow for another classic match.");
    }
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

// Variables for game logic with scores assigned to specific teams
const correctTeamsWithScores = [
  { team: "manchester united", score: 3 },
  { team: "barcelona", score: 3 }
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
