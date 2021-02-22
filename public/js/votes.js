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

setInterval(function() {
    fetch('/clicks', {method: 'GET'})
      .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(function(data) {
        document.getElementById('counter').innerHTML = "Button was clicked ${data.length} times";
      })
      .catch(function(error) {
        console.log(error);
      });
  }, 1000);

function upVote(img,downvote) {
  src = $(img).attr('src');
  if(src == "/img/upvoted.png"){
    img.src='/img/upvote.png'
  }
  else if(src == "/img/upvote.png"){
    img.src='/img/upvoted.png'
    downvote.src='/img/downvote.png'
  }
};

function downVote(upvote,img) {
  src = $(img).attr('src');
  if(src == "/img/downvoted.png"){
    img.src='/img/downvote.png'
  }
  else if(src == "/img/downvote.png"){
    img.src='/img/downvoted.png'
    upvote.src='/img/upvote.png'
  }
};