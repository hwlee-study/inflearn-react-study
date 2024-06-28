import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import List from './List'

function Lists({ todos, setTodos }) {
  /**
   * FIXME: dnd memo기능이 사라지므로 변경 필요
   * Warning: Connect(Droppable): Support for defaultProps will be removed from memo components
   * in a future major release.
   * Use JavaScript default parameters instead.
   */
  const onDragEndHandler = (result) => {
    // result 매게변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함
    console.log(result)

    // 목적지가 없으면(이벤트 취소) 이 함수를 종료합니다.
    if (!result.destination) return

    // 리엑트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newTodos = [...todos]
    // const newTodos = Array.from(todos)
    // const newTodos = todos.slice()

    /**
     * 1. 변경시키는 아이템을 배열에서 지운다.
     * 2. return 값으로 지워진 아이템을 잡아준다.
     */
    const [reOrderItem] = newTodos.splice(result.source.index, 1)

    // 원하는 자리에 reOrderItem을 추가한다.
    newTodos.splice(result.destination.index, 0, reOrderItem)
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Droppable droppableId="todoList">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                {/* eslint-disable-next-line no-shadow */}
                {(provided, snapshot) => (
                  <List
                    todos={todos}
                    setTodos={setTodos}
                    todo={todo}
                    provided={provided}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default React.memo(Lists)
