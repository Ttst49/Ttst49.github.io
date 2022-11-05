const hourhand= document.querySelector('.hoursHand')
const minuteshand = document.querySelector('.minutesHand')
const secondshand = document.querySelector('.secondsHand')




function time(){
    let date = new Date();

    let seconds = date.getSeconds()
    let degreesSecondes = seconds*6
    console.log(degreesSecondes)

    let minutes = date.getMinutes()
    let degreesMinutes = minutes*6 + seconds/10
    console.log(degreesMinutes)


    let heures = date.getHours()
    let degreesHeures = heures*30+minutes/2
    console.log(degreesHeures)



    secondshand.style.transform = `rotate(${degreesSecondes}deg)`
    minuteshand.style.transform = `rotate(${degreesMinutes}deg)`
    hourhand.style.transform = `rotate(${degreesHeures}deg)`
}


time()

setInterval(time,1000)