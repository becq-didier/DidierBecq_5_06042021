import { fetchRequest } from "./functions.js";
import { displayHome } from "./displayHome.js";
import { displayBasket } from "./displayBasket.js";
// tableau de choix de l'API
var shop = {
        teddies: 'Ours',
        cameras: 'Appareils photo',
        furniture: 'Meubles'
    }
    //Choix de la boutique
var choice = 1;
//Création de la variable Global prix total(teddies,cameras,furniture)
var cathegory = Object.keys(shop)[choice];
var title = shop[Object.keys(shop)[choice]];
var urlApi = "http://localhost:3000/api/" + cathegory;

localStorage.setItem("urlApi", urlApi);
//Appel la page Home au chargement
document.addEventListener("DOMContentLoaded", function() {
    fetchRequest("GET", urlApi).then((data) => {
        // console.log(JSON.stringify(data));
        localStorage.setItem("Products", JSON.stringify(data));
        displayHome(title);
    })
});
//Lien menu produits
let navProduct = document.getElementById("navProduct");
navProduct.addEventListener("click", function(event) {
    displayHome(title);
});

//Lien menu panier
let navBasket = document.getElementById("navBasket");
navBasket.addEventListener("click", function(event) {
    displayBasket();
});