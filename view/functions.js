/********************************************************************************* */
// fetch  Get ou Post
function fetchRequest(methode, url, data) {
    return fetch(url, {
            method: methode, // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
            headers: new Headers({ "Content-Type": "application/json" }),
        })
        .then((response) => response.json())
        .catch(function(error) { console.log(error) });
};

/********************************************************************************** */
// affiche le nombre d'articles a côté du menu panier
function numBasket() {
    produits = JSON.parse(localStorage.getItem("Basket"));

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
};

/*********************************************************************************** */
// supprime un élément du panier
function removeItemOnce(value) {
    let article = JSON.parse(localStorage.getItem("Basket"));
    //  supprime 1 élément a partir d'une valueur égale au numero de ligne de commande
    article.splice(value, 1);
    //enregistre le changement
    localStorage.setItem("Basket", JSON.stringify(article));
    // si panier vide alors supprime Basket et affiche la page d'accueil
    if (localStorage.getItem("Basket") == "[]") {
        localStorage.removeItem("Basket");
        displayHome(urlApi);
    }
    //affiche a nouveau le panier
    displayBasket(JSON.stringify(article));
    return false;
};

/*********************************************************************************** */
// additionne les informations du produit dans le panier
function addStorage(refMag) {
    // recupere info de la fiche produit depuis localStage
    let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    let url = selectedProduct["imageUrl"];
    let name = selectedProduct["name"];
    let price = selectedProduct["price"] / 100;
    let qty = document.getElementById("qty").value;
    let opt = document.getElementById("options").value;
    //checkedData variable de vérification de l'intégrité de données
    let checkedData = false;
    //variable pour les articles
    let articles = [];
    let tab = [];

    //recupération des données du produit depuis serveur
    fetchRequest("GET", urlApi + "/" + selectedProduct["_id"])
        .then((data) => {
            console.log(JSON.stringify(data));
            console.log(JSON.stringify(selectedProduct));
            console.log((JSON.stringify(data) !== JSON.stringify(selectedProduct)));


            // nom de l'option (colors, lenses, varnish)
            let nameOpt = Object.keys(selectedProduct)[0];

            // recupère les options du produit dans data
            let optsProduct = data[nameOpt];
            // vérifie si le choix de l'option est identique à la liste dans data 
            for (val in optsProduct) {
                //variable checkedData passe a vrai si données d'option choisi est identique à une option de la liste data
                if (optsProduct[val] === opt) {
                    checkedData = true;
                }
            }
            //compare les 2 [objets] produit server et localStorage
            if ((JSON.stringify(data) !== JSON.stringify(selectedProduct))) {
                //si différent passage de la variable checkedData a faux
                checkedData = false;
            }

            if (checkedData) {
                if (parseInt(qty) < 1 || parseInt(qty) > 25) {
                    showModal("Attention!!!!", `${qty} n'est une valeur correcte!!`, null, "Fermer");
                    document.getElementById("qty").value = 1;
                    return false; //Exit funxtion addStorage
                }

                if (localStorage.getItem("Basket") === null) {
                    localStorage.setItem("Basket", JSON.stringify(articles));
                }
                // Analyser les données sérialisées dans un tableau d'objets
                articles = JSON.parse(localStorage.getItem("Basket"));
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
                localStorage.setItem("Basket", JSON.stringify(articles));

                // affiche quantité de produits du panier dans le menu
                numBasket();

                // appel Modal - Boite de dialogue pour demander à continuer ses achats ou partir vers le panier
                showModal("Confirmez", "Désirez vous aller au panier", "oui", "non", () =>
                    displayBasket(localStorage.getItem("Basket"))
                );
            } else {
                showModal("Attention!", "L'intégrité des informations sont corrompu", null, "fermer");
                displayHome(urlApi);
            }
        })
        .catch((error) => console.error(error));

};

/*********************************************************************************** */
// controle les boutons incrémente dans page produit
function btnIncrement() {
    document
        .getElementById("qtyminus")
        .addEventListener("click", function(e) {
            let qty = Number(document.getElementById("qty").value);
            qty <= 1 ? (qty = 1) : qty--;
            console.log(qty);
            document.getElementById("qty").value = qty;
        });

    document
        .getElementById("qtyplus")
        .addEventListener("click", function(e) {
            let qty = Number(document.getElementById("qty").value);
            qty >= 25 ? (qty = 25) : qty++;
            console.log(qty);
            document.getElementById("qty").value = qty;
        });

    document.getElementById("qty")
        .addEventListener("keyup", function(e) {
            let qty = Number(document.getElementById("qty").value);
            if (qty <= 1) qty = 1;
            if (qty >= 25) qty = 25;
            console.log(qty);
            document.getElementById("qty").value = qty;
        });

};
/**
 * 
 * @param {string} title 
 * @param {string} description content of modal body 
 * @param {string} yesBtnLabel label of Yes button 
 * @param {string} noBtnLabel label of No button 
 * @param {function } callback callback function  when click Yes button
 */
