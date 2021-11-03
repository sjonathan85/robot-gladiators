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
    // Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    //if player chooses to fight, then fight
    if (promptFight === "FIGHT" || promptFight === "fight")  {
    // Subtract the value of a playerAttack from the enemy health and use that result to update the value in the enemyHealth Variable
    enemyHealth = enemyHealth - playerAttack;

    // Log a resulting message to the console so know it worked.
    console.log (
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    )

    // Subtract the value of enemyAttack from the value playerHealth and us that result to update the vaule of the playerHealth variable
    playerHealth = playerHealth - enemyAttack;

    // Log a resulting message to the console so we know that it worked.
    console.log (
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    //check player's health
    if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
    }
    else {
        window.alert(playerName + " still has " + playerHealth  + " health left.");
    }

    // check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }


  } else if (promptFight === "skip"  || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
    //if yes (true) , leave fight
    if(confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        // subtract money from from playerMoney for skipping
        playerMoney = playerMoney - 2;
    }
    // if no(false), ask question again by running fight() again
    else {
        fight();
    }


  } else {
      window.alert("You need to choose a valid option. Try agin!");
  }
};

for(var i = 0; i < enemyNames.length; i++) {
    fight(enemyNames[i]);
}