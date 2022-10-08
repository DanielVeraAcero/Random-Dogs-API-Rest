// API - KEY
//! ?api_key=live_B2KZcrvAa0GSMCoQwXDy3PyobAygtXSugp3lRJnfaRgtMPw05oABjgoCN5g2jFlv

APIUrlKey = '?api_key=live_B2KZcrvAa0GSMCoQwXDy3PyobAygtXSugp3lRJnfaRgtMPw05oABjgoCN5g2jFlv'
APIUrlRandomDogs = 'https://api.thedogapi.com/v1/images/search?limit=2'
APIUrlFavoriteDogs = 'https://api.thedogapi.com/v1/favourites?api_key=live_B2KZcrvAa0GSMCoQwXDy3PyobAygtXSugp3lRJnfaRgtMPw05oABjgoCN5g2jFlv'
APIUrlFavoriteDogsDelete = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=live_B2KZcrvAa0GSMCoQwXDy3PyobAygtXSugp3lRJnfaRgtMPw05oABjgoCN5g2jFlv`

const randomDogContainer = document.querySelector('.randomDogs__content')
const favoriteDogContainer = document.querySelector('.favoriteDogs__content')
const buttonNewDog = document.querySelector('.randomDogs__getNew')
const errorMessage = document.querySelector('.error')

/* throw new Error(`Error en la petición HTTP en Favorite: ${status}`); */

async function fetchFavoriteDog() {
    
    let response = await fetch(APIUrlFavoriteDogs)
    const status = response.status
    if (status != 200) {
        console.log(`Error en la petición HTTP en Favorite: ${status}`);
        errorMessage.innerHTML = `
            <img src="https://http.cat/${status}" alt="">
        `
    } else {
        let data = await response.json()
        console.log('Favoritos');
        console.log(data);  

        data.forEach((element,index) => {
            favoriteDogContainer.innerHTML += ` 
                    <article class="favoriteDog">
                        <img src="${data[index].image.url}" class="favoriteDog__img" alt="">
                        <i data-id=${data[index].id} class="ri-delete-bin-line favoriteDog__iconDelete"></i>
                    </article>
                `;
        });
        const buttonDeleteDog = document.querySelectorAll('.favoriteDog__iconDelete')
        // console.log(buttonDeleteDog);
        buttonDeleteDog.forEach(element => {
            element.addEventListener('click', () => {
                deleteFavoriteDog(element.dataset.id)
            })
        });
    }     
}

async function postFavoriteDog(id) {
    console.log('Guardando como favorito');
    const response = await fetch(APIUrlFavoriteDogs, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const status = response.status
    const data = await response.json();
    if (status != 200) {
        console.log(`Error en la petición HTTP en Favorite: ${status}`);
        errorMessage.innerHTML = `
            <img src="https://http.cat/${status}" alt="">
        `
    } else {
        removeChildNodes(favoriteDogContainer);
        fetchFavoriteDog();
    }
}

async function deleteFavoriteDog(id) {
    console.log('Borrando de favoritos');
    const response = await fetch(APIUrlFavoriteDogsDelete(id), {
        method: 'DELETE',        
    });
    const status = response.status
    if (status != 200) {
        console.log(`Error en la petición HTTP en Favorite: ${status}`);
        errorMessage.innerHTML = `
            <img src="https://http.cat/${status}" alt="">
        `
    } else {
        removeChildNodes(favoriteDogContainer);
        fetchFavoriteDog();
    }
}

async function fetchRandomDog() {

    let response = await fetch(APIUrlRandomDogs)
    const status = response.status
    if (status != 200) {
        console.log(`Error en la petición HTTP en Random: ${status}`);
        errorMessage.innerHTML = `
            <img src="https://http.cat/${status}" alt="">
        `
    } else {
        let data = await response.json()
        console.log('Random');
        console.log(data);  

        data.forEach((element,index) => {
            randomDogContainer.innerHTML += ` 
                    <article class="randomDog">
                        <img class="randomDog__img" src="${data[index].url}" alt="">
                        <i data-id=${data[index].id} class="ri-heart-fill randomDog__iconFav"></i>
                    </article>
                `;
        });
        const buttonFavoriteDog = document.querySelectorAll('.randomDog__iconFav')
        // console.log(buttonFavoriteDog);
        buttonFavoriteDog.forEach(element => {
            element.addEventListener('click', () => {
                console.log(element.dataset.id);
                postFavoriteDog(element.dataset.id);
            })
        });
    }      
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

fetchFavoriteDog()
fetchRandomDog()
buttonNewDog.addEventListener('click', () => {removeChildNodes(randomDogContainer); fetchRandomDog()})

