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

  AllTags = [...new Set(AllTags)];

  rSection.appendChild(orderByElement);
  rSection.appendChild(sectionElement);

  const addButton = document.createElement('todoList__button');
    addButton.textContent = 'Bæta við verkefni';
    addButton.setAttribute;
    addButton.addEventListener('click', addTask(addButton) );//kalla á fall sem býr til nýtt task

  createNavigation(lSection, todosIndex, AllTags);

///  const addButton = el
}


/**
 * Fall sem bætir við nýju verkefni
 * @param {*} addButton
 */
function addTask(addButton) {
  document.body.appendChild(addButton);
}
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

  // Verkefni
  const verkList = el('ul');
  section.appendChild(verkList);

  const verkefni = el('li', "Verkefni");
  verkefni.addEventListener('click', function() { flokkaEftirStodu("ollVerkefni"); });
  verkList.appendChild(verkefni);

  const klarVerkefni = el('li', "Kláruð verkefni");
  klarVerkefni.addEventListener('click', function() { flokkaEftirStodu("klarudVerkefni"); });
  verkList.appendChild(klarVerkefni);

  // Flokkar
  const catTitle = el('h2', "Flokkar");
  section.appendChild(catTitle);

  const catList = el('ul');
  section.appendChild(catList);

  for (const cat of todo.categories) {
    const catElement = el('li', cat.title);
    catElement.addEventListener('click', function() { flokkaEftirFlokki(cat.title); });
    catList.appendChild(catElement);
  }

  // Tög
  const tagTitle = el('h2', "Tags");
  section.appendChild(tagTitle);

  const tagList = el('ul');
  section.appendChild(tagList);

  for (let i = 0; i < tags.length; i++){
    const tagElement = el('li', tags[i]);
    tagElement.addEventListener('click', function() { flokkaEftirTag(tags[i]); });
    tagList.appendChild(tagElement);
  }
}


function flokkaEftirTag(tag){
  console.log(tag);
  // Þarf að útfæra
}

function flokkaEftirFlokki(flokkur){
  console.log(flokkur);
  // Þarf að útfæra
}
function flokkaEftirStodu(stada){
  console.log(stada);
  // Þarf að útfæra
}