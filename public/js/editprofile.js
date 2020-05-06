$(document).ready(function () {

    $("#editSave").click(function(){
        var pic = $('#upload').val();
        var fName = $('#editFname').val();
        var lName = $('#editLname').val();
        var bio = $('#editbio').text();

        if(fName != '' && lName != '' && bio !='' & pic != ''){
            $('#editFname').val('');
            $('#upload').val();
            $('#editLname').val();
            $('#editbio').text();
            $.get('/editprofile/:DisplayName', {
                pic: pic,
                fName: fName,
                lName: lName,
                Bio: bio
            })
        }else {
            $('#error').text(''); 
        }

    })

})