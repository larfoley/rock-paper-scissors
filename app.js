var app = document.getElementById('app');
var player_choice;
var computer_choice;

var templates = (function() {

  var home = document.getElementById('home');
  var play = document.getElementById('play');
  var result = document.getElementById('result');

  return {
    home: Handlebars.compile(home.innerHTML),
    result: Handlebars.compile(result.innerHTML),
    play: Handlebars.compile(play.innerHTML),
    render: function(name, data) {
      app.innerHTML = this[name](data);
      return app;
    }
  }

}())

function init() {

  // Render App
  templates.render("home");

  app.querySelector(".play").onclick = play;
  // play();

}


function play() {

  templates.render("play");

  app.querySelector(".gestures").onclick = function(e) {

    if (e.target.id === "") {
      player_choice = e.target.children[0].id;
    } else {
      player_choice = e.target.id;
    }

    computer_choice = ["rock", "paper", "scissors"][Math.floor((Math.random() * 3) )];

    getResult(function(result) {
      console.log(result);
      templates.render("result", {result: result});
      app.querySelector(".play").onclick = play;

    })

  }
}

function showResult() {

}

function getResult(func) {

  var result = {};

  if (!player_choice && !computer_choice) {
    console.error("Unable to process result");
    return;
  }

  result.player_choice = player_choice;
  result.computer_choice = computer_choice;
  result.explanation = player_choice + " beats " + computer_choice + ".";

  if (player_choice === "rock" & computer_choice === "scissors" ||
    player_choice === "paper" & computer_choice === "rock" ||
    player_choice === "scissors" & computer_choice === "paper") {

    result.winner = "player";
    result.player_class = "win";
    result.computer_class = "lose";
    result.msg = "You Win, the computer chose " + computer_choice;
    // result.player_class

    } else if (player_choice === "rock" & computer_choice === "paper" ||
               player_choice === "paper" & computer_choice === "scissors" ||
               player_choice === "scissors" & computer_choice === "rock") {

     result.winner = "computer";
     result.msg = "You Lose, the computer chose " + computer_choice;

    } else {

      result.winner = "player";
      result.msg = "Draw";
      result.explanation = "";

    }

  func(result);

}


init();
