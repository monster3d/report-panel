"use strict"

let doc_ready = setInterval(function () {
    if ( document.readyState !== 'complete' ) return;
    clearInterval(doc_ready);      
    getCurrentState(); 
}, 100); 


function getCurrentState()
{
    dbSync();
    let data = [];
        data = getDataFromStorage(); 
    let select = document.getElementById('select');

    Object.keys(data).map((key, index)=> {
        let option = document.createElement('option');
        option.setAttribute('id', data[parseInt(key)].id);
        option.setAttribute('name', data[parseInt(key)].name);
        option.setAttribute('value', data[parseInt(key)].id);
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
}

function onEvent()
{
    

}