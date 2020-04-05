// alert("I am an alert box");
const buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;

var gameStarted = false;

var level = 0;

$(document).keypress(function() {
    if (!gameStarted) {
        $("#level-title").text("Level 0");
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
};

function nextSequence() {
    userClickedPattern = [];

    level += 1;
    $("#level-title").text("Level" + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour)
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    // console.log(randomChosenColour);
    audio.play();
};

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
};