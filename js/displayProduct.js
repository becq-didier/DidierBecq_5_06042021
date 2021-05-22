import { addStorage } from "./functions.js"
import { btnIncrement } from "./functions.js";
/**
 *
 * @param {string} title Page produit
 * @param {string} description Contenu de la page produit
 * @param {string} URL http://localhost:3000/api/cameras_+_idProduit
 */
export function displayProduct(_id) {
    //récupération des données du produit choisi
    let datas = JSON.parse(localStorage.getItem("Products"));
    var index = -1;
    var val = _id;
    var index = datas.findIndex(function(item) {
        return item._id === val;
    });
    let data = datas[index];
    //Mémorise le produit sélectionné
    localStorage.setItem("selectedProduct", JSON.stringify(data));
    // recupere le nom de l'option (colors,lenses,varnish)
    let options = Object.keys(data)[0];
    // affiche contenu de la fiche produit
    var resultat = document.getElementById("container");
    resultat.innerHTML = "";
    resultat.innerHTML = `
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
                                        <button type='button' id='btnAdd' class='w-100 product__info__option__commander btn btn-dark m-2'  >Ajouter au panier</button>
                                        <button type='button' id='btnRtn' class='w-100 product__info__option__home btn btn-dark m-2'  >Retour aux produits</button>
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
    //function boutons incrémentation de la quantité
    btnIncrement();
    //ecoute bouton btnAdd
    document.getElementById("btnAdd").addEventListener("click", function(event) {
        addStorage(_id);
    });

    //ecoute bouton btnRtn
    document.getElementById("btnRtn").addEventListener("click", function(event) {
        location.href = "index.html";
    });
}