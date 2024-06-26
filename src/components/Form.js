import React from 'react'

export default function Form({ onSubmitHandler, newTodo, setNewTodo }) {
    const inputOnChangeHandler = (e) => {
        setNewTodo(e.target.value)
    }

    return (
        <article>
            <form onSubmit={onSubmitHandler} className='flex pt-2'>
                <input
                    type="text"
                    name="value"
                    className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
                    value={newTodo}
                    onChange={inputOnChangeHandler}
                    placeholder='해야 할 일을 입력하세요.'
                />
                <input
                    className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
                    type="submit" value='입력' />
            </form>
        </article>
    )
}
