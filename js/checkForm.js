export function CheckCapture() {
    let display = true;
    // Verification champ fistName
    let firstName = document.getElementById("firstName");
    let err_firstName = document.getElementById("err-firstName");
    if (!textLength(firstName.value, 1, 35)) {
        err_firstName.style.visibility = "visible";
        err_firstName.innerText =
            "Veuillez saisir un nom entre 1 et 35 lettres, merci";
        display = false;
    } else if (!isLetter(firstName.value)) {
        err_firstName.style.visibility = "visible";
        err_firstName.innerText = "Veuillez saisir des lettres uniquement";
        display = false;
    } else {
        err_firstName.style.visibility = "hidden";
        err_firstName.innerText = "";
    }

    // Verification champ lastName
    let lastName = document.getElementById("lastName");
    let err_lastName = document.getElementById("err-lastName");
    if (!textLength(lastName.value, 1, 35)) {
        err_lastName.style.visibility = "visible";
        err_lastName.innerText =
            "Veuillez saisir un prénom entre 1 et 35 lettres, merci";
        display = false;
    } else if (!isLetter(lastName.value)) {
        err_lastName.style.visibility = "visible";
        err_lastName.innerText = "Veuillez saisir des lettres uniquement";
        display = false;
    } else {
        err_lastName.style.visibility = "hidden";
        err_lastName.innerText = "";
    }

    // Verification champ address
    let address = document.getElementById("address");
    let err_address = document.getElementById("err-address");
    if (!textLength(address.value, 10, 255)) {
        err_address.style.visibility = "visible";
        err_address.innerText =
            "Veuillez saisir une adresse entre 10 et 255 caractères";
        display = false;
    } else if (!isAddress(address.value)) {
        err_address.style.visibility = "visible";
        err_address.innerText = "Veuillez saisir une adresse valide";
        display = false;
    } else {
        err_address.style.visibility = "hidden";
        err_address.innerText = "";
    }

    // Verification champ city (Saint Remy en Bouzemont Saint Genest et Isson)
    let city = document.getElementById("city");
    let err_city = document.getElementById("err-city");
    if (!textLength(city.value, 1, 45)) {
        err_city.style.visibility = "visible";
        err_city.innerText = "Veuillez saisir un prénom entre 1 et 45 lettres";
        display = false;
    } else if (!isLetter(city.value)) {
        err_city.style.visibility = "visible";
        err_city.innerText = "Veuillez saisir des lettres uniquement";
        display = false;
    } else {
        err_city.style.visibility = "hidden";
        err_city.innerText = "";
    }

    // Verification champ mail (nom.contact@mail.fr)
    let mail = document.getElementById("mail");
    let err_mail = document.getElementById("err-mail");

    if (!isMail(mail.value)) {
        err_mail.style.visibility = "visible";
        err_mail.innerText = "Veuillez saisir un email";
        display = false;
    } else {
        err_mail.style.visibility = "hidden";
        err_mail.innerText = "";
    }

    // Si valide alors afficher la page commande
    if (display) {
        return true;
    } else {
        return false;
    }

}
// retourne false si chaine n'est pas alphabétique
export function isLetter(str) {
    return /^[a-zA-Z'éèêëâäîï ()]+$/.test(str.trim());
    //return /^[a-zA-Z'éèêëâäîï]+( [a-zA-Z'éèêëâäîï]+){0,8}$/.test(str.trim());
}

// retourne fasle si le nombres de caractères est non compris entre min et max
export function textLength(str, min, max) {
    if (parseInt(str.length) < min || parseInt(str.length) > max) {
        return false;
    }
    return true;
}

// retourne false si
export function isAddress(str) {
    return /^([0-9a-zA-Z'àâéèêëôùûçÏÎîïÀÂÉÈÔÙÛÇ-\s]{1,50})$/.test(str);
}

// retourne false si chaine n'est pas alphabétique
export function isMail(str) {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        str
    );
}