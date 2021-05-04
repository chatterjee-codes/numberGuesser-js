/*
GAME FUNCTION:

- player must guess a number between a min and max 
- PLayer gets a certain amount of guesses (3)
- Notify player of gusses remaining
- Notify the player of the correct answer if lose
- let player choose to play again

*/

// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// ui elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again')
    {
        window.location.reload();
    }
});

// listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value); //since we need a number 
    //validate input
    if(isNaN(guess) || guess < min || guess > max) 
    {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //cehck if won
    if(guess === winningNum)
    {
        // Game Over : Won
        gameOver(true,`${winningNum} is correct, YOU WIN !!`);

    }
    else
    {
        //wrong number 
        guessesLeft -= 1 //guessesLeft = guessesLeft - 1

        if(guessesLeft === 0)
        {
            //game over : lost
            gameOver(false, `Game Over, you LOST! The correct number was ${winningNum}`);

        }
        else
        {
            //continue game, answer wrong

            // change border color 
            guessInput.style.borderColor = 'red';

            //clear input
            guessInput.value = '';

            // tell user it is the wrong number and number of guesses left
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
   
});

//game over
function gameOver(won, msg)
{
    let color;
    won === true ? color = 'green' : color = 'red';

    //disable input
     guessInput.disabled = true;

    // change border color 
    guessInput.style.borderColor = color;

    //set text color
    message.style.color = color;4
    

    // change border width
    guessInput.style.borderWidth = '2px';

    //set Message
    setMessage(msg);

    //play gain?
    guessBtn.value = 'Play Again'
    guessBtn.className += 'play-again'; //apend the class name
}

// get winning number
function getRandomNum(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//set message
function setMessage(msg, color)
{
    message.style.color = color;
    message.textContent = msg;
}
      