// Við erum með mörg föll sem kalla hvort í annað...
/* eslint-disable no-use-before-define */

import { fetchTodos } from './todos.js';
import { el, empty } from './helpers.js';

// TODO: Review these comments

/**
 * Föll sem sjá um að kalla í `fetchTodos` og birta viðmót:
 * - Loading state meðan gögn eru sótt
 * - Villu state ef villa kemur upp við að sækja gögn
 * - Birta gögnin ef allt OK
 * Fyrir gögnin eru líka búnir til takkar sem leyfa að fara milli forsíðu og
 * flokks *án þess* að nota sjálfgefna <a href> virkni—við tökum yfir og sjáum
 * um sjálf með History API.
 */

/**
 * Sækir todos
 * @param {HTMLElement} container Element sem mun innihalda allar fréttir
 */
export async function fetchAndRenderTodos(container) {
  // Byrjum á að birta loading skilaboð
  const loadingElement = el('p', 'Sæki lista...');

  // Birtum þau beint á container
  container.appendChild(loadingElement);

  // Sækjum yfirlit með öllum flokkum
  const todosIndex = await fetchTodos();

  // Fjarlægjum loading skilaboð
  container.removeChild(loadingElement);

  //TODO: Review this

  // Athugum hvort villa hafi komið upp => fetchNews skilaði null
  if (!todosIndex) {
    const errorElement = el('p', 'Villa kom upp');
    container.appendChild(errorElement);
  }

  // Býr til tvo dálka
  const lSection = el('div');
  container.appendChild(lSection);

  const rSection = el('div');
  container.appendChild(rSection);

  // Raða eftir
  const orderByElement = el('div');
  const orderByDescription = el('p', 'Raða eftir:');
  orderByDescription.classList.add('selectdesc');
  orderByElement.appendChild(orderByDescription);

  const orderByOptions = {
    due: 'Dagsetningu',
    title: 'Titli',
    priority: 'Forgangi'
  }

  const orderBySelect = el('select');
  for (let optionIndex in orderByOptions) {
    orderBySelect.options[orderBySelect.options.length] = new Option(orderByOptions[optionIndex], optionIndex);
  }
  orderByElement.appendChild(orderBySelect);

  // Búum til <section> sem heldur utan um allt todo
  const listElement = el('div');
  listElement.classList.add('todoList__list');
  listElement.setAttribute("id", "todolist");
  const sectionElement = el('section', listElement);
  sectionElement.classList.add('todoList');
  container.appendChild(sectionElement);

  var AllTags = [];

  // Höfum ekki-tómt fylki af fréttaflokkum! Ítrum í gegn og birtum
  for (const todo of todosIndex.items) {
    const itemElement = el('div');
    itemElement.classList.add('todoList__item');
    listElement.appendChild(itemElement);

    fetchAndRenderTodo(todo, itemElement);

    AllTags = AllTags.concat(fetchTags(todo));
  }

  rSection.appendChild(orderByElement);
  rSection.appendChild(sectionElement);


  //===================================
  // Grunnur fyrir Sigga

  // Búa til nýtt task
  const newTaskMenu = el('div');
  rSection.appendChild(newTaskMenu);

  // Bæta við tómt new task menu
  // Þetta div mun geyma öll inputs fyrir ný tasks
  const createNewTask = el('div');
  newTaskMenu.appendChild(createNewTask);

  // Býr til 'Bæta við verkefni' takka
  const addButton = document.createElement('button');
  addButton.textContent = '+ Bæta við verkefni';
  addButton.addEventListener('click', function() { showNewTaskMenu(createNewTask) });
  newTaskMenu.appendChild(addButton);
  //===================================


  // Býr til valmyndina
  createNavigation(lSection, todosIndex, AllTags);
}

//=======================

function showNewTaskMenu(section) {
  console.log("Nytt task menu birtist og 'bæta við verkefni' takkinn hverfur (display: none;)");
  // TODO: býr til öll input-in með DOM
  // Notar section.appendChild(elementið sem þú bjóst til);   Þetta setur inn öll inputs í rétta DIV-ið

  // Dæmi
  const titill = el('input');
  titill.setAttribute("type", "text");
  section.appendChild(titill);
}

/**
 * Fall sem bætir við nýju verkefni
 * @param {*} addButton
 */
function addTask(addButton) {
  console.log("Bæta við task");
  // TODO: Tekur öll gildin úr inputunum og setur þá í localstorage (nóg að allavegana að sækja þau til að byrja með)
  // Og lætur síðan newtaskmenu hreinsast of og lætur 'bæta við verkefni' birtast aftur (display: block;)
}
//=======================


/**
 * Sækir gögn fyrir flokk og birtir í DOM.
 * @param {string} id ID á category sem við erum að sækja
 * @param {HTMLElement} parent Element sem setja á flokkinn í
 * @param {HTMLELement | null} [link=null] Linkur sem á að setja eftir fréttum
 * @param {number} [limit=Infinity] Hámarks fjöldi frétta til að sýna
 */
