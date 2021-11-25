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

//Création d'un array pour stocker les prix à l'intérieur avec l'aide d'une boucle for 
const totalPriceArray = [];
for (let j=0; j < addProductToLocalStorage.length; j++){
    const totalPriceProducts = (addProductToLocalStorage[j].price * addProductToLocalStorage[j].quantity);
    totalPriceArray.push(totalPriceProducts);
    console.log(totalPriceArray)
}

//Méthode de calcul avec reduce pour accumuler les prix ensemble et retourner un total 
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceArray.reduce(reducer, 0);
console.log(totalPrice)

//Affichage du prix  
document.getElementById("totalPrice").innerHTML = `${totalPrice}`;

//Selection de l'input pour saisir la quantité d'articles 
const quantity = document.querySelectorAll(".itemQuantity");
let quantityArticle = 0;

/*Ajout d'une boucle afin de récupérer la quantité d'articles et de l'incrémenter 
dans une variable avec la quantité saisie */
for(k=0; k < quantity.length; k++){
    quantityArticle += parseInt(quantity[k].value) 
}

//Affichage du nombre d'articles 
document.getElementById("totalQuantity").innerHTML = quantityArticle; 

//Création d'une fonction pour prendre en charge la modification d'articles sur la page panier
function changeQuantity (){
    const modifyQuantity = document.querySelectorAll(".itemQuantity");

    //Boucle pour itérer sur chaque articles et afin de les écouter 
    for(let i=0; i < modifyQuantity.length; i++){
        modifyQuantity[i].addEventListener("change", (e) => {
            e.preventDefault();

            //Ciblage de l'article correspondant avec element.closest()
            let productId = e.target.closest("article").dataset.id;
            let productColor = addProductToLocalStorage[i].color;
            let actualQuantity = addProductToLocalStorage[i].quantity;
            let newQuantity = e.target.value;
            console.log(productId, productColor, newQuantity, actualQuantity);

            //Méthode find pour rechercher les articles ayant le même id et la même couleur
            const productSearch = addProductToLocalStorage.find(
                (element) => element.id === productId && element.color === productColor 
            )
            productSearch.quantity = newQuantity;
            actualQuantity = productSearch.quantity;
            localStorage.setItem("Kanap", JSON.stringify(addProductToLocalStorage));
            //Permet de rafraîchir la page 
            location.reload();
        }) 
    }
}
changeQuantity();

//Création d'une fonction pour prendre en charge la suppression des articles 
function deleteArticle (){
    const deleteChoice = document.querySelectorAll(".deleteItem");

    //Boucle pour itérer sur chaque article et afin de les écouter 
    for(let i=0; i < deleteChoice.length; i++){
        deleteChoice[i].addEventListener("click", (e) => {
            e.preventDefault();

            //Ciblage de l'article correspondant avec element.closest()
            let deleteProductId = e.target.closest("article").dataset.id;
            let deleteProductColor = addProductToLocalStorage[i].color;
            console.log(deleteProductId, deleteProductColor);

            /*Méthode filter pour créer un nouveau array en supprimant l'article choisi
            par rapport à son id et à sa couleur */
            const productDelete = addProductToLocalStorage.filter(
                (element) => element.id !== deleteProductId || element.color !== deleteProductColor
            )
            addProductToLocalStorage = productDelete;
            localStorage.setItem("Kanap", JSON.stringify(addProductToLocalStorage));
            //Permet de rafraîchir la page 
            location.reload();
            alert("Êtes-vous sûr de vouloir vider votre panier ?");
        })
    }
}
deleteArticle();

//Sélection du bouton "Commander" du formulaire
const btn_form = document.querySelector("#order");

