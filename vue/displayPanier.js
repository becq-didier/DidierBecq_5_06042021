function displayPanier(articles) {
    if (articles != null) {

        articles = JSON.parse(articles);

        let contact = JSON.parse(localStorage.getItem('contact'));

        const resultat = document.getElementById("container");
        container.innerHTML = `
            <articles class='panier container'>
                <div class='panier__container col'>
                    <div class=' alert-primary' id='panier'></div>
                    <div class=' bg-success text-warning ' id='total'></div>
                </div>
                <div class='col'>
                    <form  class='form-group' id='validBasket' action='' method='post'>
                        <fieldset>
                            <legend>Formulaire de commande</legend>
                            <div class='mb-3'>
                                <label  class='mb-3' for='firstName'>Nom :</label>
                                <input class='form-control' type='text' id='firstName' firstName='user_firstName'  required>
                            </div>
                            <div  class='mb-3'>
                                <label  class='mb-3' for='lastName'>Prénom :</label>
                                <input class='form-control' type='text' id='lastName' name='user_lastName' required>
                            </div>
                            <div class='mb-3'>
                                <label  class='mb-3' for='address'>Adresse :</label>
                                <textarea class='form-control'  rows='5' cols='40' id='address' name='user_address' required></textarea>
                            </div>
                            <div  class='mb-3'>
                                <label  class='mb-3' for='city'>Ville :</label>
                                <input class='form-control' type='text' id='city' name='user_city' required></input>
                            </div>
                            <div class='mb-3'>
                                <label  class='mb-3' for='mail'>e-mail :</label>
                                <input class='form-control' type='email' id='mail' name='user_mail' required>
                            </div>
                            <div class='m-3'>
                                <button  type='submit' name='submit' class='btn btn-success text-warning'>Valider le panier</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </article>
            `;
        // si 'contact' est différent de null affiche les infos mémorisées de localStrage 'contact'
        if (contact != null) {

            document.getElementById("firstName").value = contact.firstName;
            document.getElementById("lastName").value = contact.lastName;
            document.getElementById("address").textContent = contact.address;
            document.getElementById("city").value = contact.city;
            document.getElementById("mail").value = contact.email;
        }
        if (articles[0] != null) {
            let priceTotal = 0;
            let price = 0;
            for (const num in articles) {
                priceTotal += parseFloat(articles[num][4] * articles[num][5]);
                price = articles[num][4];
                let minImageUrl = articles[num][1].replace(".jpg", "-min.jpg");
                minImageUrl = minImageUrl.replace("images", "images/min");
                document.getElementById("panier").innerHTML += `
                    <div class='panier__container__liste__items row p-1 align-items-center'>\
                        <div class='panier__container__liste__items__item col-2'>\
                            <img id='imgPanier' class='p-1' src=${minImageUrl}>\
                        </div>\
                        <!--div class='panier__container__liste__items__item col-2'>\
                        <span class='p-1'> N°" + {(parseInt(num) + 1)} + "</span>\
                            <span id='ref' class='p-1'> Ref: ${articles[num][0]}</span>\
                        </div-->\
                        <div class='panier__container__liste__items__item align-middle col-2'>\
                            <span class='p-1'>${articles[num][2]}</span>\
                        </div>\
                        <div class='panier__container__liste__items__item col-2'>\
                            <span class='p-1'>${articles[num][3]}</span>\
                        </div>\
                        <div class='panier__container__liste__items__item col-2'>\
                            <span class='p-1'>${parseFloat(price).toFixed(2)}€</span>\
                        </div>\
                        <div class='panier__container__liste__items__item col-2'>\
                            <span class='p-1'> quantité: ${articles[num][5]}</span>\
                        </div>\
                        <div class='panier__container__liste__items__item col-2'>\
                            <button onclick='removeItemOnce(${num});' class='btn btn-danger' type='button'>\
                                <a class='p-1' ><span class='far fa-trash-alt'></<span></a>Supprimer\
                            </button>\
                        </div>\
                    </div><hr>
                    `;
            }
            localStorage.setItem("priceTotal", priceTotal);
            document.getElementById("total").textContent = "Somme Total de la commande: " + parseFloat(priceTotal).toFixed(2) + "€";

        } else {
            document.getElementById("panier").innerHTML += "Panier vide";
        }

        numBasket();

        document.getElementById("validBasket").addEventListener("submit", function(event) {
            event.preventDefault();

            displayOrder();

        });



    } else {
        console.log('proute');
    }
}