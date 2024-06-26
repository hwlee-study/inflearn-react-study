import React, { Component } from 'react'
import './App.css'

export default class App extends Component {

  // x버튼 스타일
  btnStyle = {
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
  }

  // 리스트 스타일링
  getStyle = (completed) => {
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: completed ? 'line-through' : 'none'
    }
  }

  // 할일 목록
  state = {
    todoData: [
      {
        id: '1',
        title: '공부하기',
        completed: true
      },
      {
        id: '2',
        title: '청소하기',
        completed: false
      },
    ],
    value: '',
  }

  // 목록 지우기
  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter((todo) => todo.id !== id);
    this.setState({ todoData: newTodoData })
  }

  // input text에 입력되는 값들을 저장하기 위한 함수
  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  // input submit(입력 버튼)을 눌렀을 때
  handleSubmit = (e) => {
    // form안에 input을 전송할 때 Reload가 되지 않도록 막아주는 함수
    e.preventDefault()

    // input text에 입력한 값 setting
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false
    }

    // state에 기존에 있는 값에 새로운 값 추가, 입력란에 있는 값 제거
    this.setState({ todoData: [...this.state.todoData, newTodo], value: '' })
  }

  // 체크한 할일 중앙에 선 긋기
  checkboxHandleClick = (completeTodoId) => {
    let changedCompleteData = this.state.todoData.map((todo) => {
      if (todo.id === completeTodoId) {
        todo.completed = !todo.completed
      }

      return todo
    })

    this.setState({ todoData: changedCompleteData })
  }

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
          {
            this.state.todoData.map((todo) => (
              <div key={todo.id} style={this.getStyle(todo.completed)}>
                <p>
                  <input type="checkbox" defaultChecked={todo.completed} onClick={() => this.checkboxHandleClick(todo.id)} />
                  {todo.title}
                  <button style={this.btnStyle} onClick={() => this.handleClick(todo.id)}>x</button>
                </p>
              </div>
            ))
          }
          <form style={{ display: 'flex', marginTop: '10px' }} onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: '10', padding: '5px' }}
              placeholder="해야 할 일을 입력하세요."
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input type="submit" value="입력" className="submitBtn" style={{ flex: '1' }} />
          </form>
        </div>
      </div>
    )
  }
}