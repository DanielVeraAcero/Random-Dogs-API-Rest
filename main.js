dogsAPI = 'https://api.thedogapi.com/v1/images/search?limit=4'

const randomDogContainer = document.querySelector('.randomDogs__content')
const buttonNewDog = document.querySelector('.randomDogs__getNew')

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

async function fetchRandomDog() {
    let response = await fetch(dogsAPI)
    let data = await response.json()
    // console.log(data);  

    data.forEach((element,index) => {
        randomDogContainer.innerHTML += ` 
                <article class="randomDog">
                    <img class="randomDog__img" src="${data[index].url}" alt="">
                    <i class="ri-heart-fill randomDog__iconFav"></i>
                </article>
            `;
    });
}

fetchRandomDog()
buttonNewDog.addEventListener('click', () => {removeChildNodes(randomDogContainer); fetchRandomDog()})