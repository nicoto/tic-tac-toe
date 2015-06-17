TicTacToe = function(){

  this.currentPlayer = 'X'

  this.state = [
    null, null, null,
    null, null, null,
    null, null, null,
  ];

};

TicTacToe.prototype.findWinner = function(){

  //horizontal
  if (this.state[0] === 'X' && this.state[1] === 'X' && this.state[2] === 'X'){ return 'X'; }
  if (this.state[3] === 'X' && this.state[4] === 'X' && this.state[5] === 'X'){ return 'X'; }
  if (this.state[6] === 'X' && this.state[7] === 'X' && this.state[8] === 'X'){ return 'X'; }

  //vertical
  if (this.state[0] === 'X' && this.state[3] === 'X' && this.state[6] === 'X'){ return 'X'; }
  if (this.state[1] === 'X' && this.state[4] === 'X' && this.state[7] === 'X'){ return 'X'; }
  if (this.state[2] === 'X' && this.state[5] === 'X' && this.state[8] === 'X'){ return 'X'; }

  //diagonal
  if (this.state[0] === 'X' && this.state[4] === 'X' && this.state[8] === 'X'){ return 'X'; }
  if (this.state[2] === 'X' && this.state[4] === 'X' && this.state[6] === 'X'){ return 'X'; }

  //horizontal
  if (this.state[0] === 'X' && this.state[1] === 'X' && this.state[2] === 'X'){ return 'O'; }
  if (this.state[3] === 'X' && this.state[4] === 'X' && this.state[5] === 'X'){ return 'O'; }
  if (this.state[6] === 'X' && this.state[7] === 'X' && this.state[8] === 'X'){ return 'O'; }

  //vertical
  if (this.state[0] === 'X' && this.state[3] === 'X' && this.state[6] === 'X'){ return 'O'; }
  if (this.state[1] === 'X' && this.state[4] === 'X' && this.state[7] === 'X'){ return 'O'; }
  if (this.state[2] === 'X' && this.state[5] === 'X' && this.state[8] === 'X'){ return 'O'; }

  //diagonal
  if (this.state[0] === 'X' && this.state[4] === 'X' && this.state[8] === 'X'){ return 'O'; }
  if (this.state[2] === 'X' && this.state[4] === 'X' && this.state[6] === 'X'){ return 'O'; }
}

TicTacToe.prototype.selectSquare = function(index){ // pass in the index for a turn
  if (this.gameOver || this.state[index] !== null){
    throw Error('illegal move');
  }

// try to put in an X for the slot
this.state[index] = this.currentPlayer;

//
var winner = this.findWinner(); // look for any combination of win patterns, return winner O or X
  if (winner){ // if O or X
    this.gameOver = true;
    this.winner = winner;
    console.log(this.status()); // what is status(); ?
  }

  // Below is the switch for a player's turn
  this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';

  // Below renders the HTML
  this.updateDOM();
};

TicTacToe.prototype.consoleLog = function(){
  console.log(this.state.slice(0,3));
  console.log(this.state.slice(3,6));
  console.log(this.state.slice(6,9));
  console.log('-----------');
};

TicTacToe.prototype.render = function(cssSelector){

this.node = $('.tic-tac-toe-game.template').clone()
this.node.removeClass('template')
this.updateDOM();
this.node.appendTo(cssSelector);

var game = this;

this.node.on('click', '.tic-tac-toe-square', function(event){
  var squares = game.node.find('.tic-tac-toe-square');
  var square = $(this);
  var index = squares.index(square);
  game.selectSquare(index);
});

};

TicTacToe.prototype.updateDOM = function(){
  if (!this.node) return; // If there is no node in the DOM from place of call

  var squares = this.node.find('.tic-tac-toe.square');

  this.node.find('.tic-tac-toe-status').text(this.status());

  this.state.forEach(function(state, index){
    squares.eq(index).text(state);
  });
};

