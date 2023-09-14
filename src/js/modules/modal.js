// Функция закрытия модал
function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''
}

// Функция открытия модал
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); // не вызывать модал если уже открывалось вручную
    }
}


function modal(triggerSelector, modalSelector, modalTimerId) {
// MODAL
// 1 функция открытия окна 
// 2 функция закрытия окна
// 3 обработчик событий на кнопки

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });


    // закрытие модалки при клике на подложку
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "" ) {
            closeModal(modalSelector);
        }
    })
    
    // закрытие модалки при клике на клавишу Еск
    document.addEventListener ('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll) // удаляем вызов модалки в низу страници после 1 раза
        }
    }

    window.addEventListener('scroll', showModalByScroll) // вызываем модалку при прокрутве в низ стриници


    // ОПОВЕЩЕНИЕ ПОЛЬЗОВАТЕЛЯ СО СПИНЕРОМ
    // 1) Скрываем старые инпуты в форме
    // 1) Создаем новый блок благодарности и пушим на страницу
    // 1) возвращаем форму в изначальный вид
    // 1) назначаем картинку вместо текста, задаем инлайн стили, помещаем куда нужно 3
    
    

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

}
export default modal;
export {closeModal};
export {openModal};