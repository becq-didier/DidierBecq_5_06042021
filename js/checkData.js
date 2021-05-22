import { fetchRequest } from './functions.js'
import { showModal } from "./modal.js";
export function checkData() {
    //réécrit les données serveur qui pourrait etre changer dans localstorage
    let urlApi = localStorage.getItem("urlApi");

    fetchRequest("GET", urlApi).then((data) => {
        localStorage.setItem("Products", JSON.stringify(data));

        //vérifié les données imageUrl, name, price
        //let data = JSON.parse(localStorage.getItem('Products'));
        let basket = JSON.parse(localStorage.getItem('Basket'));

        if (!checkId(data, basket) || !checkPriceTotal(basket)) {
            //localStorage.clear();
            showModal("Attention", "l'intégrité des données est corrompu, le panier sera supprimé!!", "Fermer", null, () => (location.href = "index.html"));

        };

    })
};

function checkId(data, basket) {
    let valide_id = 0;
    let valide_Option = 0;
    let valide_ImgNamePrice = 0;
    for (let numBasket in basket) {
        for (let numData in data) {
            //id
            if (data[numData]._id == basket[numBasket][0]) {
                //compte le nombre id
                valide_id++;

                //Img Name Price
                if (
                    basket[numBasket][1] == data[numData].imageUrl &&
                    basket[numBasket][2] == data[numData].name &&
                    basket[numBasket][4] == data[numData].price / 100
                ) {
                    valide_ImgNamePrice++;
                }

                //option
                let keyOption = Object.keys(data[0])[0];
                let options = data[numData][`${keyOption}`];

                for (let numOption in options) {
                    if (basket[numBasket][3] == options[numOption]) {
                        valide_Option++;
                    }
                }
            }
        }
    }
    return valide_id == basket.length && valide_Option == basket.length && valide_ImgNamePrice == basket.length;
};


function checkPriceTotal(basket) {
    let priceTotal = 0;
    for (let numBasket in basket) {
        console.log(basket[numBasket][5]);
        priceTotal += parseFloat(basket[numBasket][4] * basket[numBasket][5]);
    }
    console.log(priceTotal);
    if (priceTotal == localStorage.getItem("priceTotal")) {
        return true;
    };
    return false;
};