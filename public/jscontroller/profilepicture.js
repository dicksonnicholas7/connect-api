$(document).on('change', '#profile_picture_img', function(){
    var name = document.getElementById("profile_picture").files[0].name;
    var form_data = new FormData();
    var ext = name.split('.').pop().toLowerCase();
    if(jQuery.inArray(ext, ['gif','png','jpg','jpeg']) == -1) 
    {
     alert("Invalid Image File");
    }
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("profile_picture").files[0]);
    var f = document.getElementById("profile_picture").files[0];
    var fsize = f.size||f.fileSize;
    if(fsize > 2000000)
    {
     alert("Image File Size is very big");
    }
    else
    {
     form_data.append("picture", document.getElementById('profile_picture').files[0]);
     $.ajax({
      url:"/user/upload-form",
      method:"POST",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false, 
      success:function(data)
      {
        console.log('done')
      }
     });
    }
   });