function displayOrder() {
    let priceTotal = localStorage.getItem("priceTotal");
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("mail").value;
    console.log("eee");
    console.log(priceTotal);
    let contact = new Object();
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.address = address;
    contact.city = city;
    contact.email = email;

    localStorage.setItem("contact", JSON.stringify(contact));


    let product_id = JSON.parse(localStorage.getItem("panier"));
    let products = []

    for (id in product_id) {
        products.push = product_id[id][0];
    }

    let objet = {
        contact,
        products,
    };
    console.log(urlApi);
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
                    <button  type='button' class='btn btn-dark m-3' onclick='displayHome("http://localhost:3000/api/cameras");'>Retour au produits</button>
                </div>
                `;
            localStorage.removeItem("panier");
            numBasket();
        }) // Résultat de l'appel `response.json ()`
        .catch((error) => console.error(error));


}