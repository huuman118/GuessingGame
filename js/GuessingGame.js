function generateWinningNumber() {
  return Math.floor(Math.random()*100)+1;
}

function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

// game = new Game();
// console.log(game.winningNumber);

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
}
Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber;
}
Game.prototype.playersGuessSubmission = function(num) {
  this.playersGuess = num;
  if(num < 1 || num > 100 || (typeof num) !== 'number') {
    return 'That is an invalid guess.';
  }
  return this.checkGuess(num);
}
///Old code that passes test
// Game.prototype.checkGuess = function(num) {
//   if(this.winningNumber === num) {
//     return 'You Win!';
//   } else if(!this.pastGuesses.indexOf(num)) {
//     return 'You have already guessed that number.'
//   } else {
//     this.pastGuesses.push(num);
//   }
//   if(this.pastGuesses.length >= 5) {
//     return 'You Lose.';
//   } else if(this.difference() < 10) {
//     return 'You\'re burning up!';
//   } else if(this.difference() < 25) {
//     return 'You\'re lukewarm.';
//   } else if(this.difference() < 50) {
//     return 'You\'re a bit chilly.';
//   }
//   return 'You\'re ice cold!';
// }
Game.prototype.checkGuess = function() {
    if(this.playersGuess===this.winningNumber) {
        $('#hintbutton #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Win!'
    }
    else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guesses li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if(this.pastGuesses.length === 5) {
                $('#hintbutton, #submit').prop("disabled",true);
                $('#subtitle').text("Press the Reset button to play again!")
                return 'You Lose.';
            }
            else {
                var diff = this.difference();
                if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }
                if(diff < 10) return'You\'re burning up!';
                else if(diff < 25) return'You\'re lukewarm.';
                else if(diff < 50) return'You\'re a bit chilly.';
                else return'You\'re ice cold!';
            }
        }
    }
}



function newGame() {
  return new Game;
}

Game.prototype.provideHint = function() {
  var hintArr = [this.winningNumber];
  hintArr.push(generateWinningNumber());
  hintArr.push(generateWinningNumber());
  return shuffle(hintArr);
}

function makeGuess(game) {
  var guess = $('#player-input').val();
  $('#player-input').val('');
  var output = game.playersGuessSubmission(parseInt(guess,10));
  console.log(output);
  $('#title').text(output);
}


$(document).ready(function() {
  console.log('done and loaded!');
  var currGame = newGame();

  $('#submit').click(function() {
     makeGuess(currGame);
  })

  $('#player-input').keypress(function(event) {
      if (event.which == 13 ) {
         makeGuess(currGame);
      }
  })

  $('#hintbutton').click(function() {
    var hints = currGame.provideHint();
    $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
  });

  $('#resetbutton').click(function() {
      currGame = newGame();
      $('#title').text('Play the Guessing Game!');
      $('#subtitle').text('Guess a number between 1-100!')
      $('.guess-item').text('-');
      $('#hintbutton, #submit').prop("disabled",false);
  })

});





