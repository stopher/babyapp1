/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);        
        document.addEventListener('resume', this.onDeviceResume, false);
        document.addEventListener('pause', this.onDevicePause, false);

        var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        if(is_chrome) {
            setTimeout(function() {
                createEvent('deviceready');
            },500);            
        }        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    onDeviceResume: function() {
        app.receivedEvent('resume');
    },
    onDevicePause: function() {
        app.receivedEvent('pause');
    },    
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);

        if(id === 'deviceready') {
            app.initializeApp();
        }

    },
    resetApp: function() {
        View.openGui();
    },
    nextGame: function() {
      app.resetApp();      
    },
    initializeApp: function() {
        
        $(".sprite-spinner").each(function(i){
            var s = new SpriteSpinner(this, {
                interval:50
            });
            s.start();
        });
    
        $(".sound").on("click", function() {
            if(View.isLocked()) {
                return false;
            }            
            View.lockGui();



            $(this).transition({ scale: 1.5, duration: 50}).transition({ scale: 1.0, duration: 50}, function() {
                View.openGui();
            });
        });

        $(".guessbtn").on("click", function() {

            if(View.isGuessLocked() || View.isLocked()) {
                return false;
            }
            View.lockGui();
            View.lockGuess();
            $(".guessbtn").transition({
                perspective: '200px',
                y: '180px',
                opacity: 0
            }, function() {
                $(this).addClass("active");
                $(".gameboard").transition({opacity:0, y:'-300px'});
                $(".preloader").transition({opacity:1, y:'500px'});
                app.submitGame();
            });
        });

        $(".highscore").on("click", function() {
            Datastore.fetchTopscores(function(response) {
                $(".thelist").html("");
                $.each(response,function(idx, elt) {
                    console.log(elt);
                    $(".thelist").append("<li><div class=\"name\">"+elt.name+"</div><div class=\"namepoints\">"+elt.points+"</div></li>");
                });
                $(".highscorelist").show();                
            });
            //GameCenter.showLeaderBoard();
        });

        $(".close").on("click", function() {
            $(".highscorelist").hide();
        });

        $(".startbtn").on("click", function() {
            $(".startbtn").transition({opacity:0, y:'300px'}, function() {
                $(".introscreen").hide();
                app.startGame();
                 $(".startbtn").transition({opacity:1, y:'0px'});
            });
        });
        $(".gameover .restartbtn").on("click", function() {
            $(this).transition({opacity:0, y:'300px'}, function() {
                $(".gameover").hide();
                app.startGame();
            });
        });
        $(".submitscore .restartbtn").on("click", function() {
            $(this).transition({opacity:0, y:'300px'}, function() {
                $(".submitscore").hide();
                app.startGame();
            });
        });
        $(".submitbtn").on("click", function() {
            $(this).transition({opacity:0}, function() {
                var player = Datastore.getMyPlayer();
                player.name = ""+$(".submitscore input").val();
                Datastore.savePlayer(player, function(resp) {
                    $(".submitscore").hide();
                    $(".introscreen").show();
                    $(".submitbtn").transition({opacity:1});
                });
            });
        });

        
        Datastore.init();
        Ads.init();
        app.resetApp();

        setInterval(function() {
            
            if(!View.isGamePlaying()) {
                return false;
            }

            var point = parseInt($(".points div").html());
            if (point >= 1) {        
                point = point -1;
                $(".points div").html(""+point);
            }
            var timeToDie = View.getTimeToDie();
            var timeline = $(".timeline");
            if(timeToDie%2 == 0) {            
                timeline.transition({ width: timeToDie/2+"%"});
                if(timeToDie < 60) {
                    timeline.addClass("warning");
                }
                if(timeToDie < 20) {
                    timeline.addClass("ending");
                    timeline.removeClass("warning");
                }
            }
            timeToDie = timeToDie -1;
            View.setTimeToDie(timeToDie);

            if(View.getTimeToDie() < 1) {
                app.endGame();
                timeline.removeClass("ending");
                timeline.removeClass("warning");
            }
        }, 500);

        //GameCenter.authUser();

        Datastore.fetchTopscores(function(response) {
            $(".top5").html("");
            if(response) {
                var top5 = response.slice(0, 5);
                $.each(top5,function(idx, elt) {
                    $(".top5").append("<li><div class=\"name\">"+elt.name+"</div><div class=\"namepoints\">"+elt.points+"</div></li>");
                });   
            }                
        });

        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
        
        FastClick.attach(document.body);
        /*
        if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
            document.body.addEventListener('touchstart', function() {}, false);
        }
        */
        Ads.showBannerBottom();

    }
};
