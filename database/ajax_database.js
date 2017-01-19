"use strict"

const httpEngine = new XMLHttpRequest()

httpEngine.onreadystatechange = function() { 
        if (httpEngine.readyState == 4 && httpEngine.status == 200)
           handler(httpEngine.responseText);
    }

/**
 * 
 * Функция синхонизирует бызы (локальную и серверную)
 * 
 * @param {boolean} set (db force sync)
 *  
 */
function dbSync(set = false)
{
    let data = localStorage.getItem('profile_data');
    if (set === false) {
        let urlRequest = 'database/main.php?action=get&data=null&key=profile_data';
        httpEngine.open("GET", urlRequest, true);
        httpEngine.send();
    } else {
        let urlRequest = `database/main.php?action=set&data=${data}&key=profile_data`;
        httpEngine.open("GET", urlRequest, true);
        httpEngine.send();
    }
}

/**
 * Хендлер для ответа от сервера
 * 
 * @param {string} result
 * 
 */
function handler(result)
{
    console.log(result);
    localStorage.setItem('profile_data', result);
}