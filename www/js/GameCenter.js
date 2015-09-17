var GameCenter = (function() {

	boardName = "no.olaussen.software.uberluck.board1",
	me = {};

	me.showLeaderBoard = function() {
        var successCallback = function(done) {
        	alert(done);
        };
        var failureCallback = function(error) {
			alert(error);
        };        
		var data = {
		    leaderboardId: boardName
		};
		gamecenter.showLeaderboard(successCallback, failureCallback, data);
	},
	me.submitScore = function(scoreVal) {
		var data = {
            score: scoreVal,
            leaderboardId: boardName
        };
        var successCallback = function(done) {
        	alert(done);
        };
        var failureCallback = function(error) {
			alert(error);
        };        
        gamecenter.submitScore(successCallback, failureCallback, data);
	},
	me.authUser = function() {
		var successCallback = function (user) {
    		alert(user.alias);
    		alert(user.playerID);
    		alert(user.displayName);
		};
		var failureCallback = function(error) {
			alert(error);
        };  

		gamecenter.auth(successCallback, failureCallback);
	};
	return me;
}());