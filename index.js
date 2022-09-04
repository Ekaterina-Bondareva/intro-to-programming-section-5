const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses'); //fixed bug - name of id
const correctMessage = document.getElementById('correct');
const rangeCheck = document.getElementById('range-check');//added range check

let targetNumber;
let attempts = 0; //fixed bug const
const maxNumberOfAttempts = 5; 

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  hideAllMessages();

  //Range check for guess numbers <1 & >99
  if (guess < 1) {
    resetButton.style.display = 'none';
    rangeCheck.style.display = '';
    rangeCheck.innerHTML = "Must be greater than 0";
    return;
  } 
  if (guess > 99)  {
    resetButton.style.display = 'none';
    rangeCheck.style.display = '';
    rangeCheck.innerHTML = "Must be less than 100";
    return;
  } 

  attempts = attempts + 1;
  resetButton.style.display = '';

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';//fixed bug tooLowMessage -> tooHighMessage
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    //Add check If there is only one guess left, it should say "guess" (singular) instead of "guesses" (plural)
    if (remainingAttempts === 1) {
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
    } else {
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    }
  }

  if (attempts === maxNumberOfAttempts) {// fixed bug ==== -> ===
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {//fixed bug <= -> <
    messages[elementIndex].style.display = 'none';
  }
}

function setup() { //fixed bug fuNction
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; //fixed bug maxNumberOfAttempts -> attempts

  // Enable the input and submit button
  submitButton.disabled = false;//fixed bug disabEld
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
