$(document).ready(function () {

    $("#editSave").click(function(){
        var pic = $('#upload').val();
        var fName = $('#editFname').val();
        var lName = $('#editLname').val();
        var bio = $('#editbio').text();

        $.get('/editprofile/:DisplayName', {
            pic = pic,
            fName = fName,
            lName = lName,
            Bio = bio
        })
    })

})