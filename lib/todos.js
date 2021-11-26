/**
 * Hlutur sem heldur utan um in-memory „cache“ af gögnum í minni á client (í vafra).
 * Nýtir það að þegar forrit er keyrt mun `fetchNews` fallið *alltaf* keyra þar sem `cache` er í
 * scope, og það verður alltaf sami hluturinn. Við getum því bætt við niðurstöðum í hlutinn með
 * vel þekktum „lykli“ (cache key), við næstu köll getum við athugað hvort hlutur innihaldi þennan
 * lykil og skilað þá þeirri niðurstöðu í stað þess að gera sama kall aftur.
 */
const cache = {};

/**
 * Sækir fréttir frá vefþjónustu. Geymir í in-memory cache gögn eftir `id`.
 * @param {string} [id=''] ID á fréttaflokk til að sækja, sjálgefið tómi (grunn) flokkurinn
 * @returns {Promise<Array<object> | null>} Promise sem verður uppfyllt með fylki af fréttum.
 *           Skilar `null` ef villa kom upp við að sækja gögn.
 */
export async function fetchTodos(id = '') {
  const savedTodos = getTodosFromLocalStorage();

  if (savedTodos) {
    return savedTodos;
  } else {
    const data = {
      "items": [
        {
          "id": "1",
          "title": "Útfæra prótótýpu viðmót fyrir v1 af vefforriti",
          "description": "",
          "category": "Vefforrit",
          "tags": ["Framendi", "HTML"],
          "priority": false,
          "modified": 1635638400000,
          "due": 1638648500000,
          "deleted": false,
          "completed": false
        },
        {
          "id": "2",
          "title": "Bóka planning fyrir sprett #4",
          "description": "Eftir retro fyrir sprett #3",
          "category": "Skipulag",
          "tags": ["Fundir"],
          "priority": false,
          "modified": 1635638400000,
          "due": 1636648500000,
          "deleted": false,
          "completed": false
        },
        {
          "id": "3",
          "title": "Test task fyrir deleted",
          "description": "Vefþjónustur",
          "category": "",
          "tags": [],
          "priority": false,
          "modified": 1635638400000,
          "due": null,
          "deleted": true,
          "completed": false
        },
        {
          "id": "4",
          "title": "Test task sem er lokið",
          "description": "",
          "category": "Vefforrit",
          "tags": [],
          "priority": false,
          "modified": 1635638400000,
          "due": 1635638500000,
          "deleted": false,
          "completed": true
        },
        {
          "id": "5",
          "title": "Hönnun á útliti",
          "description": "Við verðum að fá alvöru hönnun, þetta gengur ekki lengur",
          "category": "Vefforrit",
          "tags": ["Framendi", "Hönnun"],
          "priority": false,
          "modified": 1635638400000,
          "due": null,
          "deleted": false,
          "completed": false
        },
        {
          "id": "6",
          "title": "Útfæra nýtt gagnagrunnsskema",
          "description": "Samræma við nýjustu hönnunarskjöl",
          "category": "Vefþjónustur",
          "tags": ["Bakendi", "Gagnagrunnur"],
          "priority": false,
          "modified": 1635638400000,
          "due": 1636848500000,
          "deleted": false,
          "completed": false
        },
        {
          "id": "7",
          "title": "v1.5 af vefþjónustuskilum",
          "description": "Farið að blokka næsta sprett",
          "category": "Vefþjónustur",
          "tags": ["Bakendi"],
          "priority": false,
          "modified": 1635638400000,
          "due": 1636498500000,
          "deleted": false,
          "completed": false
        },
        {
          "id": "8",
          "title": "Ráða verkefnastjóra",
          "description": "Við erum mjög óskipulögð, sem er mjög kaldhæðið miðað við verkefnið sem við erum að vinna",
          "category": "Skipulag",
          "tags": ["Ráðning"],
          "priority": false,
          "modified": 1635638400000,
          "due": 1635498500000,
          "deleted": false,
          "completed": false
        },
        {
          "id": "9",
          "title": "Velja framendaframework til að vinna í",
          "description": "Vanilla JS er fínt, en við vinnum þetta hraðar ef við veljum gott framework",
          "category": "Vefforrit",
          "tags": ["Framendi", "Framework"],
          "priority": false,
          "modified": 1635638400000,
          "due": null,
          "deleted": false,
          "completed": false
        }
      ],
      "categories": [
        {
          "id": "vefforrit",
          "title": "Vefforrit",
        },
        {
          "id": "skipulag",
          "title": "Skipulag"
        },
        {
          "id": "vefþjónustur",
          "title": "Vefþjónustur"
        }
      ]
    }
    saveTodosToLocalStorage(data);

    return data;
  }
}

export async function updateTodo(todo) {
  const savedTodos = await getTodosFromLocalStorage();
  const index = savedTodos.items.findIndex((obj => obj.id == todo.id));
  savedTodos.items[index] = todo;
  saveTodosToLocalStorage(savedTodos);
}

function getTodosFromLocalStorage() {
  const savedTodos = window.localStorage.getItem('todos');
  return JSON.parse(savedTodos);
}

function saveTodosToLocalStorage(todos) {
  const json = JSON.stringify(todos);
  window.localStorage.setItem('todos', json);

}
