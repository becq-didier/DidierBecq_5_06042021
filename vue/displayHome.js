/**
 *
 * @param {string} title Page d'accueil
 * @param {string} description Contenu de la page d'accueil
 * @param {string} URL http://localhost:3000/api/cameras
 */
function displayHome(url) {
    fetchRequest('GET', url)
        .then((data) => {
            // nom de la propriere de la table d'option (colors,lenses varnish)
            let options = Object.keys(data[0])[0];
            var resultat = document.getElementById("container");
            container.innerHTML = "";
            // console.log(resultat);
            for (const val in data) {
                //     console.log(IdRequest);
                container.innerHTML += `
                     <article class='box col d-flex  justify-content-center'>
                        <div class='box__inner'>
                            <div id='cart' class='box__inner__front d-flex align-items-center justify-content-center'>
                                <img class='card-img-top' id='ephotoDuProduit' src=${data[val].imageUrl}><br>
                            </div>
                            <div class='box__inner__back card d-flex flex-column align-items-center justify-content-center'>
                                <div class='card-body'>
                                    <div class='card-title'>
                                        <p class='text-muted'>ref:${data[val]._id}</p>
                                        <p class='h3' >${
                                          data[val].name
                                        }</p>
                                    </div><hr>
                                    <div class='card-text row'>
                                        <p class='h5'>${data[val].description}</p>
                                        <p class='col-4 text-end text-light'>option(s):</p><span class='col-8 text-light text-start' id='options${val}'></span>
                                    </div><hr>
                                    <p class='h3'>${data[val].price / 100}€</p>
                                    <div class=''>
                                        <button class='btn btn-dark' onclick='displayProduct("${url}/${data[val]._id}")' type='button' class='btn btn-secondary'>Voir produit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </article>
                     `;
                for (const op in data[val][options]) {
                    document.getElementById("options" + val).innerHTML += "- " + data[val][options][op] + "<br>";
                }
            }

            // affiche le nombre d'article dans le panier au niveau du menu
            numBasket();
        })
        .catch((error) => console.error(error));
}