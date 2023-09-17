var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;

$(document).on("keypress", function(){
    if (started=== false) {
        started = true;
        nextSequence();
    }
});

function nextSequence(){
    userClickPattern = [];
    $("h1").text("Level " + level);
    level++;
    var rand= Math.floor(Math.random()*4);
    var randomChosenColor = colors[rand];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(currentColor){
    var audio = new Audio("./sounds/" + currentColor + ".mp3");
    audio.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");

    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started= false;
}

function checkAnswer(currentLevel){
    if (userClickPattern[currentLevel] !== gamePattern[currentLevel]){
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart.");

        startOver();
    }
    else if (currentLevel === gamePattern.length-1){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}
$(".btn").on("click", function(event){
    var userChosenColor = this.id;
    userClickPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
});
