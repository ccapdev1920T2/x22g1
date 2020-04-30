$(document).ready(function () {

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

    $("#postbutton").click(function() {
       var postTitle = $('#postTitle').val();
       var postBody = $('#postBody').val();
       var DisplayName = $('#DisplayName').text();

       if(postTitle != '' && postBody != ''){
           $('#postTitle').val('');
           $('#postBody').val('');
           $.get('/createPost', {postTitle: postTitle, postBody: postBody, DisplayName: DisplayName}, function(data, status){
                // $('#post').append(data);
           })
       }
     
    });


//     $('#postTitle').keyup(function(){
//         var email = $('#postTitle').val();

//         $.get('/check', {Email: email}, function(result){

//             // if(result.Email == email) {
//             //     $('#register-email').css('border-color', 'red');
//             //     $('#error').text('Email already registered!');      
//             // }
            
//             // else{
//             //     $('#register-email').css('border-color', '#d9dadc');
//             //     $('#error').text(''); 
//             // }
//         });
//    });

// $(".comment").click(function(){
//     $('#commentBar').append();
// });
})