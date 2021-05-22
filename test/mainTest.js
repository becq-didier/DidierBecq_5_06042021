import { isLetter, textLength, isMail, isAddress } from "../js/checkForm.js";
import { fetchRequest } from "../js/functions.js"
import { checkData } from "../js/checkData.js";

let container = document.getElementById("container");

fetch("names.json")
    .then((response) => response.json())
    .then((data) => {
        container.innerHTML +=
            "<p>*******************Test isLetter*******************</p>";
        for (let num in data) {
            container.innerHTML +=
                '"' + data[num] + '" is ' + isLetter(data[num]) + "<br>";
        }
    });
fetch("length.json")
    .then((response) => response.json())
    .then((data) => {
        container.innerHTML +=
            "<p>*******************Test testLength*******************</p>";
        for (let num in data) {
            container.innerHTML +=
                'test [1-3] de "' +
                data[num] +
                '" is ' +
                textLength(data[num], 1, 3) +
                "<br>";
        }
    });

fetch("address.json")
    .then((response) => response.json())
    .then((data) => {
        container.innerHTML +=
            "<p>*******************Test isAddress*******************</p>";
        for (let num in data) {
            container.innerHTML +=
                '"' + data[num] + '" is ' + isAddress(data[num]) + "<br>";
        }
    });

fetch("mail.json")
    .then((response) => response.json())
    .then((data) => {
        container.innerHTML +=
            "<p>*******************Test isMail*******************</p>";
        for (let num in data) {
            container.innerHTML +=
                '"' + data[num] + '" is ' + isMail(data[num]) + "<br>";
        }
    });


let urlApi = "http://localhost:3000/api/teddies";
localStorage.setItem("urlApi", urlApi);

fetchRequest("GET", urlApi).then((data) => {
    //memorise les données server à nouveau
    localStorage.setItem("Products", JSON.stringify(data));

    //données
    let _id = "5beaabe91c9d440000a57d96";
    let _urlImg = "http://localhost:3000/images/teddy_4.jpg";
    let _name = "Gustav";
    let _opt = "Blue";
    let _price = 45;
    let _qty = "2";
    localStorage.setItem("priceTotal", 90);

    let articles = [];
    let tab = [];
    // insert les données dans localStorage(basket)
    tab.push(_id);
    tab.push(_urlImg);
    tab.push(_name);
    tab.push(_opt);
    tab.push(_price);
    tab.push(_qty);

    articles.push(tab);
    localStorage.setItem("Basket", JSON.stringify(articles));


    //lance le teste
    checkData();
});