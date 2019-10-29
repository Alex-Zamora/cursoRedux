import { createStore } from 'redux';

const $form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData($form);
  const title = data.get('title');

  store.dispatch({
    type: 'ADD_SONG',
    payload: {
      title,
    }
  })
}

const initialState = [
  {
    "title": "Despacito"
  },
  {
    "title": "One more time"
  },
  {
    "title": "Escuchame la culpa"
  }
]

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_SONG':
      return [...state, action.payload ]
    default:
      return state
  }
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function render() {
  const $container = document.getElementById('playlist');
  // Array de objetos "state"
  const playlist = store.getState();
  // Borrar lo que contiene el #playlist
  $container.innerHTML = '';
  // Recorrer el state
  playlist.forEach((item) => {
    const template = document.createElement('p');
    // Agregar texto en la etiqueta "p"
    template.textContent = item.title;
    // Agregar las etiquetas p dentro de "#playlist"
    $container.appendChild(template);
  })
}

render();

function handleChange() {
  render();
}

store.subscribe(handleChange);

console.log(store.getState());