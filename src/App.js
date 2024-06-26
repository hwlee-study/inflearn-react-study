import { useState } from 'react'
import List from './components/List'
import Form from './components/Form'

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: '1',
      title: '공부하기',
      completed: false
    }
  ])

  const [newTodo, setNewTodo] = useState('')

  const onSubmitHandler = (e) => {
    e.preventDefault()

    setTodos([...todos, {
      id: Date.now(),
      title: newTodo,
      completed: false,
    }])

    setNewTodo('')
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-blue-100'>
      <section className='w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg'>
        <article className='flex justify-between mb-3'>
          <h1 className='text-2xl'>할 일 목록</h1>
          <button>Delete all</button>
        </article>
        <List todos={todos} setTodos={setTodos} />
        <Form onSubmitHandler={onSubmitHandler} newTodo={newTodo} setNewTodo={setNewTodo} />
      </section>
    </div >
  );
}
