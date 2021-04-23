/*********************************************************************************** */
//Création de la variable Global prix total
var urlApi = "http://localhost:3000/api/cameras";

/********************************************************************************* */
// fetch appel au serveur en Get ou Post
function fetchRequest(methode, url, data) {
    return fetch(url, {
        //credentials: 'same-origin', // 'include', default: 'omit'
        method: methode, // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
        headers: new Headers({ "Content-Type": "application/json" }),
    }).then((response) => response.json());
}

/********************************************************************************** */
// affiche le nombre d'articles a côté du menu panier
function numBasket() {
    produits = JSON.parse(localStorage.getItem("panier"));

    let element = document.getElementById("menuPanier");

    // si article dans le panier les compter
    if (produits != null) {
        element.innerHTML = produits.length;
        element.style.width = "1.5rem";
        element.style.backgroundColor = "green";
        element.style.color = "white";
    } else {
        // si panier vide remettre à 0 le nbr a coté du menu panier
        element.textContent = 0;
        element.style.width = "0";
        element.style.color = "transparent";
        element.style.backgroundColor = "none";

    }
}

/*********************************************************************************** */
// supprime un élément du panier
function removeItemOnce(value) {
    let article = JSON.parse(localStorage.getItem("panier"));
    //  supprime 1 élément a partir de value
    article.splice(value, 1);
    localStorage.setItem("panier", JSON.stringify(article));
    console.log(localStorage.getItem("panier")[0]);

    if (localStorage.getItem("panier") == "[]") {
        localStorage.removeItem("panier");
        displayHome(urlApi);
    }
    displayPanier(JSON.stringify(article));
    return false;
}

/*********************************************************************************** */
// insert les information du produit dans le localStorage du panier
function addStorage(refMag) {


    var url = document.getElementById("photoDuProduit").getAttribute("src");
    var name = document.getElementById("name").textContent;
    var opt = document.getElementById("options").value;
    var price = document.getElementById("price").textContent;
    var qty = document.getElementById("qty").value;
    var articles = [];
    var tab = [];

    if (localStorage.getItem("panier") === null) {
        localStorage.setItem("panier", JSON.stringify(articles));
        //articles.push(JSON.parse(localStorage.getItem("panier")));
    }
    //console.log(url);
    // Analyser les données sérialisées dans un tableau d'objets
    articles = JSON.parse(localStorage.getItem("panier"));
    // Appuyez sur les nouvelles données (que ce soit un objet ou autre chose) sur le tableau

    // insert les information dans tab
    tab.push(refMag);
    tab.push(url);
    tab.push(name);
    tab.push(opt);
    tab.push(price);
    tab.push(qty);
    // insert le tableau tab dans le tableau artilces
    articles.push(tab);

    // Re-sérialisez le tableau dans une chaîne et rangez-la dans localStorage
    localStorage.setItem("panier", JSON.stringify(articles));

    // affiche quantité de produits du panier dans le menu
    numBasket();

    // appel Modal - Boite de dialogue pour demander à continuer ses achats ou partir vers le panier

    showModal("Confirmez", "Désirez vous aller au panier", "oui", "non", () => displayPanier(localStorage.getItem("panier")));
}

/*********************************************************************************** */
// controle les bouton incrément dans page produit
function btnIncrement() {
    // Bouton incrémentation quantité commandé
    var input = document.querySelector("#qty");
    var btnminus = document.querySelector("#qtyminus");
    var btnplus = document.querySelector("#qtyplus");
    // console.log(input, btnminus, btnplus);
    if (
        input !== undefined &&
        btnminus !== undefined &&
        btnplus !== undefined &&
        input !== null &&
        btnminus !== null &&
        btnplus !== null
    ) {
        var min = Number(input.getAttribute("min"));
        var max = Number(input.getAttribute("max"));
        var step = Number(input.getAttribute("step"));

        function qtyminus(e) {
            var current = Number(input.value);
            var newval = current - step;
            if (newval < min) {
                newval = min;
            } else if (newval > max) {
                newval = max;
            }
            input.value = Number(newval);
            e.preventDefault();
        }

        function qtyplus(e) {
            var current = Number(input.value);
            var newval = current + step;
            if (newval > max) newval = max;
            input.value = Number(newval);
            e.preventDefault();
        }

        btnminus.addEventListener("click", qtyminus);
        btnplus.addEventListener("click", qtyplus);
    }
}