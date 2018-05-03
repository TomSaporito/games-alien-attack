(function(){

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
        playGame();
    }

    function playGame(){
        shotsRemaining--;
        shotsMade++;
        gameState = `Shots: ${shotsMade}, Remaining: ${shotsRemaining}`;

        guessX = parseInt(inputX.value);
        guessY = parseInt(inputY.value);

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
        }
    }

    function renderMiss (){
        output.innerHTML = `Miss! ${gameState}`;
    }


})();