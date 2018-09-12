

//вызов формы для добавления дела в список
  document.querySelector("ul").addEventListener('click', function(e) {
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

      //добавление дела в список
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
  }  