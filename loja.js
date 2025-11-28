let textoPesquisa = '';

let produtos = [
    {
        id: 1,
        nome: "iPhone 15 Pro Max",
        categoria: "smartphones",
        preco: 7999,
        precoOriginal: 8999,
        desconto: 11,
        imagem: "https://images.unsplash.com/photo-1718223483120-8131e57f948b?w=400",
        descricao: "Smartphone premium da Apple, com câmera avançada, chip A17 Pro e design em titânio."
    },
    {
        id: 2,
        nome: "MacBook Air M2",
        categoria: "laptops",
        preco: 8999,
        precoOriginal: 10999,
        desconto: 18,
        imagem: "https://images.unsplash.com/photo-1717865499857-ec35ce6e65fa?w=400",
        descricao: "Notebook ultrafino e leve, com chip Apple M2 e bateria de longa duração."
    },
    {
        id: 3,
        nome: "AirPods Pro",
        categoria: "headphones",
        preco: 1899,
        precoOriginal: 2299,
        desconto: 17,
        imagem: "https://images.unsplash.com/photo-1591386618629-4ef48ffdc0c4?w=400",
        descricao: "Fones sem fio com cancelamento ativo de ruído e modo ambiente"
    },
    {
        id: 4,
        nome: "Samsung Galaxy S24",
        categoria: "smartphones",
        preco: 5499,
        precoOriginal: 6299,
        desconto: 13,
        imagem: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
        descricao: "Smartphone topo de linha da Samsung, com câmera de alta resolução e desempenho ultra-rápido e tela AMOLED."
    },
    {
        id: 5,
        nome: "Apple Watch Series 9",
        categoria: "smartwatches", // <-- altere para plural
        preco: 3299,
        precoOriginal: 3799,
        desconto: 13,
        imagem: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=400",
        descricao: "Relógio inteligente com recursos de saúde, condicionamento físico e integração total ao iPhone."
    },
    {
        id: 6,
        nome: "Teclado Wireless Compacto",
        categoria: "accessories",
        preco: 499,
        precoOriginal: null,
        desconto: null,
        imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
        descricao: "Teclado portátil e sem fios, ideal para produtividade."
    },
    {
        id: 7,
        nome: "Sony WH-1000XM5",
        categoria: "headphones",
        preco: 2499,
        precoOriginal: 2999,
        desconto: 17,
        imagem: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=400&fit=crop&crop=entropy",
        descricao: "Fones de ouvido over-ear com cancelamento de ruído líder de mercado e áudio de alta qualidade."
    },
    {
        id: 8,
        nome: "Notebook Dell XPS 13",
        categoria: "laptops",
        preco: 7999,
        precoOriginal: null,
        desconto: null,
        imagem: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
        descricao: "Ultrabook compacto e potente, com tela de borda ultrafina e acabamento premium."
    },
    {
        id: 9,
        nome: "Mouse Bluetooth Ergonomico",
        categoria: "accessories",
        preco: 299,
        precoOriginal: 399,
        desconto: 25,
        imagem: "https://images.unsplash.com/photo-1662371893881-1b2fae8e4304?q=80&w=400&auto=format&fit=crop",
        descricao: "Mouse sem fio preciso e confortável para uso diário"
    }
];

let containerProdutos = document.querySelector(".products-container");
let searchInput = document.querySelector(".search-input");
let categoriaAtual = "all";

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function mostrarProdutos() {
    containerProdutos.classList.add('fade');
    setTimeout(() => {
        let htmlProdutos = "";

        let termo = normalizarTexto(textoPesquisa);

        let produtosFiltrados = produtos.filter(prd => {
            let nome = normalizarTexto(prd.nome);
            let descricao = normalizarTexto(prd.descricao);
            return (
                (nome.includes(termo) || descricao.includes(termo)) &&
                (categoriaAtual === "all" || prd.categoria === categoriaAtual)
            );
        });

        produtosFiltrados.forEach(prd => {
            htmlProdutos += `
                <div class="product-card">
                    <img class="product-img" src="${prd.imagem}" alt="${prd.nome}">
                    <div class="product-info">
                        <h3 class="product-name">${prd.nome}</h3>
                        <p class="product-price">R$ ${(prd.preco + 0.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <p class="product-description">${prd.descricao}</p>
                        <button class="product-button">Adicionar ao Carrinho</button>
                    </div>
                </div>
            `;
        });

        containerProdutos.innerHTML = htmlProdutos;

        containerProdutos.classList.remove('fade');

        // Centraliza a imagem do Sony se ela existir
        const sonyImg = document.querySelector('.product-img[alt="Sony WH-1000XM5"]');
        if (sonyImg) sonyImg.style.objectPosition = "center center";
    }, 200);
}