function fetchAndRenderTodo(todo, parent) {

  //TODO: Implement

  // Búum til <section> sem heldur utan um flokkinn
  const container = el('section');
  container.classList.add('todo');

  // Bætum við parent og þannig DOM, allar breytingar héðan í frá fara gegnum
  // container sem er tengt parent
  parent.appendChild(container);

  // Villuskilaboð ef villa og hættum
  if (!todo) {
    const errorElement = el('p', 'Villa kom upp');
    container.appendChild(errorElement);
    return;
  }

  const checkbox = el('input');
  checkbox.setAttribute("type", "checkbox");
  container.appendChild(checkbox);

  // Bætum við titli
  const title = el('p', todo.title);
  title.classList.add('todo__title');
  container.appendChild(title);

  // Lýsing
  const description = el('p', todo.description);
  description.classList.add('todo__desc');
  container.appendChild(description);

  // Upplýsingar
  const todoDetailsElement = el('div');
  todoDetailsElement.classList.add('todo__details');
  container.appendChild(todoDetailsElement);

  // Dagsetning
  const dateOptions = { month: 'short', day: 'numeric'};
  const dateTimeFormatter = new Intl.DateTimeFormat('default', dateOptions);
  const dueDateElement = el('time', dateTimeFormatter.format(new Date(todo.due)));
  dueDateElement.classList.add('due-date');
  todoDetailsElement.appendChild(dueDateElement);

  // Tög
  const tagsElement = el('div');
  tagsElement.classList.add('tags');
  todoDetailsElement.appendChild(tagsElement);

  for (const tag of todo.tags) {
    const p = el('p', tag);
    p.classList.add('tag');
    tagsElement.appendChild(p);
  }

  // Flokkur
  const categoryElement = el('p', todo.category);
  todoDetailsElement.appendChild(categoryElement);
}


/**
 * Hreinsar todo listann
 */
function clearTodo(){
  document.getElementById('todolist').innerHTML = "";
}


/**
 * Sækir öll tög til að setja í valmynd
 * @param {*} todo Öll gögn
 * @returns Skilar öllum tögum í hlut
 */
function fetchTags(todo){
  let allTags = [];
  for (const tag of todo.tags) {
    if(!allTags.includes(tag))
      allTags.push(tag);
  }
  return allTags;
}


/**
 * Býr til valmyndina
 * @param {*} section Hvaða hlið flokkurinn er í (hægri eða vinstri)
 * @param {*} todo Öll todos
 * @param {*} tags Öll tög
 */
function createNavigation(section, todo, tags){

  let finished = 0;
  for (let i = 0; i < todo.items.length; i++){
    console.log("bruh");
    if (todo.items[i].completed == true) {
      finished++;
    }
  }
  let unfinished = todo.items.length - finished;

  // Verkefni
  const verkList = el('ul');
  section.appendChild(verkList);

  const verkefni = el('li', "Verkefni");
  verkefni.addEventListener('click', function() { flokkaEftirStodu("oklarudVerkefni", todo); });
  verkefni.setAttribute('value', unfinished);
  verkList.appendChild(verkefni);

  const klarVerkefni = el('li', "Kláruð verkefni");
  klarVerkefni.addEventListener('click', function() { flokkaEftirStodu("klarudVerkefni", todo); });
  klarVerkefni.setAttribute('value', finished);
  verkList.appendChild(klarVerkefni);

  // Flokkar
  const catTitle = el('h2', "Flokkar");
  section.appendChild(catTitle);

  const catList = el('ul');
  section.appendChild(catList);

  let catArr = [];

  for (let i = 0; i < todo.categories.length; i++) {
    let count = 0;
    for (let j = 0; j < todo.items.length; j++){
      if (todo.categories[i].title == todo.items[j].category){
        count++;
      }
    }
    catArr.push(count);

    const catElement = el('li', todo.categories[i].title);
    catElement.addEventListener('click', function() { flokkaEftirFlokki(todo.categories[i].title, todo); });
    catElement.setAttribute('value', catArr[i]);
    catList.appendChild(catElement);
  }

  // Tög
  const tagTitle = el('h2', "Tags");
  section.appendChild(tagTitle);

  const tagList = el('ul');
  section.appendChild(tagList);

  const alltags = [...new Set(tags)];

  let arr = [];

  for (let i = 0; i < alltags.length; i++) {

    // Telur hversu oft hvert tag kemu upp
    let count = 0;
    for (let j = 0; j < tags.length; j++){
      if(tags[j] == alltags[i])
        count++;
    }
    arr.push(count);

    const tagElement = el('li', alltags[i]);
    tagElement.addEventListener('click', function() { flokkaEftirTag(alltags[i], todo); });
    tagElement.setAttribute('value', arr[i]);
    tagList.appendChild(tagElement);
  }
}


// Flokkun

function flokkaEftirTag(tag, todos) {

  clearTodo();

  const listElement = document.getElementById('todolist');

  for (const todo of todos.items) {
    for (let i = 0; i < todo.tags.length; i++) {
      if(todo.tags[i] == tag) {
        const itemElement = el('div');
        itemElement.classList.add('todoList__item');
        listElement.appendChild(itemElement);

        fetchAndRenderTodo(todo, itemElement);
        break;
      }
    }
  }
}

function flokkaEftirFlokki(flokkur, todos) {

  clearTodo();

  const listElement = document.getElementById('todolist');

  for (const todo of todos.items) {
    if(todo.category == flokkur) {
      const itemElement = el('div');
      itemElement.classList.add('todoList__item');
      listElement.appendChild(itemElement);

      fetchAndRenderTodo(todo, itemElement);
    }
  }
}

function flokkaEftirStodu(stada, todos) {

  clearTodo();

  const listElement = document.getElementById('todolist');

  for (const todo of todos.items) {
    if(todo.completed == false && stada == "oklarudVerkefni") {
      const itemElement = el('div');
      itemElement.classList.add('todoList__item');
      listElement.appendChild(itemElement);

      fetchAndRenderTodo(todo, itemElement);
    }

    if(todo.completed == true && stada == "klarudVerkefni") {
      const itemElement = el('div');
      itemElement.classList.add('todoList__item');
      listElement.appendChild(itemElement);

      fetchAndRenderTodo(todo, itemElement);
    }
  }
}


// Sorting
function sortBy(todo){
}


// Count
function countNumberOfEachTag(){

}