/*eslint-env browser*/
//set max sides of die
var maxDieSides =6;

var $ = function (id) {
    "use strict";
    return document.getElementById(id);
};
var getRandomNumber = function (max){
    "use strict";
    var random;
    if(!isNaN(maxDieSides)) {
        random = Math.random();
        //value is interger between 0 and MAX-1
        random = Math.floor(random * maxDieSides);
        //Value is integer between 1 and MAX
        random = random + 1;
    }
    return random;
    
};

var changePlayer = function () {
     "use strict";
    //switch current player to next player
     if ($("current").innerHTML === $("player1").value) {
         $("current").innerHTML = $("player2").value;
     } else {
        $("current").innerHTML = $("player1").value;
     }
    //Reset die text 
     $("die").value = "0";
     $("total").value = "0";
    $("roll").focus();
};


var newGame = function () {
    "use strict";
    //set both socre text boxes to 0
    $("score1").value = "0";
    $("score2").value = "0";
    //make sure player text boxes are not empty
    // If they are, hide section and alert user
    //If they're not , show section and change player
    if($("player1").value === "" || $("player2").value === "") {
        $("turn").removeAttribute("class");
    } else {
         $("turn").setAttribute("class", "open");
        changePlayer();
    }
 
};

var rollDice = function () {
     "use strict";

     var total, die;
     total = parseInt($("total").value, 10);
     //get the current die roll
     die = getRandomNumber();
     if (die === 1){
         total = 0;
         changePlayer();
     } else {
         total = total + die;
     }
    $("die").value = die;
    $("total").value = total;
};

var holdTurn = function () {
     "use strict";
     var score, total;
     total = parseInt($("total").value, 10);
     if ($("current").innerHTML === $("player1").value) {
         //get player 1's banked total
         score = $("score1");
     } else {
         //get player 2's banked total
         score = $("score2");
     }
    // add the current total to the banked total
     score.value = parseInt(score.value, 10) + total;
     //If the score is 100 or more, player wins
     //Otherwise play continues to next player
     if (score.value >= 100){
         window.alert($("current").innerHTML + "wins!");
         newGame();
     } else {
         changePlayer();
     }
};

window.addEventListener("load", function() {
     "use strict";
    
    $("new_game").addEventListener("click", newGame);
    $("roll").addEventListener("click", rollDice);
    $("hold").addEventListener("click", holdTurn);
    
});