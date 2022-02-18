$(document).ready(function () {  

    $("#log-out").on('click',function(e){
        alert('log-out');
        window.localStorage.clear();
        window.location.href="/"; 
    })
});