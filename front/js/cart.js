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
        //Ici il y aura le fetch
    }
    else{
        alert("Veuillez bien renseigner le formulaire");
    }
})









    

       
    
/*document.getElementById("firstName").addEventListener("input", function(e){
    if(/^[^0-9 #<>:!? @][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]+$/.test(e.target.value)){
        document.getElementById("firstNameErrorMsg").innerText = ""
    }
    else{
        document.getElementById("firstNameErrorMsg").innerText = "Veuillez renseigner votre prénom"
    }
})

document.getElementById("lastName").addEventListener("input", function(e){
    if(/^[^0-9 #<>:!? @][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]+$/.test(e.target.value)){
        document.getElementById("lastNameErrorMsg").innerText = ""
    }
    else{
        document.getElementById("lastNameErrorMsg").innerText = "Veuillez renseigner votre nom"
    }
})

document.getElementById("address").addEventListener("input", function(e){
    if(/^[^ #<>:!?@][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]{8,40}$/.test(e.target.value)){
        document.getElementById("addressErrorMsg").innerText = ""
    }
    else{
        document.getElementById("addressErrorMsg").innerText = "Veuillez saisir une adresse valide"
    }
})

document.getElementById("city").addEventListener("input", function(e){
    if(/^[^ 0-9#<>:!?@][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]{2,40}$/.test(e.target.value)){
        document.getElementById("cityErrorMsg").innerText = ""
    }
    else{
        document.getElementById("cityErrorMsg").innerText = "Veuillez indiquer le nom de votre ville"
    }
})


document.getElementById("email").addEventListener("input", function(e){
    if(/^[^ <>?][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-_]+[@]{1}[^ <>?][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-_]+[.]{1}[a-z]{2,20}$/.test(e.target.value)){
        document.getElementById("emailErrorMsg").innerText = ""
    }
    else{
        document.getElementById("emailErrorMsg").innerText = "Veuillez renseigner une adresse mail valide"
    }
})

const post = document.getElementById("order");
post.addEventListener("click", function(e){
    e.preventDefault();

   
    
        let products = [];
        for (let i=0; i<addProductToLocalStorage.length; i++){
            products.push(addProductToLocalStorage[i].id)
        }
        console.log(products)

    
        const order = {
            contact : {
                firstName : document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value,
            },
            products: products,
        }

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
    
}) */













/*function validateForm (){

    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
        event.preventDefault();

        let firstNameRegex = /^[^0-9 #<>:!? @][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]+$/
        let lastNameRegex = /^[^0-9 #<>:!?@][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]+$/
        let addressRegex = /^[^ #<>:!?@][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]{8,40}$/
        let cityRegex = /^[^ 0-9#<>:!?@][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]{2,40}$/ 
        let emailRegex = /^[^ <>?][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-_]+[@]{1}[^ <>?][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-_]+[.]{1}[a-z]{2,20}$/
    
        let products = [];
        for (let i=0; i<addProductToLocalStorage.length; i++){
            products.push(addProductToLocalStorage[i].id)
        }
        console.log(products)


        const order = {
            contact:{
                firstName : document.getElementById('firstName').value,
                lastName : document.getElementById('lastName').value,
                address : document.getElementById('address').value,
                city : document.getElementById('city').value,
                email : document.getElementById('email').value
            },
            products: products
        }

        function validateFirstName() {
            const firstNameDom = document.querySelector(".cart__order__form");
            firstNameDom.firstName.addEventListener("change", (event) => {
                event.preventDefault();
                const validyFirstName = order.contact.firstName;
                if (firstNameRegex.test(validyFirstName) && validyFirstName !="") {
                    let errorFirstName = document.getElementById('firstNameErrorMsg');
                    errorFirstName.innerHTML = ""
                } 
                else {
                    let errorFirstName = document.getElementById('firstNameErrorMsg');  
                    errorFirstName.innerHTML = "Veuillez saisir votre prénom";
                }
            })
        }

        function validateLastName() {
            const lastNameDom = document.querySelector(".cart__order__form");
            lastNameDom.firstName.addEventListener("change", (event) => {
                event.preventDefault();
                const validyLastName = order.contact.lastName;
                if (lastNameRegex.test(validyLastName) && validyLastName !="") {
                    let errorLastName = document.getElementById('lastNameErrorMsg');
                    errorLastName.innerHTML = ""
                } 
                else {
                    let errorLastName = document.getElementById('lastNameErrorMsg');  
                    errorLastName.innerHTML = "Veuillez saisir votre nom";
                }
            })
        }

        function validateAddress() {
            const validyAddress = order.contact.address;
            if (addressRegex.test(validyAddress) && validyAddress !="") {
                let errorAddress = document.getElementById('addressErrorMsg');
                errorAddress.innerHTML = ""
            } 
            else {
                let errorAddress = document.getElementById('addressErrorMsg');  
                errorAddress.innerHTML = "Veuillez renseigner une adresse correcte";
            }
        }

        function validateCity() {
            const validyCity = order.contact.city;
            if (cityRegex.test(validyCity) && validyCity!="") {
                let errorCity = document.getElementById('cityErrorMsg');
                errorCity.innerHTML = ""
            } 
            else {
                let errorCity = document.getElementById('cityErrorMsg');  
                errorCity.innerHTML = "Veuillez indiquer le nom de votre ville";
            }
        }

        function validateEmail() {
            const validyEmail = order.contact.email;
            if (emailRegex.test(validyEmail) && validyEmail !="") {
                let errorEmail = document.getElementById('emailErrorMsg');
                errorEmail.innerHTML = ""
            } 
            else {
                let errorEmail = document.getElementById('emailErrorMsg');  
                errorEmail.innerHTML = "Veuillez saisir une adresse mail correcte";
            }
        }

        function checkForm() {
            if (validateFirstName() && validateLastName() && validateAddress() && validateCity() && validateEmail()) {
               return true
            }
        }
        checkForm()  

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
            if (checkForm()) {
                document.location.href = `confirmation.html?orderId=${data.orderId}`
            }
        })
        .catch(error => console.log(error))
    })
}
validateForm(); */










