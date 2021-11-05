// Récupération de la chaîne de requête de l'id avec URLSearchParams
const queryStringUrlId = window.location.search;
console.log(queryStringUrlId);

//Création d'une nouvelle instance
const urlSearchParamsId = new URLSearchParams(queryStringUrlId);
console.log(urlSearchParamsId);

//Extraction de l'id sans les symboles
const recoveryId = urlSearchParamsId.get("id");
console.log(recoveryId);