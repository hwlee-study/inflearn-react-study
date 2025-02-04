import {useOptimistic} from 'react'
import {useState} from 'react'

export async function submitTitle(formData) {
  return new Promise((resolve, reject) => {
    const updateTitle = formData.get('title')
    setTimeout(() => {
      const randomNumber = Math.random()
      if (randomNumber < 0.75) {
        resolve(updateTitle)
      } else reject('Error')
    }, 2000)
  })
}
function UseOptimistic() {
  const [title, setTitle] = useState('title')
  // optimisticTitle : promise 요청 전 보여주는 값
  const [optimisticTitle, setOptimisticTitle] = useOptimistic(title)
  const [error, setError] = useState(null)
  const pending = title !== optimisticTitle
  const handleSubmit = async (formData) => {
    setError(null)
    setOptimisticTitle(formData.get('title'))
    try {
      const updatedTitle = await submitTitle(formData)
      setTitle(updatedTitle)
    } catch (e) {
      setError(e)
    }
  }

  return (
    <div>
      <h2>{optimisticTitle}</h2>
      <p>{pending && 'Updating...'}</p>
      <form action={handleSubmit}>
        <input type="text" name="title" />
        <button type="submit" disabled={pending}>
          submit
        </button>
      </form>
      <div>{error && error}</div>
    </div>
  )
}

export default UseOptimistic
