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
    const team1 = document.getElementById('team1').value.toLowerCase(); 
    const team2 = document.getElementById('team2').value.toLowerCase();
    
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

  // Add CSV Loading functions here:
  loadCSV(function(matches) {
    startNewMatch(matches);  // Start the game with a specific match based on date
  });

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

});

// Function to handle incorrect guesses
function handleWrongGuess() {
  currentAttempt++;
  if (currentAttempt >= maxAttempts) {
    displayResult("Sorry, out of guesses this time. Try a new match tomorrow! Thanks for playing");
  } else {
    // Ensure the scorers clue is treated as a single clue
    document.getElementById('clue').textContent = clues[currentAttempt - 1];  
    document.getElementById(`attempt${currentAttempt}`).style.opacity = 0.3; // Grey out the football icon
  }
}

function displayMessage(team1Correct, team2Correct) {
  let message = '';
  if (team1Correct && team2Correct) {
    message = ''; // No message if both teams are correct
  } else if (team1Correct || team2Correct) {
    message = 'Well done! One more to get.';
  } else {
    message = 'Not quite! Guess again.';
  }
  document.getElementById('feedback-message').textContent = message;  // This updates the message on the page
}


// Function to check the guessed teams with score matching, allowing either order
function checkGuess(team1, team2) {
  const team1Guess = team1.trim().toLowerCase();
  const team2Guess = team2.trim().toLowerCase();
  const correctTeam1 = correctTeamsWithScores[0].team.trim().toLowerCase();
  const correctTeam2 = correctTeamsWithScores[1].team.trim().toLowerCase();

  if (team1Guess === correctTeam1 || team2Guess === correctTeam1) {
    document.getElementById('team1').value = correctTeam1;
    document.getElementById('team1').disabled = true; // Disable team1 input field
  }

  if (team1Guess === correctTeam2 || team2Guess === correctTeam2) {
    document.getElementById('team2').value = correctTeam2;
    document.getElementById('team2').disabled = true; // Disable team2 input field
  }

  const team1Correct = (team1Guess === correctTeam1 || team2Guess === correctTeam1);
  const team2Correct = (team1Guess === correctTeam2 || team2Guess === correctTeam2);

  displayMessage(team1Correct, team2Correct); // Call the function here

  return (team1Correct && team2Correct);
}

// Function to check guessed teams for a draw (score is the same for both teams)
function checkGuessForDraw(team1, team2) {
  return (
    (team1 === correctTeamsWithScores[0].team && team2 === correctTeamsWithScores[1].team) ||
    (team1 === correctTeamsWithScores[1].team && team2 === correctTeamsWithScores[0].team)
  );
}

// Variables for game logic
const maxAttempts = 5;
let currentAttempt = 0;
let correctYear; // Updated to be loaded from the CSV
let correctTeamsWithScores;
let clues = [];


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

// Function to load CSV and parse match data
function loadCSV(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "matches.csv", true);  // Ensure "matches.csv" is in the root of your repository
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = xhr.responseText;
      const parsedData = parseCSV(data);
      callback(parsedData);
    }
  };
  xhr.send();
}

// Function to parse CSV data into an array of match objects
function parseCSV(data) {
  const rows = data.split("\n").slice(1); // Skip the header row
  const matches = rows.map(row => {
    const fields = row.split(",");
    if (fields.length >= 34) {  // Check if there are enough fields
      return {
        team1: fields[0].trim(),
        team2: fields[1].trim(),
        score: fields[2].trim(),
        team1_shirt: fields[3].trim(),
        team1_shorts: fields[4].trim(),
        team2_shirt: fields[5].trim(),
        team2_shorts: fields[6].trim(),
        tournament: fields[7].trim(),
        venue: fields[8].trim(),
        team1_scorers: fields[9].trim(),
        team2_scorers: fields[10].trim(),
        team1_players: fields.slice(11, 22),  // Team 1 players
        team2_players: fields.slice(22, 33),  // Team 2 players
        link_to_highlights: fields[33] ? fields[33].trim() : ""  // Check if field 33 exists
      };
    }
  }).filter(Boolean);  // Filter out any undefined rows
  return matches;
}

// Function to start a new match from the loaded matches
function startNewMatch(matches) {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

  // Use modulo to select a match based on the current day of the year
  const matchIndex = dayOfYear % matches.length;
  const selectedMatch = matches[matchIndex];

  console.log(selectedMatch);  // This will show the match details in the browser's console

  correctTeamsWithScores = [
    { team: selectedMatch.team1, score: selectedMatch.score.split("-")[0] },
    { team: selectedMatch.team2, score: selectedMatch.score.split("-")[1] }
  ];
  correctYear = selectedMatch.year;
  clues = [
  `Tournament: ${selectedMatch.tournament}`,
  `Venue: ${selectedMatch.venue}`,
  `Scorers: Team 1 - ${selectedMatch.team1_scorers}, Team 2 - ${selectedMatch.team2_scorers}`,  
  `Players: Team 1 - ${selectedMatch.team1_players.join(", ")}, Team 2 - ${selectedMatch.team2_players.join(", ")}`
];

  // Update the match score and colors on the page after selectedMatch is properly set
  document.getElementById('match-score').textContent = selectedMatch.score;

  // Update the team colors
  document.getElementById('team1-color').style.backgroundColor = selectedMatch.team1_shirt;
  document.getElementById('team2-color').style.backgroundColor = selectedMatch.team2_shirt;

  // Add the team color boxes with the correct colors
  document.getElementById('team1-color').classList.add('color-box');
  document.getElementById('team2-color').classList.add('color-box');
}
