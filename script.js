const modalOverlay = document.querySelector('.modal-overaly');
cards = document.querySelectorAll(".card");

for (let card of cards) {
    card.addEventListener("click", function(){
        modalOverlay.classList.add('active')
        modalOverlay.querySelector('iframe').src ="/modal.html"

    })
}

document.querySelector(".close_modal").addEventListener("click", function(){
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector("iframe").src = ""
})

document.querySelector(".maximize_modal").addEventListener("click", function(){
    modalOverlay.classList.contains('active')
})