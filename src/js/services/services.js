
//функция отправки данных АСИНХРОННАЯ 
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    // Возвращаем ПРОМИС в формате .json
    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    // Добавляем проверку и сообщение об ошибке  промиса res
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    // Возвращаем ПРОМИС в формате .json
    return await res.json();
};

export {postData};
export {getResource};