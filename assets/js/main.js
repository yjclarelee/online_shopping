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



render();

