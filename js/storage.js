"use strict"

/**
 * 
 * Функция получение профиля по его id
 * 
 * @param {int} id 
 * 
 * @returns {object}
 * 
 */
function getProfileById(id)
{
    let result = null;
    let data = getDataFromStorage();
    if (data === null) {
        data = [];
    }
    data.map((value, key)=> {
        if (value.id === parseInt(id)) {
            result = value;
        }
    });
    return result;
}

/**
 * 
 * Функция сохраняет состояние профиля
 * 
 * @param {int} id
 * @param {object} profile
 * 
 */
function setProfileById(id, profile)
{
    let result = false;
    let data = getDataFromStorage();
    if (data === null) {
        data = [];
    }
    data.map((value, key)=> {
        if (value.id === parseInt(id)) {
            data[parseInt(key)] = profile;
        }
    });
    setDataToStorage(data);
    console.log(data);
}

/**
 * 
 * Функция получения данных из локальной базы
 * 
 * @return {array} 
 * 
 */
function getDataFromStorage()
{
    let data = [];
    try {
        data = JSON.parse(localStorage.getItem('profile_data')) || [];
    } catch(e) {
        console.log(e);
    }
    return data;
}

/**
 * Добовляет новый профиль в базу
 * 
 * @param {object} profile
 * 
 */
function addNewToStorage(profile)
{
    let data = getDataFromStorage();
    if (data === null) {
        data = [];
    }
    data.push(profile);
    setDataToStorage(data);
}

/**
 * 
 * Функция записывает в базу (заменяет)
 * 
 * @param {array} data
 *  
 */
function setDataToStorage(data)
{
    let string = JSON.stringify(data);
    localStorage.setItem('profile_data', string);
    dbSync(true);
}

