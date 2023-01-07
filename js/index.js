// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minweight = document.querySelector('.minweight__input'); // кнопка добавления
const maxweight = document.querySelector('.maxweight__input'); // кнопка добавления7444444444444




// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

function classlistName(i){
if (fruits[i].color === "фиолетовый"){
  return 'fruit_violet'
}
if (fruits[i].color === "зеленый"){
  return 'fruit_green'
}
if (fruits[i].color === "желтый"){
  return 'fruit_yellow'
}
if (fruits[i].color === "розово-красный"){
  return 'fruit_carmazin'
}
if (fruits[i].color === "светло-коричневый"){
  return 'fruit_lightbrown'
}return 'fruit_new'
}

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON)


/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {

  for (let i = 0; i < fruits.length; i++) { 
      
    const newLi = document.createElement('li');
    newLi.className ='fruit__item';
    newLi.classList.add(classlistName(i));
    newLi.innerHTML=`index${i}` ;  
    fruitsList.appendChild(newLi);
    for (let [key, value] of Object.entries(fruits[i])) {   
      let txt = document.createTextNode([key, value])
      const div = document.createElement('div');
      newLi.appendChild(div);
      div.appendChild(txt);   
    }
  }
  
}


display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
 let result1 = fruits.map(item => item)
 let result = [];
  
  while (result1.length > 0) {
   let rand = getRandomInt(0,result1.length-1);
   let partfruits = result1[rand]; 
    result1.splice(rand, 1);
    result.splice(result.length,0,partfruits);
  } 
  const objectsEqual = (o1, o2) => 
  typeof o1 === 'object' && Object.keys(o1).length > 0 
      ? Object.keys(o1).length === Object.keys(o2).length 
          && Object.keys(o1).every(el => objectsEqual(o1[el], o2[el]))
      : o1 === o2;
  const arraysEqual = (arr1, arr2) => 
   arr1.length === arr2.length && arr1.every((o, index) => objectsEqual(o, arr2[index]));
   

if (arraysEqual(result, fruits)===true)
{alert(`Порядок не изменился`)};
fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
  });

/*** ФИЛЬТРАЦИЯ ***/
const filterFruits = () => {
  
   filteredFruites = fruits.filter((item) => {
    const weight = item.weight;
   
    return weight >= parseInt(minweight.value) && weight <= parseInt(maxweight.value);
  }) 
  fruits = filteredFruites;
};

filterButton.addEventListener('click', () => {
  let filter = true ;
if ( parseInt(minweight.value) > parseInt(maxweight.value) || minweight.value=="" ||maxweight.value=="") {
   alert(`Диапазон заначений введен не корректно.\n Введите значения правильно!`);
   filter == false ;
} else{
    filterFruits();
    display();
    }
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort' // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки


  const comparationColor = (fruit1, fruit2) => {
    const priority = ['розово-красный', 'светло-коричневый', 'желтый', 'зеленый', 'фиолетовый'];
    const priority1 = priority.indexOf(fruit1.color);
    const priority2 = priority.indexOf(fruit2.color);
    return priority1 > priority2;
  };
const sortAPI = {
  bubbleSort(arr, comparation) { 
   const n = arr.length;
   // внешняя итерация по элементам
   for (let i = 0; i < n-1; i++) { 
       // внутренняя итерация для перестановки элемента в конец массива
       for (let j = 0; j < n-1-i; j++) { 
           // сравниваем элементы
           if (comparation(arr[j], arr[j+1])) { 
               // делаем обмен элементов
               [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
               wasSwap = true;
              }
          }
          if (!wasSwap) break;
      }
      return arr;
  },

  quickSort(arr,comparation) {  
  quickSort(arr)     
                         
 // алгоритм быстрой сортировки                                      
function quickSort(arr, left, right) {
  let index;                                                                 
  if (arr.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? arr.length - 1 : right;
      index = partition(arr, left, right);
      if (left < index - 1) {
        quickSort(arr, left, index - 1);
      }
      if (index < right) {
        quickSort(arr, index, right);
      }
  }
  return arr;
 
} 
   
// функция разделитель
function partition(arr, left, right) {
  var pivot = arr[Math.floor((right + left) / 2)],    
      i = left,                      
      j = right;                     
  while (i <= j) {
      while (comparationColor(pivot,arr[i])) {      
          i++;                               
      }
      while (comparationColor(arr[j],pivot)) {    
          j--;
      }
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j ], arr[i]];
          i++;                                
          j--;                                
      }
  }
  return i;     
}
},
   

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
if (sortKind==='bubbleSort'){
  sortKind='quickSort'
  sortKindLabel.textContent = sortKind;
}else if (sortKind==='quickSort'){
  sortKind='bubbleSort'
  sortKindLabel.textContent = sortKind;
}
});

sortActionButton.addEventListener('click', () => {
  sortKindLabel.textContent = sortKind;
   const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
  
});
/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  if(kindInput.value && colorInput.value && weightInput.value){
  fruits.push({"kind": `${kindInput.value}`, "color": `${colorInput.value}`, "weight": `${weightInput.value}`})
  display();
  
  } else {alert( `Проверьте заполнение полей!`)}
});

