// Fonction pour requêter l'api avec fetch
fetch("http://localhost:3000/api/products")
    // Récupération de la réponse émise
    .then(response => response.json())
    .then((data) =>{ 

        // Boucle pour parcourir la réponse émise 
        data.forEach(function(data){
            let div = document.createElement("div");
            div.classList.add("items");

            //Ajout des éléments dans le DOM
             document.getElementById("items")
            items.innerHTML += ` <a href="./product.html?id=${data._id}">
            <article>
              <img src="${data.imageUrl}" alt="${data.altTxt}">
              <h3 class="productName">${data.name}</h3>
              <p class="productDescription">${data.description}</p>
            </article>
          </a> `
        });
    })
    .catch(error => console.log(error));