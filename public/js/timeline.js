$(document).ready(function () {

    // $('#error').load('/getTimeline');
    
    //$('#error').text('User does not exist!');
    $('#sideprofile').load('/getSideProfile');


    $(".upvote").click(function() {
        if ($(this).attr("class") == "upvote"){
            this.src = this.src.replace("/img/upvote.png","/img/upvoted.png");
            if($(this).next().attr("src") == 'http://localhost:9090/img/downvoted.png'){
                $(this).next().attr("src","/img/downvote.png")
            }
            // var yes = this.src;
            // $("#yes").text(yes);
            // if(this.src == "http://localhost:9090/img/upvoted.png"){
            //     this.src = "/img/upvote.png"
            // }
        } 
        else{
            this.src = this.src.replace("/img/upvoted.png","/img/upvote.png");
        }

        $(this).toggleClass("on");
    });

    $(".downvote").click(function() {
        if ($(this).attr("class") == "downvote"){
            this.src = this.src.replace("/img/downvote.png","/img/downvoted.png");
            if($(this).prev().attr("src") == 'http://localhost:9090/img/upvoted.png'){
                $(this).prev().attr("src","/img/upvote.png")
            }
        } 
        else{
            this.src = this.src.replace("/img/downvoted.png","/img/downvote.png");
        }
        $(this).toggleClass("on");
        
    });

})