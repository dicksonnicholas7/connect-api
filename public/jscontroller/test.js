$(document).ready(function(){

    $("#btnAddAnotherExperience").click(function(event){
		event.preventDefault();
		
		var formData = new FormData($('form#foData')[0]);

            $.ajax({
                url:'/user/add-experience',
				type:'post',
				contentType: false,
				processData: false,
                data:formData,
                success:function(response){
					$('form#foData')[0].reset();
					window.scrollTo({
						top:0,
						behavior:'smooth'
					});

					$("#success_msg").html("Experience Successfully Added");
					$("#success_msg").addClass("alert alert-success alert-dismissible mt-2");
                }
            }); 
	});
	

	$("#btnSkillSave").click(function(event){
		event.preventDefault();
		var formData = new FormData($('form#foData')[0]);
            $.ajax({
                url:'/user/add-experience',
				type:'post',
				contentType: false,
				processData: false,
                data:formData,
                success:function(response){
					window.location.replace("/user/complete-freelancer-education");
                }
            }); 
	});
	



	$("#btnAddAnotherEducation").click(function(event){
		event.preventDefault();
		
		var formData = new FormData($('form#addAnotherEdu')[0]);

            $.ajax({
                url:'/user/add-more-education',
				type:'post',
				contentType: false,
				processData: false,
                data:formData,
                success:function(response){
					$('form#addAnotherEdu')[0].reset();
					window.scrollTo({
						top:0,
						behavior:'smooth'
					});

					$("#success_msg_edu").html("Education Successfully Added");
					$("#success_msg_edu").addClass("alert alert-success alert-dismissible mt-2");
                }
            }); 
	});
});