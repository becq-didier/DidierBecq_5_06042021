import { fetchRequest } from './functions.js'
export function checkData() {
    //réécrit les données serveur qui pourrait etre changer dans localstorage
    let urlApi = localStorage.getItem("urlApi");
    fetchRequest("GET", urlApi).then((data) => {
        localStorage.setItem("Products", JSON.stringify(data));
    });

    //vérifié les données imageUrl, name, price
    let data = JSON.parse(localStorage.getItem('Products'));
    let basket = JSON.parse(localStorage.getItem('Basket'));
    for (let numPdtData in basket) {
        let valide_id = false;
        for (let num in data) {
            if (data[num]._id == basket[numPdtData][0]) {
                valide_id = true;

                let valide_reste = false;
                if (
                    basket[numPdtData][1] == data[num].imageUrl &&
                    basket[numPdtData][2] == data[num].name &&
                    basket[numPdtData][4] == data[num].price / 100
                ) { valide_reste = true; }

                //verifie la donné option
                let valide_option = false;
                let keyOption = Object.keys(data[0])[0];
                let options = data[num][`${keyOption}`];
                for (let numOption in options) {
                    console.log(basket[numPdtData][3] + "-" + options);
                    if (basket[numPdtData][3] == options[numOption]) {
                        valide_option = true;
                    }
                }

                //verifie le prix total dans localStorage
                let priceTotal = 0;
                for (const num in basket) {
                    priceTotal += parseFloat(basket[num][4] * basket[num][5]);
                }

                //si données corrompu alors tous remmetre à zero
                if (!valide_id || !valide_reste || !valide_option || priceTotal != localStorage.getItem('priceTotal')) {
                    localStorage.clear();
                    showModal("Information", "données corrompu!!", "Fermer", null, () => location.href = "index.html");
                }

            }
        }

    }
}