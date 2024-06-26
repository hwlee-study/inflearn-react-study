export default function List({ todos, setTodos }) {

    const deleteBtnOnClickHandler = (deletedTodoId) => {
        const newTodos = todos.filter(todo => todo.id !== deletedTodoId)
        setTodos(newTodos)
    }

    const checkboxOnClickHandler = (changedTodoId) => {
        const changedTodos = todos.map(todo => {
            if (todo.id === changedTodoId) {
                todo.completed = !todo.completed
            }
            return todo
        })
        setTodos(changedTodos)
    }

    return (
        <article>
            <ul>
                {
                    todos.map((todo) => (
                        <li key={todo.id} className={`w-full flex items-center justify-between px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded ${todo.completed && 'line-through'}`}>
                            <label>
                                <input type="checkbox" className="mr-1" defaultChecked={todo.completed} onClick={() => checkboxOnClickHandler(todo.id)} />
                                {todo.title}
                            </label>
                            <button className='text-lg' onClick={() => deleteBtnOnClickHandler(todo.id)}>x</button>
                        </li>
                    ))
                }
            </ul>
        </article>
    );
}
