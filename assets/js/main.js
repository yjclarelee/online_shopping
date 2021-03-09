function render(){
    getData().then((res) => {
        clearUlHTML();
        renderHTML(res);
        detectClick(res);
    })
}

async function getData(){
    const fetchedData = await fetch('/assets/data/data.json');
    const jsonData = await fetchedData.json();
    return jsonData.items;
}

function clearUlHTML(){
    const ulElem = document.querySelector('ul');
    while(ulElem.firstChild) ulElem.lastChild.remove()
}

function renderHTML(data, type = null, color = null){
    const ulElem = document.querySelector('ul');
    data.forEach((elem) => {
        if(!type && !color) setHTML(ulElem, elem);
        else if(type && elem.type == type) setHTML(ulElem, elem);
        else if(color && elem.color == color) {
            setHTML(ulElem, elem);
        }
    })
}

function setHTML(ulElem, elem){
    const liElem = document.createElement('li');
    
    let imgType;
    if(elem.type == 'tshirt') imgType = 't';
    else if(elem.type == 'skirt') imgType = 's';
    else imgType = 'p';

    let liHTML = `
    <img src="./assets/img/${elem.color}_${imgType}.png" class="clothes list-img" alt="${elem.color} ${elem.type}">
    <span>${elem.gender},  ${elem.size} size</span>`

    liElem.innerHTML = liHTML;
    ulElem.appendChild(liElem);
}

function detectClick(data){
    const header = document.querySelector('header');
    header.addEventListener('click', function(event){
        const className = event.target.className;
        if(className == 'home'){
            initializePage();
        }
        else if(className.includes('clothes')){
            clearUlHTML();
            renderHTML(data, event.target.classList[1]);
        }
        else if(className.includes('color')){
            clearUlHTML();
            data.filter()
            renderHTML(data, null, event.target.innerHTML.toLowerCase());
        }
    })
}

render();

