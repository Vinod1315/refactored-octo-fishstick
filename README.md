# refactored-octo-fishstick
Creating a quiz game to help me learn about the process of building a simple application and create something fun
This is a web-based football quiz game where players are challenged to guess the correct match based on clues provided over 5 turns. Players have to guess the teams that participated in the match while progressively revealing more details about the match with each incorrect guess. This project is built with mobile-first design principles but is also adaptable for desktop use.

Features

Daily Match: One classic football match is featured per day.
Progressive Clues: Each incorrect guess reveals additional clues, such as tournament name, venue, scorers, and more.
Multiple Team Name Variants: Supports different spellings and abbreviations for team names.
Mobile-First Design: Optimized for mobile devices with a responsive layout for desktop play.
Simple Admin Interface: Up to 7 matches can be input manually or via CSV upload, and each match is scheduled to go live automatically.
How to Play

Players are presented with an input box where they can type the names of the teams they believe played in the match.
With each incorrect guess, a new clue is revealed (e.g., the venue, year, tournament, etc.).
Players have 5 guesses to correctly identify the match.
Technology Stack

Frontend: HTML, CSS (with mobile-first design), JavaScript
Storage: JSON Local Storage for game state and match data
Hosting: GitHub Pages
Project Setup

Clone the Repository:
bash
Copy code
git clone https://github.com/yourusername/football-quiz-game.git
Open the index.html file in your browser to view the game locally.
Admin Instructions

Admin can input match data manually through a simple form or via a CSV upload.
The CSV file must follow this structure:
sql
Copy code
team1_name,team2_name,score,tournament,venue,scorers_team1,scorers_team2,year,...
Once uploaded, the game will automatically cycle through the inputted matches, showing one per day.
Future Improvements

User Accounts: Add user profiles and progress tracking.
Leaderboard: Include a leaderboard for users who successfully guess the match in fewer turns.
Desktop Optimization: Refine desktop UI for an even better experience on larger screens.
Internationalization: Support for multiple languages.
License

This project is licensed under the MIT License - see the LICENSE file for details.

Contribution

If you’d like to contribute to this project, feel free to open a pull request or report issues in the Issues tab. Future collaborators are welcome!

