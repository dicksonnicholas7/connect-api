$(document).ready(function(){

    console.log("passreset")
    
    var display = $("#resetInvalidDisplay").text();

    if(display !== ''){
    
    }

    $("#password").keyup(function(event){
      event.preventDefault();
      $("#reset_error").hide();
  });

  $("#conpassword").keyup(function(event){
      event.preventDefault();
      $("#reset_error").hide();  
  });
    
$("#btnreset").click(function(event){
    event.preventDefault();
    let email = $("#email").val().trim();
    let password = $("#password").val().trim();
    let conpassword = $("#conpassword").val().trim();
  
    if(email === '' || password === '' || conpassword === '' ){
      $("#reset_error").html(`Fill all fields`);
        $("#reset_error").show();
    }else{
  
      if(conpassword !== password){
        $("#reset_error").html(`Passwords do not match`);
        $("#reset_error").show();
      }else{
  
        $.ajax({
          url:'/reset-password',
          type:'post',
          data:{email:email, password:password, conpassword:conpassword},
          success:function(response){
              if(response.status==="success"){
                  $("#success_response").show();
                  $("#hide1").hide();
                  $("#hide2").hide();
                  $("#hide4").hide(); 
                  $("#hide3").html(`<p>You have successfully changed your password. Click <a href="/login"> here </a> to log in</p>`)
          }
        }
      });
  
  
      }
        
    }
  });

});