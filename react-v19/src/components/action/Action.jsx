import {useState} from 'react'
import UseFormStatus from '../useFormStatus/useFormStatus'

const PostForm = ({addPosts}) => {
  const formAction = async (formData) => {
    const newPost = {
      title: formData.get('title'),
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    addPosts(newPost)
  }
  return (
    <form action={formAction}>
      <input type="text" name="title" />
      <UseFormStatus />
    </form>
  )
}

function Action() {
  const [posts, setPosts] = useState([])
  const addPosts = (newPost) => {
    setPosts((posts) => [...posts, newPost])
  }
  return (
    <div>
      <PostForm addPosts={addPosts} />
      {posts.map((post, index) => (
        <h2 key={index}>{post.title}</h2>
      ))}
    </div>
  )
}

export default Action
