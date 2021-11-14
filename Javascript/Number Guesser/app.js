//Game values
let min=1,
max=10,
winningNum = getRandomNum(min ,max),
guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn =document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

      //Assign UI min and max
      minNum.textContent =min;
      maxNum.textContent = max;

      //Play again event listener
      game.addEventListener('mousedown',function(e){
          if(e.target.className === 'play-again'){
              window.location.reload();
          }

      })

//Listen for guess input
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    //console.log(guess);

    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`please enter a number between ${min} and ${max}` , 'red');//inside setmessage use backtick
    }

    //check if won
    if(guess === winningNum){
        //Game over -won
        gameOver(true ,`${winningNum} is correct , YOU WIN!`);
        }
    else{
        //wrong number
        guessesLeft -=1;
        if (guessesLeft == 0){
            //Game Over
           gameOver(false , `Game over ,you lost. The correct number was ${winningNum}.`);

        }else{
            //Game continues answer wrong
            guessInput.style.borderColor = 'red'; 

            //clear input
            guessInput.value = ' ';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left` , 'red');
        }

    }

});  

//Game Over
function gameOver(won ,msg){

    let color;
    won === true ? color = 'green' : color ='red';
//Disable input
guessInput.disabled = true;
//change the border color
guessInput.style.borderColor = color;
//set text color
message.style.color = color;
//set message
setMessage(msg);

//Play again
guessBtn.value ='Play Again';
guessBtn.className +='play-again';

}

//Get winning number
function getRandomNum(min , max){
    return(Math.floor(Math.random()*(max-min+1)+min));

}
//Set Message 
function setMessage(msg , color){
    message.style.color = color ;
    message.textContent = msg;
}

