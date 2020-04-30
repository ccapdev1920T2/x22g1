$(document).ready(function () {

    // $('#postbutton').prop('disabled',true);

    $(".upvote").click(function() {
        if ($(this).attr("class") == "upvote"){

            if(this.src == "http://localhost:9090/img/upvote.png"){
                this.src = "/img/upvoted.png";

                if($(this).next().attr("src") == 'http://localhost:9090/img/downvoted.png'){
                    $(this).next().attr("src","/img/downvote.png")
                }
                else if($(this).next().attr("src") == '/img/downvoted.png'){
                    $(this).next().attr("src","/img/downvote.png")
                }
            }
            else{
                this.src = "/img/upvote.png";
            }

        } 
    });

    $(".downvote").click(function() {
        if ($(this).attr("class") == "downvote"){
            if(this.src == "http://localhost:9090/img/downvote.png"){
                this.src = "/img/downvoted.png";

                if($(this).prev().attr("src") == 'http://localhost:9090/img/upvoted.png'){
                    $(this).prev().attr("src","/img/upvote.png")
                }
                else if($(this).prev().attr("src") == '/img/upvoted.png'){
                    $(this).prev().attr("src","/img/upvote.png")
                }
            }
            else{
                this.src = "/img/downvote.png";
            }
        } 
    });

    $('#postTitle').keyup(function(){
        var email = $('#postTitle').val();
       
       
   });

   
   $('#postTitle').keyup(function(){
           
});


   

    // $(".comment").click(function(){
    //     $('#commentBar').append();
    // })

})