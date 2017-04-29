import { h, app } from 'hyperapp'

app({
  state: {
    todos: [],
    input: ''
  },
  actions: {
    getAll: (state, todos) => ({ ...state, todos }),
    input: (state, input) => ({ ...state, input }),
    toggle: (state, todo, actions) => {
      fetch('/api/todos/' + todo, {
        method: 'PUT'
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            actions.toggleSucceeded({ todo, checked: res.checked })
          }
        })
        .catch(error => console.error(error))
    },
    toggleSucceeded: (state, { todo, checked }) => ({
      ...state,
      todos: state.todos.map((item) => {
        return item.todo === todo ? {...item, checked} : item
      })
    }),
    add: (state, _, actions) => {
      const todo = state.input

      actions.input('')

      fetch('/api/todos/' + todo, {
        method: 'POST'
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            actions.addSucceeded(todo)
          }
        })
        .catch(error => console.error(error))
    },
    addSucceeded: (state, todo) => ({
      ...state,
      todos: [...state.todos, { todo, checked: false }]
    })
  },
  view: (state, actions) => (
    <div>
      <h1>Todo list</h1>
      <ul>
        {state.todos.map(({ todo, checked }) => (
          <li>
            <input type="checkbox" checked={checked} onClick={() => actions.toggle(todo)}/> {todo}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          actions.add()
        }}
      >
        <input type="text" value={state.input} onInput={e => actions.input(e.target.value)}/>
        <button type="submit">Add</button>
      </form>
    </div>
  ),
  events: {
    action: (state, actions, data) => console.log(data),
    loaded: (state, actions) => {
      fetch('/api/todos')
        .then(res => res.json())
        .then(res => actions.getAll(res))
    }
  },
  root: document.getElementById('app')
})
