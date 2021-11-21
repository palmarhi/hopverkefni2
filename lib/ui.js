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

  // Athugum hvort engir fréttaflokkar => fetchNews skilaði tómu fylki
  if (todosIndex.length === 0) {
    const noNewsElement = el('p', 'Engar fréttir.');
    container.appendChild(noNewsElement);
  }

  // Búum til <section> sem heldur utan um allt
  const listElement = el('div');
  listElement.classList.add('newsList__list');
  const sectionElement = el('section', listElement);
  sectionElement.classList.add('newsList');
  container.appendChild(sectionElement);

  // Höfum ekki-tómt fylki af fréttaflokkum! Ítrum í gegn og birtum
  for (const todo of todosIndex) {
    const itemElement = el('div');
    itemElement.classList.add('newsList__item');
    listElement.appendChild(itemElement);

    //TODO: fetchAndRenderTodo(category.id, itemElement, link, newsItemLimit);
  }
}

/**
 * Sækir gögn fyrir flokk og birtir í DOM.
 * @param {string} id ID á category sem við erum að sækja
 * @param {HTMLElement} parent Element sem setja á flokkinn í
 * @param {HTMLELement | null} [link=null] Linkur sem á að setja eftir fréttum
 * @param {number} [limit=Infinity] Hámarks fjöldi frétta til að sýna
 */
function fetchAndRenderTodo(
  id,
  parent,
  link = null,
  limit = Infinity
) {

  //TODO: Implement

  // Búum til <section> sem heldur utan um flokkinn
  const container = el('section');
  container.classList.add('news');

  // Bætum við parent og þannig DOM, allar breytingar héðan í frá fara gegnum
  // container sem er tengt parent
  parent.appendChild(container);

  // Setjum inn loading skilaboð fyrir flokkinn
  const loadingElement = el('p', 'Sæki gögn...');
  container.appendChild(loadingElement);

  // Sækjum gögn fyrir flokkinn og bíðum
  const news = await fetchNews(id);

  // Fjarlægjum loading skilaboð
  container.removeChild(loadingElement);

  // Ef það er linkur, bæta honum við
  if (link) {
    const links = el('div', link);
    links.classList.add('news__links');
    container.appendChild(links);
  }

  // Villuskilaboð ef villa og hættum
  if (!news) {
    const errorElement = el('p', 'Villa kom upp');
    container.appendChild(errorElement);
    return;
  }

  // Skilaboð ef engar fréttir og hættum
  if (news.length === 0) {
    const noNewsElement = el('p', 'Engar fréttir.');
    container.appendChild(noNewsElement);
    return;
  }

  // Bætum við titli
  const title = el('h2', news.title);
  title.classList.add('news__title');
  container.appendChild(title);

  // Höfum fréttir! Ítrum og bætum við <ul>
  const ul = el('ul');
  ul.classList.add('news__list');
  container.appendChild(ul);

  for (let i = 0; i < Math.min(news.items.length, limit); i += 1) {
    const item = news.items[i];
    const a = el('a', item.title);
    a.setAttribute('href', item.link);
    const li = el('li', a);
    li.classList.add('news__item');
    ul.appendChild(li);
  }
}
