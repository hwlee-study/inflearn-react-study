import {useEffect} from 'react'
import {useState} from 'react'

const getText = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('hello')
    }, 2000)
  })
}

const TextItem = ({text}) => {
  return <h2>{text}</h2>
}

function UseDefaultReact() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchText = async () => {
      try {
        const text = await getText()
        setText(text)
        setLoading(false)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchText()
  }, [])

  if (loading) return <h2>Loading...</h2>
  return <TextItem text={text} />
}

export default UseDefaultReact
