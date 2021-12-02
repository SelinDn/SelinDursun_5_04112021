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
            document.location.href = "./cart.html";
            
            /*Vérification pour savoir si le localStorage comporte une clé
            JSON.parse permet de transformer un fichier JSON en objet JS */
            let addProductToLocalStorage = JSON.parse(localStorage.getItem("Kanap"));
            /*Dans le cas de produits avec même id et couleur présents dans le panier 
            JSON.stringify permet de transformer un objet JS en fichier JSON
            La méthode find permet de trouver le premier élément en respectant la condition donnée,
            ici si un produit a le même id et la même couleur, on incrémente juste la quantité */
            if (addProductToLocalStorage){
                let resultProduct = addProductToLocalStorage.find(
                    (element) => element.id === recoveryId && element.color === document.getElementById("colors").value);
                if (resultProduct) {
                    let result = parseInt(productValue.quantity) + parseInt(resultProduct.quantity);
                    resultProduct.quantity = result;
                    localStorage.setItem("Kanap", JSON.stringify(addProductToLocalStorage));
                    console.log(addProductToLocalStorage);
                    } 
                    /*Dans le cas où la condition find est false 
                    Pour pouvoir ajouter d'autres produits au localStorage */
                    else {
                        addProductToLocalStorage.push(productValue);
                        localStorage.setItem("Kanap", JSON.stringify(addProductToLocalStorage));
                    }
                }
            //Dans le cas où le panier est vide, création d'un array qu'on transmet au localStorage
            else{
                addProductToLocalStorage = [];
                addProductToLocalStorage.push(productValue);
                localStorage.setItem("Kanap", JSON.stringify(addProductToLocalStorage));
                console.log(addProductToLocalStorage);
            }       
        })
    })
.catch(error => console.log(error));

 

