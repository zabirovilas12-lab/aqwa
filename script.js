// ========== ПЛАВНАЯ ПРОКРУТКА К БЛОКАМ ==========
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Кнопки в шапке (навигация)
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').replace('#', '');
        scrollToElement(targetId);
    });
});

// Кнопка "Смотреть цены" → к блоку цен
const mainActionBtn = document.getElementById('mainActionBtn');
if (mainActionBtn) {
    mainActionBtn.addEventListener('click', () => scrollToElement('prices'));
}

// Кнопка "Как мы работаем" → к контактам
const moreBtn = document.getElementById('moreBtn');
if (moreBtn) {
    moreBtn.addEventListener('click', () => scrollToElement('contact'));
}

// ========== ВСЕ КНОПКИ "ЗАКАЗАТЬ" → К КОНТАКТАМ ==========
// Кнопки в карточках услуг
document.querySelectorAll('.service-item__btn').forEach(btn => {
    btn.addEventListener('click', () => scrollToElement('contact'));
});

// Кнопки в карточках цен
document.querySelectorAll('.price-card__btn').forEach(btn => {
    btn.addEventListener('click', () => scrollToElement('contact'));
});

// Кнопки в карточках работ (если есть)
document.querySelectorAll('.work-card__btn').forEach(btn => {
    btn.addEventListener('click', () => scrollToElement('contact'));
});

// Кнопка "Заказать звонок" в шапке
const callbackBtns = [document.getElementById('callbackBtn'), document.getElementById('mobileCallbackBtn')];
callbackBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => scrollToElement('contact'));
    }
});
