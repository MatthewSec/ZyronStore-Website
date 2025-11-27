const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const items = document.querySelectorAll('.item')
const dots = document.querySelectorAll('.dot')
const numberIndicator = document.querySelector('.number')
const list = document.querySelector('.list')

let active = 0
const total = items.length
let timer;3

function update(direction) {

    document.querySelector('.item.active').classList.remove('active')
    document.querySelector('.dot.active').classList.remove('active')

    if (direction > 0) {
        active = active + 1
        if (active === total) {
            active = 0
        }
    } else if (direction < 0) {
        active = active - 1

        if (active < 0) {
            active = total - 1
        }
    }

    items[active].classList.add('active')
    dots[active].classList.add('active')
    numberIndicator.textContent = String(active + 1).padStart(2, '0')
}

clearInterval(timer)
timer = setInterval(() => {
    update(1)
}, 5000);

prevButton.addEventListener('click', () => {
    update(-1)
})

nextButton.addEventListener('click', () => {
    update(1)
})

// delegação: quando clicar em .btn, abre descrição e esconde o próprio botão
document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn')
    if (!btn) return

    const item = btn.closest('.item')
    if (!item) return
    const desc = item.querySelector('.description')

    // fecha outros itens abertos
    document.querySelectorAll('.item.expanded').forEach(other => {
        if (other !== item) {
            other.classList.remove('expanded')
            const d = other.querySelector('.description')
            if (d) {
                d.setAttribute('aria-hidden', 'true')
                d.style.maxHeight = null
            }
            const b = other.querySelector('.btn')
            if (b) {
                b.classList.remove('hidden')
                b.style.display = ''
                b.textContent = 'Saiba Mais'
            }
        }
    })

    // abre o selecionado
    if (!item.classList.contains('expanded')) {
        item.classList.add('expanded')
        if (desc) {
            desc.setAttribute('aria-hidden', 'false')
            desc.style.maxHeight = desc.scrollHeight + 'px'
        }
        btn.classList.add('hidden')
        btn.style.display = 'none'
    }
})

/* Efeito hover nos cards de produto */
const cards = document.querySelectorAll(".produto-card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transition = "transform 0.25s ease";
        card.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
    });
});

/* Efeito hover nos cards "Mais Vendidos" */
const vendidosCards = document.querySelectorAll(".vendidos-card");

vendidosCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transition = "transform 0.25s ease";
        card.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
    });
});

function smoothScrollTo(targetY, duration = 1200) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;

        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing: easeInOutQuad
        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startY + distance * ease);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

// Corrige IDs e rolagem para as seções corretas
document.getElementById("btn-produtos").addEventListener("click", () => {
    const target = document.getElementById("estoque");
    if (target) {
        const offset = target.getBoundingClientRect().top + window.pageYOffset - 30;
        smoothScrollTo(offset, 1200);
    }
});

document.getElementById("btn-contatos").addEventListener("click", () => {
    const target = document.querySelector(".footer");
    if (target) {
        const offset = target.getBoundingClientRect().top + window.pageYOffset - 20;
        smoothScrollTo(offset, 1200);
    }
});

document.getElementById("btn-sobre").addEventListener("click", () => {
    const target = document.getElementById("sobre");
    if (target) {
        const offset = target.getBoundingClientRect().top + window.pageYOffset - 20;
        smoothScrollTo(offset, 1200);
    }
});
