import './App.css'
import Action from './components/action/Action'
import UseDefaultReact from './components/use/UseDefaultReact'
import UseHook from './components/use/UseHook'
import UseActionState from './components/useActionState/UseActionState'
import UseOptimistic from './components/useOptimistic/useOptimistic'

function App() {
  return (
    <>
      {/* <UseDefaultReact />
      <UseHook />
      <Action />
      <UseActionState /> */}
      <UseOptimistic />
    </>
  )
}

export default App