var modalWrap = null;

const showModal = (title, description, yesBtnLabel = 'Yes', noBtnLabel = 'Cancel', callback) => {
    if (modalWrap !== null) {
        modalWrap.remove();
    }
    let classBtn = '';
    if (yesBtnLabel === null) { classBtn = "visually-hidden"; }
    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>${description}</p>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${noBtnLabel}</button>
            <button type="button" class="${classBtn} btn btn-success modal-success-btn" aria- data-bs-dismiss="modal">${yesBtnLabel}</button>
          </div>
        </div>
      </div>
    </div>
  `;

    modalWrap.querySelector('.modal-success-btn').onclick = callback;

    document.body.append(modalWrap);

    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
};


function CheckCapture() {
    let display = true;
    let valid = document.getElementById("validBasket");
    valid.addEventListener("submit", function(e) {
        e.preventDefault();

        // Verification champ fistName
        let firstName = document.getElementById("firstName");
        let err_firstName = document.getElementById("err-firstName");
        if (!textLength(firstName.value, 1, 35)) {
            err_firstName.style.visibility = "visible";
            err_firstName.innerText =
                "Veuillez saisir un nom entre 1 et 35 lettres, merci";
            display = false;
        } else if (!isLetter(firstName.value)) {
            err_firstName.style.visibility = "visible";
            err_firstName.innerText = "Veuillez saisir des lettres uniquement";
            display = false;
        } else {
            err_firstName.style.visibility = "hidden";
            err_firstName.innerText = "";
        }

        // Verification champ lastName
        let lastName = document.getElementById("lastName");
        let err_lastName = document.getElementById("err-lastName");
        if (!textLength(lastName.value, 1, 35)) {
            err_lastName.style.visibility = "visible";
            err_lastName.innerText =
                "Veuillez saisir un prénom entre 1 et 35 lettres, merci";
            display = false;
        } else if (!isLetter(lastName.value)) {
            err_lastName.style.visibility = "visible";
            err_lastName.innerText = "Veuillez saisir des lettres uniquement";
            display = false;
        } else {
            err_lastName.style.visibility = "hidden";
            err_lastName.innerText = "";
        }

        // Verification champ address
        let address = document.getElementById("address");
        let err_address = document.getElementById("err-address");
        if (!textLength(address.value, 10, 255)) {
            err_address.style.visibility = "visible";
            err_address.innerText =
                "Veuillez saisir une adresse entre 10 et 255 caractères";
            display = false;
        } else if (!isAddress(address.value)) {
            err_address.style.visibility = "visible";
            err_address.innerText =
                "Veuillez saisir une adresse valide";
            display = false;
        } else {
            err_address.style.visibility = "hidden";
            err_address.innerText = "";
        }

        // Verification champ city (Saint Remy en Bouzemont Saint Genest et Isson)
        let city = document.getElementById("city");
        let err_city = document.getElementById("err-city");
        if (!textLength(city.value, 1, 45)) {
            err_city.style.visibility = "visible";
            err_city.innerText =
                "Veuillez saisir un prénom entre 1 et 45 lettres";
            display = false;
        } else if (!isLetter(city.value)) {
            err_city.style.visibility = "visible";
            err_city.innerText = "Veuillez saisir des lettres uniquement";
            display = false;
        } else {
            err_city.style.visibility = "hidden";
            err_city.innerText = "";
        }

        // Verification champ mail (nom.contact@mail.fr)
        let mail = document.getElementById("mail");
        let err_mail = document.getElementById("err-mail");
        console.log(isMail(mail.value));
        if (!isMail(mail.value)) {
            err_mail.style.visibility = "visible";
            err_mail.innerText =
                "Veuillez saisir un email";
            display = false;
        } else {
            err_mail.style.visibility = "hidden";
            err_mail.innerText = "";
        }

        // Si valide alors afficher la page commande
        console.log(display);
        if (display) {
            displayOrder();
        } else {
            display = true;
        }
    });
}
// retourne false si chaine n'est pas alphabétique
function isLetter(str) {
    return /^[a-zA-Z'éèêëâäîï ()]+$/.test(str.trim());
    //return /^[a-zA-Z'éèêëâäîï]+( [a-zA-Z'éèêëâäîï]+){0,8}$/.test(str.trim());
}

// retourne fasle si le nombres de caractères est non compris entre min et max
function textLength(str, min, max) {
    if (parseInt(str.length) < min || parseInt(str.length) > max) {
        return false;
    }
    return true;
}

// retourne false si 
function isAddress(str) {
    return /^([0-9a-zA-Z'àâéèêëôùûçÏÎîïÀÂÉÈÔÙÛÇ-\s]{1,50})$/.test(str);
}

// retourne false si chaine n'est pas alphabétique
function isMail(str) {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(str);
}