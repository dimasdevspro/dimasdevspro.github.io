// Inicializa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {

    // 🔹 Inicializa EmailJS
    emailjs.init("_viTqIIfUXY6zxV5j");

    // 🔹 Formulário
    const form = document.getElementById("form_contato");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            emailjs
                .sendForm("service_smzykpi", "template_bgs8rfe", this)
                .then(() => {
                    alert("Mensagem enviada com sucesso!");
                    form.reset();
                })
                .catch((error) => {
                    alert("Erro ao enviar mensagem");
                    console.error(error);
                });
        });
    }

    // 🔹 Atualiza link do CV
    updateCvLink();
});


// 🔹 Função separada (boa prática)
function updateCvLink() {
    const lang = document.documentElement.lang;

    const file = lang.includes("en")
        ? "./assets/Curriculum_DimasAlvesPereira_2026_OnePage_EN.pdf"
        : "./assets/Curriculum_DimasAlvesPereira_2026_OnePage_BR_Pt.pdf";

    const link = document.getElementById("cvLink");

    if (link) {
        link.href = file;
    }
}

// 🔹 Modal de projetos

const modalOverlay = document.querySelector('.modal_overlay')
const modals = document.querySelectorAll('.modal')

for (let modal of modals) {
    modal.addEventListener("click", function () {
        const imgId = modal.getAttribute("id")
        modalOverlay.classList.add('active')
        modalOverlay.querySelector("img").src = `./assets/${imgId}`

        const date = modal.querySelector('.modal_header p')
        modalOverlay.querySelector(".modal_header p").textContent = date.textContent

        const stack = modal.querySelector('.modal_header img')
        modalOverlay.querySelector(".modal_header img").src = stack.src

        const title = modal.querySelector('.modal_body h2')
        modalOverlay.querySelector(".modal_content h2").textContent = title.textContent

        const description = modal.querySelector('.modal_body p')
        modalOverlay.querySelector(".modal_body p").textContent = description.textContent

        const link = modal.querySelector('#link_deploy')
        const overlayLink = modalOverlay.querySelector('#link_deploy_overlay')

        if (link) {
            overlayLink.href = link.href
            overlayLink.style.display = "inline-block"
        } else {
            overlayLink.style.display = "none"
        }
    })
}

// 🔹 Configura event listener para o link "Ver Projeto" no modal overlay
const overlayLink = modalOverlay.querySelector('#link_deploy_overlay')
if (overlayLink) {
    overlayLink.onclick = function (e) {
        e.preventDefault()
        e.stopPropagation()
        const href = this.href
        if (href && href !== "#") {
            window.open(href, "_blank", "noopener,noreferrer")
        }
        return false
    }
}

document.querySelector('.close_modal').addEventListener("click", function (e) {
    e.stopPropagation()

    // Remove a classe active primeiro para fechar o modal
    modalOverlay.classList.remove('active')

    // Limpa todos os elementos do modal após a animação
    setTimeout(() => {
        modalOverlay.querySelector("img").src = ""
        modalOverlay.querySelector(".modal_header p").textContent = ""
        modalOverlay.querySelector(".modal_header img").src = ""
        modalOverlay.querySelector(".modal_body h2").textContent = ""
        modalOverlay.querySelector(".modal_body p").textContent = ""
        modalOverlay.querySelector("#link_deploy_overlay").href = ""
        modalOverlay.querySelector("#link_deploy_overlay").style.display = "none"
    }, 300)
})