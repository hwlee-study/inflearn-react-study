import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl">메뉴</h1>
      <ul className="m-3 p-5 text-xl border-t-2">
        <li className="p-5 mb-5 border border-blue-200 hover:bg-blue-200 hover:text-white cursor-pointer rounded-2xl text-center">
          <Link to="/todo">Todo 가기</Link>
        </li>
        <li className="p-5 border border-blue-200 hover:bg-blue-200 hover:text-white cursor-pointer rounded-2xl text-center">
          <Link to="/netflix">Netflix 가기</Link>
        </li>
      </ul>
    </div>
  )
}

export default App
