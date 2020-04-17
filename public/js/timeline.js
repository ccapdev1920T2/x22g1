$(document).ready(function () {

    // $('#error').load('/getTimeline');
    
    //$('#error').text('User does not exist!');
    $('#sideprofile').load('/getSideProfile');


    $(".upvotee").click(function() {
        if ($(this).attr("class") == "upvotee"){
            // if ($(this).closest('img').attr("src") === '/img/downvoted.png') {
            //     $(this).next().attr('src', '/img/downvote.png');
            //     this.src = this.src.replace("/img/upvote.png","/img/upvoted.png");
            // }
            this.src = this.src.replace("/img/upvote.png","/img/upvoted.png");
        } 
        else{
            this.src = this.src.replace("/img/upvoted.png","/img/upvote.png");
        }

        $(this).toggleClass("on");
    });

    $(".downvotee").click(function() {
        if ($(this).attr("class") == "downvotee"){
            this.src = this.src.replace("/img/downvote.png","/img/downvoted.png");
        } 
        else{
            this.src = this.src.replace("/img/downvoted.png","/img/downvote.png");
        }
        $(this).toggleClass("on");
    });

})