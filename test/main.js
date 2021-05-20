import { isLetter, textLength, isMail, isAddress } from '../js/checkForm.js';
let container = document.getElementById("container");
fetch('names.json')
    .then(response => response.json())
    .then((data) => {
        container.innerHTML += "<p>*******************Test isLetter*******************</p>";
        for (let num in data) {

            container.innerHTML += "\"" + data[num] + "\" is " + isLetter(data[num]) + "<br>";

        }
    });

fetch('length.json')
    .then(response => response.json())
    .then((data) => {
        container.innerHTML += "<p>*******************Test testLength*******************</p>";
        for (let num in data) {

            container.innerHTML += "test [1-3] de \"" + data[num] + "\" is " + textLength(data[num], 1, 3) + "<br>";

        }
    });
fetch('address.json')
    .then(response => response.json())
    .then((data) => {
        container.innerHTML += "<p>*******************Test isAddress*******************</p>";
        for (let num in data) {

            container.innerHTML += "\"" + data[num] + "\" is " + isAddress(data[num]) + "<br>";

        }
    });
fetch('mail.json')
    .then(response => response.json())
    .then((data) => {
        container.innerHTML += "<p>*******************Test isMail*******************</p>";
        for (let num in data) {

            container.innerHTML += "\"" + data[num] + "\" is " + isMail(data[num]) + "<br>";

        }
    });