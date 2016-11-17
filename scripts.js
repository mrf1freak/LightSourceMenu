var bulb,oneJ, twoJ, threeJ, fourJ, shadowY, shadowX, distance, angle;

$(document).ready(function () {
    bulb = $("#bulb");
    oneJ = $("#1");
    twoJ = $("#2");
    threeJ = $("#3");
    fourJ = $("#4");



    $(".lightSource").fadeOut(0);
    $(".lightSource").fadeIn(1520);


    var config = new shinejs.Config({
        opacity: 0.3,
        offset: 0.40,
        numSteps: 8
    });


    var one = document.getElementById("1");
    var two = document.getElementById("2");
    var three = document.getElementById("3");
    var four = document.getElementById("4");
    var shineOne = new Shine(one, config);
    var shineTwo = new Shine(two, config);
    var shineThree = new Shine(three, config);
    var shineFour = new Shine(four, config);

    function lightEdge(menuItem){
        shadowX = Math.floor(parseInt(bulb.css("left")) - menuItem.offset().left - menuItem.width()/2);
        shadowY = Math.floor(menuItem.offset().top + menuItem.height()/2 - parseInt(bulb.css("top")));
        angle = Math.atan2(shadowY, shadowX);
        distance = Math.floor(Math.sqrt(Math.pow(shadowX, 2) + Math.pow(shadowY, 2)));
        var css = Math.cos(angle)*2 + "px " + -Math.sin(angle)*2 + "px 2px rgba(255, 255, 255, " + 150/distance+ ")";
        menuItem.css("text-shadow", css);
    }

    function updateShadows(mouseMovement){
        if(mouseMovement){
            $(".lightSource").css({
                top: event.clientY,
                left: event.clientX
            });
        }

        shineOne.light.position.x = parseInt(bulb.css('left'));
        shineOne.light.position.y = parseInt(bulb.css('top'));
        shineOne.draw();

        shineTwo.light.position.x = parseInt($(bulb).css('left'));
        shineTwo.light.position.y = parseInt($(bulb).css('top'));
        shineTwo.draw();

        shineThree.light.position.x = parseInt($(bulb).css('left'));
        shineThree.light.position.y = parseInt($(bulb).css('top'));
        shineThree.draw();

        shineFour.light.position.x = parseInt($(bulb).css('left'));
        shineFour.light.position.y = parseInt($(bulb).css('top'));
        shineFour.draw();

        lightEdge(oneJ);
        lightEdge(twoJ);
        lightEdge(threeJ);
        lightEdge(fourJ);


    }

    updateShadows(false);
        window.addEventListener('mousemove', function(event) {
            updateShadows(true);
        }, false);

    $(document).mouseleave(function () {
        $(".lightSource").animate({
            top: 0,
            left: "50vw",
            opacity: 1
        }, {
            step: function () {
                updateShadows(false);
            },
            duration: 1000
        });
    });

    $(document).mouseenter(function () {
        $(".lightSource").animate({
            opacity: 0.8
        }, 1000);
    });
});