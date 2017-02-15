"use strict"

const httpEngineRepo = new XMLHttpRequest()

httpEngineRepo.onreadystatechange = ()=> { 
        if (httpEngineRepo.readyState == 4 && httpEngineRepo.status == 200)
           writeList(httpEngineRepo.responseText);
    }

/**
 * Получает список компаний
 * 
 */
function getCompany()
{
    let urlRequest = 'backend/repository.php?type=company';
    httpEngineRepo.open("GET", urlRequest, true);
    httpEngineRepo.send();
}

/**
 * Рисует список компаний
 * 
 * @param {string} result
 * 
 */
function writeList(result)
{
    let ul = document.getElementById('company_list');
    clearCompanyList();
    let data;   
    try {
        data = JSON.parse(result);
    } catch(e) {
        console.log(e);
    }
    data.map((value, key)=> {
        createCheckBox(value.id, value.title, true);        
    });
}