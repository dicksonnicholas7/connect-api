$(document).ready(function () {
    $("#password").keyup(function () {
        let str = $(this).val();
        if (str.match(/[a-z]/g) && str.match( /[A-Z]/g) && str.match( /[0-9]/g) && str.match( /[^a-zA-Z\d]/g) && str.length >= 8){
            res = "TRUE";
       $(this).css("border-color","green");
        }         
    else 
    {
        $(this).css("border-color","red");
        $(this).focus();
    }
       
    });
});


$(document).ready(function () {
    $("#conpassword").keyup(function () {
        let confirm = $(this).val();
        if (confirm ===$("#password").val()){
            res = "TRUE";
       $(this).css("border-color","green");
        }         
    else 
    {
        $(this).css("border-color","red");
        $(this).focus();
        res = "FALSE";
    }
    });
});

$(document).ready(function(){
    $("#email").keyup(function (){
        let regex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        let email = $(this).val().toLowerCase();
        if(regex.test(email)){
            res = "TRUE";
            $(this).css("border-color","green");
        }else{
            res = "FALSE";
            $(this).css("border-color","red");
        }
        console.log(res);
    });
});
