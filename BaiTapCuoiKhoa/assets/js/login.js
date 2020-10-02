var input = $(".item-input");

$(".item-btn").click(function() {
  var email = "vanhai160197@gmail.com";
  var pass = 123456789;

  input.each(function() {
    if ($(this).val().trim() == "") {
      $(this).parent().find(".msg_emailpass").addClass("msg_emailpass2");
      $(this).css("border","1px solid red");
    } else {
        if ( input.eq(0).val() != email || input.eq(1).val() != pass ) {
          $(".msg").css("display","block");
        } else {
          location.href = "../index.html";
        }
      }
  });
});
    
$(".item-input").keyup(function() {
  input.each(function() {
    if ($(this).val().trim() != "") {
      $(this).parent().find(".msg_emailpass").removeClass("msg_emailpass2");
      $(this).css("border","none");
      $(".msg").css("display","none");
    }
  });
})  