//Création d'une fonction pour contrôler les valeurs du formulaire et l'écouter 
/*function formValidity (){
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

        if (firstNameRegEx.test(inputOfFirstName.value) && form.firstName.value != ""){
            return true,
            inputOfFirstName.nextElementSibling.innerHTML = ""
        }
        else{
            return false,
            inputOfFirstName.nextElementSibling.innerHTML = "Prénom non valide" 
        };
    };

    //Test pour le lastName
    const lastNameValidity = function(inputOfLastName){
        //Création de la regEx pour le lastName 
        let lastNameRegEx = new RegExp(
            "^[^0-9 #<>:!?@][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]+$"
        );

        if (lastNameRegEx.test(inputOfLastName.value) && form.lastName.value != ""){
            return true,
            inputOfLastName.nextElementSibling.innerHTML = "" 
        }
        else{
            return false,
            inputOfLastName.nextElementSibling.innerHTML = "Nom non valide" 
        };
    };

    //Test pour l'adresse
    const addressValidity = function(inputOfAddress){
        //Création de la regEx pour l'adresse
        let addressRegEx = new RegExp(
            "^[^ #<>:!?@][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]{8,40}$"
        );

        if (addressRegEx.test(inputOfAddress.value) && form.address.value != "" ){
            return true,
            inputOfAddress.nextElementSibling.innerHTML = "" 
        }
        else{
            return false,
            inputOfAddress.nextElementSibling.innerHTML = "Adresse non valide" 
        };
    };

    //Test pour la ville
    const cityValidity = function(inputOfCity){
        //Création de la regEx pour la ville
        let cityRegEx = new RegExp(
            "^[^ 0-9#<>:!?@][a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-\s]{2,40}$"
        );

        if (cityRegEx.test(inputOfCity.value) && form.city.value !=""){
            return true,
            inputOfCity.nextElementSibling.innerHTML = "" 
        }
        else{
            return false,
            inputOfCity.nextElementSibling.innerHTML = "Nom de ville invalide" 
        };
    };

    //Test pour l'email
    const emailValidity = function(inputOfEmail){
        //Création de la regEx pour l'email
        let emailRegEx = new RegExp(
            "^[^ <>?][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-_]+[@]{1}[^ <>?][a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ,.'-_]+[.]{1}[a-z]{2,20}$"
        );

        if (emailRegEx.test(inputOfEmail.value) && form.email.value != ""){
            return true,
            inputOfEmail.nextElementSibling.innerHTML = "" 
        }
        else{
            return false,
            inputOfEmail.nextElementSibling.innerHTML = "Adresse mail invalide" 
        };
    }; 
    

    //Ciblage du bouton "Commander" pour soumettre le formulaire
    const postForm = document.getElementById("order");
    postForm.addEventListener("click", (e) => {
        e.preventDefault(); 

        //Création d'un array regroupant les id des produits présents dans le localStorage
        let products = [];
        for (let i=0; i<addProductToLocalStorage.length; i++){
            products.push(addProductToLocalStorage[i].id)
        }
        console.log(products)

        if(form.firstName.value && form.lastName.value && form.address.value && form.city.value && form.email.value){
        
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
            //if(firstNameValidity.value && lastNameValidity.value && addressValidity.value && cityValidity.value && emailValidity.value){
            
            
                
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
        console.log(form.firstName.value)
    })
}
formValidity(); */





