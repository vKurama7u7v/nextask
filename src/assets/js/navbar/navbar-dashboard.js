console.log("Cargando navbar-dashboard.js");
/*=====   NAVBAR DASHBOARD    =====*/
var viewNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId);

    if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener("click", () => {
            // show navbar
            nav.classList.toggle('show')
            // change icon
            toggle.classList.toggle('bx-x')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
        });
    }
};

viewNavbar('header-toggle', 'nav-bar', 'body-pd', 'header-dashboard');

/*===== LINKS ACTIVOS  =====*/
var linkColor = document.querySelectorAll(".nav__link");
function colorLink() {
    if (linkColor) {
        linkColor.forEach((l) => l.classList.remove("activado"));
        this.classList.add("activado");
    }
}

linkColor.forEach((l) => l.addEventListener("click", colorLink));

document.querySelector(".header-dashboard .dashboard-right ul li").addEventListener("click", function (e) {
    this.classList.toggle("activar");
});