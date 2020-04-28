 $(document).ready(function(){
    document.getElementById("RecentPost").style.display = "block";
    tablinks = document.getElementsByClassName("tablinks");
    tablinks[0].className += " active";

    $("#Recent_Post").click(function(evt) {
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById("RecentPost").style.display = "block";
        evt.currentTarget.className += " active";
    });

    $("#Saved_Post").click(function(evt) {
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById("SavedPost").style.display = "block";
        evt.currentTarget.className += " active";
    });
});