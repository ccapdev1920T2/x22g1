$(document).ready(function () {

    $('#username').blur(function(){
        var username = $('#username').val();

        $.get('/checkUsername', {Username : username}, function(result){
            
            if(result.Username == username){
                $('#username').css('background-color', '#fff');
                $('#error').text('');
                $('#login').prop('disable',false);
            }

            else{
                $('#username').css('background-color', 'red');
                $('#error').text('User does not exist!');
                $('#login').prop('disable',true);
            }
        })
    })

    $('#password').blur(function(){
        var pass = $('#password').val();

        $.get('/checkPassword', {Password : pass}, function(result){
            
            if(result.Password == pass){
                $('#username').css('background-color', '#fff');
                $('#error').text('');
                $('#login').prop('disable',false);
            }

            else{
                $('#username').css('background-color', 'red');
                $('#error').text('Incorrect Password!');
                $('#login').prop('disable',true);
            }
        })
    })

})