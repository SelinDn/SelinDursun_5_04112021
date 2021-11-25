//Récupération de l'Id de validation de commande
const searchId = window.location.search;
console.log(searchId);

//Création d'une nouvelle instance
const newSearchId = new URLSearchParams(searchId);
console.log(newSearchId);

//Extraction de l'id sans les symboles
const recoveryOrderId = newSearchId.get("id");
console.log(recoveryOrderId);

//Ciblage de l'élément orderId et ajout de l'orderId dans celui-ci
const returnOrderId = document.querySelector("#orderId");
returnOrderId.innerText = recoveryOrderId;