import App from '../App'
import Netflix from '../components/netflix/Netflix'
import Todo from '../components/todo/Todo'

export const RouterInfo = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/todo',
    element: <Todo />,
  },
  {
    path: '/netflix',
    element: <Netflix />,
  },
]
