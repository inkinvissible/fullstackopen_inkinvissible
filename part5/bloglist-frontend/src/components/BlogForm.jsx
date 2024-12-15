import { useState } from "react"
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, notificationObject }) => {
  const { errorNotification, setErrorNotification, notification, setNotification } = notificationObject
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlogs = async (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    try {
      const newBlogCreated = await blogService.create(newBlog)
      setAuthor('')
      setTitle('')
      setUrl('')
      setNotification(`New blog created successfully. ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)


      const newBlogArray = blogs.concat(newBlogCreated)
      setBlogs(newBlogArray)
    } catch (e) {
      setErrorNotification(`Could not create blog. ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setErrorNotification(null)
      }, 5000)
      console.log(e);

    }
  }

  return (
    <>
      <form onSubmit={handleCreateBlogs}>
        <p>Title: <input value={title} type="text" onChange={({ target }) => setTitle(target.value)} /></p>
        <p>Author: <input value={author} type="text" onChange={({ target }) => setAuthor(target.value)} /></p>
        <p>URL: <input value={url} type="text" onChange={({ target }) => setUrl(target.value)} /></p>
        <button type="submit">Crear blog</button>
      </form>
    </>
  )
}
export default BlogForm