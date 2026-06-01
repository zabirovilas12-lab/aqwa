// ========== ПЛАВНАЯ ПРОКРУТКА (РАБОТАЕТ НА ВСЕХ УСТРОЙСТВАХ) ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            // Закрываем мобильное меню, если открыто
            closeMobileMenu();
            // Плавный скролл
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== МОБИЛЬНОЕ МЕНЮ ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let overlay = document.querySelector('.overlay');

if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
}

function openMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}
overlay.addEventListener('click', closeMobileMenu);

// Закрываем меню при клике на любую ссылку внутри него
document.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ========== КНОПКИ НА ГЛАВНОЙ ==========
const mainActionBtn = document.getElementById('mainActionBtn');
if (mainActionBtn) {
    mainActionBtn.addEventListener('click', () => {
        const pricesSection = document.getElementById('prices');
        if (pricesSection) {
            pricesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

const moreBtn = document.getElementById('moreBtn');
if (moreBtn) {
    moreBtn.addEventListener('click', () => {
        alert('Этапы работы:\n1️⃣ Выезд инженера\n2️⃣ Проектирование\n3️⃣ Монтаж\n4️⃣ Сдача и гарантия');
    });
}

// Кнопки обратного звонка
const callbackBtns = [document.getElementById('callbackBtn'), document.getElementById('mobileCallbackBtn')];
callbackBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            alert('Форма обратного звонка откроется здесь');
        });
    }
});

// Кнопки заказать в карточках услуг и цен
document.querySelectorAll('.service-item__btn, .price-card__btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Оставьте заявку, и мы свяжемся с вами');
    });
});

// ========== ОТПРАВКА ЗАЯВОК НА EMAIL ==========
const form = document.getElementById('contactForm');
const statusDiv = document.getElementById('formStatus');

async function sendToEmail(name, phone, message) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('message', message);

    try {
        const response = await fetch('send_email.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.text();
        return result === 'success';
    } catch (error) {
        console.error('Ошибка:', error);
        return false;
    }
}

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('userName')?.value.trim();
        const phone = document.getElementById('userPhone')?.value.trim();
        const message = document.getElementById('userMessage')?.value.trim();

        if (!name || !phone) {
            showStatus('⚠️ Заполните имя и телефон', 'error');
            return;
        }

        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '⏳ Отправка...';
            submitBtn.disabled = true;

            showStatus('⏳ Отправляем заявку...', 'info');

            const success = await sendToEmail(name, phone, message);

            if (success) {
                showStatus('✅ Заявка отправлена! Мы свяжемся с вами.', 'success');
                form.reset();
            } else {
                showStatus('❌ Ошибка отправки. Позвоните нам по телефону.', 'error');
            }

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            setTimeout(() => {
                if (statusDiv) statusDiv.style.display = 'none';
            }, 5000);
        }
    });
}

function showStatus(text, type) {
    if (!statusDiv) return;
    statusDiv.style.display = 'block';
    statusDiv.textContent = text;

    if (type === 'success') {
        statusDiv.style.backgroundColor = '#E8F5F0';
        statusDiv.style.color = '#2E7D64';
        statusDiv.style.border = '1px solid #2E7D64';
    } else if (type === 'error') {
        statusDiv.style.backgroundColor = '#FEE2E2';
        statusDiv.style.color = '#DC2626';
        statusDiv.style.border = '1px solid #DC2626';
    } else {
        statusDiv.style.backgroundColor = '#F0F4F8';
        statusDiv.style.color = '#1E2A3A';
        statusDiv.style.border = '1px solid #CBD5E1';
    }
}