/*=====   MENU RESPONSIVO LOGIN & REGISTER    =====*/
$(document).ready(function () {
  $(".menu-toggle").click(function () {
    $(".menu-toggle").toggleClass("active");
    $("nav").toggleClass("active");
  });
});

$(document).ready(function () {
  $("header.header-login nav ul li a").click(function () {
    $(".menu-toggle").toggleClass("active");
    $("nav").toggleClass("active");
    // location.reload();
  });
});
