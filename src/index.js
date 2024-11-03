import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RouterInfo } from './util/router'

const RouterObject = createBrowserRouter(RouterInfo, {
  basename: '/inflearn-react-study',
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  /**
   * 리액트 18버전을 사용할 때 react-beautiful-dnd 사용시 에러 발생
   * Unable to find draggable with id: 1657114686384
   **/
  // <React.StrictMode>
  // <App />
  // </React.StrictMode>
  <div className="w-screen h-screen flex items-center justify-center text-gray-700">
    <RouterProvider router={RouterObject} />
  </div>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
