//Récupération de la clé du localStorage 
let addProductToLocalStorage = JSON.parse(localStorage.getItem("Kanap"));
console.log(addProductToLocalStorage);

//Affichage des éléments du localStorage dans la page panier
document.getElementById("cart__items");
if(addProductToLocalStorage === null){
    document.getElementById("cart__items").innerHTML =
    `<section class="cart">
        <section id="cart__items">
            <p>Votre panier est actuellement vide</p>
        </section>
    </section>`
}
else{
    for(i=0; i<addProductToLocalStorage.length; i++){
        document.getElementById("cart__items").innerHTML +=
        `<article class="cart__item" data-id="${addProductToLocalStorage[i].id}">
            <div class="cart__item__img">
                <img src="${addProductToLocalStorage[i].image}" alt="${addProductToLocalStorage[i].alt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${addProductToLocalStorage[i].name}</h2>
                    <p>${addProductToLocalStorage[i].price}€</p>
                    <p>${addProductToLocalStorage[i].color}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${addProductToLocalStorage[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
    }
};