//Ajout du addEventListener sur le bouton 
btn_form.addEventListener("click", (e) => {
    e.preventDefault();

    //Création d'un array vide afin de récupérer les produits du localStorage à l'intérieur
    let products = [];
    for(let i=0; i < addProductToLocalStorage.length; i++){
        products.push(addProductToLocalStorage[i].id);
    }
    console.log(products)

    //Récupérer les valeurs du formulaire dans un objet order
    const order = {
        contact : {
            firstName : document.querySelector("#firstName").value,
            lastName : document.querySelector("#lastName").value,
            address : document.querySelector("#address").value,
            city : document.querySelector("#city").value,
            email : document.querySelector("#email").value
        },
        products : products,
    }
    console.log(order);

    //Vérification des valeurs du formulaire avant envoi

    //Contrôle de validité sur le prénom
    function firstNameControl(){
        const theFirstName = order.contact.firstName;
        if(/^[^0-9 #<>:!? @][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]+$/.test(theFirstName)){
            console.log("OK");
            let firstNameError = document.querySelector("#firstNameErrorMsg");
            firstNameError.innerText = "";
            return true;
        }
        else{
            console.log("KO")
            let firstNameError = document.querySelector("#firstNameErrorMsg");
            firstNameError.innerText = "Chiffres et symboles non autorisés";
            return false;
        };
    };

    //Contrôle de validité sur le nom
    function lastNameControl(){
        const theLastName = order.contact.lastName;
        if(/^[^0-9 #<>:!? @][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]+$/.test(theLastName)){
            console.log("OK");
            let lastNameError = document.querySelector("#lastNameErrorMsg");
            lastNameError.innerText = "";
            return true;
        }
        else{
            console.log("KO")
            let lastNameError = document.querySelector("#lastNameErrorMsg");
            lastNameError.innerText = "Chiffres et symboles non autorisés";
            return false;
        };
    };
    
    //Contrôle de validité sur l'adresse
    function addressControl(){
        const theAddress = order.contact.address;
        if(/^[^ #<>:!?@][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]{8,40}$/.test(theAddress)){
            console.log("OK");
            let addressError = document.querySelector("#addressErrorMsg");
            addressError.innerText = "";
            return true;
        }
        else{
            console.log("KO")
            let addressError = document.querySelector("#addressErrorMsg");
            addressError.innerText = "Symboles non autorisés, veuillez renseigner une adresse valide";
            return false;
        };
    };

    //Contrôle de validité sur la ville
    function cityControl(){
        const theCity = order.contact.city;
        if(/^[^ 0-9#<>:!?@][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]{2,40}$/.test(theCity)){
            console.log("OK");
            let cityError = document.querySelector("#cityErrorMsg");
            cityError.innerText = "";
            return true;
        }
        else{
            console.log("KO")
            let cityError = document.querySelector("#cityErrorMsg");
            cityError.innerText = "Chiffres et symboles non autorisés, veuillez renseigner un nom de ville correcte";
            return false;
        };
    };

    //Contrôle de validité sur l'email
    function emailControl(){
        const theEmail = order.contact.email;
        if(/^[^ <>?][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-_]+[@]{1}[^ <>?][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-_]+[.]{1}[a-z]{2,20}$/.test(theEmail)){
            console.log("OK");
            let emailError = document.querySelector("#emailErrorMsg");
            emailError.innerText = "";
            return true;
        }
        else{
            console.log("KO")
            let emailError = document.querySelector("#emailErrorMsg");
            emailError.innerText = "Email invalide, veuillez respecter le format d'une adresse mail";
            return false;
        };
    };

    //Création d'une condition pour respecter tout les champs du formulaire
    if(firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl()){
        
        //Si toutes les conditions sont respectées, on envoit une requête POST à l'API via un fetch
        fetch("http://localhost:3000/api/products/order", {
            method : "POST",

            body : JSON.stringify(order),

            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
        })
        
        //Récupération de la réponse que l'on transmet dans l'URL de la page confirmation.html
        .then((response) => response.json())
        .then((data) => {
            document.location.href = "./confirmation.html?id=" + data.orderId
        })
        .catch(error => console.log(error));

    }
    else{
        alert("Veuillez bien renseigner le formulaire");
    }
});