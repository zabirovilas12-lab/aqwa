
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            closeMobileMenu();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Мобильное меню
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let overlay = document.querySelector('.overlay');
if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
}
function openMobileMenu() { mobileMenu.classList.add('open'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeMobileMenu() { mobileMenu.classList.remove('open'); overlay.classList.remove('active'); document.body.style.overflow = ''; }
if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
overlay.addEventListener('click', closeMobileMenu);
document.querySelectorAll('.mobile-menu__link').forEach(link => link.addEventListener('click', closeMobileMenu));

// Кнопки
document.getElementById('mainActionBtn')?.addEventListener('click', () => { document.getElementById('prices')?.scrollIntoView({ behavior: 'smooth' }); });
document.getElementById('moreBtn')?.addEventListener('click', () => { alert('Этапы работы:\n1️⃣ Выезд инженера\n2️⃣ Проектирование\n3️⃣ Монтаж\n4️⃣ Сдача и гарантия'); });
const callbackBtns = [document.getElementById('callbackBtn'), document.getElementById('mobileCallbackBtn')];
callbackBtns.forEach(btn => btn?.addEventListener('click', () => alert('Форма обратного звонка откроется здесь')));
document.querySelectorAll('.service-item__btn, .price-card__btn').forEach(btn => btn.addEventListener('click', () => alert('Оставьте заявку, и мы свяжемся с вами')));
document.getElementById('contactForm')?.addEventListener('submit', (e) => { e.preventDefault(); alert('Спасибо! Мы свяжемся с вами.'); e.target.reset(); });