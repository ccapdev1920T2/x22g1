const button = document.getElementById('upvote');

button.addEventListener('click', function(e){
    console.log('button was clicked');

    fetch('/clicked', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });

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
