dogsAPI = 'https://api.thedogapi.com/v1/images/search?limit=3'

const randomDogImg = document.querySelector('.randomDog__img')
const buttonNewDog = document.querySelector('.newDog')

async function fetchRandomDog() {
    let response = await fetch(dogsAPI)
    let data = await response.json()
    console.log(data);
    randomDogImg.src = data[0].url
}

fetchRandomDog()
// buttonNewDog.addEventListener('click',fetchRandomDog)