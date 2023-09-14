import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
// FORMS (с форматом FormData и json)
// 1) создаем блок с сообщениями с ошибками
// 2) собираем все данные с форм в formData
// 3) отправляем данные с помощью fetch

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',

    };

    // назначаем функцию postData на все формы странички.
    forms.forEach(item => {  
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {  //    'submit' - событие отправки формы
            e.preventDefault(); //                      отмена поведения браузера

            let statusMassage = document.createElement('div') // Новый елемент с выводом сообщения о статусе загрузки 
            statusMassage.src = message.loading;
            statusMassage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            // form.append(statusMassage); // Метод Element.append() вставляет узлы или строки с текстом в конец Element.
            form.insertAdjacentElement('afterend', statusMassage) // добавляет переданный элемент в DOM-дерево относительно элемента, вызвавшего метод.

            const formData = new FormData(form); // передача данных из HTML формы в FormData объект

            const json = JSON.stringify(Object.fromEntries(formData.entries())); // Превращение formData в массив массивов, затем в объкт, затем в JSON 

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMassage.textContent = message.success;
                statusMassage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(massage) {
        const prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const  thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${massage}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        // возвращаем форму в изначальный вид
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
// // 1 Выделяем формы 
// // 2 Создаем обарботчик событий, при отправке формы. Отменяем поведения браузера.
// // 3 Создаем API -  XMLHttpRequest
// // 4 Создаем обарботчик событий, при загрузе формы. Создаем варинты сообщений, выводим новый .div. Очищаем форму, убираем сообщение.  

//     const forms = document.querySelectorAll('form');

//     const message = {
//         loading: 'img/spinner.svg',
//         success: 'Спасибо! Скоро мы с вами свяжемся',
//         failure: 'Что-то пошло не так...',

//     }

//     forms.forEach(item => { // назначаем функцию postData на все формы странички. 
//         postData(item);
//     })

//     function postData(form) {
//         form.addEventListener('submit', (e) => {  //    'submit' - событие отправки формы
//             e.preventDefault(); //                      отмена поведения браузера

//             const statusMassage = document.createElement('div') // Новый елемент с выводом сообщения о статусе загрузки 
//             statusMassage.src = message.loading;
//             statusMassage.style.cssText = `
//                 display: block;
//                 margin: 0 auto;
//             `;
//             // form.append(statusMassage); // Метод Element.append() вставляет узлы или строки с текстом в конец Element.
//             form.insertAdjacentElement('afterend', statusMassage) // добавляет переданный элемент в DOM-дерево относительно элемента, вызвавшего метод.

//             const request = new XMLHttpRequest();
//             request.open('POST', 'server.php');

//             request.setRequestHeader('Contante-type', 'application/json'); // заголовки
//             const formData = new FormData(form); // передача данных из HTML формы в FormData объект

//             const object = {};
//             formData.forEach(function(value,key) {
//                 object[key] = value;
//             })

//             const json = JSON.stringify(object);
//             request.send(json); // Отправляем данные на сервер 

//             // request.send(formData); // Отправляем данные на сервер 

//             request.addEventListener('load', () => { // отслеживаем загрузку формы
//                 if (request.status === 200) { // 200 OK («хорошо») (Список кодов состояния HTTP)
//                     console.log(request.response);
//                     showThanksModal(message.success);
//                     statusMassage.textContent = message.success;
//                     form.reset(); // сбрасываем форму после отправки.
//                        statusMassage.remove() 
//                 } else {
//                     showThanksModal(message.failure);
//                 }
//             })

//         })
//     }

}
export default forms;