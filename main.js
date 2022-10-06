dogsAPI = 'https://api.thedogapi.com/v1/images/search?limit=3'

const randomDogImg_1 = document.querySelector('.randomDog1')
const randomDogImg_2 = document.querySelector('.randomDog2')
const randomDogImg_3 = document.querySelector('.randomDog3')
const buttonNewDog = document.querySelector('.newDog')

async function fetchRandomDog() {
    let response = await fetch(dogsAPI)
    let data = await response.json()
    console.log(data);
    randomDogImg_1.src = data[0].url
    randomDogImg_2.src = data[1].url
    randomDogImg_3.src = data[2].url
}

fetchRandomDog()
buttonNewDog.addEventListener('click',fetchRandomDog)