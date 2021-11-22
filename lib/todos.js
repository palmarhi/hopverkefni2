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
  const savedTodos = window.localStorage.getItem('todos');

  if (savedTodos) {
    return JSON.parse(savedTodos);
  } else {
    const data = {
      "items": [
        {
          "id": "1",
          "title": "Útfæra prótótýpu viðmót fyrir v1 af vefforriti",
          "description": "",
          "category": "vefforrit",
          "tags": ["framendi", "html"],
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
          "category": "skipulag",
          "tags": ["fundir"],
          "priority": false,
          "modified": 1635638400000,
          "due": 1636648500000,
          "deleted": false,
          "completed": false
        },
        {
          "id": "3",
          "title": "Test task fyrir deleted",
          "description": "vefþjónustur",
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
          "category": "vefforrit",
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
          "category": "vefforrit",
          "tags": ["framendi", "hönnun"],
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
          "category": "vefþjónustur",
          "tags": ["bakendi", "gagnagrunnur"],
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
          "category": "vefþjónustur",
          "tags": ["bakendi"],
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
          "category": "skipulag",
          "tags": ["ráðning"],
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
          "category": "vefforrit",
          "tags": ["framendi", "framework"],
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
          "title": "Vefforrit"
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
    const json = JSON.stringify(data);
    window.localStorage.setItem('todos', json);
    return data;
  }
}
