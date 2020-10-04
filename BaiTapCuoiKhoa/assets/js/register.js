var input = document.getElementsByClassName("item-input");
var msg = document.getElementsByClassName("msg_emailpass");
var newmsg = document.getElementsByClassName("msg_emailpass1");
var iconcheck = document.getElementsByClassName("item-icon");
var arr = new Array();
arr[0] = /^[a-zA-Z]{3}[\s]?[a-zA-Z]*$/i;
arr[1] = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
arr[2] = /(^\w+@[a-zA-Z]+.com$)/i;
arr[3] = /^[a-zA-Z0-9@*_]{9}$/;

function register() {
  var isError = false;
  for (var i = 0; i < input.length; i++) {
    if (input[i].value.trim() == "") {
      msg[i].classList.add("msg_emailpass2");
      input[i].style.border = "1px solid red";
      isError = true;
    } else {
      if (arr[i].test(input[i].value) == false) {
        isError = true;

        newmsg[i].classList.add("msg_emailpass3");
      }
    }
  }
  if (isError == false) {
    alert("Đăng ký tài khoản thành công");
    location.href = "../login.html";
  }
}

function check() {
  for (var i = 0; i < input.length; i++) {
    if (input[i].value.trim() != "") {
      msg[i].classList.remove("msg_emailpass2");
      newmsg[i].classList.remove("msg_emailpass3");
      input[i].style.border = "1px solid #808080";
    }
    if (arr[i].test(input[i].value) == true) {
      iconcheck[i].classList.add("item-icon1");
    }
    if (input[i].value.trim() == "" || arr[i].test(input[i].value) == false) {
      iconcheck[i].classList.remove("item-icon1");
    }
  }
}
