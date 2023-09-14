function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
// // Слайдер 1 версия
// // Выбрать все елементы с которыми будет работать
// // Определяем индекс  слайда
// // Функция показа слайда и скрытия остальных (с условием, работы стрелок по кругу)
// // Обрабатываем клики на стрелочки 
// // создаем нумерацию общего количества слайдов 
//     const slides = document.querySelectorAll('.offer__slide'),
//             prevSlide = document.querySelector('.offer__slider-prev'),
//             nextSlide = document.querySelector('.offer__slider-next'),
//             currentSlide = document.querySelector('#current'),
//             totalSlide = document.querySelector('#total');
//     let slideIndex = 1;

//     showSlides(slideIndex);

    // if (slides.length < 10) { 
    //     totalSlide.textContent = `0${slides.length}`;
    // } else {
    //     totalSlide.textContent = slides.length;
    // }

//     function showSlides(n) {
//         if (n > slides.length) {
//             slideIndex = 1;
//         }

//         if (n < 1) {
//             slideIndex = slides.length;
//         }
        
//         slides.forEach(item => item.style.display = 'none');

//         slides[slideIndex - 1].style.display = 'block';

//         if (slides.length < 10) { 
//             currentSlide.textContent = `0${slideIndex}`;
//         } else {
//             currentSlide.textContent = slideIndex;
//         }
//     }

//     function plusSlides(n) {
//         showSlides(slideIndex += n);
//     }

//     prevSlide.addEventListener('click', () => {
//         plusSlides(-1);
//     });

//     nextSlide.addEventListener('click', () => {
//         plusSlides(1);
//     });

// _____________________________________________________________________________________________________________________________
// Слайдер 2 версия
// Устанавливаем ширину slidesField в 400% (на 4 слайда)
// задаем всем слайдам одинаковую ширину
// выстраиваем все слайды в 1 линию slidesField + анимация
// скрываем все слайды вне зоны видипости slidesWrapper
// Обработчик события для передвигания слайдера
// 
// 
    const   slides = document.querySelectorAll(slide), 
            slider = document.querySelector(container),
            prevSlide = document.querySelector(prevArrow),
            nextSlide = document.querySelector(nextArrow),
            currentSlide = document.querySelector(currentCounter),
            totalSlide = document.querySelector(totalCounter),
            slidesWrapper = document.querySelector(wrapper),
            slidesField =  document.querySelector(field),
            width = window.getComputedStyle(slidesWrapper).width; // получаем ширину слайда заданого в CSS
    let slideIndex = 1; // Номер слайда
    let offset = 0; // Индикатор смещения слайдов 

    // Устанавливаем общее количество слайдов на странице.
    const letTotalSlideIndex = function() {
        if (slides.length < 10) { 
            totalSlide.textContent = `0${slides.length}`;
        } else {
            totalSlide.textContent = slides.length;
        };
    };

    // Устанавливаем текущий номер слайда
    const letCurrentSlideIndex = function() {
        if (slides.length < 10) { 
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = slideIndex;
        };
    };
    letTotalSlideIndex(); 
    letCurrentSlideIndex();

    // Устанавливаем ширину окна слайдера, в зависимости от количества слайдов на странице. + анимация
    slidesField.style.width = 100 * slides.length + '%'; // width 400% 
    slidesField.style.display = 'flex';
    slidesField.style.transition = "0.5s all";

    // скрываем слайды вне зоны видипости
    slidesWrapper.style.overflow = 'hidden';

    // Устанавливаем для каждого слайда одинаковую ширину. (Проверка на разыне картинки)
    slides.forEach(slide => { // 1 slide = width 100% 
        slide.style.width = width;
    });

    // Для позиционирования точек
    slider.style.position = 'relative';

    const   indicators = document.createElement('ol'),
            dots = [];
    indicators.classList.add('carousel-indicators'); // класс со стилями в CSS

    slider.append(indicators); 

    // Создаем точки по количеству слайдов на странице. Задаем класс со стилями. 
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot'); // класс со стилями в CSS
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    // Анимаци активной кнопки
    const activeDotAnimate = function () {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex -1].style.opacity = 1;
    };

    // превращаем 500px в 500.
    const deleteNotDigits = function (str) {
        return +str.replace(/\D/g, '') // удаляем все НЕ цифры 
    };


    // offset = ширина 1 слайда * количество слайдов-1
    //Обработчик событий КЛИК - навигация на следующий слайд
    nextSlide.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)){ // 650 * 4-1
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        letCurrentSlideIndex();

        activeDotAnimate();
    });

    //Обработчик событий КЛИК - навигация на предидущий слайд
    prevSlide.addEventListener('click', () => {
        if (offset == 0){
            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        letCurrentSlideIndex();

        activeDotAnimate();
    });


    // Обаботчик событий КЛИК - навигация по клику на точки
    dots.forEach(dot =>{
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')

            slideIndex = slideTo; // Привязываем точку к  активному слайду
            offset = deleteNotDigits(width) * (slideTo - 1)

            slidesField.style.transform = `translateX(-${offset}px)`;

            letCurrentSlideIndex();

            activeDotAnimate();
        })
    })
    // Навигация для слайдера 
    // получаем весь слайдер
    // устанавливаем position relative для позиционрирования точек 
    // перебором устанавливаем количество точек = количеству слайдеров

}
export default slider;