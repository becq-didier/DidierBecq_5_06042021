import { displayProduct } from './displayProduct.js';
import { btnIncrement, numBasket } from './functions.js';

export function displayHome(title) {
    let data = JSON.parse(localStorage.getItem("Products"));
    // nom de la propriere de la table d'option (colors,lenses varnish)
    // console.log(Object.keys(data));
    let options = Object.keys(data[0])[0];
    let resultat = document.getElementById("container");

    container.innerHTML = `<h1>${title} vintage</h1>`;

    // affiche les produits sous forme d 'articles
    for (const val in data) {
        let id = data[val]._id;
        // contenue html
        container.innerHTML += `
                     <article class='box col d-flex  justify-content-center'>
                        <div class='box__inner'>
                            <div id='cart' class='box__inner__front d-flex align-items-center justify-content-center'>
                                <img class='card-img-top' id='ephotoDuProduit' src=${
                                  data[val].imageUrl
                                }><br>
                            </div>
                            <div class='box__inner__back card d-flex flex-column align-items-center justify-content-center'>
                                <div class='card-body'>
                                    <div class='card-title'>
                                        <p class='h3' >${data[val].name}</p>
                                    </div><hr>
                                    <div class='card-text row'>
                                        <p class='h5'>${
                                          data[val].description
                                        }</p>
                                        <p class='col-4 text-end text-light'>option(s):</p><span class='col-8 text-light text-start' id='options${val}'></span>
                                    </div><hr>
                                    <p class='h3'>${data[val].price / 100}€</p>
                                    <div class="btnProduct" id="${id}">
                                        <a   class='btn btn-dark' class='btn btn-secondary'>Voir la fiche du produit</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </article>
                     `;
        // boucle pour afficher les options
        for (const op in data[val][options]) {
            document.getElementById("options" + val).innerHTML +=
                "- " + data[val][options][op] + "<br>";
        }
    }
    // affiche le nombre d'article dans le panier au niveau du menu
    numBasket();
    //événement click sur tous les boutons => remove 
    let btnProduct = document.getElementsByClassName("btnProduct");
    for (let i = 0; i < btnProduct.length; i++) {
        let elt = btnProduct[i];
        btnProduct[i].addEventListener("click", function() {
            displayProduct(this.getAttribute("id"));
            btnIncrement();
        });
    }
}