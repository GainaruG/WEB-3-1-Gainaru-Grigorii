const buton = document.getElementById("buton");
const mesaj = document.getElementById("mesaj");

buton.addEventListener("click", function() {

    if (mesaj.textContent === "") {
        mesaj.textContent = "Siteul funcționează!";
    } else {
        mesaj.textContent = "";
    }

});