/*--------------Show product order--------------*/
var inputQuantity = 0;
var dem = 0;
$(".content .btn").click(function () {
  var number = $(this).parent().find(".my_spinner").val();
  var numberProduct = parseInt(number);

  inputQuantity += numberProduct;
  $("#cart_number").val(inputQuantity);

  dem++;
  var nameProduct = $(this).parent().parent().find(".card-title").text();
  var price = $(this).parent().parent().find(".card-text").find(".price_sale").text();
  var sumPrice = parseInt(numberProduct) * parseInt(price);
  var htmlProduct =
    "<tr>" +
      "<th class='stt'>" + dem +
      "</th>" +
      "<td class='name_product'>" + nameProduct + "</td>" +
      "<td>" + parseInt(price) + "$" + "</td>" +
      "<td class='quantity'>" + numberProduct + "</td>" +
      "<td class='sum'>" + sumPrice + "$" + "</td>" +
      "<td> <button class='delete'> <i class='far fa-trash-alt' style='cursor: pointer;'> </i> </button> </td>" +
    "</tr>";

  var check = true;
  var listProduct = $(".list-order-product tr");

  listProduct.each(function (index, product) {
    var name = $(this).find(".name_product").text();
    var quantity = $(this).find(".quantity").text();
    var priceOrder = $(this).find(".price");

    if (name == nameProduct) {
      check = false;
      var newQuantity = parseInt(quantity) + numberProduct;
      var newSumPrice = newQuantity * parseInt(price);
      var stt = listProduct.eq(listProduct.length - 1).find(".stt").eq(0).text();

      $(this).find(".quantity").text(newQuantity);
      $(this).find(".sum").text(newSumPrice);
      dem = parseInt(stt);
    }
  });

  if (check) {
    $(".list-order-product").append(htmlProduct);
  }

  var sum = $(".list-order-product").find("tr").find(".sum");
  var sumPay = 0;
  for (var i = 0; i < sum.length; i++) {
    sumPay += parseInt(sum.eq(i).text());
  }
  $("#sum_price-number").text(sumPay + "$");
});

$(".header__top-cart").click(function () {
  if ($("#cart_number").val() == 0) {
    alert("Không có sản phẩm");
  } else {
    $(this).attr("data-target", "#exampleModal");
  }
});

/* Delete product */
$(".list-order-product").on("click", ".delete", function () {
  inputQuantity =
    parseInt($("#cart_number").val()) -
    parseInt($(this).parent().parent().find(".quantity").text());

  var sumPay =
    parseInt($("#sum_price-number").text()) -
    parseInt($(this).parent().parent().find(".sum").text());
  $("#sum_price-number").text(sumPay + "$");
  $("#cart_number").val(inputQuantity);

  var index = parseInt($(this).parent().parent().find(".stt").text());
  for (var i = index; i < $(".list-order-product tr").length; i++) {
    var stt = $(".list-order-product").find("tr").eq(i).find(".stt");
    stt.text(parseInt(stt.text()) - 1);
  }
  dem = dem - 1;
  console.log(dem);
  $(this).parent().parent().remove();
});

/*--------------Search--------------*/
function search() {
  $("#home_active").text("Tìm kiếm sản phẩm");
  var input = $("#search").val().toUpperCase();
  var name = $(".content__allproduct .card-title");
  var gia = $(".content__allproduct .card-text").find(".price_sort");
  var dem = 0;
  if (input != "") {
    $(".content__product").hide();
    $(".content__showroom").hide();
    $(".content__login").hide();
    $(".content__register").hide();
    $(".banner").hide();
    $(".posts").hide();
    $(".content__allproduct").show();
  }
  for (var i = 0; i < name.length; i++) {
    var text = name.eq(i).text().toUpperCase();
    var gia_sp = gia.eq(i).text();
    if (text.indexOf(input) > -1 || gia_sp.indexOf(input) > -1) {
      $(".content__allproduct .content__product-item ").eq(i).show();
      dem += 1;
    } else {
      $(".content__allproduct .content__product-item").eq(i).hide();
    }
  }
  if (name.text().toUpperCase().indexOf(input) == -1 && gia.text().indexOf(input) == -1) {
    $("#msg").text("Không có sản phẩm nào");
    $("#msg").css("margin-bottom", "400px");
    $(".price_sort").eq(0).css("display", "none");
  } else {
    $("#msg").text("Có " + dem + " " + "sản phẩm phù hợp");
    $("#msg").css("margin-bottom", "20px");
    $(".price_sort").eq(0).css("display", "block");
  }
  if (input == "") {
    $("#msg").empty();
  }
}

$("#search").change(function (e) {
  search();
});

/*-------------- Sort --------------*/
$("#selection-sort").change(function () {
  var arr = new Array();
  for (var i = 0; i < $(".content__allproduct .card-title").length; i++) {
    arr[i] = [
      parseInt($(".content__allproduct .card-text").find(".price_sale").eq(i).text()),
      $(".content__allproduct img").eq(i).attr("src"),
      $(".content__allproduct .card-title a").eq(i).text(),
      $(".content__allproduct .card-text").find(".card-text-sale").eq(i).text(),
    ];
  }
  var min;
  if ($("#selection-sort").val() == "1") {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i][0] >= arr[j][0]) {
          min = arr[i];
          arr[i] = arr[j];
          arr[j] = min;
        }
      }
    }
  } else if ($("#selection-sort").val() == "2") {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i][0] < arr[j][0]) {
          min = arr[i];
          arr[i] = arr[j];
          arr[j] = min;
        }
      }
    }
  }
  for (var i = 0; i < arr.length; i++) {
    $(".content__allproduct img").eq(i).attr("src", arr[i][1]);
    $(".content__allproduct .card-title a").eq(i).text(arr[i][2]);
    $(".content__allproduct .card-text").find(".price_sale").eq(i).text(arr[i][0] + "$");
    $(".content__allproduct .card-text").find(".card-text-sale").eq(i).text(arr[i][3]);
  }

  search();
});

/*--------------Auto complete--------------*/
var data = ["Giường", "Tủ", "Đệm", "Bàn", "Ghế"];
$("#search").autocomplete({
  delay: 100,
  source: data,
});

/*-------------- Quantity --------------*/
$(".my_spinner").spinner({
  min: 1,
  max: 999,
  step: 1,
});

/*reload*/
$("#login").click(function () {
  location.reload();
});
$("#register").click(function () {
  location.reload();
});
$("#show_room").click(function () {
  location.reload();
});

$("#searchbar").click(function () {
  $("#navbarSupportedContent").hide();
});
$("#navbar_menu").click(function () {
  $("#navbarSupportedContent").toggle();
});

// table
$("#tabs").tabs();

$("#tabs_select").change(function () {
  $("#tabs").attr("id","new_id");
  if ($("#tabs_select").val() == 1) {
    $("#tab_1").show();
    $("#tab_2").hide();
    $("#tab_3").hide(); 
  } 
  else if ($("#tabs_select").val() == 2) {
    $("#tab_1").hide();
    $("#tab_2").show();
    $("#tab_3").hide();
  }
  else if ($("#tabs_select").val() == 3) {
    $("#tab_1").hide();
    $("#tab_2").hide();
    $("#tab_3").show();
  }

});