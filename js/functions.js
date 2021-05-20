import { displayBasket } from "./displayBasket.js";
/********************************************************************************* */
// fetch  Get ou Post
export function fetchRequest(methode, url, data) {
    return fetch(url, {
            method: methode, // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
            headers: new Headers({ "Content-Type": "application/json" }),
        })
        .then((response) => response.json())
        .catch(function(error) {
            console.log(error);
        });
}

/*********************************************************************************** */
// controle les boutons incrémente dans page produit
export function btnIncrement() {
    document.getElementById("qtyminus").addEventListener("click", function(e) {
        let qty = Number(document.getElementById("qty").value);
        qty <= 1 ? (qty = 1) : qty--;
        document.getElementById("qty").value = qty;
    });

    document.getElementById("qtyplus").addEventListener("click", function(e) {
        let qty = Number(document.getElementById("qty").value);
        qty >= 25 ? (qty = 25) : qty++;
        document.getElementById("qty").value = qty;
    });

    document.getElementById("qty").addEventListener("keyup", function(e) {
        let qty = Number(document.getElementById("qty").value);
        if (qty <= 1) qty = 1;
        if (qty >= 25) qty = 25;
        document.getElementById("qty").value = qty;
    });
}

/*********************************************************************************** */
// additionne les informations du produit dans le panier
export function addStorage(_id) {
    // // recupere info de la fiche produit depuis localStage
    let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    let _urlImg = selectedProduct["imageUrl"];
    let _name = selectedProduct["name"];
    let _price = selectedProduct["price"] / 100;
    let _qty = document.getElementById("qty").value;
    let _opt = document.getElementById("options").value;

    //variable pour les articles
    let articles = [];
    let tab = [];

    //si aucune données dans le panier enregistre tableau vide
    if (localStorage.getItem("Basket") === null) {
        localStorage.setItem("Basket", JSON.stringify(articles));
    }
    // Analyser les données sérialisées dans un tableau d'objets
    articles = JSON.parse(localStorage.getItem("Basket"));
    // Ajoute aux données (que ce soit un objet ou autre chose) dans le pannier

    // insert les informations dans tab
    tab.push(_id);
    tab.push(_urlImg);
    tab.push(_name);
    tab.push(_opt);
    tab.push(_price);
    tab.push(_qty);
    // insert le tableau tab dans le tableau artilces
    articles.push(tab);

    // Re-sérialisez le tableau dans une chaîne et rangez-la dans localStorage
    localStorage.setItem("Basket", JSON.stringify(articles));

    // affiche quantité de produits du panier dans le menu

    // appel Modal - Boite de dialogue pour demander à continuer ses achats ou partir vers le panier
    showModal("Confirmez", "Désirez vous aller au panier", "oui", "non", () => displayBasket());
    //         } else {
    //             showModal("Attention!", "L'intégrité des informations sont corrompu", null, "fermer");
    //             displayHome(urlApi);
    //         }
    //     })
    //     .catch((error) => console.error(error));
}

/********************************************************************************** */
// affiche le nombre d'articles a côté du menu panier
export function numBasket() {
    let produits = JSON.parse(localStorage.getItem("Basket"));

    let element = document.getElementById("menuBasket");

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
export function removeItemOnce(value) {
    let article = JSON.parse(localStorage.getItem("Basket"));
    //  supprime 1 élément a partir d'une valueur égale au numero de ligne de commande
    article.splice(value, 1);
    //enregistre le changement
    localStorage.setItem("Basket", JSON.stringify(article));
    // si panier vide alors supprime Basket et affiche la page d'accueil
    if (localStorage.getItem("Basket") == "[]") {
        localStorage.removeItem("Basket");
    }
    //affiche a nouveau le panier
    displayBasket();
    return false;
};