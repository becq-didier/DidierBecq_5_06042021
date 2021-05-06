// Affiche la page commande
function displayOrder() {
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

    for (id in product_id) {
        products.push = product_id[id][0];
    }

    let objet = {
        contact,
        products,
    };

    // appel fetchRequest(methode, url, data)
    fetchRequest("POST", urlApi + "/order", objet)
        .then((data) => {
            var resultat = document.getElementById("container");

            container.innerHTML = `
                <div class='container-fluid text-center alert-info m-3'>
                    <p>Merci de nous avoir choisi !</p>
                    <p>Votre commande sera expédiée sous 24 heures</p>
                    <p>N° de commande: ${data.orderId}</p>
                    <p>Montant total: ${parseFloat(priceTotal).toFixed(2)}€</p>
                    <button  type='button' class='btn btn-dark m-3' onclick='displayHome("${urlApi}");'>Retour au produits</button>
                </div>
                `;
            localStorage.removeItem("Basket");
            numBasket();
        }) // Résultat de l'appel `response.json ()`
        .catch((error) => console.error(error));


};