function readURL(input) {

    console.log('file upload')
    
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profile')
                .attr('src', e.target.result)
                .width(50)
                .height(50);

                $('#profile_picture_img')
                .attr('src', e.target.result)
                .width(96)
                .height(100); 

                // alert($('#profile_picture_img').src())

        };
        //clement in the building
        reader.readAsDataURL(input.files[0]);

        //submit form
        $("#img-form").submit()
    }
}
function businessLogoUpload(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#business-logo')
                .attr('src', e.target.result)
                .width(96)
                .height(100);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function portfolioProfile1(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#portfolio-profile1')
                .attr('src', e.target.result)
                .width(96)
                .height(100);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function portfolioProfile2(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#portfolio-profile2')
                .attr('src', e.target.result)
                .width(96)
                .height(100);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function secondPortfolio(){
    
    let accordionBtn = document.getElementById("accordionButton");
    let second = document.getElementById("portfolio2");

    if (second.style.display === "none") {
        second.style.display = "block";
        accordionBtn.style.display = "none";
      
      } else {
        second.style.display = "none";
        accordionBtn.style.display = "block";

      }
}
function secondExperience(){
    
    let accordionBtn = document.getElementById("accordionButton");
    let second = document.getElementById("experience2");

    if (second.style.display === "none") {
        second.style.display = "block";
        accordionBtn.style.display = "none";
      
      } else {
        second.style.display = "none";
        accordionBtn.style.display = "block";

      }
}


function handleChange(specific) {
    let checkBox = document.getElementById("specificFreelancers");
    if(specific.checked == true){
       checkBox.style.display ="block";
    }else{
        checkBox.style.display ="none";
   }
}

function AgeValidate(){
    let dob =document.getElementById("dob").value;

    let dobArr = dob.split('-');

    let today = new Date();
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth();
    let todayDay = today.getDay();

    let year = parseInt (dobArr[0]);
    let month = parseInt(dobArr[1]);
    let day = parseInt(dobArr[2]);

    if (todayYear - year < 18){
        document.getElementById("message").textContent = "Age must be greater than 18";
        document.getElementById("dob").style.borderColor = "red";
        document.getElementById("dob").focus();
        document.getElementById("dob").required = true;
    }
}


$(document).ready(function () {
    $("#phone").keyup(function () {
        if ($(this).val().length == 3) {
        $(this).val($(this).val() + "-");
    }
    else if ($(this).val().length == 7) {
    $(this).val($(this).val() + "-");
    }

    $(this).val($(this).val().replace(/[^\d.-]/g, ''));
       
    });
});


$(document).ready(function () {
    var maxLength = 250;
$('#details').keyup(function() {
var length = $(this).val().length;
var length = maxLength-length;
$('#chars').text(length);
});
});

//script to view password at the respective fields
$(".toggle-password").click(function() {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });

  //Hiding the eye icon until the user start typing
  $(document).ready(function () {
    $('#password').keyup(function () {
        $(this).val() == "" ? $('.field-icon').css("display","none"):$('.field-icon').css("display","block");  
    });
  });

  $(".profile-caret").click(function (){
    $(this).toggleClass("fa-angle-down fa-angle-up");
  });
  

$(document).ready(function(){
$('.edit-profile-button').click(function(){

    $('#profile').hide();
    $('#profile_edit').show();
    });
});

$(document).ready(function(){
    $('.edu-icon').mousedown(function(){
    
        $('#show-education').hide();
        $('#edit-education').show();
        });
    });
  
    $(document).ready(function (){
        $('.exp-icon').mousedown(function(){
            $('.show-experience').hide();
            $('.edit-skills').show();
        });
    });
    
    $(document).ready(function(){
        $('.cert-icon').mousedown(function(){
            $('.show-certificate').hide();
            $('.hide-certificate').show();
        });
    });

function showedit(){
    document.getElementById('profile').style.display=='none';
    document.getElementById('profile_edit').style.display =='block';
}

$(document).ready(function(){
   let file_value =  $('#file').val();
    $('#name').text("Hello this is clement");
    console.log(file_value);
});
