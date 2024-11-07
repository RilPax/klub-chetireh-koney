document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.tournament-participants-card');
    const totalCards = cards.length;

    let currentPage = 0;

    function updateCardsDisplay() {
        const cardsPerPage = window.innerWidth <= 375 ? 1 : 3; 
        const totalPages = Math.ceil(totalCards / cardsPerPage);
        const startIndex = currentPage * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;

        cards.forEach((card, index) => {
            card.style.display = (index >= startIndex && index < endIndex) ? 'flex' : 'none';
        });

        const currentElement = window.innerWidth <= 375 ? document.querySelector('#current-mobile') : document.querySelector('#current');
        const totalElement = window.innerWidth <= 375 ? document.querySelector('#total-mobile') : document.querySelector('#total');
        currentElement.textContent = Math.min(endIndex, totalCards);
        totalElement.textContent = totalCards;

        const prevButton = document.querySelector('.button-participants.prev');
        const nextButton = document.querySelector('.button-participants.next');
        const prevButtonSvg = prevButton.querySelector('svg');
        const nextButtonSvg = nextButton.querySelector('svg');

        const mobilePrevButton = document.querySelector('.button-participants.left');
        const mobileNextButton = document.querySelector('.button-participants.right');
        const mobilePrevButtonSvg = mobilePrevButton.querySelector('svg');
        const mobileNextButtonSvg = mobileNextButton.querySelector('svg');

        // Обновляем состояние предыдущих кнопок
        if (currentPage === 0) {
            prevButton.disabled = true;
            prevButton.classList.add('button-inactive');
            prevButtonSvg.classList.add('button-inactive');
            prevButtonSvg.classList.remove('yellow-hover');

            mobilePrevButton.disabled = true;
            mobilePrevButton.classList.add('button-inactive');
            mobilePrevButtonSvg.classList.add('button-inactive');
            mobilePrevButtonSvg.classList.remove('yellow-hover');
        } else {
            prevButton.disabled = false;
            prevButton.classList.remove('button-inactive');
            prevButtonSvg.classList.remove('button-inactive');
            prevButtonSvg.classList.add('yellow-hover');

            mobilePrevButton.disabled = false;
            mobilePrevButton.classList.remove('button-inactive');
            mobilePrevButtonSvg.classList.remove('button-inactive');
            mobilePrevButtonSvg.classList.add('yellow-hover');
        }

        // Обновляем состояние следующих кнопок
        if (endIndex >= totalCards) {
            nextButton.disabled = true;
            nextButton.classList.add('button-inactive');
            nextButtonSvg.classList.add('button-inactive');
            nextButtonSvg.classList.remove('yellow-hover');

            mobileNextButton.disabled = true;
            mobileNextButton.classList.add('button-inactive');
            mobileNextButtonSvg.classList.add('button-inactive');
            mobileNextButtonSvg.classList.remove('yellow-hover');
        } else {
            nextButton.disabled = false;
            nextButton.classList.remove('button-inactive');
            nextButtonSvg.classList.remove('button-inactive');
            nextButtonSvg.classList.add('yellow-hover');

            mobileNextButton.disabled = false;
            mobileNextButton.classList.remove('button-inactive');
            mobileNextButtonSvg.classList.remove('button-inactive');
            mobileNextButtonSvg.classList.add('yellow-hover');
        }
    }

    function handleNextButton() {
        const cardsPerPage = window.innerWidth <= 375 ? 1 : 3;
        const totalPages = Math.ceil(totalCards / cardsPerPage);
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateCardsDisplay();
        }
    }

    function handlePrevButton() {
        if (currentPage > 0) {
            currentPage--;
            updateCardsDisplay();
        }
    }

    document.querySelector('.button-participants.next').addEventListener('click', handleNextButton);
    document.querySelector('.button-participants.prev').addEventListener('click', handlePrevButton);

    const mobileNav = document.querySelector('.tournament-participants-navigation-container.mobile');
    if (mobileNav) {
        mobileNav.querySelector('.button-participants.right').addEventListener('click', handleNextButton);
        mobileNav.querySelector('.button-participants.left').addEventListener('click', handlePrevButton);
    }

    updateCardsDisplay();

    window.addEventListener('resize', function () {
        updateCardsDisplay();
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.stages-of-transformation-card');
    const leftButton = document.querySelector('.carousel-button.carousel-left');
    const rightButton = document.querySelector('.carousel-button.carousel-right');
    const dotsContainer = document.getElementById('dots-container');
    let currentIndex = 0;

    // Создаём точки по количеству карточек
    function createDots() {
        dotsContainer.innerHTML = ''; // Очищаем контейнер
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
            dotsContainer.appendChild(dot);
        });
    }

    // Обновляем активную карточку и активную точку
    function updateCarousel() {
        cards.forEach((card, index) => {
            card.style.display = index === currentIndex ? 'flex' : 'none';
        });
        updateDots();
        updateButtonStatus();
    }

    // Обновляем состояние точек
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Обновляем состояние кнопок
    function updateButtonStatus() {
        const leftSvg = leftButton.querySelector('svg');
        const rightSvg = rightButton.querySelector('svg');

        // Проверка крайнего положения для левой кнопки
        leftButton.classList.toggle('button-inactive', currentIndex === 0);
        if (leftSvg) {
            leftSvg.classList.toggle('button-inactive', currentIndex === 0);
            leftSvg.classList.toggle('yellow-hover', currentIndex > 0);
        }

        // Проверка крайнего положения для правой кнопки
        rightButton.classList.toggle('button-inactive', currentIndex === cards.length - 1);
        if (rightSvg) {
            rightSvg.classList.toggle('button-inactive', currentIndex === cards.length - 1);
            rightSvg.classList.toggle('yellow-hover', currentIndex < cards.length - 1);
        }
    }

    // Обработчики для кнопок
    leftButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    rightButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Инициализация
    createDots();
    updateCarousel();
});
