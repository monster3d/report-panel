"use strict"

dbSync();
let docReady = setInterval(function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval(docReady);
    setCountPark();
    getCurrentValue();
    getCurrentState();
}, 100); 

/**
 * 
 * Создает форму
 * 
 */
function addForm(data = null, id = 0) 
{
    let name = "";
    let sum  = "";
    let prec = "";
    let formId = 0;
    let current = select.options[select.selectedIndex].id;  

    if (current == "new") {
        window.alert("Сперва создайте профиль!");
        return;
    }

    if (id == 0) {
        formId = getRandom();
    } else {
        formId = id;
    }
    
    if (data !== null) {
        name = data.name;
        sum  = data.sum;
        prec = data.prec;
    }
    
    let ol = document.getElementById('taxi_park_list');
    let li = document.createElement('li');
   
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
        "value": name,
        "name": "park",
        "placeholder": "Тксопарк",
        "size": 30
    };
    let inputName = createElement('input', inputParkNameSettings);
    delete Object.inputParkNameSettings;

    let inputParkSumSettings = {
        "type": "number",
        "value": sum,
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
        "value": prec,
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
    document.getElementById('taxi_park_list').innerHTML = "";
    let select = document.getElementById('select');
    let current = select.options[select.selectedIndex].id;   
    let newParkForm = document.getElementById('add_profile');
    let data = [];

    if (current == 'new') {
        newParkForm.style.display = "inline";
        setCountPark(0);
        setSumPark(0);
    } else {
        newParkForm.style.display = "none";
    }
    data = getDataFromStorage(); 
    Object.keys(data).map(function(key, index) {
        if (data[parseInt(key)].id == parseInt(current)) {
            Object.keys(data[parseInt(key)].data).map(function(value, index) {
                let formDataSettings = {
                    "name": data[parseInt(key)].data[parseInt(value)].name,
                    "sum": data[parseInt(key)].data[parseInt(value)].sum,
                    "prec": data[parseInt(key)].data[parseInt(value)].prec
                };
                addForm(formDataSettings, value);
            })
        }
    });
    getCurrentValue();
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

/**
 * Восстанавливает состояние профиля
 * 
 * 
 */
function getCurrentState()
{
    let data = [];
        data = getDataFromStorage(); 
    let select = document.getElementById('select');

     Object.keys(data).map(function(key, index) {
         let option = document.createElement('option');
         option.setAttribute('id', data[parseInt(key)].id);
         option.setAttribute('name', data[parseInt(key)].name);
         option.setAttribute('value', data[parseInt(key)].name);
         option.innerHTML = data[parseInt(key)].name
         select.appendChild(option);
         delete Object.option;
     });
     if (data.length == 0) {
         select.children[0].setAttribute('selected', 'select');
     } else {
         select.lastChild.setAttribute('selected', 'select');
     }
        onEvent();
        getCurrentValue();
}

/**
 * Сохранаяет профиль
 * 
 * 
 */
function saveProfile()
{
    let select = document.getElementById('select');
    let current = select.options[select.selectedIndex];
    let list = document.getElementById('taxi_park_list');
    let inputNodes = list.childNodes;
    let profile = getProfileById(current.id); 
    let parkId;
    let parks = [];

    if (inputNodes.length === 0) {
        window.alert('Нужно добавить хоть один таксопарк!');
        return;
    }
    Object.keys(inputNodes).map(function(key, index) {
        let park = inputNodes[parseInt(key)];
        let forms = park.getElementsByTagName('input');
        let data = {
            "id": park.id,
            "name": forms.park.value,
            "sum": forms.sum.value,
            "prec": forms.prec.value
        };
        parks.push(data);
    });
    addNewTaxiParkToProfile(current.id, parks);
    delete Object.parks, Object.park, Object.forms;
}

/**
 * Создает новый профиль
 * 
 * 
 */
function createProfile()
{
    let input = document.getElementById('add_profile').getElementsByTagName('input');
    let select = document.getElementById('select');
    let newOption = document.createElement('option');
    let profileName = input[0].value;
    let data = [], id = getRandom();

    if (profileName == "") {
        window.alert("Введите имя профиля");
        return;
    }

    createNewProfile(id, profileName);

    newOption.innerHTML = profileName;
    newOption.setAttribute('selected', 'select');
    newOption.setAttribute('id', id);
    select.appendChild(newOption);
    document.getElementById('add_profile').style.display = 'none';

}

/**
 * Создает новый профиль
 * 
 * @param {int} id
 * @param {string} name 
 * 
 */
function createNewProfile(id, name)
{
    let data = {
        "id": id,
        "name": name,
        "data": []
    };
    addNewToStorage(data);
}

/**
 * 
 * Функция добовляет парк к профилю
 *
 * @param {int} id
 * @param {object} parks
 *
 * @return {boolean}
 *  
 */
function addNewTaxiParkToProfile(id, parks)
{
    let result = false;
    let profile = getProfileById(id);
    if (profile !== null) {
        result = true;
        profile.data = parks;
        setProfileById(id, profile);
    }
    return result;
}

