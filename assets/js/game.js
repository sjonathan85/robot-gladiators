// Game States
// "Win" - Player robot has all enemy-robots
//   * Fight all enemy-robots
//   * Defeat each enemy-robot
//   "LOSE" - Player robot's health is zero or less

// validate fight or skip 

var fightOrSkip = function() {
    // askplayer if they'd like to fight or skip using the fighOrSkip function
    var promptFight = window.prompt("Would like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // Enter conditional recursive function here!

    if(promptFight === "" || promptFight === null) {
        window.alert("You need to provied a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLocaleLowerCase();
    // If player chooses skip confirm and then stop the loop
    if (promptFight === "skip") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if(confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playermoney for skipping
            playerInfo.money = playerInfo.money - 10;
            //shop();

            //return true if player wants to leave
            return true;
        }

    }

return false;
}

var fight = function(enemy) {

    var isPlayerTurn = true;
    
    if(Math.random() > 0.5 ) {
        isPlayerTurn = false;
    }

    while(enemy.health > 0 && playerInfo.health > 0) {
    // Alert players that they are starting the round
    if(isPlayerTurn) { 
        if(fightOrSkip()) {
            // if true, leave the fight by breaking the loop
            break;
        }
   


    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);

    // Log a resulting message to the console so know it worked.
    console.log (
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
    )

    /* ENEMY HEALTH"S CALCULATIONS */////////////////    

    // check enemy's health
    if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        //award player money for winning
        playerInfo.money = playerInfo.money + 20;
        break;
    }
    else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }
  }
    else {  
    /////////////// PLAYERS HEALTH CALCULATIONS
    
    // Subtract the value of enemy.attack from the value playerInfo.health and us that result to update the vaule of the playerInfo.health variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);

    // Log a resulting message to the console so we know that it worked.
    console.log (
        enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );

    //check player's health
    if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
    }
    else {
        window.alert(playerInfo.name + " still has " + playerInfo.health  + " health left.");
    }
   }
   // switch turn order for next round
   isPlayerTurn = !isPlayerTurn;
  } //end of while loop
}; // end of fight function




// Random number function
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

// get player name function
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name");
    }

    console.log("Your robot's name is " + name);
    return name;
}

// player info Object
var playerInfo = {
    name:getPlayerName(),
    health: 100,
    attack: 10,
    money:10,
    reset: function(){
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function(){
        if(this.money >= 7 ) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -+ 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if(this.money >= 7 ) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

// enemyInfo array
console.log(playerInfo.name,playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];




//function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if(playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if(i <playerInfo.health > 0 && enemyInfo.length -1) {
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
    if(playerInfo.health > 0) {
        window.alert("Great job, you've survived the game!  You now have a score of " + playerInfo.money + "." );
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
    var shopOptionPrompt = window.prompt (
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
        );

    shopOptionPrompt = parseInt(shopOptionPrompt);
    // use switch to carry out action
    switch(shopOptionPrompt) {
        case 1:
          playerInfo.refillHealth();
          break;

        case 2:
          playerInfo.upgradeAttack();
            break;

        case 3:
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