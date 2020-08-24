$(document).ready(function(){
$('.countdown').toggle()
setTimeout(function () {
  $('.countdown').toggle();
  $("#btnResendLink").toggle();
}, 10000)
});