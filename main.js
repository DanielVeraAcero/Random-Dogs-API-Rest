// API - KEY
//! ?api_key=live_B2KZcrvAa0GSMCoQwXDy3PyobAygtXSugp3lRJnfaRgtMPw05oABjgoCN5g2jFlv

APIUrlRandomDogs = 'https://api.thedogapi.com/v1/images/search?limit=2'
APIUrlFavoriteDogs = 'https://api.thedogapi.com/v1/favourites'
APIUrlKey = '?api_key=live_B2KZcrvAa0GSMCoQwXDy3PyobAygtXSugp3lRJnfaRgtMPw05oABjgoCN5g2jFlv'

const randomDogContainer = document.querySelector('.randomDogs__content')
const favoriteDogContainer = document.querySelector('.favoriteDogs__content')
const buttonNewDog = document.querySelector('.randomDogs__getNew')
const errorMessage = document.querySelector('.error')

async function fetchFavoriteDog() {
    try {
        let response = await fetch(APIUrlFavoriteDogs)
        const status = response.status
        if (status != 200) throw new Error(`Error en la petición HTTP en Favorite: ${status}`);
        let data = await response.json()
        console.log('Favoritos');
        console.log(data);  

        data.forEach((element,index) => {
            favoriteDogContainer.innerHTML += ` 
                    <article class="favoriteDog">
                        <img class="favoriteDog__img" alt="">
                        <i class="ri-delete-bin-line favoriteDog__iconDelete"></i>
                    </article>
                `;
        });
    } catch (error) {
        console.log(error.message);
        errorMessage.innerHTML = `
            <img src="https://http.cat/401" alt="">
        `
    }
}

async function fetchRandomDog() {
    try {
        let response = await fetch(APIUrlRandomDogs)
        const status = response.status
        if (status != 200) throw new Error(`Error en la petición HTTP en Random: ${status}`);
        let data = await response.json()
        console.log('Random');
        console.log(data);  

        data.forEach((element,index) => {
            randomDogContainer.innerHTML += ` 
                    <article class="randomDog">
                        <img class="randomDog__img" src="${data[index].url}" alt="">
                        <i class="ri-heart-fill randomDog__iconFav"></i>
                    </article>
                `;
        });
    } catch (error) {
        console.log(error.message);
        errorMessage.innerHTML = `
            <img src="https://http.cat/200" alt="">
        `
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