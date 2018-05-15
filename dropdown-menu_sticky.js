
window.onscroll = function() {myFunction()};
var dropdown_menu = document.getElementById("list_bar");
var sticky = dropdown_menu.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        dropdown_menu.classList.add("sticky")
        document.getElementById("part_one").style.paddingTop = "53.5px";
    } else {
        dropdown_menu.classList.remove("sticky");
        document.getElementById("part_one").style.paddingTop = "0";
    }
}
