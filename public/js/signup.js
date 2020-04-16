$(document).ready(function(){

   $('#register-email').keyup(function(){
        var email = $('#register-email').val();

        $.get('/checkEmail', {Email: email}, function(result){

            if(result.Email == email) {
                $('#register-email').css('border-color', 'red');
                $('#error').text('Email already registered');
                $('#submit').prop('disabled', true);             
            }
            
            else{
                $('#register-email').css('border-color', '#d9dadc');
                $('#error').text('');
                $('#loginbutton').prop('disabled',false);
            }
        });
   });

    $('$register-username').keyup(function(){
        var username = $('#register-username').val();

        $.get('/checkUsername', {Username: username}, function(result){

            if(result.Username == username){
                $('#register-username').css('border-color', 'red');
                $('#error').text('Username already registered');
                $('#submit').prop('disabled', true); 
            }
            
            else{
                $('#register-username').css('border-color', '#d9dadc');
                $('#error').text('');
                // $('#submit').prop('disabled', false);
            }
        });
    });
});