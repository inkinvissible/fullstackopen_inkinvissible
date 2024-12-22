import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, notificationRef, user }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const hide = {
    display: 'none'
  }
  const show = {
    border: '3px solid black',
    borderRadius: '7px',
    padding: '5px',
    marginBottom: 5
  }
  const boxStyling = {
    border: '3px solid black',
    borderRadius: '4px',
    padding: '5px',
    marginTop: 10
  }
  const addLike = async () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      const response = await blogService.update(blog.id, updatedBlog)
      updateBlog(response, 'updateLikes')
      notificationRef.current.setNotification(`You liked : ${response.title}`)
      setTimeout(() => {
        notificationRef.current.setNotification(null)
      }, 5000)
    } catch (e) {
      notificationRef.current.setErrorNotification(e)
      setTimeout(() => {
        notificationRef.current.setErrorNotification(null)
      }, 5000)
    }
  }
  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        updateBlog(blog.id, 'delete')
        notificationRef.current.setNotification('Blog successfully deleted')
        setTimeout(() => {
          notificationRef.current.setNotification(null)
        }, 5000)
      } catch (e) {
        notificationRef.current.setErrorNotification(e)
        setTimeout(() => {
          notificationRef.current.setErrorNotification(null)
        }, 5000)
      }
    }

  }

  return (
    < div style={boxStyling} >
      <p className='blogTitleAuthor'>{blog.title} {blog.author} <button  onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button></p>
      <div className='blogDetails' style={visible ? show : hide}>
        <ul>
          <li>URL: {blog.url}</li>
          <li>Likes: {blog.likes}  <button data-testid='likeBtn' className='likeBtn' onClick={addLike}>like</button></li>
          <li>Author: {blog.author}</li>
        </ul>
        {user.username === blog.author ? <button onClick={removeBlog}>remove</button> : ''}

      </div>
    </div >
  )
}

export default Blog