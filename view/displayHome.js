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
var urlApi = "http://localhost:3000/api/" + cathegory;
// console.log(document.location.origin + "/view/data.json");
//var urlApi = document.location.origin + "/view/data.json";
//Appel la page Home au chargement
document.addEventListener("DOMContentLoaded", function() {
    displayHome(`${urlApi}`);
});

//Lien menu produits
document
    .getElementById("navProduct")
    .setAttribute("onclick", `displayHome('${urlApi}')`);

//Lien menu panier
document
    .getElementById("navBasket")
    .setAttribute("onclick", 'displayBasket(localStorage.getItem("Basket"))');

/*********************************************************************************** */
/**
 *
 * @param {string} title Page d'accueil
 * @param {string} description Contenu de la page d'accueil
 * @param {string} URL http://localhost:3000/api/cameras
 */
// affiche la page d'acceuil
function displayHome(url) {
    // obtient les informations des articles selon l'API
    fetchRequest("GET", url)
        .then((data) => {
            // nom de la propriere de la table d'option (colors,lenses varnish)
            let options = Object.keys(data[0])[0];
            let resultat = document.getElementById("container");
            container.innerHTML = `
            <h1>${shop[Object.keys(shop)[choice]]} vintage</h1>
            `;
            // affiche les produits sous forme d'articles
            for (const val in data) {
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
                                        <!--p class='text-muted'>ref:${
                                          data[val]._id
                                        }</p-->
                                        <p class='h3' >${data[val].name}</p>
                                    </div><hr>
                                    <div class='card-text row'>
                                        <p class='h5'>${
                                          data[val].description
                                        }</p>
                                        <p class='col-4 text-end text-light'>option(s):</p><span class='col-8 text-light text-start' id='options${val}'></span>
                                    </div><hr>
                                    <p class='h3'>${data[val].price / 100}€</p>
                                    <div class=''>
                                        <button id="btnProduct" class='btn btn-dark' onclick='displayProduct("${url}/${
                  data[val]._id
                }")' type='button' class='btn btn-secondary'>Voir la fiche du produit</button>
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
        })
        .catch((error) => console.error(error));
}