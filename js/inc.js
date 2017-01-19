"use strict"

let doc_ready = setInterval(function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval(doc_ready);       
    refreshCountCompany();
    refreshCountPark();
}, 100); 

function checkboxEvent(id)
{
    let checkbox_id, list_id;
    checkbox_id = `checkbox_${id}`;
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
    document.getElementById('company').innerHTML = getTotalCountCompanyList();
}

function refreshCountPark()
{
    document.getElementById('parks').innerHTML = getTotalCountParkList();
}

function getTotalCountCompanyList()
{
    return document.querySelectorAll('input[type="checkbox"]:checked').length;
}

function getTotalCountParkList()
{
    let ul = document.getElementById('park_list');
    let i = 0, item_count = 0;

    while(ul.getElementsByTagName('li') [i++]) item_count++;
    
    return item_count;
}
