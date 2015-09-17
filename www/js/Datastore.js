var Datastore = (function(){
	var myPlayer = {
		uuid:null,
		name: ""
	},
	currentGame = 0,
	BASE_URL = "http://217.170.201.88/",
	//BASE_URL = "http://localhost:9000/",
	settings =  {
    
		NEW_GUESS_URL : BASE_URL+'guess',
		FETCH_PLAYER_URL : BASE_URL+'player',
		FETCH_RANK_URL : BASE_URL+'rank',
		UPDATE_PLAYER_URL : BASE_URL+'player',
		NEW_GAME_URL : BASE_URL+'game',
	    FETCH_TOPSCORES_URL : BASE_URL+'topscores'
	},
	doRequest = function(url, type, data, doneCallback) {
	    var xhr = $.ajax({
	      type: type,
	      url: url,
	      data: JSON.stringify(data),
	      contentType: 'application/json; charset=UTF-8',
	      dataType: 'json'
	    })
	    .done(function( response ) {
	      if(doneCallback) {
	        doneCallback(response);
	      }	   
	    })
	    .fail(function(jqXHR, textStatus, errorThrown) {	     
	      console.log('An error occured:'+textStatus+". Desc:"+errorThrown);
	    })
	    .always(function( jqXHR, textStatus, errorThrown ) {
	      
	    });  
	},
	doGetRequest = function(url, type, data, doneCallback) {
	    var xhr = $.ajax({
	      type: type,
	      url: url,
	      data: data,
	      dataType: 'json'
	    })
	    .done(function( response ) {
	      if(doneCallback) {
	        doneCallback(response);
	      }	      
	    })
	    .fail(function(jqXHR, textStatus, errorThrown) {
	      console.log('An error occured:'+textStatus+". Desc:"+errorThrown);
	    })
	    .always(function( jqXHR, textStatus, errorThrown ) {
	      
	    });  
	},

	me = {};
	me.getMyPlayer = function() {
		if(!myPlayer.uuid){
			var uuid = guid();
			myPlayer = {"uuid": uuid, "name":""};
		}
		return myPlayer;
	},
	me.getCurrentGame = function() {
		return currentGame;
	},	
	me.setCurrentGame = function(id) {
		currentGame = id;
	},	
	me.savePlayer = function(player, doneCallback) {
		localStorage.setItem("myPlayer", JSON.stringify(player)); // local store
		myPlayer = player;
		doRequest(settings.UPDATE_PLAYER_URL, "POST", {"uuid":myPlayer.uuid, "name":myPlayer.name}, doneCallback);
	},
	me.saveGuess = function(guess, doneCallback) {
		console.log(guess);
    	doRequest(settings.NEW_GUESS_URL, "POST", guess, doneCallback);
	},
	me.newGame = function(uuid, doneCallback) {
		doRequest(settings.NEW_GAME_URL, "POST", {"uuid":uuid}, doneCallback);
	},
	me.fetchPlayer = function(uuid, doneCallback) {
		doGetRequest(settings.FETCH_PLAYER_URL, "GET", {"uuid":uuid}, doneCallback);
	},
	me.fetchTopscores = function(doneCallback) {
		doGetRequest(settings.FETCH_TOPSCORES_URL, "GET", null, doneCallback);
	},
	me.fetchRank = function(score, doneCallback) {
		doGetRequest(settings.FETCH_RANK_URL, "GET", {"score":score}, doneCallback);
	},	
  	me.init = function() {
		if(localStorage.getItem("myPlayer")) {
        	myPlayer = JSON.parse(localStorage.getItem("myPlayer"));
     	}
	};

	return me;
}());