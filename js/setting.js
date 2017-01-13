"use strict"

let docReady = setInterval(function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval(docReady);
    setCountPark();
    getCurrentValue();
}, 100); 

/**
 * 
 * Создает форму
 * 
 */
function addForm() 
{
    let ol = document.getElementById('taxi_park_list');
    let li = document.createElement('li');
   
    let formId = Math.floor(Math.random() * (999 - 1 + 1)) + 1;
    li.setAttribute('id', formId);
    
    let buttonSettings = {
        "class": "button_main button_remove", 
        "type": "button",
        "onclick": `removeForm(${formId});`
    };
    
    let removeButton = createElement('button', buttonSettings);
    removeButton.appendChild(document.createTextNode("-"));
    delete Object.buttonSettings;

    let inputParkNameSettings = {
        "type": "text",
        "value": "",
        "name": "park",
        "placeholder": "Тксопарк",
        "size": 30
    };
    let inputName = createElement('input', inputParkNameSettings);
    delete Object.inputParkNameSettings;

    let inputParkSumSettings = {
        "type": "number",
        "value": "",
        "name": "sum",
        "placeholder": "Сумма",
        "onkeyup": `getCurrentValue();`,
        "class": "sum",
        "size": 20
    };
    let inputSum = createElement('input', inputParkSumSettings);
    delete Object.inputParkSumSettings;

    let inputParkPercSettings = {
        "type": "number",
        "value": "",
        "name": "prec",
        "placeholder": "%",
        "size": 1
    };
    let inputPrec = createElement('input', inputParkPercSettings);
    delete Object.inputParkPercSettings;
    
    li.appendChild(inputName);
    li.appendChild(inputSum);
    li.appendChild(inputPrec);
    li.appendChild(removeButton);
    delete Object.inputName, Object.inputSum, Object.inputPrec, Object.removeButton;
    
    ol.appendChild(li);
    setCountPark(ol.childElementCount);
    delete Object.li, Object.ol;
}

/**
 * 
 * Удаляет форму по id
 * 
 * @param {int} id
 * 
 */
function removeForm(id)
{
    let li = document.getElementById(id);
    li.style.fontWeight = "bold";
    window.setTimeout(function() {
         li.remove(); 
        setCountPark(document.getElementById('taxi_park_list').childElementCount);
        getCurrentValue();
    }, 500);
    delete Object.li;
}

/**
 * Генератор элементов
 * 
 * @param {string} element
 * @param {object} settings
 * 
 */
function createElement(element, settings)
{
    let elementObject = document.createElement(element);
    Object.keys(settings).map(function(key, index) {
        elementObject.setAttribute(key, settings[key]);
    });

    return elementObject;
}

/**
 * 
 * Устанавливает общие количество парков
 * 
 * @param {int} count
 * 
 */
function setCountPark(count = 0)
{
    document.getElementById('park_count').innerHTML = count;
}

function onEvent()
{
    let select = document.getElementById('select');
    let current = select.options[select.selectedIndex].id;   
    let newParkForm = document.getElementById('add_profile');

    if (current == 0) {
        newParkForm.style.display = "inline";
        document.getElementById('taxi_park_list').innerHTML = "";
        setCountPark(0);
        setSumPark(0);
    } else {
        newParkForm.style.display = "none";
    }
    delete Object.newParkForm, Object.select, Object.current;
}

/**
 * 
 * Устанавливает общею сумму
 * 
 * @param {int} sum
 * 
 */
function setSumPark(sum = 0)
{
    document.getElementById('park_total_sum').innerHTML = sum;
}

/**
 * 
 * Устанавливает общие количество таксопарков
 * 
 * @param {int}
 * 
 */
function getCurrentValue()
{
    let sum = 0;
    let forms = document.getElementsByClassName('sum');
    
    for (let i = 0; i < forms.length; ++i) {
        let temp = parseInt(forms[i].value);
        if (isNaN(temp)) {
            temp = 0;
        }
        sum = sum + temp;
    }
    setSumPark(sum);
    delete Object.forms;
}



