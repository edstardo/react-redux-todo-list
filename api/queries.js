
const Pool = require('pg').Pool

const pool = new Pool({
  user: 'user',
  host: 'db',
  database: 'todolist',
  password: 'password',
  port: 5432,
})

const getTodos = (request, response) => {
  pool.query('SELECT * FROM todo', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createTodo = (request, response) => {
  const { description, deadline } = request.body

  pool.query('INSERT INTO todo (description, deadline) VALUES ($1, $2) returning id', [description, deadline], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json({id: results.rows[0].id})
  })
}

const deleteTodo = (request, response) => {
  const id = request.params.id

  pool.query('DELETE FROM todo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Todo deleted with ID: ${id}`)
  })
}

module.exports = {
  getTodos,
  createTodo,
  deleteTodo
}