async function renderPortfolioHighlights() {
    const modalsContainer = document.getElementById('modals')
    const projectsMessage = document.getElementById('projects-message')

    if (!modalsContainer) return

    if (projectsMessage) {
        projectsMessage.textContent = 'Carregando projetos...'
        projectsMessage.style.display = 'block'
    }

    try {
        const response = await fetch('https://api.github.com/users/dimasdevspro/repos?per_page=100')
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`)

        const data = await response.json()
        const reposComHomepage = data.filter(repo => repo.homepage)

        if (reposComHomepage.length === 0) {
            if (projectsMessage) {
                projectsMessage.textContent = 'Nenhum projeto com homepage foi encontrado.'
            }
            return
        }

        const projectImages = {
            'Portfolio': 'Portfolio.png',
            'Miniblog': 'Miniblog.png',
            'DevLinks': 'DevLinks.png',
            'Ciclos_e_Biorritmos_da_Vida': 'Ciclos e Biorritmos da Vida.png',
            'Costs': 'Costs.png',
            'Site_Foodfy': 'Foodfy.png',
            'Site_Olimpiadas_2016': 'Olympiadas.png',
            'WhatsCam': 'WhatsCam.png',
            'Dev.finances': 'Dev Finance.png',
            'Countdown': 'CountDown.png',
            'Sidebar': 'SideBar.png',
            'Rocketnews': 'RocketNews.png',
            'Receitas': 'Receitas.png',
            'Rocketflix': 'Rocketflix.png',
            'Rocketcard': 'Rocketcard.png',
            'Rocketshoes': 'Rocketshoes.png',
            'Camp.in': 'Camp.in.png',
            'Rocketnfts': 'Rocketnfts.png',
            'Rocketcoffee': 'Rocketcoffee.png',
            'Rocketblog': 'Rocketblog.png',
            'Pricing_Table': 'Pricingtable.png',
            'Lista': 'Lista de Presença.png',
            'Bloco_de_Notas': 'Bloco de Notas.png',
            'Wallet-For-Sellers': 'E-Wallet-R.png',
            'Imagem Geral': 'Imagem Geral.png',
            'SocialTree': 'Social Tree.png',
        }

        const languageIcons = {
            'JavaScript': 'JavaScript_icon.png',
            'TypeScript': 'Typescript_icon.svg',
            'HTML': 'HTML_icon.svg',
            'CSS': 'CSS_icon.svg',
            'Python': 'React_icon.png',
            'Shell': 'React_icon.png',
            'Unknown': 'React_icon.png'
        }

        modalsContainer.innerHTML = reposComHomepage
            .map(repo => {
                const dateText = new Date(repo.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })
                const imageFile = projectImages[repo.name] || 'Imagem Geral.png'
                const stackIcon = languageIcons[repo.language] || 'React_icon.png'
                const description = repo.description || 'Sem descrição'

                return `
                    <div class="modal" id="${imageFile}">
                        <img class="image_modal" src="./assets/${imageFile}" alt="${repo.name}" />
                        <div class="modal_content">
                            <div class="modal_header">
                                <p>${dateText}</p>
                                <img src="./assets/${stackIcon}" alt="stack icon" />
                            </div>
                            <div class="modal_body">
                                <h2>${repo.name}</h2>
                                <p>${description}</p>
                                <a class="link_deploy" id="link_deploy_${repo.name.replace(/[^a-zA-Z0-9]/g, '_')}" href="${repo.homepage}" target="_blank" rel="noopener noreferrer">Ver Projeto</a>
                            </div>
                        </div>
                    </div>`
            })
            .join('')

        const modalOverlay = document.querySelector('.modal_overlay')
        const modals = document.querySelectorAll('#modals .modal')

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

                const link = modal.querySelector('.link_deploy')
                const overlayLink = modalOverlay.querySelector('#link_deploy_overlay')

                if (link) {
                    overlayLink.href = link.href
                    overlayLink.style.display = "inline-block"
                } else {
                    overlayLink.style.display = "none"
                }
            })
        }

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

        if (projectsMessage) {
            projectsMessage.style.display = 'none'
        }

        document.querySelector('.close_modal').addEventListener("click", function (e) {
            e.stopPropagation()
            modalOverlay.classList.remove('active')
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
    } catch (error) {
        console.error('Erro ao carregar projetos:', error)
        if (projectsMessage) {
            projectsMessage.textContent = 'Não foi possível carregar os projetos. Verifique a conexão ou a API do GitHub.'
        }
    }
}

renderPortfolioHighlights()