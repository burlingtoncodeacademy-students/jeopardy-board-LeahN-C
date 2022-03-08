/*------ Round 1 & 2 Page Elements ------*/
let playerTurnTitle = document.getElementById("playerTurn");
let categoryBoxes = document.querySelectorAll(".categories");
let gameBoxes = document.querySelectorAll(".boxes");
let guessForm = document.getElementById("guessForm");
//Still trying to figure out how to make this work v v
let userInput = document.querySelector(".userInput").value;
let guessButton = document.getElementById("guessButton");
let passButton = document.getElementById("passButton");
let playerOneScore = document.getElementById("playerOneScore");
let playerTwoScore = document.getElementById("playerTwoScore");
let nextRoundButton = document.getElementById("nextRound");
/*-------- Final Round Page Elements --------*/
let finalCategory = document.getElementById("finalCategory");
let finalQ = document.getElementById("finalQ");
let finalBet = document.getElementById("finalBet");
let finalAnswer = document.getElementById("finalAnswer");
let betButton = document.getElementById("betButton");

//Player 1 object
let playerOne = {
  name: "playerOne",
  score: 0,
};
//Player 2 object
let playerTwo = {
  name: "playerTwo",
  score: 0,
};

/*------------ Page 1 & 2 Game ------------*/
//START THE GAME
//Notification that it is player 1's turn
playerTurnTitle.textContent = "Player 1's Turn";
//"Guess", "Pass", and "Next Round" buttons disabled
guessButton.disabled = true;
passButton.disabled = true;
nextRoundButton.disabled = true;

//SELECT A QUESTION
//When player 1 selects a card, replace number on card with question
//Function to get placeholder Qs
async function getQuestions() {
  //Assigning placeholderQs to that json file
  let placeholderQs = "placeholder-questions.json";
  //Fetching the placeholder questions
  let response = await fetch(placeholderQs);
  //Awaiting response from page
  let responseJSON = await response.json();

  //for loop to iterate through each game card
  for (let i = 0; i < gameBoxes.length; i++) {
    //Clean up user input
    let cleanInput = userInput.toString().trim().toLowerCase();
    //"click" event for each card
    gameBoxes[i].addEventListener(
      "click",
      (event) => {
        //Prevent page from refreshing
        event.preventDefault();
        //Turning number on card into an integer
        let worth = parseInt(gameBoxes[i].textContent);
        //And "Guess" + "Pass" buttons become enabled
        guessButton.disabled = false;
        passButton.disabled = false;
        //Replacing number with placeholder question when clicked
        gameBoxes[i].textContent =
          responseJSON.placeholderQuestions[i].question;
        //NOT USING THIS RIGHT NOW, JUST WANT TO SAVE IT
        event.target.value;
        //Setting variable "answer" to placeholder answers
        let correctAnswer = responseJSON.placeholderQuestions[i].answer;
        //For me to see correct answer - REMOVE WHEN DONE
        console.log(correctAnswer);
        //ANSWER A Q CORRECTLY
        //"submit" event for submitting answer
        guessForm.addEventListener("submit", (event) => {
          //Prevent page from refreshing
          event.preventDefault();
          //When Q is chosen and player submits answer
          //If it's player 1's turn and answer is correct
          if (
            playerTurnTitle.textContent === "Player 1's Turn" &&
            cleanInput === correctAnswer
          ) {
            //Player receives amount of points on card
            playerOne.score = playerOne.score + worth;
            //Q card becomes blank (empty string)
            gameBoxes[i].textContent = " ";
            //And is no longer worth anything
            worth = null;
            //Player 1's new score is displayed
            //THIS WORKS WHEN I DON'T HAVE THE SECOND CONDITIONAL ABOVE
            playerOneScore.textContent = "Player 1 Score: " + playerOne.score;
          }
          //If it's player 2's turn and answer is correct
          else if (
            playerTurnTitle.textContent === "Player 2's Turn" &&
            cleanInput === correctAnswer
          ) {
            //Player 2's score increases amount on card
            playerTwo.score = playerTwo.score + worth;
            //Q card becomes blank (empty string)
            gameBoxes[i].textContent = " ";
            //And no longer has worth
            worth = null;
            //Player 2's new score prints
            //THIS WORKS WHEN I DON'T HAVE THE SECOND CONDITIONAL ABOVE
            playerTwoScore.textContent = "Player 2 Score: " + playerTwo.score;
          } 
          //ANSWER A Q INCORRECTLY
          //If it's player 1's turn and answer is incorrect
          else if (playerTurnTitle.textContent === "Player 1's Turn" &&
          cleanInput !== correctAnswer) {
              //Player 1's score subtracts amount on card
              playerOne.score = playerOne.score - worth;
              //Other player can answer that Q
              playerTurnTitle.textContent === "Player 2's Turn"
          }
          //If it's player 2's turn and answer is incorrect
          else if (playerTurnTitle.textContent === "Player 2's Turn" &&
          cleanInput !== correctAnswer) {
              //Player 2's score subtracts amount on card
              playerTwo.score = playerTwo.score - worth;
              //Other player can answer that Q
              playerTurnTitle.textContent === "Player 1's Turn"
          }
          //If no one is correct...
          else {
              //Original player chooses new Q
          }
        });
      },
      //Only allow card to be clicked on once - once blank, no longer clickable
      { once: true }
    );
  } 
  //PASS A QUESTION
  //"click" event for when question is chosen and player clicks "Pass"
  passButton.addEventListener("click", (event) => {
    //Prevent page from refreshing
    event.preventDefault();
    //If it's player 1's turn and player 1 passes
    if (playerTurnTitle.textContent === "Player 1's Turn") {
        //Banner changes to Player 2's turn
      playerTurnTitle.textContent = "Player 2's Turn";
    }
    //If it's player 2's turn and player 2 passes
    else if (playerTurnTitle.textContent === "Player 2's Turn") {
      //Turns to player 1's turn
      playerTurnTitle.textContent = "Player 1's Turn";
    }
  });
}
//Call the async function
getQuestions();


/*----NOTES TO SELF----*/
//Need to figure out how to have different questions on second round
//Need to figure out how to save scores from round 1 and carry over to round 2


/*------------- STILL NEED TO DO ALL OF THIS v v ----------*/

//SCORE BOARD
//When the score changes
//The game displays each player's current score
//ONLY ALLOW ONE Q
//If a card is selected
//When player clicks a new card...
//Q does not change
//and alerts player to answer or pass
//END ROUND 1
//If a score reaches 2500
//Or if board is cleared
//Alert players to go to Round 2...
//and "Next Round" button is enabled
//"Next Round" button navigates to next page

/*------ Round 2 Page ------*/
//ROUND 2
//On Round 2 page...
//Player scores are same as Round 1 page
//Game logic is same as round 1
//END ROUND 2
//If score reaches 5000
//Or if board is cleared
//Alert players to move to Final Round
//"Next Round" button enabled
//"Next Round" button goes to Final Round page

/*------ Final Round Page ------*/
//FINAL ROUND
//Players are presented with a category
//Players prompted to make a bet...
//(up to their max score amount)
//MAKE A WAGER
//When all players have placed their bets
//Question is revealed
//All players have chance to answer
//WINNING THE GAME
//If answers are submitted...
//The amount betted is added or subtracted...
//Based on if player guessed correctly or not
//Notify player who won based on final score!
