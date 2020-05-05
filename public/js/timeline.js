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

    $("#sendButton").click(function(){
        var commentBar = $('#commentBar').val();
        var DisplayName = $('#author').text();
        var PostID = $('#postid').text();
        
        if(commentBar != ''){
            $('#commentBar').val('');
            $.get('/createComment',{
                commentBar: commentBar,
                DisplayName: DisplayName,
                PostID: PostID
            }, function(data, status){
                $('#displayComment').append(data);
            })
        }else{
            $('#error').text('');
        }

    })

    $("#postbutton").click(function() {
       var postTitle = $('#postTitle').val();
       var postBody = $('#postBody').val();
       var postTags = $('#postTags').val();
       var DisplayName = $('#DisplayName').text();
       var element = document.getElementById("universities");
       var univ = element.options[element.selectedIndex].text;
    
       if(univ == 'ADMU'){
           var uniBadge = "&#x1f985";
           var timelineBadge = "timeline-badge ateneo";
           var navbar = 'navbar-admu';
    
            if(postTitle != '' && postBody != ''){
                $('#postTitle').val('');
                $('#postBody').val('');
                $('#postTags').val('');
                $.get('/createPost', {
                    postTitle: postTitle, 
                    postBody: postBody, 
                    postTags: postTags, 
                    timelineBadge: timelineBadge, 
                    navbar: navbar, DisplayName: 
                    DisplayName, uniBadge: uniBadge
                }, function(data, status){
                    $('#post').append(data);
                });
            }
        }

        else if(univ == 'DLSU'){
            var uniBadge = "&#127993";
            var timelineBadge = "timeline-badge lasalle";
            var navbar = 'navbar-dlsu';
     
             if(postTitle != '' && postBody != ''){
                $('#postTitle').val('');
                $('#postBody').val('');
                $('#postTags').val('');
                $.get('/createPost', {
                    postTitle: postTitle, 
                    postBody: postBody, 
                    postTags: postTags, 
                    timelineBadge: timelineBadge, 
                    navbar: navbar, DisplayName: 
                    DisplayName, uniBadge: uniBadge
                }, function(data, status){
                    $('#post').append(data);
                });
            }
        }

        else if(univ == 'UST'){
            var uniBadge = "&#128047";
            var timelineBadge = "timeline-badge ust";
            var navbar = 'navbar-ust';
     
             if(postTitle != '' && postBody != ''){
                $('#postTitle').val('');
                $('#postBody').val('');
                $('#postTags').val('');
                $.get('/createPost', {
                    postTitle: postTitle, 
                    postBody: postBody, 
                    postTags: postTags, 
                    timelineBadge: timelineBadge, 
                    navbar: navbar, DisplayName: 
                    DisplayName, uniBadge: uniBadge
                }, function(data, status){
                    $('#post').append(data);
                });
            }
        }

        else{
            var uniBadge = "&#9994";
            var timelineBadge = "timeline-badge up";
            var navbar = 'navbar-up';
     
             if(postTitle != '' && postBody != ''){
                $('#postTitle').val('');
                $('#postBody').val('');
                $('#postTags').val('');
                $.get('/createPost', {
                    postTitle: postTitle, 
                    postBody: postBody, 
                    postTags: postTags, 
                    timelineBadge: timelineBadge, 
                    navbar: navbar, DisplayName: 
                    DisplayName, uniBadge: uniBadge
                }, function(data, status){
                    $('#post').append(data);
                });
            }
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