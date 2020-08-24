$(document).ready(function(){


    console.log('sign up')

    $("#password").keyup(function(event){
        event.preventDefault();
        $("#signup_error").hide();
    });

    $("#email").keyup(function(event){
        event.preventDefault();
        $("#signup_error").hide(); 
    });

    $("#conpassword").keyup(function(event){
        event.preventDefault();
        $("#signup_error").hide(); 
    });


    $("#btnSignup").click(function(event){
        event.preventDefault();
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        let conpassword = $("#conpassword").val().trim();
        let role = $("input[type='radio'][name='role']:checked").val();


        if(email === '' || password === '' || conpassword === '' ){
            $("#signup_error").html(`Fill all fields`);
            $("#signup_error").show();
        }else{
            $.ajax({
                url:'/signup',
                type:'post',
                data:{email:email,password:password, conpassword:conpassword, role:role},
                success:function(response){
                    if(response.status==="error"){
                        $("#signup_error").html(`Invalid Email or Password`);
                        $("#signup_error").show();
                    }else if(response.status==="success"){  
                        window.location = '/send-verification'
                    }else if(response.status==="exist"){
                        $("#signup_error").html(`<h5><strong> User already exists </h5></strong>`)
                        $("#signup_error").show();
                    }else if(response.status==="weak"){
                        $("#signup_error").html(`Your Password is Weak`)
                        $("#signup_error").show();
                    }
                }
            });

        }
    });
    
});