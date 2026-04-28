async function getContent() {
    const response = await fetch('https://api.github.com/users/dimasdevspro/repos?per_page=100')
    const data = await response.json()

    const reposComHomepage = data.filter(repo => repo.homepage)
    const highlightModals = document.querySelectorAll('#modals .modal')

    const repoNamesByModalId = {
        'Bloco de Notas.png': 'notepad-nlw-expert',
        'Rocketnfts.png': 'rocketnfts',
        'Rocketcard.png': 'rocketcard'
    }

    highlightModals.forEach(modal => {
        const titleEl = modal.querySelector('.modal_body h2')
        if (!titleEl) return

        const modalId = modal.getAttribute('id')
        const expectedRepoName = repoNamesByModalId[modalId] || titleEl.textContent
        const repo = reposComHomepage.find(item => item.name.toLowerCase() === expectedRepoName.toLowerCase())
        if (!repo) return

        const dateText = new Date(repo.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })

        modal.querySelector('.modal_header p').textContent = dateText
        const link = modal.querySelector('#link_deploy')
        if (link) link.href = repo.homepage
    })
}

getContent()