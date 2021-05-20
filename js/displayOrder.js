    import { fetchRequest, numBasket } from "./functions.js";
    // Affiche la page commande
    export function displayOrder() {
        let urlApi = localStorage.getItem("urlApi");
        //récupére la somme des produits du panier
        let priceTotal = localStorage.getItem("priceTotal");

        // releve les informations du produits de la page displayProducts
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let email = document.getElementById("mail").value;

        //création du tableau d'information clients
        let contact = new Object();
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.address = address;
        contact.city = city;
        contact.email = email;

        // Lire crée la varaible client avec localStorage
        localStorage.setItem("contact", JSON.stringify(contact));


        let product_id = JSON.parse(localStorage.getItem("Basket"));
        let products = [];

        for (let _id in product_id) {
            products.push = product_id[_id][0];
        }

        let objet = {
            contact,
            products,
        };

        // appel fetchRequest(methode, url, data)
        fetchRequest("POST", urlApi + "/order", objet)
            .then((data) => {
                let resultat = document.getElementById("container");
                let TVA = 0.2;
                let TTC = parseFloat(priceTotal).toFixed(2);
                let HT = parseFloat(TTC / (1 + TVA)).toFixed(2);
                container.innerHTML = `
                <div class='container-fluid text-center alert-info m-3'>
                    <p>Merci de nous avoir choisi !</p>
                    <p>Votre commande sera expédiée sous 24 heures</p>
                    <p>N° de commande: ${data.orderId}</p>
                    <p>Montant total: ${parseFloat(priceTotal).toFixed(2)}€</p>
                    <p>HT: ${HT}€</p>
                    <div id="btnRtn" type='button' class='btn btn-dark m-3''>Retour au produits</div>
                </div>
                `;
                localStorage.removeItem("Basket");
                numBasket();
                let btnRtn = document.getElementById("btnRtn")
                btnRtn.addEventListener("click", function(event) { location.href = "index.html"; });
            }) // Résultat de l'appel `response.json ()`
            .catch((error) => console.error(error));


    };