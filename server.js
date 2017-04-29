const express = require('express')

const port = 3000
const app = express()

let todos = []

app.use('/public', express.static(__dirname + '/public'));

app.get('/api/todos', (req, res) => {
  res.json(todos)
})

app.post('/api/todos/:todo', (req, res) => {
  todos = [...todos, { todo: req.params.todo }]
  res.json({ success: true })
})

app.put('/api/todos/:todo', (req, res) => {
  let checked = false

  todos = todos.map(todoObj => {
    if (todoObj.todo = req.params.todo) {
      checked = !todoObj.checked

      return Object.assign({}, todoObj, { checked })
    }

    return todoObj
  })

  res.json({ success: true, checked })
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, (err) => {
  if (err) {
    throw err
  }

  console.log(`App running at port ${port}.`)
})
