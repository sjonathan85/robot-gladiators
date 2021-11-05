// Game States
// "Win" - Player robot has all enemy-robots
//   * Fight all enemy-robots
//   * Defeat each enemy-robot
//   "LOSE" - Player robot's health is zero or less


var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//You can also log multiple values at once like this
console.log(playerName,playerAttack, playerHealth);

var enemyNames = ["Roborto","Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {

    while(enemyHealth > 0 && playerHealth > 0) {
    // Alert players that they are starting the round
    //window.alert("Welcome to Robot Gladiators!");
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    if (promptFight === "skip"  || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        
        //if yes (true) , leave fight
        if(confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            // subtract money from from playerMoney for skipping
            playerMoney = Math.max(0, playerMoney - 10);
            console.log("playerMoney", playerMoney);
            break;
         }
        }


    // generate random damage value based on player's attack power
    var damage = randomNumber(playerAttack - 3, playerAttack);

    enemyHealth = Math.max(0, enemyHealth - damage);

    // Log a resulting message to the console so know it worked.
    console.log (
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    )

    /* ENEMY HEALTH"S CALCULATIONS */////////////////    

    // check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
        //award player money for winning
        playerMoney = playerMoney + 20;
        break;
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    /////////////// PLAYERS HEALTH CALCULATIONS
    
    // Subtract the value of enemyAttack from the value playerHealth and us that result to update the vaule of the playerHealth variable
    var damage = randomNumber(enemyAttack - 3, enemyAttack);

    playerHealth = Math.max(0, playerHealth - damage);

    // Log a resulting message to the console so we know that it worked.
    console.log (
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    //check player's health
    if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        break;
    }
    else {
        window.alert(playerName + " still has " + playerHealth  + " health left.");
    }
  } //end of while loop
}; // end of fight function


// Random number function
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}


//function to start a new game
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if(playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            var pickedEnemyName = enemyNames[i];

            enemyHealth = randomNumber(40, 60);

            fight(pickedEnemyName);

            // if we're not at the last enemy in the array
            if(i <playerHealth > 0 && enemyNames.length -1) {
                //ask if player wants to use the store for the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store
                if(storeConfirm) {
                    shop();
                }
                
            }
        }
        else {
            window.alert("You have lost your robot in battle!  Game Over!");
            break;
        }
    }
    //go to endgame
    endGame();
};


// Function for the endgame
var endGame = function() {
    // if player is still alive, player wins!
    if(playerHealth > 0) {
        window.alert("Great job, you've survived the game!  You now have a score of " + playerMoney + "." );
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    var playerAgainConfirm = window.confirm("Would you like to play again?");
     if(playerAgainConfirm) {
         //restart the game
         startGame();
     }
     else {
         window.alert("Thank you for playing Robot Gladiators!  Come back soon!");
     }
};

var shop = function() {
    // ask the playeer what they'd like to do
    var shopOptionPrompt = window.prompt ("Would you like to REFILL your health, UPGRADE your attack or LEAVE the store?  Please endter one: 'REFILL', 'UPGRAGE', or 'LEAVE' to make a choce.");


    // use switch to carry out action
    switch(shopOptionPrompt) {
        case "REFILL":
        case "refill":
          if(playerMoney >=7) { 
            window.alert("Refilling players health by 20 for 7 dollars.");

            //increase health and decrease money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
        }
        else {
            window.alert("You don't have enough money!");
        } 
            break;

        case "UPGRADE":
        case "upgrade":
          if(playerMoney >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");

            //increase attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
        }
        else {
            window.alert("You don't have enough money!");
        }      
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            
            //do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option.  Try again.");

            //call shop function again to force player to pick a valid option
            shop();
            break;
    }
};

startGame();