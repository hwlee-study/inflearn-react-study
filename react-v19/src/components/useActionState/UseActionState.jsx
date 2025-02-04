import {useActionState} from 'react'

const updateName = async (name) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return name
}

function UseActionState() {
  const [state, formAction, isPending] = useActionState(
    async (previousName, formData) => {
      const newName = await updateName(formData.get('name'))
      return newName
    },
    '',
  )
  return (
    <form action={formAction}>
      CurrentName is {state}
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Updating..' : 'Update'}
      </button>
    </form>
  )
}

export default UseActionState
