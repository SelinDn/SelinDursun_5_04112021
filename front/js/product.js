//Récupération de la chaîne de requête de l'id avec URLSearchParams
const queryStringUrlId = window.location.search;
console.log(queryStringUrlId);

//Création d'une nouvelle instance
const urlSearchParamsId = new URLSearchParams(queryStringUrlId);
console.log(urlSearchParamsId);

//Extraction de l'id sans les symboles
const recoveryId = urlSearchParamsId.get("id");
console.log(recoveryId);

//Requête de l'API via les id des éléments
fetch(`http://localhost:3000/api/products/${recoveryId}`)
    .then(res => res.json())
    //Ajout des détails du produit dans le DOM 
    .then(data => {
        document.querySelector(".item__img") 
        .innerHTML +=
            `<img src="${data.imageUrl}" alt="${data.altTxt}">`
        document.querySelector("#title")
        .innerHTML +=
            `<h1 id="title">${data.name}</h1>`
        document.querySelector("#price")
        .innerHTML += 
            `<span id="price">${data.price}</span>`
        document.querySelector("#description")
        .innerHTML += 
            `<p id="description">${data.description}</p>`
        document.querySelector("#colors")
        .innerHTML += 
            `<option value="">${data.colors}</option>`
    })
    .catch(error => console.log(error));
    
     

            

    