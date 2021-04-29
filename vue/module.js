/********************************************************************************* */
// fetch appel au serveur en Get ou Post
function fetchRequest(methode, url, data) {
    return fetch(url, {
        //credentials: 'same-origin', // 'include', default: 'omit'
        method: methode, // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
        headers: new Headers({ "Content-Type": "application/json" }),
    }).then((response) => response.json());
};

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
};

/*********************************************************************************** */
// supprime un élément du panier
function removeItemOnce(value) {
    let article = JSON.parse(localStorage.getItem("panier"));
    //  supprime 1 élément a partir égale value (Numero de ligne)
    article.splice(value, 1);
    localStorage.setItem("panier", JSON.stringify(article));

    if (localStorage.getItem("panier") == "[]") {
        localStorage.removeItem("panier");
        displayHome(urlApi);
    }
    displayPanier(JSON.stringify(article));
    return false;
};

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
    }
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
};

/*********************************************************************************** */
// controle les bouton incrément dans page produit
function btnIncrement() {
    // Bouton incrémentation quantité commandé
    var input = document.querySelector("#qty");
    var btnminus = document.querySelector("#qtyminus");
    var btnplus = document.querySelector("#qtyplus");

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

function checkSaisie() {
    let msg = {
        firstName: [
            "Veuillez entrer votre nom",
            "Ce champ doit comporter des lettres uniquement, au minimum 4",
        ],
        lastName: [
            "Veuillez entrer votre prénom",
            "Ce champ doit comporter des lettres uniquement, au minimum 4",
        ],
        address: [
            "Veuillez entrer votre adresse",
            "Ce champ doit comporter au minimum 10 caractère",
        ],
        city: [
            "Veuillez entrer votre commune",
            "Ce champ doit comporter des lettres uniquement",
        ],
        mail: [
            "Veuillez entrer votre e-mail",
            "Ce champ est sous la forme: xxx.xxx@xxx.xxx",
        ],
    };
    for (num in msg) {
        let champ = document.getElementById(num);
        let message1 = msg[num][0];
        let message2 = msg[num][1];
        champ.oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                if (e.target.value.length == 0) {
                    e.target.setCustomValidity(message1);
                } else {
                    e.target.setCustomValidity(message2);
                }
            }
        };
    }
}