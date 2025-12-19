document.addEventListener('DOMContentLoaded', () => {
    // 0. Проверка библиотек
    if (typeof gsap === 'undefined') {
        console.error('GSAP не загружен! Проверьте порядок скриптов в HTML.');
        return;
    }
    
    lucide.createIcons();

    // 1. Мобильное меню
    const burger = document.getElementById('burger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    burger.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        burger.classList.toggle('burger--active');
        // Запрет скролла при открытом меню
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 2. GSAP Анимации
    // Hero
    const tl = gsap.timeline();
    tl.from(".hero__badge", { opacity: 0, y: 20, duration: 0.6 })
      .from(".hero__title", { opacity: 0, y: 40, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .from(".hero__subtitle", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".hero__actions", { opacity: 0, scale: 0.9, duration: 0.5 }, "-=0.2");

    // Скролл-анимации для секций
    gsap.utils.toArray('.benefit-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.1
        });
    });

    gsap.from(".career__content", {
        scrollTrigger: {
            trigger: ".career",
            start: "top 80%",
        },
        opacity: 0,
        x: -50,
        duration: 1
    });

    // 3. Капча
    const captchaText = document.getElementById('captcha-text');
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 5);
    const captchaResult = num1 + num2;
    if (captchaText) captchaText.innerText = `${num1} + ${num2} = `;

    // 4. Форма
    const form = document.getElementById('main-form');
    const phoneInput = document.getElementById('phone-input');
    const formMsg = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const phoneVal = phoneInput.value.replace(/\D/g, '');
            const captchaUser = document.getElementById('captcha-input').value;

            if (phoneVal.length < 5) {
                showMsg('Введите корректный номер (только цифры)', 'error');
                return;
            }

            if (parseInt(captchaUser) !== captchaResult) {
                showMsg('Ошибка в капче', 'error');
                return;
            }

            showMsg('Отправка данных...', 'success');
            
            setTimeout(() => {
                showMsg('Заявка принята! Мы свяжемся с вами в течение 15 минут.', 'success');
                form.reset();
            }, 1500);
        });
    }

    function showMsg(text, type) {
        formMsg.innerText = text;
        formMsg.className = `form__message ${type}`;
        formMsg.style.display = 'block';
    }

    // 5. Cookie Popup
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup && !localStorage.getItem('cookies-accepted')) {
        setTimeout(() => cookiePopup.classList.add('active'), 2500);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookies-accepted', 'true');
            cookiePopup.classList.remove('active');
        });
    }
});