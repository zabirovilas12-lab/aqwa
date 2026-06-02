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
// ========== ОТПРАВКА ОТЗЫВОВ ==========
const reviewForm = document.getElementById('reviewForm');
const reviewStatus = document.getElementById('reviewStatus');

if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reviewName')?.value.trim();
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        const text = document.getElementById('reviewText')?.value.trim();
        
        if (!name || !text) {
            showReviewStatus('⚠️ Заполните имя и текст отзыва', 'error');
            return;
        }
        
        if (!rating) {
            showReviewStatus('⚠️ Поставьте оценку звёздами', 'error');
            return;
        }
        
        const submitBtn = reviewForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '⏳ Отправка...';
        submitBtn.disabled = true;
        
        // Отправляем на FormSubmit (можно потом перенастроить на PHP)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('rating', rating);
        formData.append('review', text);
        formData.append('_subject', 'Новый отзыв на сайте');
        
        try {
            const response = await fetch('https://formsubmit.co/ajax/ВАША_ПОЧТА@yandex.ru', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showReviewStatus('✅ Спасибо за отзыв! Он будет опубликован после проверки.', 'success');
                reviewForm.reset();
                // Сброс звёзд (визуально)
                document.querySelectorAll('.stars input').forEach(star => star.checked = false);
            } else {
                showReviewStatus('❌ Ошибка отправки. Попробуйте позже.', 'error');
            }
        } catch (error) {
            showReviewStatus('❌ Ошибка отправки. Попробуйте позже.', 'error');
        }
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        setTimeout(() => {
            if (reviewStatus) reviewStatus.style.display = 'none';
        }, 5000);
    });
}

function showReviewStatus(text, type) {
    if (!reviewStatus) return;
    reviewStatus.style.display = 'block';
    reviewStatus.textContent = text;
    
    if (type === 'success') {
        reviewStatus.style.backgroundColor = '#E8F5F0';
        reviewStatus.style.color = '#2E7D64';
        reviewStatus.style.border = '1px solid #2E7D64';
    } else if (type === 'error') {
        reviewStatus.style.backgroundColor = '#FEE2E2';
        reviewStatus.style.color = '#DC2626';
        reviewStatus.style.border = '1px solid #DC2626';
    } else {
        reviewStatus.style.backgroundColor = '#F0F4F8';
        reviewStatus.style.color = '#1E2A3A';
        reviewStatus.style.border = '1px solid #CBD5E1';
    }
}
