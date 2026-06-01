// ========== ПЛАВНАЯ ПРОКРУТКА ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== МОДАЛЬНОЕ ОКНО ДЛЯ ЗАЯВОК ==========
const modal = document.getElementById('quickFormModal');
const modalClose = document.querySelector('.modal-close');
const quickForm = document.getElementById('quickForm');
let currentService = '';

function openModal(serviceName = '') {
    currentService = serviceName;
    const title = document.getElementById('quickFormTitle');
    const desc = document.getElementById('quickFormDesc');
    
    if (serviceName) {
        title.textContent = `Заявка: ${serviceName}`;
        desc.textContent = 'Укажите телефон — менеджер перезвонит для уточнения деталей';
    } else {
        title.textContent = 'Оставить заявку';
        desc.textContent = 'Менеджер свяжется с вами в ближайшее время';
    }
    
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
    if (quickForm) quickForm.reset();
}

if (modalClose) modalClose.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// ========== ОТПРАВКА ЗАЯВОК НА EMAIL ==========
async function sendRequest(name, phone, service = '') {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('service', service);
    
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

function showStatus(message, isError = false) {
    // Просто alert пока временно
    alert(message);
}

// ========== КНОПКА "СМОТРЕТЬ ЦЕНЫ" ==========
const mainActionBtn = document.getElementById('mainActionBtn');
if (mainActionBtn) {
    mainActionBtn.addEventListener('click', () => {
        const pricesSection = document.getElementById('prices');
        if (pricesSection) pricesSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// ========== КНОПКА "КАК МЫ РАБОТАЕМ" ==========
const moreBtn = document.getElementById('moreBtn');
if (moreBtn) {
    moreBtn.addEventListener('click', () => {
        alert('Этапы работы:\n1️⃣ Выезд инженера\n2️⃣ Проектирование\n3️⃣ Монтаж\n4️⃣ Сдача и гарантия');
    });
}

// ========== КНОПКА "ЗАКАЗАТЬ ЗВОНОК" ==========
const callbackBtns = [document.getElementById('callbackBtn'), document.getElementById('mobileCallbackBtn')];
callbackBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            openModal('');
        });
    }
});

// ========== КНОПКИ "ЗАКАЗАТЬ" В КАРТОЧКАХ УСЛУГ ==========
document.querySelectorAll('.service-item__btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.service-item');
        const serviceName = card?.querySelector('h3')?.textContent || 'Услуга';
        openModal(serviceName);
    });
});

// ========== КНОПКИ "ЗАКАЗАТЬ" В КАРТОЧКАХ ЦЕН ==========
document.querySelectorAll('.price-card__btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.price-card');
        const serviceName = card?.querySelector('h3')?.textContent || 'Скважина';
        openModal(serviceName);
    });
});

// ========== КНОПКИ В БЛОКЕ "ЧТО МЫ ДЕЛАЕМ" (работы) ==========
// Добавляем кнопки "Заказать" в карточки работ, если их нет
document.querySelectorAll('.work-card').forEach(card => {
    // Если нет кнопки в карточке работ — добавим
    if (!card.querySelector('.work-card__btn')) {
        const priceDiv = card.querySelector('.work-card__price');
        if (priceDiv && !priceDiv.nextElementSibling?.classList?.contains('work-card__btn')) {
            const btn = document.createElement('button');
            btn.textContent = 'Заказать';
            btn.className = 'work-card__btn';
            btn.style.cssText = 'background: #2E7D64; color: white; border: none; padding: 10px 20px; border-radius: 40px; margin-top: 12px; width: 100%; cursor: pointer; font-weight: 600;';
            btn.addEventListener('click', (e) => {
                const title = card.querySelector('h3')?.textContent || 'Услуга';
                openModal(title);
            });
            priceDiv.insertAdjacentElement('afterend', btn);
        }
    }
});

// ========== ФОРМА В МОДАЛЬНОМ ОКНЕ ==========
if (quickForm) {
    quickForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('quickName')?.value.trim();
        const phone = document.getElementById('quickPhone')?.value.trim();
        
        if (!name || !phone) {
            alert('⚠️ Заполните имя и телефон');
            return;
        }
        
        const submitBtn = quickForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '⏳ Отправка...';
        submitBtn.disabled = true;
        
        const success = await sendRequest(name, phone, currentService);
        
        if (success) {
            alert('✅ Заявка отправлена! Мы свяжемся с вами.');
            closeModal();
        } else {
            alert('❌ Ошибка отправки. Позвоните нам по телефону.');
        }
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// ========== ФОРМА В БЛОКЕ КОНТАКТОВ (полная форма) ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('userName')?.value.trim();
        const phone = document.getElementById('userPhone')?.value.trim();
        const message = document.getElementById('userMessage')?.value.trim();
        
        if (!name || !phone) {
            alert('⚠️ Заполните имя и телефон');
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '⏳ Отправка...';
        submitBtn.disabled = true;
        
        // Для полной формы отправляем с сообщением
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('message', message);
        formData.append('service', 'Полная форма');
        
        try {
            const response = await fetch('send_email.php', { method: 'POST', body: formData });
            const result = await response.text();
            const success = result === 'success';
            
            if (success) {
                alert('✅ Заявка отправлена! Мы свяжемся с вами.');
                contactForm.reset();
            } else {
                alert('❌ Ошибка отправки. Позвоните нам по телефону.');
            }
        } catch (error) {
            alert('❌ Ошибка отправки. Позвоните нам.');
        }
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}