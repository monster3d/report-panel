"use strict"

const httpEngineStatus = new XMLHttpRequest()

httpEngineStatus.onreadystatechange = ()=> { 
        if (httpEngineStatus.readyState == 4 && httpEngineStatus.status == 200)
           setCurrentStatus(httpEngineStatus.responseText);
    }

/**
 * Получает список компаний
 * 
 */
function getStatus()
{
    let urlRequest = 'backend/status.php';
    httpEngineStatus.open("GET", urlRequest, true);
    httpEngineStatus.send();
}

/**
 * Рисует список компаний
 * 
 * @param {string} result
 * 
 */
function setCurrentStatus(result)
{
    let data;
    console.log(result);
    try {
        data = JSON.parse(result);
    } catch(e) {
        console.log(e)
    }
    if (data.status == 0) {
        clearInterval(timerId);
        let blockLink = document.getElementById('downloads');
        let link = document.createElement('a');
        link.setAttribute('href', `/downloads/get.php?sing=${b64EncodeUnicode(result)}`);
        link.innerHTML = "Скачать";
        document.getElementById('wrapper').style.display = 'none';
        blockLink.appendChild(link);
    }
}

const timerId = setInterval(function() {
  getStatus();
}, 5000);

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}