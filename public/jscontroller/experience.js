$(document).ready(function(){

    let size_obj_exp = $("#exp-rest-text").text();

    console.log('experiencejs')

    function moveProgress(num1) {
        let num = 45;
        num = num + num1;

        if ( num > 60){
            num = 60;
        }

        let num_html = 440 - (440 * num) / 100;
        document.getElementById("html").style.setProperty("stroke-dashoffset",num_html);
        document.getElementById("circle").style.stroke = "#62B55D";
        document.getElementById("percentage").textContent = num;       
    }

    $("#btnSubmitExperience").click(function(event){
        event.preventDefault();

        var formData = new FormData($('form#fmExp')[0]);
            $.ajax({
                url:'/user/add-experience',
				type:'post',
				contentType: false,
                processData: false,
                data:formData,
                success:function(data){

                    console.log(data);

                    $("#exp_form_hide").hide()

                    $("#exp_success_msg").show();

                    setTimeout(function () {
                       
                        $("#exp_success_msg").hide();

                    }, 4000);


                    $("#exp_comp").html(`<i class="fa fa-building mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.exp_company}`)
                    $("#exp_postion").html(`<i class="fa fa-user mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.exp_position}`)
                    $("#exp_location").html(`<i class="fa fa-map-marker mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.exp_city}, ${data.exp_country}`)
                    $("#exp_date").html(`<i class="fa fa-calendar mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.exp_from}, ${data.exp_to} `)
                    
            
                    moveProgress(15);
                    document.querySelector(".experience").classList.add("profile_done");
                    document.getElementById("exp_icon").classList.add("profile_done");
                    document.getElementById("collapseViewExp").classList.add("show");

                    $("#show-experience").show();

                }
            }); 
    });
    




        $("#show-rest-experience").click(function(e){
        
            if($("#rest-experience")[0].hasAttribute("hidden")){
                $("#rest-experience").removeAttr("hidden")
                $("#exp-rest-text").text("hide")
                $("#exp-rest-other-text").text(size_obj_exp)
            }else{
                $("#rest-experience").attr("hidden", "hidden")
                $("#exp-rest-text").text(size_obj_cert)
                $("#exp-rest-other-text").text("more")
            }
    
        })





$("#btnEditExperience").click(function(event){


    event.preventDefault();
    

    var formData = new FormData($('form#fmExp')[0]);

        $.ajax({
            url:'/user/update-experience',
            type:'post',
            contentType: false,
            processData: false,
            cache:false,
            data:formData,
            success:function(data){

                console.log(data)

                $("#exp_form_hide").hide();
                $('#accordionExample').collapse()

                $("#exp_success_msg").show();

                setTimeout(function () {
                   
                    $("#exp_success_msg").hide();

                }, 4000);

                $("#ExperienceId").val(data.id)
                $("#exp_comp").html(`<i class="fa fa-building mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.exp_company}`)
                $("#exp_postion").html(`<i class="fa fa-user mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.exp_position}`)
                $("#exp_location").html(`<i class="fa fa-map-marker mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.exp_city}, ${data.exp_country}`)
                $("#exp_date").html(`<i class="fa fa-calendar mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.exp_from}, ${data.exp_to} `)
                $("#btndelExp").html(`<a href="/user/delete-experience/${data.id}"><i class="fa fa-trash mr-3 ml-3 mt-3 show-delete" id="faExpDelete"></i></a>`);
                $("#btnUpExp").html(`<a href="/user/get-single-exp/${data.id}"><i class="fa fa-edit mr-3 mt-3 show-delete edu-icon" id="faExpEdit"></i></a>`);


                $("##show-experience").show();

            }
        }); 

});



$("#faExpEdit").click(function(event){
    // $("#editEdufm").show();
    event.preventDefault();
    expId = parseInt($("#ExperienceId").val().trim(), 10);
    
    $.ajax({
            url:'/user/get-single-exp/'+ expId,
            type:'get',
            success:function(data){
                console.log(data.id)
                $("#exp_id").val(data.id);
                $("#company").val(data.exp_company);
                $("#position").val(data.exp_position);
                $("#exp_country option:selected").val(data.exp_country);
                $("#exp_city").val(data.exp_city);
                $("#exp_end_date").val(data.exp_to);
                $("#exp_start_date").val(data.exp_from);
                $("#responsibilities").val(data.exp_responsibilities);
                

                $("#exp_form_hide").show();
                $("#ViewExperience").attr("hidden", "hidden");
                $("#btnSubmitExperience").attr("hidden", "hidden");
                $("#btnEditExperience").removeAttr("hidden");
                $('#accordionExample').collapse()
                // $("#editEdufm").show();
                // $("#ViewEducation").hide();
                
            }
        });
    


});
    
});
