import { numBasket, removeItemOnce } from "./functions.js";
import { CheckCapture } from "./checkForm.js";
import { displayOrder } from "./displayOrder.js";
import { checkData } from "./checkData.js";
// affiche la page d'accueil
export function displayBasket() {
    let basket = localStorage.getItem("Basket");
    //verifie s'il y a un article
    if (basket != null) {
        basket = JSON.parse(basket);
        // recuperation des informations du client déjà memorisés
        let contact = JSON.parse(localStorage.getItem("contact"));
        //affiche la page panier
        const resultat = document.getElementById("container");
        container.innerHTML = `
            <article class='Basket container'>
                <div class='Basket__container col'>
                    <div class=' alert-primary' id='Basket'></div>
                    <div class=' bg-success text-warning ' id='total'></div>
                </div>
                <div class='col'>
                    <form  class='form-group' id='validBasket' action='' method='post'>
                        <fieldset>
                            <legend>Formulaire de commande</legend>
                            <div class='mb-3'>
                                <label  class='mb-3' for='firstName'>Nom :</label>
                                <input class='form-control' type='text' id='firstName' firstName='user_firstName'><!--pattern="[A-Za-z]{4,}"  required-->
                                <span id="err-firstName"></span>
                                </div>
                            <div  class='mb-3'>
                                <label  class='mb-3' for='lastName'>Prénom :</label>
                                <input class='form-control' type='text' id='lastName' name='user_lastName'"><!-- pattern="[A-Za-z]{4,} required-->
                                <span id="err-lastName"></span>
                                </div>
                            <div class='mb-3'>
                                <label  class='mb-3' for='address'>Adresse :</label>
                                <textarea class='form-control'  rows='5' cols='40' id='address' name='user_address'></textarea><!-- pattern="[0-9][A-Za-z]{10,}" required-->
                                <span id="err-address"></span>
                            </div>
                            <div  class='mb-3'>
                                <label  class='mb-3' for='city'>Commune :</label>
                                <!--div class='d-flex flex-row'-->  
                                    <input class='form-control column' type='text' id='city' name='user_city'></input><!-- pattern="[A-Za-z]{1,}" required-->
                                    <!--input class='form-control' id='commune' type='text' disabled-->
                                <!--/div--> 
                                <span id="err-city"></span>
                            </div>
                            <div class='mb-3'>
                                <label  class='mb-3' for='mail'>e-mail :</label>
                                <input class='form-control' type='' id='mail' name='user_mail'><!-- pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?" required-->
                                <span id="err-mail"></span>
                            </div>
                            <div class='m-3'>
                                <button  type='submit' name='submit' class='btn btn-success text-warning'>Valider le Basket</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </article>
            `;
        // si 'contact'(localStorage) est différent de null affiche les infos mémorisées
        if (contact != null) {
            document.getElementById("firstName").value = contact.firstName;
            document.getElementById("lastName").value = contact.lastName;
            document.getElementById("address").textContent = contact.address;
            document.getElementById("city").value = contact.city;
            document.getElementById("mail").value = contact.email;
        }
        // si articles présent les afficher
        if (basket[0] != null) {
            let priceTotal = 0;
            let price = 0;
            for (const num in basket) {
                priceTotal += parseFloat(basket[num][4] * basket[num][5]);
                price = basket[num][4];
                let minImageUrl = basket[num][1].replace(".jpg", "-min.jpg");
                minImageUrl = minImageUrl.replace("images", "images/min");
                document.getElementById("Basket").innerHTML += `
                    <div class='Basket__container__liste__items row p-1 align-items-center'>\
                        <div class='Basket__container__liste__items__item text-center col-sm'>\
                            <img id='imgBasket' class='p-1' src=${minImageUrl}>\
                        </div>\
                        <!--div class='Basket__container__liste__items__item text-center col-sm'>\
                        <span class='p-1'> N°" + {(parseInt(num) + 1)} + "</span>\
                            <span id='ref' class='p-1'> Ref: ${basket[num][0]}</span>\
                        </div-->\
                        <div class='Basket__container__liste__items__item text-center col-sm'>\
                            <span class='p-1'>${basket[num][2]}</span>\
                        </div>\
                        <div class='Basket__container__liste__items__item text-center col-sm'>\
                            <span class='p-1'>${basket[num][3]}</span>\
                        </div>\
                        <div class='Basket__container__liste__items__item text-center col-sm'>\
                            <span class='p-1'>${parseFloat(price).toFixed(2)}€</span>\
                        </div>\
                        <div class='Basket__container__liste__items__item text-center col-sm'>\
                            <span class='p-1'> quantité: ${basket[num][5]}</span>\
                        </div>\
                        <div class='Basket__container__liste__items__item text-center col-sm'>\
                            <button id ="${num}" class='btn btn-danger btnRemove' type='button'>\
                                <a  class='p-1' ><span class='far fa-trash-alt'></<span></a>Supprimer\
                            </button>\
                        </div>\
                    </div><hr>
                    `;
            }
            // affiche le total de la commande
            localStorage.setItem("priceTotal", priceTotal);
            document.getElementById("total").textContent = "Somme total de la commande: " + parseFloat(priceTotal).toFixed(2) + "€";
        }
        // mise a jour affichage de la qty d'articles dans le panier
        numBasket();

        //ecoute btn submit & check saisie formulaire
        let valid = document.getElementById("validBasket");
        valid.addEventListener("submit", function(e) {
            e.preventDefault();
            checkData();
            //verification de la saisie formulaire
            if (CheckCapture()) {
                displayOrder();
            };
        });
        //Evénement click sur tous les boutons => remove */
        let btnRemove = document.getElementsByClassName("btnRemove");
        for (let i = 0; i < btnRemove.length; i++) {
            let elt = btnRemove[i];
            btnRemove[i].addEventListener("click", function(event) { removeItemOnce(i); });
        }
    } else {
        // si pas d'article affiche boite de dialogue (1 bouton)
        showModal("Information", "Votre panier ne contient aucun article", "Fermer", null, () => location.href = "index.html");
    }
}