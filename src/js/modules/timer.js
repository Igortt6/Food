function timer(id, deadline) {
    // TIMER
    // 1 установить дату 
    // 2 опеределить разницу между дедлайном
    // 3 обновление таймера каждую минуту 

    // расчет даты в мс
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // разница в датах в Мс

        // проверка на отрицательные значения.
        if (t <= 0) {
            days =0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(t/(1000*60*60*24)), // разница в часах + округление
            hours = Math.floor( (t/(1000*60*60)) % 24),
            minutes = Math.floor( (t/(1000*60)) % 60),
            seconds = Math.floor( (t/1000) % 60);
        } 
            
        // возвращение расчитаных значений в виде объекта
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function gerZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // функция 
    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); // установка автообновления таймера

        updateClock(); // вызов функции для избежания задержки в 1000 мс в верстке

        function updateClock () {
            const t = getTimeRemaining(endtime);

            // записываем значения на страницу
            days.innerHTML = gerZero(t.days);
            hours.innerHTML = gerZero(t.hours);
            minutes.innerHTML = gerZero(t.minutes);
            seconds.innerHTML = gerZero(t.seconds);
            
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadline);
}
export default timer;