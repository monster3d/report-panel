"use strict"

const httpEngineDb = new XMLHttpRequest()

httpEngineDb.onreadystatechange = ()=> { 
        if (httpEngineDb.readyState == 4 && httpEngineDb.status == 200)
           handler(httpEngineDb.responseText);
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
        let urlRequest = 'database/main.php';
        httpEngineDb.open("GET", urlRequest, true);
        httpEngineDb.send();
    } else {
        let urlRequest = 'database/main.php';
        httpEngineDb.open("POST", urlRequest, true);
        httpEngineDb.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        httpEngineDb.send(`data=${data}`);
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