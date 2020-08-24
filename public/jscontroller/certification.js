$(document).ready(function(){

    let size_obj_cert = $("#cert-rest-text").text();

    console.log('cert js')

    function moveProgress(num1) {
        let num = 60;
        num = num + num1;

        if ( num > 70){
            num = 70;
        }

        let num_html = 440 - (440 * num) / 100;
        document.getElementById("html").style.setProperty("stroke-dashoffset",num_html);
        document.getElementById("circle").style.stroke = "#62B55D";
        document.getElementById("percentage").textContent = num;       
    }
    
    $("#btnSubmitCertification").click(function(event){

        event.preventDefault();
       
        var formData = new FormData($('form#fmCert')[0]);

            $.ajax({
                url:'/user/add-certification',
				type:'post',
				contentType: false,
                processData: false,
                data:formData,
                success:function(data){

                    $("#show_cert_hide").hide();

                    $("#cert_success_msg").show();

                    setTimeout(function () {

                        $("#cert_success_msg").hide();
                         
                    },4000);

                    $("#cert_name").html(`<i class="fa fa-certificate mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.cert_name}`)
                    $("#cert_issued").html(`<i class="fa fa-university mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.issued_by}`)
                    $("#cert_date").html(`<i class="fa fa-calendar mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.issued_date} - ${data.valid_till} `)

                    moveProgress(10);
                    document.querySelector(".certificate").classList.add("profile_done");
                    document.getElementById("cert_icon").classList.add("profile_done")
                    document.getElementById("collapseCer").classList.add("show");

                    $("#show_cert").toggle();

    
                }
            }); 
    });
    


        //show rest of education
        $("#show-rest-certification").click(function(e){
        
            if($("#rest-certification")[0].hasAttribute("hidden")){
                $("#rest-certification").removeAttr("hidden")
                $("#cert-rest-text").text("hide")
                $("#cert-rest-other-text").text(size_obj_cert)
            }else{
                $("#rest-certification").attr("hidden", "hidden")
                $("#cert-rest-text").text(size_obj_cert)
                $("#cert-rest-other-text").text("more")
            }
    
        })


    
    $("#btnEditCertification").click(function(event){


        event.preventDefault();

        var formData = new FormData($('form#fmCert')[0]);

            $.ajax({
                url:'/user/update-certification',
				type:'post',
				contentType: false,
                processData: false,
                cache:false,
                data:formData,
                success:function(data){

                    console.log(data)

                    $("#show_cert_hide").hide();
                    $('#accordionExample').collapse()

                    $("#cert_success_msg").show();

                    setTimeout(function () {
                       
                        $("#cert_success_msg").hide();

                    }, 4000);

                    $("#CertId").val(data.id)
                    $("#cert_name").html(`<i class="fa fa-certificate mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.cert_name}`)
                    $("#cert_issued").html(`<i class="fa fa-university mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.issued_by}`)
                    $("#cert_date").html(`<i class="fa fa-calendar mr-3 mb-3"style="color:#A41201;" ></i>&nbsp;${data.issued_date} - ${data.valid_till} `)
                    $("#btndelCert").html(`<a href="/user/delete-certification/${data.id}"><i class="fa fa-trash mr-3 ml-3 mt-3 show-delete" id="faCertDelete"></i></a>`);
                   

                    $("##show-experience").show();

                }
            }); 

    });




    
    $("#faCertEdit").click(function(event){
        // $("#editEdufm").show();
        event.preventDefault();
        certId = parseInt($("#CertId").val().trim(), 10);
        
        $.ajax({
                url:'/user/get-single-cert/'+ certId,
                type:'get',
                success:function(data){
                    console.log(data.id)
                    $("#cert_id").val(data.id);
                    $("#certificate").val(data.cert_name);
                    $("#issued_by").val(data.issued_by);
                    $("#issue_date").val(data.issued_date);
                    $("#valid_till").val(data.valid_till);

                    
                    $("#show_cert_hide").show();
                    $("#ViewCert").attr("hidden", "hidden");
                    $("#btnSubmitCertification").attr("hidden", "hidden");
                    $("#btnEditCertification").removeAttr("hidden");
                    $('#accordionExample').collapse()
                    // $("#editEdufm").show();
                    // $("#ViewEducation").hide();
                    
                }
            });
        


    });
});
