import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, notificationRef }) => {
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
      notificationRef.current.setNotification(`New blog created successfully. ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        notificationRef.current.setNotification(null)
      }, 5000)


      const newBlogArray = blogs.concat(newBlogCreated)
      setBlogs(newBlogArray)
    } catch (e) {
      notificationRef.current.setErrorNotification(`Could not create blog. ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        notificationRef.current.setErrorNotification(null)
      }, 5000)

    }
  }

  return (
    <>
      <form onSubmit={handleCreateBlogs}>
        <p>Title: <input data-testid='title' placeholder='Title...' value={title} type="text" onChange={({ target }) => setTitle(target.value)} /></p>
        <p>Author: <input data-testid='author' placeholder='Author...' value={author} type="text" onChange={({ target }) => setAuthor(target.value)} /></p>
        <p>URL: <input data-testid='url' placeholder='URL...' value={url} type="text" onChange={({ target }) => setUrl(target.value)} /></p>
        <button type="submit">Crear blog</button>
      </form>
    </>
  )
}
export default BlogForm