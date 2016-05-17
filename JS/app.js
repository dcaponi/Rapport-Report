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
        event.preventDefault();
        $('html, body').animate({
            scrollTop: ($('#appSection').offset().top)
        }, 1000);
    });
});