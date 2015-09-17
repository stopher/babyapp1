var View = (function() {
	lockedGui = false;
	guessLocked = true;
    timeToDie = 200;
    gamePlaying = false;

	me = {};

	me.lockGui = function() {
		lockedGui = true;
	},
	me.openGui = function() {
		lockedGui = false;
	},
	me.isLocked = function() {
		return lockedGui;
	},
	me.lockGuess = function() {
		guessLocked = true;
	},
	me.openGuess = function() {
		guessLocked = false;
	},
	me.isGuessLocked = function() {
		return guessLocked;
	},
	me.isGamePlaying = function() {
		return gamePlaying;
	},
	me.setGamePlaying = function(value) {
		gamePlaying = value;
	},	
	me.setTimeToDie = function(value) {
		timeToDie = value;
	},
	me.getTimeToDie = function() {
		return timeToDie;
	};	
	return me;
}());