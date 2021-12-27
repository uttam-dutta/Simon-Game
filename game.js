var level = 0;
var started = false;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "yellow", "green"];

$(document).on("keydown", function() {
  if (!started) {
    newSequence();
    started = true;
  }

});

$(".button").on("click", function(e) {
  var userChossenColor = e.target.id;
  userClickedPattern.push(e);
  animatePress(userChossenColor);
  playSound(userChossenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function newSequence() {
  var userClickedPattern = [];
  $("h1").html("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  console.log(gamePattern);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(e) {
  $("#" + e).addClass("pressed");
  setTimeout(function() {
    $("#" + e).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel].currentTarget.id) {
      console.log("success");
      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          newSequence();
        }, 100);
      }
    } else {
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").html("Game Over, Press Any Key to Restart");
      startOver();
      console.log("wrong");
    }
}

function startOver() {
  level=0;
  started=false;
  gamePattern=[];
}
