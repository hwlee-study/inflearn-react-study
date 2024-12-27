import React, { useEffect, useRef, useState } from 'react'

function List({ todos, setTodos, todo, provided, snapshot }) {
  const [isEdit, setIsEdit] = useState(false)
  const [editTodo, setEditTodo] = useState(todo)
  const inputTextRef = useRef(null)

  /**
   * edit를 눌렀을 때 input text에 focus넣기
   */
  useEffect(() => {
    if (!!isEdit && inputTextRef.current !== null) {
      inputTextRef.current.focus()
    }
  }, [isEdit])

  const deleteBtnOnClickHandler = (deletedTodoId) => {
    const newTodos = todos.filter((todo) => todo.id !== deletedTodoId)
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const checkboxOnClickHandler = (changedTodoId) => {
    const changedTodos = todos.map((todo) => {
      if (todo.id === changedTodoId) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(changedTodos)
    localStorage.setItem('todos', JSON.stringify(changedTodos))
  }

  const editTodoOnSubmitHandler = (e) => {
    e.preventDefault()

    const editTodos = todos.map((originTodo) => {
      if (originTodo.id === todo.id) {
        originTodo.title = editTodo
      }
      return originTodo
    })

    setTodos(editTodos)
    localStorage.setItem('todos', JSON.stringify(editTodos))
    setIsEdit(!isEdit)
  }

  const editTodoOnChangeHandler = (e) => {
    setEditTodo(e.target.value)
  }

  if (isEdit) {
    return (
      <li key={todo.id} className="w-full px-4 py-1 my-2 text-gray-600 border rounded">
        <form
          className="w-full flex  items-center justify-between"
          onSubmit={editTodoOnSubmitHandler}
        >
          <label className={`${todo.completed && 'line-through'}`}>
            <input
              type="text"
              className="border border-blue-400 bg-gray-100 rounded focus:bg-gray-50"
              ref={inputTextRef}
              placeholder={todo.title}
              onChange={editTodoOnChangeHandler}
            />
          </label>
          <span>
            <button type="submit" className="mr-4 hover:text-orange-400">
              save
            </button>
            <button type="button" className="text-lg" onClick={() => setIsEdit(!isEdit)}>
              x
            </button>
          </span>
        </form>
      </li>
    )
  }
  return (
    <li
      key={todo.id}
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      className={`w-full flex items-center justify-between px-4 py-1 my-2
            text-gray-600 border rounded 
            ${snapshot.isDragging ? 'bg-gray-300' : 'bg-gray-100'}`}
    >
      <label className={`${todo.completed && 'line-through'}`}>
        <input
          type="checkbox"
          className="mr-1"
          defaultChecked={todo.completed}
          onClick={() => checkboxOnClickHandler(todo.id)}
        />
        {todo.title}
      </label>
      <span>
        <button
          type="button"
          className="mr-4 hover:text-orange-400"
          onClick={() => setIsEdit(!isEdit)}
        >
          edit
        </button>
        <button type="button" className="text-lg" onClick={() => deleteBtnOnClickHandler(todo.id)}>
          x
        </button>
      </span>
    </li>
  )
}

export default React.memo(List)
