$('#music').prop("volume", 0.2);


var cards = [
	["asset/images/back.jpg", "asset/images/mario.png"],
	["asset/images/back.jpg", "asset/images/mario.png"],
	["asset/images/back.jpg", "asset/images/sonic.png"],
	["asset/images/back.jpg", "asset/images/sonic.png"],
	["asset/images/back.jpg", "asset/images/ghost.png"],
	["asset/images/back.jpg", "asset/images/ghost.png"],
	["asset/images/back.jpg", "asset/images/heart.png"],
	["asset/images/back.jpg", "asset/images/heart.png"],
	["asset/images/back.jpg", "asset/images/donkeyKong.png"],
	["asset/images/back.jpg", "asset/images/donkeyKong.png"],
	["asset/images/back.jpg", "asset/images/flappy.png"],
	["asset/images/back.jpg", "asset/images/flappy.png"],
	["asset/images/back.jpg", "asset/images/charizard.png"],
	["asset/images/back.jpg", "asset/images/charizard.png"],
	["asset/images/back.jpg", "asset/images/pokeball.png"],
	["asset/images/back.jpg", "asset/images/pokeball.png"]
];
var numberOfTilesToShuffle, randomIndex, temp, lives = 5, win = cards.length / 2, rightGuesses = 0;

console.log(cards.length);

function startGame() {

	numberOfTilesToShuffle = cards.length - 1;

	while(numberOfTilesToShuffle > 0) {
		randomIndex = Math.floor(Math.random() * (numberOfTilesToShuffle + 1));
		temp = cards[randomIndex];
		cards[randomIndex] = cards[numberOfTilesToShuffle];
		cards[numberOfTilesToShuffle] = temp;
		numberOfTilesToShuffle -= 1;
	}

	var board = $('.container')

	board.empty();
	board.append('<h1 class="title">Select Two</h1>');

	for (var i = 0; i < cards.length; i++) {
		board.append('<div class="tiles"><img class="closed" src="' + cards[i][1] + '" ></div>')
	}

	$('.closed').css('opacity', '1');

	setTimeout(function(){

		$('.closed').css('opacity', '0');

	}, 1800);

	board.append('<h1 class="score">Lives : ' + lives + '</h1>');

	var first;
	var lastClicked = "";

	$('img').click(function test() {
			$(this).addClass('open');
			var path = $(this).attr('src');
			if (lastClicked === path) {
				path = "";
				lastClicked = "";
				$(".title").text("That's a Match!");
				$(this).addClass('stayOpen');
				first.addClass('stayOpen');
				rightGuesses += 1;

			} else {
				if (lastClicked !== "") {
					$(".title").text("Nope!");
					/* alert("No Match") */;
					lastClicked ="";
					path = "";

					setTimeout(function() {
						$("img").removeClass('open');
					}, 500);

					
					lives -= 1;
					$('.score').html("Lives : " + lives);
				} else {
					lastClicked = path;
					path = "";
				}
				first = $(this);
			}

		console.log(rightGuesses);
		console.log(win);

		if (lives === 0) {
			$(".title").text("Game Over!");
			$('.closed').css('opacity', '1');

			setTimeout(function() {
			return	gameOver()
			}, 2000);


		} else {
		if ( rightGuesses === win) {
			$(".title").text("You Win!");
			$('.closed').css('opacity', '1');

			setTimeout(function() {
			return	gameWon()
			}, 2000);
		}

		}
	})
}


function openingScreen() {
	$('#gameBoard').append('<h1 class="openingTitle">Welcome To Match Two!</h1>');
	$('#gameBoard').append('<a href="#" id="newGameButton" class="playButton">Play Game</a>');

}

function gameWon() {
	lives = 5;
	rightGuesses = 0;
	$('#gameBoard').empty();
	$('#gameBoard').append('<h1 class="openingTitle">You Win!</h1>');
	$('#gameBoard').append('<a href="#" id="newGameButton" class="playButton">Play Again</a>');
	$('#newGameButton').click(function start() {
		startGame();
	})
}

function gameOver() {
	lives = 5;
	rightGuesses = 0;
	$('#gameBoard').empty();
	$('#gameBoard').append('<h1 class="openingTitle">Game Over!</h1>');
	$('#gameBoard').append('<a href="#" id="newGameButton" class="playButton">Play Again</a>');
	$('#newGameButton').click(function start() {
		startGame();
	})
}

////////////////////////////////Start////////////////////////////////

openingScreen();

$('#newGameButton').click(function start() {
	startGame();
})