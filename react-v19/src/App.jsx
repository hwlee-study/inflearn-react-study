import {useEffect, useState} from 'react'
import './App.css'
import Action from './components/action/Action'
import UseDefaultReact from './components/use/UseDefaultReact'
import UseHook from './components/use/UseHook'
import UseActionState from './components/useActionState/UseActionState'
import UseOptimistic from './components/useOptimistic/useOptimistic'

const Text = ({text}) => {
  'use memo'
  console.log('Text components is rendering')
  return <div>{text}</div>
}

function App() {
  'use memo'
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  console.log('App components is rendering')

  const aObject = {a: 'a', text}

  useEffect(() => {
    console.log('aObject useEffect called')
  }, [aObject])

  return (
    <>
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        count : {count}
      </button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Text text={text} />
      {/* <UseDefaultReact />
      <UseHook />
      <Action />
      <UseActionState />
      <UseOptimistic /> */}
    </>
  )
}

export default App
