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
        showMessage("Сперва создайте профиль!");
        return;
    }

    document.getElementById('label_list').style.opacity = 1.0;
    
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
    let countList = document.getElementById('taxi_park_list').childElementCount;
    li.style.fontWeight = "bold";
    window.setTimeout(()=> {
         li.remove(); 
        setCountPark(countList);
        getCurrentValue();
        if (countList === 1) {
            document.getElementById('label_list').style.opacity = 0;
        }
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
    Object.keys(settings).map((key, index)=> {
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
    clearCompanyList();
    document.getElementById('taxi_park_list').innerHTML = "";
    let select = document.getElementById('select');
    let current = select.options[select.selectedIndex].id;   
    let newParkForm = document.getElementById('add_profile');
    let from = document.getElementById('from');
    let to = document.getElementById('to');
    let data = [];

    if (current == 'new') {
        newParkForm.style.display = "inline";
        setCountPark(0);
        setSumPark(0);
        to.value = "";
        from.value = "";
    } else {
        newParkForm.style.display = "none";
    }
    data = getDataFromStorage(); 
    Object.keys(data).map((key, index)=> {
        if (data[parseInt(key)].id == parseInt(current)) {
            from.value = data[parseInt(key)].from;
            to.value = data[parseInt(key)].to;
            Object.keys(data[parseInt(key)].data).map((value, index)=> {
                let formDataSettings = {
                    "name": data[parseInt(key)].data[parseInt(value)].name,
                    "sum": data[parseInt(key)].data[parseInt(value)].sum,
                    "prec": data[parseInt(key)].data[parseInt(value)].prec
                };
                addForm(formDataSettings, value);
            })
        }
    });

    Object.keys(data).map((key, index)=> {
       if (data[parseInt(key)].id == parseInt(current)) {
           data[parseInt(key)].company.map((value, key)=> {
               createCheckBox(value.id, value.title, value.checked);
           });
       }
    });
    getCurrentValue();
    delete Object.newParkForm, Object.select, Object.current;
}

/**
 * Функция отслеживает событие чекбокса
 * 
 * @param {int} id
 * 
 */
function checkBoxEvent(id)
{
    let checkbox_id, list_id;
    checkbox_id = id;
    list_id     = `list_${id}`;
  
    if (document.getElementById(checkbox_id).checked) {
        document.getElementById(list_id).style.opacity = 1.0; 
    } else {
        document.getElementById(list_id).style.opacity = 0.2;
    }
    refreshCountCompany();
}

function refreshCountCompany()
{
    //document.getElementById('company').innerHTML = getTotalCountCompanyList();
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

     Object.keys(data).map((key, index)=> {
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
        showMessage('Нужно добавить хоть один таксопарк!');
        return;
    }
    Object.keys(inputNodes).map((key, index)=> {
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
    addNewTaxiCompanyToProfile(current.id, getCheckBox());
    delete Object.parks, Object.park, Object.forms;
    showMessage('Профиль успешно сохранен!');
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
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    let profileName = input[0].value;
    let data = [], id = getRandom();

    if (profileName == "") {
        showMessage("Введите имя профиля");
        return;
    }

    createNewProfile(id, profileName, from, to);

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
 * @param {string} from
 * @param {string} to 
 * 
 */
function createNewProfile(id, name, from, to)
{
    let data = {
        "id": id,
        "name": name,
        "from": from,
        "to": to,
        "data": [],
        "company": []
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

function addNewTaxiCompanyToProfile(id, company)
{
    let result = false;
    let profile = getProfileById(id);
    if (profile !== null) {
        result = true;
        profile.company = company;
        setProfileById(id, profile);
    }
    return result;
}

function getCheckBox()
{
    let data = [];
    let status = {};
    let ul = document.getElementById('company_list');
    Object.keys(ul.childNodes).map((key, index)=> {
        let input = ul.childNodes[parseInt(key)].getElementsByTagName('input');
        let span = ul.childNodes[parseInt(key)].getElementsByTagName('span');
            status = {
                'id': input[0].id,
                'checked': input[0].checked,
                'title': span[0].innerHTML
            }
        data.push(status);
    })
    return data;
}

/**
 * Создает лист компании
 *
 * @param {int} id
 * @param {string} title
 * @param {boolean} checked
 * 
 */
function createCheckBox(id, title, checked)
{
        let ul = document.getElementById('company_list');
        let li = createElement('li', {'id': `list_${id}`});
        let div = createElement('div', {'class': 'check-box'});        
        let span = createElement('span', {'id': `title_${id}`});
        let input;
        span.innerHTML = title;

        if (checked) {
            input = createElement('input', {
                'id': id, 'type': 'checkbox',
                'onclick': `checkBoxEvent(${id})`,
                'checked': '' 
        });
        } else {
            input = createElement('input', {
                'id': id, 'type': 'checkbox',
                'onclick': `checkBoxEvent(${id})`
            });
            li.style.opacity = 0.2;
        }

    div.appendChild(input);
    li.appendChild(div);
    li.appendChild(span);
    ul.appendChild(li);
}