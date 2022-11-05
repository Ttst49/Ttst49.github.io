const para = document.createElement('p')
paragraphe= document.querySelector('.punch')
const bouton = document.querySelector('.bouton')



    fetch("https://api.kanye.rest")
        .then(response => response.json())
        .then(response => {
            para.textContent=response.quote})

    paragraphe.appendChild(para);

bouton.addEventListener('click',()=>{
    fetch("https://api.kanye.rest")
        .then(response => response.json())
        .then(response => {
            para.textContent=response.quote})

    paragraphe.appendChild(para);

})