function pesquisar() {
    textoPesquisa = searchInput.value.toLowerCase();
    mostrarProdutos();
}

window.addEventListener('DOMContentLoaded', () => {
    mostrarProdutos();
    searchInput.addEventListener('input', pesquisar);

    const categoryBtns = document.querySelectorAll('.category-btn');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {

            categoryBtns.forEach(b => b.classList.remove('active'));

            this.classList.add('active');

            categoriaAtual = this.getAttribute('data-category');

            mostrarProdutos();
        });
    });
});

let carrinho = [];
const cartCountSpan = document.querySelector('.cart-count');

// Atualiza contador do carrinho
function updateCartCount() {
    cartCountSpan.textContent = carrinho.length;
}

// Adiciona produto ao carrinho
function addToCart(produto) {
    carrinho.push(produto);
    updateCartCount();
    showNotif(`✔️ "${produto.nome}" adicionado ao carrinho`);
}

// Notificação visual simples
function showNotif(msg) {
    let container = document.querySelector('.notif-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notif-container';
        document.body.appendChild(container);
    }
    const notif = document.createElement('div');
    notif.className = 'notif';
    notif.textContent = msg;
    container.appendChild(notif);
    setTimeout(() => {
        notif.classList.add('hide');
        setTimeout(() => notif.remove(), 500);
    }, 1800);
}

// Adiciona evento aos botões de produto após renderização
function ativarBotoesCarrinho() {
    document.querySelectorAll('.product-button').forEach((btn, idx) => {
        btn.onclick = () => {
            addToCart(produtos[idx]);
        };
    });
}

// Chame após mostrarProdutos
function mostrarProdutos() {
    containerProdutos.classList.add('fade');
    setTimeout(() => {
        let htmlProdutos = "";

        let termo = normalizarTexto(textoPesquisa);

        let produtosFiltrados = produtos.filter(prd => {
            let nome = normalizarTexto(prd.nome);
            let descricao = normalizarTexto(prd.descricao);
            return (
                (nome.includes(termo) || descricao.includes(termo)) &&
                (categoriaAtual === "all" || prd.categoria === categoriaAtual)
            );
        });

        produtosFiltrados.forEach(prd => {
            htmlProdutos += `
                <div class="product-card">
                    <img class="product-img" src="${prd.imagem}" alt="${prd.nome}">
                    <div class="product-info">
                        <h3 class="product-name">${prd.nome}</h3>
                        <p class="product-price">R$ ${(prd.preco + 0.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <p class="product-description">${prd.descricao}</p>
                        <button class="product-button">Adicionar ao Carrinho</button>
                    </div>
                </div>
            `;
        });

        containerProdutos.innerHTML = htmlProdutos;
        containerProdutos.classList.remove('fade');

        // Centraliza a imagem do Sony se ela existir
        const sonyImg = document.querySelector('.product-img[alt="Sony WH-1000XM5"]');
        if (sonyImg) sonyImg.style.objectPosition = "center center";

        ativarBotoesCarrinho(); // <-- Ativa os botões do carrinho
    }, 200);
}


document.querySelector('.cart-btn').addEventListener('click', () => {
    mostrarCarrinho();
});

document.getElementById('closeCartModal').onclick = () => {
    document.getElementById('cartModal').style.display = 'none';
};

// Função para mostrar os itens do carrinho
function mostrarCarrinho() {
    const modal = document.getElementById('cartModal');
    const lista = modal.querySelector('.cart-items-list');
    const totalDiv = modal.querySelector('.cart-total');
    lista.innerHTML = '';

    if (carrinho.length === 0) {
        lista.innerHTML = '<li>Seu carrinho está vazio.</li>';
        totalDiv.textContent = '';
    } else {
        let total = 0;
        carrinho.forEach(item => {
            lista.innerHTML += `<li>
                <span>${item.nome}</span>
                <span>${item.preco ? 'R$ ' + (item.preco + 0.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : ''}</span>
            </li>`;
            total += item.preco ? item.preco + 0.90 : 0;
        });
        totalDiv.textContent = `Total: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }
    modal.style.display = 'flex';
}

document.getElementById('cartModal').addEventListener('click', function(e) {
    if (e.target === this) this.style.display = 'none';
});
