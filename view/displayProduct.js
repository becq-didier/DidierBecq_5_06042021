/**
 *
 * @param {string} title Page produit
 * @param {string} description Contenu de la page produit
 * @param {string} URL http://localhost:3000/api/cameras_+_idProduit
 */
function displayProduct(url) {
    // obtient le contenu du produit selon son id
    fetchRequest('GET', url)
        .then((data) => {
            localStorage.setItem("selectedProduct", JSON.stringify(data));
            // recupere le nom de l'option (colors,lenses,varnish)
            options = Object.keys(data)[0];
            // affiche contenu de la fiche produit
            var resultat = document.getElementById("container");
            container.innerHTML = "";
            container.innerHTML = `
                     <article class='product d-flex justify-content-center flex-column flex-lg-row'>
                            <div class='product__img d-flex align-items-center justify-content-center'>
                                <img class='card-img-top' id='photoDuProduit' src=${
                                  data.imageUrl
                                }><br>
                            </div>
                            <div class='product__info d-flex  align-items-center justify-content-center  flex-column flex-lg-row'>
                                <div class='product__info__description col-md-6 p-2'>
                                    name: <span id='name'>${
                                      data.name
                                    }</span><br>
                                    prix: <span id='price'>${
                                      data.price / 100
                                    }</span>€<br>
                                    description:${data.description}<br>
                                </div>
                                <div class='product__info__option d-flex flex-column col-md-6 p-2'>
                                    <label for='options'>Option</label>
                                    <select name='options' id='options'>
                                    </select>
                                    <div class='product__info__option py-2'>
                                        <p class='me-2'>Quantité </p>
                                        <button id='qtyminus' aria-hidden='true'><i class='fas fa-minus-square'></i></button>
                                        <input id='qty' type='number' name='qty' min='0' max='25' step='1' value='1'>
                                        <button id='qtyplus' aria-hidden='true'><i class='fas fa-plus-square'></i></button>
                                    </div>
                                    <!-- Button trigger modal -->
                                    <div class='container'>
                                        <button type='button' onclick='addStorage(${JSON.stringify(data._id)});' id='btnAdd' class='w-100 product__info__option__commander btn btn-dark m-2'  >Ajouter au panier</button>
                                        <button type='button' class='w-100 product__info__option__home btn btn-dark m-2' onclick='displayHome("${urlApi}");' >Retour aux produits</button>
                                    </div>
                                </div>
                    </article>
                    `;

            for (const op in data[options]) {
                // affiche options
                document.getElementById("options").innerHTML +=
                    "<option value='" +
                    data[options][op] +
                    "'>" +
                    data[options][op] +
                    "</option><br>";
            }

            // control du fonctionnement des boutons plus et moins pour le nombre d'article.
            btnIncrement();
        })
        .catch((error) => console.error(error));

};