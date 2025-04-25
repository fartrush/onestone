document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.how-it-works__item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // если нужно только один раз
            }
        });
    }, {
        threshold: 0, // процент видимости элемента (можно изменить)
    });

    items.forEach(item => observer.observe(item));



    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('--scrolling');
        } else {
            header.classList.remove('--scrolling');
        }
    });

    const headerHeight = header.offsetHeight;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    const swiper = new Swiper('.js-reviews-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.js-reviews-slider-next',
            prevEl: '.js-reviews-slider-prev',
        },
        breakpoints: {
            1280: {
                slidesPerView: 2.5,
                spaceBetween: 60,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1.5,
            }
        }
    });

    const faqItems = document.querySelectorAll('.js-faq-item');
    const faqHeads = document.querySelectorAll('.js-faq-item-head');

    faqHeads.forEach((head, index) => {
        head.addEventListener('click', () => {
            const currentItem = faqItems[index];
            const isOpened = currentItem.classList.contains('--opened');

            // Закрыть все
            faqItems.forEach(item => item.classList.remove('--opened'));

            // Открыть только если ранее не был открыт
            if (!isOpened) {
                currentItem.classList.add('--opened');
            }
        });
    });


});

const names = ['Emily', 'Lena', 'Sophie'];
const typedSpan = document.querySelector('.typed-name');
let nameIndex = 0;
let charIndex = 0;
let typing = true;
console.log(typedSpan)

function typeEffect() {
    const currentName = names[nameIndex];

    if (typing) {
        typedSpan.textContent = currentName.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentName.length) {
            typing = false;
            setTimeout(typeEffect, 1500); // пауза перед стиранием
            return;
        }
    } else {
        typedSpan.textContent = currentName.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            typing = true;
            nameIndex = (nameIndex + 1) % names.length;
            setTimeout(typeEffect, 1000); // пауза перед началом следующего имени
            return;
        }
    }

    setTimeout(typeEffect, typing ? 500 : 200);
}

document.addEventListener('DOMContentLoaded', typeEffect);