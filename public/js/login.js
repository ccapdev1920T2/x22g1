$(document).ready(function () {
    var uchecker = 0;
    var pchecker = 1;

    $('#login-username').focus(function(){
        var username = $('#login-username').val();

        $.get('/checkUsername', {Username : username}, function(result){
            
            if(result.Username == username){
                $('#login-username').css('border-color', '#d9dadc');
                $('#error').text('');
                $('#loginbutton').prop('disabled',false);
                uchecker=1;
            }

            else{
                $('#login-username').css('border-color', 'red');
                $('#error').text('User does not exist!');
                $('#loginbutton').prop('disabled',true);
            }
        })
    })

    $('#login-password').focus(function(){
        var pass = $('#login-password').val();

        $.get('/checkPassword', {Password : pass}, function(result){
            
            if(result.Password == pass){
                $('#login-password').css('border-color', '#d9dadc');
                $('#error').text('');
                $('#loginbutton').prop('disabled',false);
                pchecker=1;
            }

            else{
                $('#login-password').css('border-color', 'red');
                $('#error').text('Incorrect Password!');
                $('#loginbutton').prop('disabled',true);
            }
        })
    })

    if( (uchecker == 1) && (pchecker == 1) ){
        $('#login-password').css('border-color', '#d9dadc');
        $('#error').text('');
        $('#loginbutton').prop('disabled',false);
    }

})