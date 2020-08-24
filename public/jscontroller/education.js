$(document).ready(function(){


    let size_obj_edu = $("#rest-text").text();

    console.log('education js')

    function moveProgress(num1) {
        let num = 30;
        num = num + num1;

        if ( num > 45){
            num = 45;
        }

        let num_html = 440 - (440 * num) / 100;
        document.getElementById("html").style.setProperty("stroke-dashoffset",num_html);
        document.getElementById("circle").style.stroke = "#62B55D";
        document.getElementById("percentage").textContent = num;       
    }





    $("#btnEditEducation").click(function(event){


        event.preventDefault();


        var formData = new FormData($('form#fmEdu')[0]);

            $.ajax({
                url:'/user/update-education',
				type:'post',
				contentType: false,
                processData: false,
                cache:false,
                data:formData,
                success:function(data){

                    console.log(data)

                    $("#edu_hide_form").hide();
                    $('#accordionExample').collapse()

                    $("#edu_success_msg").show();

                    setTimeout(function () {
                       
                        $("#edu_success_msg").hide();

                    }, 4000);

                    $("#EducationId").val(data.id)
                    $("#view_degree").html(`<i class="fa fa-graduation-cap mr-3 mb-3"style="color:#A41201;" ></i>&nbsp; ${data.edu_degree} in ${data.edu_programme} `);
                    $("#view_uni").html(`<i class="fa fa-university mr-3 mb-3"style="color:#A41201;" ></i>&nbsp; ${data.edu_university}`);
                    $("#view_coun").html(`<i class="fa fa-map-marker mr-3 mb-3"style="color:#A41201;" ></i>&nbsp; ${data.edu_country}`);
                    $("#btndelEdu").html(`<a href="/user/delete-education/${data.id}"><i class="fa fa-trash mr-3 ml-3 mt-3 show-delete" id="faEduDelete"></i></a>`);

                    moveProgress(15);
                    document.getElementById("education").classList.add("profile_done");
                    document.querySelector(".education").classList.add("profile_done");
                    document.getElementById("collapseViewEdu").classList.add("profile_done");

                    $("#show-education").show();

                }
            }); 

    });




    
    $("#btnSubmitEducation").click(function(event){


        event.preventDefault();

        var edu_de = $("#degree option:selected").val();
        var edu_p = $("#program").val();
        var edu_col = $("#university").val();
        var edu_coun = $("#edu_country option:selected").val();
        

        var formData = new FormData($('form#fmEdu')[0]);

            $.ajax({
                url:'/user/add-education',
				type:'post',
				contentType: false,
                processData: false,
                cache:false,
                data:formData,
                success:function(data){

                    console.log(data)

                    $("#edu_hide_form").hide();

                    $("#edu_success_msg").show();

                    setTimeout(function () {
                       
                        $("#edu_success_msg").hide();

                    }, 4000);

                    $("#view_degree").html(`<i class="fa fa-graduation-cap mr-3 mb-3"style="color:#A41201;" ></i>&nbsp; ${data.edu_degree} in ${data.edu_programme} `);
                    $("#view_uni").html(`<i class="fa fa-university mr-3 mb-3"style="color:#A41201;" ></i>&nbsp; ${data.edu_university}`);
                    $("#view_coun").html(`<i class="fa fa-map-marker mr-3 mb-3"style="color:#A41201;" ></i>&nbsp; ${data.edu_country}`);

                    moveProgress(15);
                    document.getElementById("education").classList.add("profile_done");
                    document.querySelector(".education").classList.add("profile_done");
                    document.getElementById("collapseViewEdu").classList.add("show");
                    $("#show-education").show();

                }
            }); 

    });
    

        //show rest of education
        $("#show-rest-education").click(function(e){
        
            if($("#rest-education")[0].hasAttribute("hidden")){
                $("#rest-education").removeAttr("hidden")
                $("#rest-text").text("hide")
                $("#rest-other-text").text(size_obj_edu)
            }else{
                $("#rest-education").attr("hidden", "hidden")
                $("#rest-text").text(size_obj_edu)
                $("#rest-other-text").text("more")
            }
    
        });




        $("#faEduEdit").click(function(event){
            // $("#editEdufm").show();
            event.preventDefault();
            eduId = parseInt($("#EducationId").val().trim(), 10);
            
            $.ajax({
                    url:'/user/get-single-edu/'+ eduId,
                    type:'get',
                    success:function(data){
                        console.log(data.id)
                        $("#edu_id").val(data.id);
                        $("#program").val(data.edu_programme);
                        $("#university").val(data.edu_university);
                        $("#edu_country option:selected").val(data.edu_country);
                        $("#project").val(data.edu_project);
    
                        $("#edu_hide_form").show();
                        $("#ViewEducation").attr("hidden", "hidden");
                        $("#btnSubmitEducation").attr("hidden", "hidden");
                        $("#btnEditEducation").removeAttr("hidden");
                        $('#accordionExample').collapse()
                        // $("#editEdufm").show();
                        // $("#ViewEducation").hide();
                        
                    }
                });
        });
    
});
