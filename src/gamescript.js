import * as util from './utils';

export default function(){

    //Game variables
    var alienX = 80;
    var alienY = 20;

    var guessX = 0;
    var guessY = 0;

    var shotsRemaining = 8;
    var shotsMade = 0;

    var gameState = "";
    var gameWon = false;


    //Game objects
    var cannon = document.getElementById('cannon');
    var alien = document.getElementById('alien');
    var missile = document.getElementById('missile');
    

    //Input Output fields
    var inputX = document.getElementById('inputX');
    var inputY = document.getElementById('inputY');
    var output = document.getElementById('output');


    //The button;
    var button = document.getElementById('button');

    button.style.cursor = "pointer";
    button.addEventListener("click", clickHandler, false);

    function render(){
        
        //Position the alien
        alien.style.left = `${alienX}px`;
        alien.style.top = `${alienY}px`;
    
        //Position the cannon
        cannon.style.left = `${guessX}px`;

        //position the missile
        missile.style.left = `${guessX}px`;
        missile.style.top = `${guessY}px`;
    
    }

    function clickHandler(){
        validateInput();
    }

    function validateInput(){
        guessX = parseInt(inputX.value);
        guessY = parseInt(inputY.value);

        if (isNaN(guessX) || isNaN(guessY)) {
            output.innerHTML = `Please enter a number!`;
        } else if ( guessX > 300 || guessY > 300 || guessX < 0 || guessY < 0 ) {
            output.innerHTML = `Please enter a value between 0 and 300`;
        } else {
            playGame();
        }
    }





    function checkMissile(){
        if (!missile.classList.contains('miss')){
            missile.classList.add('explode');
            alien.classList.add('dead');
        }
    }

    function playGame(){
        shotsRemaining--;
        shotsMade++;
        gameState = `Shots: ${shotsMade}, Remaining: ${shotsRemaining}`;

        //find out if the players xand y guesses are in aliens area
        if (guessX >= alienX && guessX <= alienX + 20){
            //Yes its within X range so check Y
            if (guessY >= alienY && guessY <= alienY + 20){
                //its in both x and y so it's a hit
                gameWon = true;
                endGame();
            } else {
                renderMiss();
            }
        } else {
            renderMiss();

            if (shotsRemaining < 1){
                endGame();
            }
        }

        //update Alien position if game not won
        if(!gameWon){
            updateAlienPosition();
        }

        render();
    }

    util.addPrefixTrans(missile, checkMissile);

    function updateAlienPosition(){
        //update Alien C position
        alienX = Math.floor(Math.random() * 280);

        //add 30 to the new y position so that the alien moves closer to earth
        alienY += 30;
    }


    function renderMiss (){
        output.innerHTML = `Miss! ${gameState}`;
    }


    function endGame(){
        if (gameWon){
            
            missile.classList.remove('miss');
            missile.classList.add('explode');

            output.innerHTML = `Hit! You saved the Earth! <br/>
            It only took you ${shotsMade} shots!`;
           
        } else {
            output.innerHTML = `
                You lost! <br/>
                The Earth has been invaded!
            
            `;
        }
    }


}