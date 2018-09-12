// import {newListName, table, tableBody} from "./main.js";
 import {handleDrop,handleDragOver,handleDragStart,handleDragEnd} from "./drag'n'drop.js";

 const btnNewListName = document.querySelector('#btnNewListName'); //кнопка "добавить новый список"

 btnNewListName.onclick = function(event) {

    event.preventDefault();

    const list = document.querySelector('#list'); //список списков ul

    const newListName = document.querySelector('#newListName');   //содержимое поля названия списка
    //если не задано имя списка, то выходим из операции
    if (newListName.value === '') {
      return
    }

    //создание элемента-списка из названия списка и двух кнопок  
    //элемент является li
    const li = document.createElement('li');

    //каждый новый список оборачиваем в див
    const div = document.createElement('div');   
    div.setAttribute('id','listName');
    div.classList = 'listName';

    //див под название списка 
    const div2 = document.createElement('div');
    div2.classList = "inline height";

    //див под две кнопки
    const div3 = document.createElement('div');
    div3.classList = 'inline floatRight';

    //кнопка "добавить пункт"
    const button = document.createElement('button');
    button.setAttribute('type','button');
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#exampleModal');
    button.classList = "btn btn-primary addItem";
    button.innerHTML = 'Add task';

    //кнопка "удалить список"
    const button2 = document.createElement('button');
    button2.setAttribute('type','submit');
    button2.classList = "btn btn-primary deleteBtn";
    button2.innerHTML = 'X';

    //добавление нового элемента списка  
    const newLi = list.appendChild(li);

    //добавление в новый список названия  
    const newDiv = newLi.appendChild(div);
    const newDivListName = newDiv.appendChild(div2);
    newDivListName.innerHTML = newListName.value;

    //добавление в новый список кнопок
    const newBtn = newDiv.appendChild(div3);
    newBtn.appendChild(button);
    newBtn.appendChild(button2);

    //восстанавливаем placeholder
    newListName.value = ''; 

    //создаем табличную структуру
    const table = document.createElement("table");
    table.classList = "table table-hover";
    const tableBody = document.createElement("tbody");
    tableBody.classList='tbody droppable'; 
    tableBody.ondrop = handleDrop;
    tableBody.ondragover = handleDragOver;

    table.appendChild(tableBody);
    newLi.appendChild(table);


    document.querySelector("ul").addEventListener('click', function(e) {

        //удалить список
        if (e.target.className === "btn btn-primary deleteBtn") { 
          event.preventDefault();
          const del = e.target.parentNode.parentNode.parentNode;
          del.remove();      
        }

        //скрыть-раскрыть список при клике по "оберточному" диву и по названию
        if (e.target.className === "listName") {     
          e.target.nextElementSibling.classList.toggle("hidden");
        }

        if (e.target.className === "inline height") { 
          e.target.parentNode.nextElementSibling.classList.toggle("hidden");
        }
    })
    //вызов формы для добавления дела в список
  } 

  