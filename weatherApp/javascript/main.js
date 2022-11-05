const ville1 = document.querySelector('.city1')
const ville2 = document.querySelector('.city2')
const ville3 = document.querySelector('.city3')
const climate1= document.querySelector('.actualClimate1')
const climate2= document.querySelector('.actualClimate2')
const climate3= document.querySelector('.actualClimate3')
const hour1 = document.querySelector(".currentHour1")
const hour2 = document.querySelector(".currentHour2")
const hour3 = document.querySelector(".currentHour3")
const temp1 = document.querySelector(".degree1")
const temp2 = document.querySelector(".degree2")
const temp3 = document.querySelector(".degree3")


let date= new Date()

let heures =date.getHours()
let minutes= date.getMinutes()

hour1.innerHTML = `${heures}h${minutes}`
hour2.innerHTML = `${heures-4}h${minutes}`
hour3.innerHTML= `${heures-5}h${minutes}`

fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=45.764043&lon=4.835659&appid=1ace557c8e5fe4232ca3e7a31ebc9ba9')
    .then(nomVille1 =>nomVille1.json())
    .then(nomVille1=>(ville1.innerHTML=nomVille1.name))

fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=-22.9027800&lon=-43.2075000&appid=1ace557c8e5fe4232ca3e7a31ebc9ba9')
    .then(nomVille2 =>nomVille2.json())
    .then(nomVille2=>(ville2.innerHTML=nomVille2.name))

fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=40.712784&lon=-74.005941&appid=1ace557c8e5fe4232ca3e7a31ebc9ba9')
    .then(nomVille3 =>nomVille3.json())
    .then(nomVille3=>(ville3.innerHTML=nomVille3.name))




fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=45.764043&lon=4.835659&appid=1ace557c8e5fe4232ca3e7a31ebc9ba9')
    .then(temperature1 => temperature1.json())
    .then(temperature1=>temp1.innerHTML=`${Math.floor(temperature1.main.temp)}°C`)

fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=-22.9027800&lon=-43.2075000&appid=1ace557c8e5fe4232ca3e7a31ebc9ba9')
    .then(temperature2 => temperature2.json())
    .then(temperature2=>temp2.innerHTML=`${Math.floor(temperature2.main.temp)}°C`)

fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=40.712784&lon=-74.005941&appid=1ace557c8e5fe4232ca3e7a31ebc9ba9')
    .then(temperature3 => temperature3.json())
    .then(temperature3=>temp3.innerHTML=`${Math.floor(temperature3.main.temp)}°C`)


fetch('https://api.openweathermap.org/data/2.5/weather?lat=45.764043&lon=4.835659&appid=1ace557c8e5fe4232ca3e7a31ebc9ba9')
    .then(ActualClimate1 =>ActualClimate1.json())
    .then(ActualClimate1=>climate1.innerHTML=ActualClimate1.weather[0].main)


fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=-22.9027800&lon=-43.2075000&appid=1ace557c8e5fe4232ca3e7a31ebc9ba9')
    .then(ActualClimate2 =>ActualClimate2.json())
    .then(ActualClimate2=>climate2.innerHTML=ActualClimate2.weather[0].main)


fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=40.712784&lon=-74.005941&appid=1ace557c8e5fe4232ca3e7a31ebc9ba9')
    .then(ActualClimate3 =>ActualClimate3.json())
    .then(ActualClimate3=>climate3.innerHTML=ActualClimate3.weather[0].main)







