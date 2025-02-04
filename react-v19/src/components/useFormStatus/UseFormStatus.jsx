'use client'
import {useFormStatus} from 'react-dom'

function UseFormStatus() {
  const {pending} = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Loading...' : 'submit'}
    </button>
  )
}

export default UseFormStatus
