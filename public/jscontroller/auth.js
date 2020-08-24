$(document).ready(function(){
    $("#password").keyup(function(event){
        event.preventDefault();
        $("#login_error_msg").hide(); 
    });

    $("#email").keyup(function(event){
        event.preventDefault();
        $("#login_error_msg").hide();
    });

    //login
    $("#btnlogin").click(function(event){
        event.preventDefault();
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        $("#btnlogin").val("Loading...");
        $("#btnlogin").attr("disabled", true);
        if( email !== "" && password !== "" ){
            $.ajax({
                url:'/login',
                type:'post',
                data:{email:email,password:password},
                success:function(response){
                    if(response.loginRes==="success"){
                        window.location = response.RedirectUrl;
                        let pageURL = window.location.pathname;
                        if(pageURL!=="/login"){
                            location.reload();
                        }else{
                            window.location = "/user/"
                        }
                    }else {  
                        $("#login_error_msg").html(`Invalid Email or Password`)       
                        $("#login_error_msg").show();
                    }
                }
            });
        } else {
            $("#login_error_msg").html(`Fill all fields`)
            $("#login_error_msg").show();
        }
        $("#btnlogin").val("Log In");
        $("#btnlogin").attr("disabled", false);
    });

   


});
