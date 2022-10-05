dogsAPI = 'https://api.thedogapi.com/v1/images/search'

const randomDogImg = document.querySelector('.randomDog')
const buttonNewDog = document.querySelector('.newDog')

async function fetchRandomDog() {
    let response = await fetch(dogsAPI)
    let data = await response.json()
    randomDogImg.src = data[0].url
}

buttonNewDog.addEventListener('click',fetchRandomDog)

