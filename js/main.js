// Variáveis globais para os botões do HTML encontrarem as funções
let currentSlide = 0;
let totalSlides = 0;
let carouselElement;

// Função para atualizar as legendas
function updateCaptions(index) {
    const captions = document.querySelectorAll('.caption-item');
    if (captions.length > 0) {
        captions.forEach(cap => cap.classList.remove('active'));
        const activeCap = document.getElementById(`cap-${index}`);
        if (activeCap) activeCap.classList.add('active');
    }
}

// Função para mover o slide (Chamada pelos botões Próximo/Anterior)
function moveSlide(direction) {
    if (!carouselElement) return;

    currentSlide += direction;
    
    if (currentSlide >= totalSlides) currentSlide = 0;
    else if (currentSlide < 0) currentSlide = totalSlides - 1;

    const offset = -(currentSlide * (100 / totalSlides));
    carouselElement.style.transform = `translateX(${offset}%)`;
    
    // Atualiza a legenda junto com o slide
    updateCaptions(currentSlide);
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LÓGICA DO MENU HAMBÚRGUER
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.querySelector('.nav-links');

    if (menuIcon && navMenu) {
        menuIcon.onclick = function() {
            navMenu.classList.toggle('active');
        };
    }

    // 2. IDENTIFICA PÁGINA ATUAL
    const activePage = window.location.pathname;
    const allLinks = document.querySelectorAll('.nav-links a');

    allLinks.forEach(link => {
        if (activePage !== "/" && activePage !== "" && link.getAttribute('href').includes(activePage)) {
            link.classList.add('active-link');
        }
    });

    // 3. INICIALIZAÇÃO DO CARROSSEL
    carouselElement = document.getElementById('carousel');
    const slides = document.querySelectorAll('.carousel img');

    if (carouselElement && slides.length > 0) {
        totalSlides = slides.length;

        // Inicia o auto-slide
        let autoSlide = setInterval(() => moveSlide(1), 5000);

        // Pausa ao passar o mouse
        carouselElement.parentElement.addEventListener('mouseover', () => clearInterval(autoSlide));
        carouselElement.parentElement.addEventListener('mouseout', () => {
            autoSlide = setInterval(() => moveSlide(1), 5000);
        });

        // Garante que a primeira legenda apareça ao carregar
        updateCaptions(0);
    }
});