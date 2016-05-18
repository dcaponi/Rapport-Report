$(document).ready(function(){

//Make the logo and header disappear when user scrolls down
    $(window).scroll(function() {
        if($(window).width() > 585){
            if ($(document).scrollTop() > 50) {
                $("header").fadeOut("slow");
            } else {
                $("header").fadeIn("slow");
            }
        }
    });
    
//Button Scroll Effects
    $('#works').on("click", function(event){
        event.preventDefault();
        $('html, body').animate({
			scrollTop: ($('#aboutSection').offset().top)
		},1000);
    });

    $('#goTo').on("click", function(event){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: ($('#searchSection').offset().top)
        }, 1000);
    });
    
    $('#searchButton').on("click", function(event){
        $('html, body').animate({
            scrollTop: ($('#appSection').offset().top)
        }, 1000);
    });
    
    $('#abt').on("click", function(event){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: ($('#aboutUs').offset().top)
        },1000);
    });
    
    //Retrieve Twitter Handles    
    $('#searchForm').submit(function(event){
        event.preventDefault();
        twitterName = $('#searchInput').val();
        if (twitterName.charAt(0) === "@"){
            twitterName = twitterName.replace("@", "");
        }
        $('#userName').text("@"+twitterName);
        console.log(twitterName);
        getKloutId(twitterName);
    });
    
    //Klout API Key 9bbdu5g9r6hvcmtx4s9e39d6
    //Pass Twitter Handle and API Key to Klout
    
    function getKloutId(twitterName){
        var params = {
            screenName: twitterName,
            key: "9bbdu5g9r6hvcmtx4s9e39d6",
        };

        $.ajax({
            data: params,
            url: "http://api.klout.com/v2/identity.json/twitter",
            dataType: "jsonp",
            type: "GET",
            success: function(ids){
               $.ajax({
                    data: {key: "9bbdu5g9r6hvcmtx4s9e39d6"},
                    url: "http://api.klout.com/v2/user.json/"+ids.id+"/score",
                    dataType: "jsonp",
                    type: "GET",
                    success: function(scores){
                        console.log(scores);
                        writeScores(scores);
                        $.ajax({
                            data: {key: "9bbdu5g9r6hvcmtx4s9e39d6"},
                            url: "http://api.klout.com/v2/user.json/"+ids.id+"/topics",
                            dataType: "jsonp",
                            type: "GET",
                            success: function(topics){
                                writeTopics(topics);
                                $.ajax({
                                    data: {key: "9bbdu5g9r6hvcmtx4s9e39d6"},
                                    url: "http://api.klout.com/v2/user.json/"+ids.id+"/influence",
                                    dataType: "jsonp",
                                    type: "GET",
                                    success: function(influences){
                                        writeInfluences(influences);
                                    }
                                });
                            }
                        });
                    }
                });
            },
        });
    }
    
    function writeScores(scores){
        var kloutScore = Math.round(scores.score * 100) / 100;
        $('#bigScore').text(kloutScore);
        $('#score').text(kloutScore);
        if (kloutScore >= 65){
            $('#bigScore').addClass("upDelta");
            $('#score').addClass("upDelta");
        }
        else if (kloutScore > 40 && kloutScore < 65){
            $('#bigScore').addClass("medDelta");
            $('#score').addClass("medDelta");
        }
        else{
            $('#bigScore').addClass("downDelta");
            $('#score').addClass("downDelta");
        }
        
        $('#dailyDelta').text(Math.round(scores.scoreDelta.dayChange * 100) / 100);
        $('#weeklyDelta').text(Math.round(scores.scoreDelta.weekChange * 100) / 100);
        $('#monthlyDelta').text(Math.round(scores.scoreDelta.monthChange * 100) / 100);
        if (Math.round(scores.scoreDelta.dayChange * 1000) / 100 >= 0){
            $('#dailyDelta').addClass("upDelta");
        }
        else {
            $('#dailyDelta').addClass("downDelta");
        }
        if (Math.round(scores.scoreDelta.weekChange * 1000) / 100 >= 0){
            $('#weeklyDelta').addClass("upDelta");
        }
        else {
            $('#weeklyDelta').addClass("downDelta");
        }
        if (Math.round(scores.scoreDelta.monthChange * 1000) / 100 >= 0){
            $('#monthlyDelta').addClass("upDelta");
        }
        else {
            $('#monthlyDelta').addClass("downDelta");
        }
    }
    function writeTopics(topics){
        for (var i = 0; i < topics.length; i++){
            $('#topic'+(i+1)).text(topics[i].displayName);
        }
        $('#bigTopic').text(topics[0].displayName);
    }
    function writeInfluences(influences){
        for (var i = 0; i < influences.myInfluencees.length; i++){
            $('#lead'+(i+1)).text(influences.myInfluencees[i].entity.payload.nick);
        }
        for (var i = 0; i < influences.myInfluencers.length; i++){
            $('#follow'+(i+1)).text(influences.myInfluencers[i].entity.payload.nick);
        }
        $('#bigFollow').text(influences.myInfluencers[0].entity.payload.nick);
    }

});
