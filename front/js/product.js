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
        //Boucle pour implémenter les différentes couleurs du produit
        for (i= 0; i < data.colors.length; i++){
            document.createElement("option")
            document.querySelector("#colors")
            .innerHTML += 
                `<option value="${data.colors[i]}">${data.colors[i]}</option>`
        }
        //Cibler le bouton "Ajouter au panier" afin de pouvoir créer un événement
        const btnPanier = document.getElementById("addToCart");
            btnPanier.addEventListener("click", (e)=>{
                //Pour annuler le comportement par défaut du bouton 
                e.preventDefault();
                //Création d'une constante avec comme objet les valeurs des produits
                const productValue = {
                    name: data.name,
                    id: recoveryId,
                    price: data.price,
                    description: data.description,
                    alt: data.altTxt,
                    color: document.getElementById("colors").value,
                    quantity: document.getElementById("quantity").value,
                    image: data.imageUrl,
                }
                productValue;
                console.log(productValue);
            })
        })
.catch(error => console.log(error));

 

    