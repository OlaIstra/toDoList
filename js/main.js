

window.onload = function () {

  const newListName = document.querySelector('#newListName');   //содержимое поля названия списка
  const btnNewListName = document.querySelector('#btnNewListName'); //кнопка "добавить новый список"
  const list = document.querySelector('#list'); //список списков ul
  let table; //переменные под таблицу
  let tableBody;

  let dragSrcEl = null;
  function handleDragStart(e) {
      // Target (this) element is the source node.
      this.style.opacity = '0.4';

      dragSrcEl = this;
   
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
      return true;
    }

    
   function handleDragOver(e) {   
      event.preventDefault();
      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

      return false;
    }

    
    function handleDrop(e) {     
      // Don't do anything if dropping the same place we're dragging.
      if (dragSrcEl != this) {
        this.appendChild(dragSrcEl);
      }
      return false;
    }

   function handleDragEnd(e) {      
      this.style.opacity = '1';      
    }
  //вызов модального окна
// добавление нового списка дел

  btnNewListName.onclick = function(event) {

    event.preventDefault();

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
    table = document.createElement("table");
    table.classList = "table table-hover";
    tableBody = document.createElement("tbody");
    tableBody.classList='tbody droppable'; 
    tableBody.ondrop = handleDrop;
    tableBody.ondragover = handleDragOver;

    table.appendChild(tableBody);
    newLi.appendChild(table);
  } 
//------------------------------------------------------------
  //управление списком дел
 
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

    //вызов формы для добавления дела в список
    if (e.target.className === "btn btn-primary addItem") {     

      event.preventDefault();

      const darkLayer = document.createElement('div'); // слой затемнения
      darkLayer.id = 'shadow'; // id чтобы подхватить стиль
      document.body.appendChild(darkLayer); // включаем затемнение

      const modalWin = document.getElementById('popupWin'); // находим наше "окно"
      modalWin.style.display = 'block'; // "включаем" его

      let addItem=document.querySelector('#addItem');
      addItem.value='';

      darkLayer.onclick = function () {  // при клике на слой затемнения все исчезнет
        darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
        modalWin.style.display = 'none'; // делаем окно невидимым
        return false;
      }

      //добление дела в список
      const addItemBtn=document.querySelector('#addItemBtn');
      
      addItemBtn.onclick = function () {  
        event.preventDefault(); 

        //если не задано имя дела, то выходим из операции
        if (addItem.value === '') {          
          darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
          modalWin.style.display = 'none'; // делаем окно невидимым
          return
        }        

        //содание оберточного дива для элемента-дела
        const div = document.createElement('div');
        div.classList = 'form-check';

        //создание и добавление чекбокса
        const input = document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('class','form-check-input');
        input.setAttribute('id','exampleCheck1');
        div.appendChild(input);

        //создание и добавление названия дела
        const label = document.createElement('label');
        label.setAttribute('class','form-check-label');
        label.setAttribute('for','exampleCheck1');
        label.innerHTML = addItem.value;
        div.appendChild(label);

        //создание и добавление кнопки "изменить"
        const reBtn = document.createElement('div');
        reBtn.setAttribute('class','reBtn');
        
        //обработка времени и даты
        const date = document.querySelector('#date');
        const time = document.querySelector('#time');
        
        //создание и вставка строки для таблицы
        const tr = document.createElement("tr");
        tr.setAttribute('draggable', true);
        tr.ondragstart = handleDragStart;
        tr.ondragend = handleDragEnd;

        const td1 = document.createElement("td");

        td1.appendChild(div); 
        tr.appendChild(td1);     

        const td2 = document.createElement("td");       
        const dateStr = date.value.split('-').reverse().join('/');        
        td2.innerHTML = dateStr + '&nbsp&nbsp&nbsp&nbsp&nbsp' + time.value;

        tr.appendChild(td2);          

        const td3 = document.createElement("td");
        td3.appendChild(reBtn);    
        tr.appendChild(td3);     

        e.target.parentElement.parentElement.nextElementSibling.firstChild.appendChild(tr);
        //восстанавливаем placeholder
        addItem = '';
        darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
        modalWin.style.display = 'none'; // делаем окно невидимым
        
        return false;
      }
    }
    //-------------------------------------------------------
    //удалить дело из списка
    if (e.target.type === 'checkbox') {     
      setTimeout(function() { e.target.parentNode.parentNode.parentNode.remove() }, 1000);
    }    

    //изменить дело
    if (e.target.className === 'reBtn') {
       
        event.preventDefault();
        //замена названия кнопки в попап окне
        document.querySelector('#addItemBtn').innerHTML = "Save";

        const darkLayer = document.createElement('div'); // слой затемнения
        darkLayer.id = 'shadow'; // id чтобы подхватить стиль
        document.body.appendChild(darkLayer); // включаем затемнение

        const modalWin = document.getElementById('popupWin'); // находим наше "окно"
        modalWin.style.display = 'block'; // "включаем" его

        let addItem=document.querySelector('#addItem'); //введенное значение
        addItem.value=e.target.parentNode.previousSibling.previousSibling.firstChild.lastChild.innerHTML;

        darkLayer.onclick = function () {  // при клике на слой затемнения все исчезнет
          darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
          modalWin.style.display = 'none'; // делаем окно невидимым
          return false;
        }
        const addItemBtn=document.querySelector('#addItemBtn');
        //изменить дело
        addItemBtn.onclick = function () {  
          event.preventDefault();  

          if(addItem.value===''){          
            darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
            modalWin.style.display = 'none'; // делаем окно невидимым
            return
          }
          dateStr=date.value.split('-').reverse().join('/');        
          
          e.target.parentElement.parentElement.firstChild.firstChild.lastChild.innerHTML=addItem.value;  

          e.target.parentElement.parentElement.firstChild.nextElementSibling.innerHTML=dateStr+'&nbsp&nbsp&nbsp&nbsp&nbsp'+time.value;;

          addItem='';            
          darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
          modalWin.style.display = 'none'; // делаем окно невидимым
          
          return false;
        }
    }  
})

    
}