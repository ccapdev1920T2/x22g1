// const button = document.getElementById('upvote');

// button.addEventListener('click', function(e){
//     console.log('button was clicked');

//     fetch('/clicked', {method: 'POST'})
//     .then(function(response) {
//       if(response.ok) {
//         console.log('Click was recorded');
//         return;
//       }
//       throw new Error('Request failed.');
//     })
//     .catch(function(error) {
//       console.log(error);
//     });

// });

// setInterval(function() {
//     fetch('/clicks', {method: 'GET'})
//       .then(function(response) {
//         if(response.ok) return response.json();
//         throw new Error('Request failed.');
//       })
//       .then(function(data) {
//         document.getElementById('counter').innerHTML = "Button was clicked ${data.length} times";
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   }, 1000);


// function upVote(img,downvote) {
//   src = $(img).attr('src');
//   if(src == "/img/upvoted.png"){
//     img.src='/img/upvote.png';
    
//   }
//   else if(src == "/img/upvote.png"){
//     img.src='/img/upvoted.png'
//     downvote.src='/img/downvote.png'

//     // $.ajax({
//     //   url: '/post/upvote/' + post,
//     //   method: 'GET',
//     //   data: {post_id: post},
//     //   success: function(s){
//     //     alert(s);
//     //   },
//     //   error: function(){
//     //     alert("eroor");
//     //   }
//     // })

//       // $.get('/post/upvote/' + post, {post_id : post}, function(result){

//       // })
//   }
// };

// function downVote(upvote,img) {
//   src = $(img).attr('src');
//   if(src == "/img/downvoted.png"){
//     img.src='/img/downvote.png'
//   }
//   else if(src == "/img/downvote.png"){
//     img.src='/img/downvoted.png'
//     upvote.src='/img/upvote.png'
//   }
// };

$(document).ready(function () {
  // $('img').click(function(){
  //     var type = this.id.split(',')[0];
  //     var post_id = this.id.split(',')[1];

  //     if(type.equals("upvote")){
  //       $.get('/post/upvote/'+post_id, {post_id: post_id}, function(result){
  //         $(this).attr("src", "/img/upvoted.png");
  //         $(this).next().attr("src", "/img/downvote.png")
  //       })
  //     } else if(type.equals("downvote")){

  //     } else if(type.equals("upvoted")){

  //     } else{

  //     }
  //     $(this).attr("src", "/img/upvoted.png");
  //     $(this).next().attr("src", "/img/downvote.png")
  // });

  $(".upvote").click(function() {
    var post_id = $(this).parent().next().find('p:nth-child(1)').text();

    if ($(this).attr("class") == "upvote"){
        if((this.src == "http://localhost:9090/img/upvote.png") || (this.src == "/img/upvote.png")){
            this.src = "/img/upvoted.png";
    
            if($(this).next().attr("src") == 'http://localhost:9090/img/downvoted.png'){
                $(this).next().attr("src","/img/downvote.png")
                var dv = $('#downvotecount_'+post_id).text();
                var downvote = parseInt(dv) - 1;
                $('#downvotecount_'+post_id).text(downvote);
            }
            else if($(this).next().attr("src") == '/img/downvoted.png'){
                $(this).next().attr("src","/img/downvote.png")
                var dv = $('#downvotecount_'+post_id).text();
                var downvote = parseInt(dv) - 1;
                $('#downvotecount_'+post_id).text(downvote);
            }

            $.get('/post/upvote/'+post_id, {post_id: post_id})
            var uv = $('#upvotecount_'+post_id).text();
            var upvote = parseInt(uv) + 1;
            $('#upvotecount_'+post_id).text(upvote);
            
        }
        else{
            this.src = "/img/upvote.png";
            $.get('/post/unupvote/'+post_id, {post_id: post_id})
            var uv = $('#upvotecount_'+post_id).text();
            var upvote = parseInt(uv) - 1;
            $('#upvotecount_'+post_id).text(upvote);
        }
    } 
    
});

$(".downvote").click(function() {
    var post_id = $(this).parent().next().find('p:nth-child(1)').text();

    if ($(this).attr("class") == "downvote"){
      if((this.src == "http://localhost:9090/img/downvote.png") || (this.src == "/img/downvote.png")){
            this.src = "/img/downvoted.png";
 
            if($(this).prev().attr("src") == 'http://localhost:9090/img/upvoted.png'){
                $(this).prev().attr("src","/img/upvote.png")
                var uv = $('#upvotecount_'+post_id).text();
                var upvote = parseInt(uv) - 1;
                $('#upvotecount_'+post_id).text(upvote);
            }
            else if($(this).prev().attr("src") == '/img/upvoted.png'){
                $(this).prev().attr("src","/img/upvote.png")
                var uv = $('#upvotecount_'+post_id).text();
                var upvote = parseInt(uv) - 1;
                $('#upvotecount_'+post_id).text(upvote);
            }

            $.get('/post/downvote/'+post_id, {post_id: post_id})
            var dv = $('#downvotecount_'+post_id).text();
            var downvote = parseInt(dv) + 1;
            $('#downvotecount_'+post_id).text(downvote);
           
        }
        else{
            this.src = "/img/downvote.png";
            $.get('/post/undownvote/'+post_id, {post_id: post_id})
            var dv = $('#downvotecount_'+post_id).text();
            var downvote = parseInt(dv) - 1;
            $('#downvotecount_'+post_id).text(downvote);
        }
       
    } 
});

$(".save").click(function() {
    var post_id = $(this).attr('id')
    // console.log(post_id)
    var splitted = post_id.split("/")
    // console.log(splitted[1])
    var saveStats = document.getElementById("save/"+splitted[1])
    var unsaveStats = document.getElementById("unsave/"+splitted[1])
    if ($(this).attr("class") == "save"){
        $.get('/post/save/'+splitted[1], {post_id: splitted[1]})
        // $('#save'+splitted[1]).hide()
        // $('#unsave'+splitted[1]).show()
        saveStats.style.display = "none";
        unsaveStats.style.display = "block";
    } 
});

$(".unsave").click(function() {
    var post_id = $(this).attr('id')
    // console.log(post_id)
    var splitted = post_id.split("/")
    // console.log(splitted[1])
    var saveStats = document.getElementById("save/"+splitted[1])
    var unsaveStats = document.getElementById("unsave/"+splitted[1])
    if ($(this).attr("class") == "unsave"){
        $.get('/post/unsave/'+splitted[1], {post_id: splitted[1]})
        // $('#save/'+splitted[1]).show()
        // $('#unsave/'+splitted[1]).hide()
        saveStats.style.display = "block";
        unsaveStats.style.display = "none";
    } 
});

})
