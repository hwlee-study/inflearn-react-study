import App from '../App'
import Detail from '../components/netflix/pages/Detail'
import Netflix from '../components/netflix/Netflix'
import Search from '../components/netflix/pages/Search'
import Todo from '../components/todo/Todo'
import Home from '../components/netflix/pages/Home'

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
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: ':movieId',
        element: <Detail />,
      },
    ],
  },
]
