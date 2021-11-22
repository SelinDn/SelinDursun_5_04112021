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

//Création d'une fonction pour contrôler les valeurs du formulaire et l'écouter 
function formValidity (){
    const form = document.querySelector(".cart__order__form");

    //Ajout d'un addEventListener sur tout les inputs du formulaire
    form.firstName.addEventListener("change" , function(){
        firstNameValidity(this);
    });

    form.lastName.addEventListener("change" , function(){
        lastNameValidity(this);
    });

    form.address.addEventListener("change" , function(){
        addressValidity(this);
    });

    form.city.addEventListener("change" , function(){
        cityValidity(this);
    });

    form.email.addEventListener("change" , function(){
        emailValidity(this);
    });

    //Test de tout les inputs du formulaire en appelant les fonctions de chacuns

    //Test pour le firstName
    const firstNameValidity = function(inputOfFirstName){
        //Création de la regEx pour le firstName 
        let firstNameRegEx = new RegExp(
            "^[^0-9 #<>:!? @][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]+$"
        );

        if (firstNameRegEx.test(inputOfFirstName.value)){
            return true,
            inputOfFirstName.nextElementSibling.innerHTML = ""
        }
        else{
            inputOfFirstName.nextElementSibling.innerHTML = "Prénom non valide" 
        };
    };

    //Test pour le lastName
    const lastNameValidity = function(inputOfLastName){
        //Création de la regEx pour le lastName 
        let lastNameRegEx = new RegExp(
            "^[^0-9 #<>:!?@][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]+$"
        );

        if (lastNameRegEx.test(inputOfLastName.value)){
            return true,
            inputOfLastName.nextElementSibling.innerHTML = "" 
        }
        else{
            inputOfLastName.nextElementSibling.innerHTML = "Nom non valide" 
        };
    };

    //Test pour l'adresse
    const addressValidity = function(inputOfAddress){
        //Création de la regEx pour l'adresse
        let addressRegEx = new RegExp(
            "^[^ #<>:!?@][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]{8,40}$"
        );

        if (addressRegEx.test(inputOfAddress.value)){
            return true,
            inputOfAddress.nextElementSibling.innerHTML = "" 
        }
        else{
            inputOfAddress.nextElementSibling.innerHTML = "Adresse non valide" 
        };
    };

    //Test pour la ville
    const cityValidity = function(inputOfCity){
        //Création de la regEx pour la ville
        let cityRegEx = new RegExp(
            "^[^ 0-9#<>:!?@][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]{2,40}$"
        );

        if (cityRegEx.test(inputOfCity.value)){
            return true,
            inputOfCity.nextElementSibling.innerHTML = "" 
        }
        else{
            inputOfCity.nextElementSibling.innerHTML = "Nom de ville invalide" 
        };
    };

    //Test pour l'email
    const emailValidity = function(inputOfEmail){
        //Création de la regEx pour l'email
        let emailRegEx = new RegExp(
            "^[^ <>?][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-_]+[@]{1}[^ <>?][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-_]+[.]{1}[a-z]{2,20}$"
        );

        if (emailRegEx.test(inputOfEmail.value)){
            return true,
            inputOfEmail.nextElementSibling.innerHTML = "" 
        }
        else{
            inputOfEmail.nextElementSibling.innerHTML = "Adresse mail invalide" 
        };
    };

    //Ciblage du bouton "Commander" pour soumettre le formulaire
    const postForm = document.getElementById("order");
    postForm.addEventListener("click", (e) =>{
        e.preventDefault();

        //Création d'un array regroupant les id des produits présents dans le localStorage
        let products = [];
        for (let i=0; i<addProductToLocalStorage.length; i++){
            products.push(addProductToLocalStorage[i].id)
        }
        console.log(products)

        //Création de l'objet regroupant les saisies de l'internaute et l'array précedemment créé
        const order = {
            contact:{
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value,
            },
            products: products
        }
        console.log(order)

        //Condition "Si" les attentes du formulaire sont respectées 
        if(firstNameValidity() && lastNameValidity() && addressValidity() && cityValidity() && emailValidity()){

            //On demande l'orderId à l'API via un fetch POST
            fetch("http://localhost:3000/api/products/order", {
                method:"POST",

                body: JSON.stringify(order),

                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
            .then((response) => response.json())
            .then((data) => {
                document.location.href = `confirmation.html?orderId=${data.orderId}`
            })
            .catch(error => console.log(error))
        }
    })
}
formValidity();





//Création d'une fonction pour envoyer le formulaire au serveur
/*function formSave(){
    const btnForm = document.querySelector("#order");

    btnForm.addEventListener("submit" , (e) => {
        e.preventDefault();
       
        /*Création du tableau de produits demandé et d'une boucle 
        pour y ajouter tout les produits contenus dans le localStorage*/
       /* let arrayOfProductId = [];
        for(let i=0; i < addProductToLocalStorage.length; i++){
            arrayOfProductId.push(addProductToLocalStorage[i].id);
        }

        //Création de l'objet demandé contenant aussi le tableau de produits
        const order = {
            contact : {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value
            },
            products : arrayOfProductId
        }

        //Création de la condition "Si" afin de vérifier les valeurs du formulaire avant envoi
        if(firstNameValidity() && lastNameValidity() && addressValidity() && cityValidity() && emailValidity()){
            //Envoi de la demande avec fetch méthode POST
            fetch("http://localhost:3000/api/products/order", {
                method:"POST",

                body: JSON.stringify(order),

                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
            .then(response => response.json())
            .then((data) => {
                window.location.href = `confirmation.html?orderId=${data.orderId}`
            })
            .catch(error => console.log(error))
        
        };
    });
}
formSave(); */