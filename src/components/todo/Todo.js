import { useState } from 'react'
import Lists from './Lists'
import Form from './Form'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

function Todo() {
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
    <div className="w-full h-full flex flex-col items-center justify-center bg-blue-100">
      <div className="w-full lg:w-3/4 lg:max-w-lg text-right mb-2">
        <Link className="text-white bg-orange-300 px-4 py-[14px] rounded-2xl" to="/">
          <FontAwesomeIcon icon={faHome} />
          <span className="ml-1 text-sm">메뉴</span>
        </Link>
      </div>
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
export default Todo
