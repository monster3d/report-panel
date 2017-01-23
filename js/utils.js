"use strict"

/**
 * Функция генерирует случайный int
 * 
 * @return {int}
 *  
 */
function getRandom() {
    return Math.floor(Math.random() * (999 - 1 + 1)) + 1;
}

/**
 * Показывает сообщение
 * 
 * @param {string} message
 * 
 */
function showMessage(message)
{
    let msg = document.getElementById('message');
    msg.style.opacity = 1.0;
    msg.innerHTML = message;
    setTimeout(()=> {hiddenMessage()}, 2000);
}

/**
 * Скрывает сообщение
 * 
 * 
 */
function hiddenMessage()
{
    let msg = document.getElementById('message');
    msg.style.opacity = 0;
    msg.style.transition = 3000;
    msg.innerHTML = '';
}

/**
 * Отчищает список компаний
 * 
 */
function clearCompanyList()
{
    let ul = document.getElementById('company_list');
    ul.innerHTML = "";
    delete Object.ul;
}