import {
  fetchAndRenderTodos,
} from './lib/ui.js';
import { empty } from './lib/helpers.js';

/** Vísun í <main> sem geymir allt efnið og við búum til element inn í */
const main = document.querySelector('main');

/**
 * Athugar útfrá url (`window.location`) hvað skal birta:
 * - `/` birtir yfirlit
 */
function route() {
  debugger;
  fetchAndRenderTodos(main);
}

/**
 * Sér um að taka við `popstate` atburð sem gerist þegar ýtt er á back takka í
 * vafra. Sjáum þá um að birta réttan skjá.
 */
window.onpopstate = () => {
  // Tæmum main
  empty(main);

  // Finnum svo út úr því hvað á að birta, `window.location` verður uppfært þegar atburður gerist
  route();
};

// Í fyrsta skipti sem vefur er opnaður birtum við það sem beðið er um út frá URL
route();
