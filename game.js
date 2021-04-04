var buttonColurs = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(nextSequence)

function nextSequence(){
  level++;
  $("h1").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColurs[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
}

$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed")}, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if ((userClickedPattern.length == gamePattern.length) && userClickedPattern.every(function(element, index) {
      return element === gamePattern[index];})){
      console.log("passed");
      setTimeout(nextSequence(), 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("failed");
    gameOver();

  }
}

function gameOver(){
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over")}, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

function playSound(name) {
  switch (name) {
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    default:
  }
}
