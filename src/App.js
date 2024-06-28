import { useState } from 'react'
import Form from './components/Form'
import Lists from './components/Lists'

function App() {
  const initialTodos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : []
  const [todos, setTodos] = useState(initialTodos)

  const [newTodo, setNewTodo] = useState('')

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const newTodos = [
      ...todos,
      {
        id: Date.now(),
        title: newTodo,
        completed: false,
      },
    ]

    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))

    setNewTodo('')
  }

  const handleRemoveAllClick = () => {
    setTodos([])
    localStorage.removeItem('todos')
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-100">
      <section className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <article className="flex justify-between mb-3">
          <h1 className="text-2xl">할 일 목록</h1>
          <button type="button" onClick={() => handleRemoveAllClick()}>
            Delete all
          </button>
        </article>
        <Lists todos={todos} setTodos={setTodos} />
        <Form onSubmitHandler={onSubmitHandler} newTodo={newTodo} setNewTodo={setNewTodo} />
      </section>
    </div>
  )
}

export default App
