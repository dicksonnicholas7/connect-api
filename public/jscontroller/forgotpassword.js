$(document).ready(function(){
    $("#forgot-password_note").show();
if($("#invalid_error").text() === "error"){
    $("#forgot-password_note").hide();
    setTimeout(function () {
        $("#forgot-password_note").toggle();
    }, 5000);
}
});