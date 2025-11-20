const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const items = document.querySelectorAll('.item')
const dots = document.querySelectorAll('.dot')
const numberIndicator = document.querySelector('.number')
const list = document.querySelector('.list')


let active = 0
const total = items.length
let timer;

function update(direction) {

    document.querySelector('.item.active').classList.remove('active')
    document.querySelector('.dot.active').classList.remove('active')



    if (direction > 0) {
        active = active + 1
        if (active === total) {
            active = 0
        }
    }

    else if (direction < 0) {
        active = active - 1

        if (active < 0){
            active = total -1
        }
    }

    items[active].classList.add('active')
    dots[active].classList.add('active')
    numberIndicator.textContent = String(active + 1).padStart(2,'0')
}

clearInterval(timer)
timer =setInterval(() => {
    update(1)
}, 1000000);



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

    // fecha outros itens abertos e restaura seus botões
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
          b.style.display = '' // volta ao estilo original
          b.textContent = 'Saiba Mais'
        }
      }
    })

    // abre a descrição do item clicado e esconde o botão
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
