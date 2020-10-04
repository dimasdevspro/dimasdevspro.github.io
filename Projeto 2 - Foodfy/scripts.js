const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener("click", function(){
        const imgId = card.getAttribute("id")
        modalOverlay.classList.add('active')
        modalOverlay.querySelector("img").src =`/Projeto 2 - Foodfy/assets/${imgId}`

        const title = card.querySelector('.title_revenue p')
        modalOverlay.querySelector(".modal-content .title_revenue p").textContent=title.textContent

        const author = card.querySelector('.author_revenue p')
        modalOverlay.querySelector(".modal-content .author_revenue p").textContent=author.textContent
    })
}

document.querySelector('.close-modal').addEventListener("click", function(){
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('iframe').src = ""
})



