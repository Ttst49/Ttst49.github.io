const cells = document.querySelectorAll('.cell')
const chris = document.querySelector('.chrisRock')
const score = document.querySelector('#score')
const timeLeft = document.querySelector('#timeLeft')
const boutonstart = document.querySelector('.start')


boutonstart.addEventListener('click',start)
let position;
let scoreValue = 0
let timeLeftValue = null
let startCountdown = null
let moveChris = null

cells.forEach(cell=>{
    cell.addEventListener('mousedown',()=>{

        if(  cell.id == position){
            scoreValue++
            score.innerHTML = scoreValue
            position = null
        }
    })
})


function randomlySpawnChris(){

    if(!timeLeftValue) return

    cells.forEach(cell=>{cell.classList.remove('chrisRock')})
    let randomCell = cells[Math.floor(Math.random()*9)]
    randomCell.classList.add('chrisRock')

    position = randomCell.id





}

function countdown(){

    if(!timeLeftValue) return
    timeLeftValue--
    timeLeft.innerHTML = timeLeftValue

    if (timeLeftValue == 0){

        clearInterval(moveChris)
        clearInterval(startCountdown)

        alert(`game over. Score : ${scoreValue}`)
        console.log(timeLeftValue)

    }
}

function start(){
    scoreValue= 0
    score.innerHTML = scoreValue
    timeLeftValue =20
    startCountdown= setInterval(countdown, 1000)
    moveChris = setInterval(randomlySpawnChris,500)

}

