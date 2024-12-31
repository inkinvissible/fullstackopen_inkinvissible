import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addLike, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import Comments from './Comments'


const Blog = ({blogs, updateBlog, user }) => {
  
  const dispatch = useDispatch()
  const { id } = useParams()
  
  const blog = blogs.find(blog => blog.id === id)
  if (!blog) {
    return <div>Loading...</div>
  }

  

  
  const boxStyling = {
    border: '3px solid black',
    borderRadius: '4px',
    padding: '5px',
    marginTop: 10
  }

  const handleAddLike = async () => {
    try {
      const updatedBlog = dispatch(addLike(blog))
      dispatch(setNotification(`You voted ${blog.title}`, 5000))
      
    } catch (e) {
      console.log(e)
      dispatch(setNotification(`An error has ocurred: ${e}`, 5000))
      
    }
  }
  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeBlog(blog.id))
        dispatch(setNotification(`Successfully removed ${blog.title}`, 5000))
      } catch (e) {
        console.log(e)
        dispatch(setNotification(`Could not remove ${blog.title}. ${e}`, 5000))
      }
    }

  }

  return (
    < div style={boxStyling} >
      <p className='blogTitleAuthor text-2xl capitalize'>{blog.title} {blog.author} </p>
        <ul>
          <li className='m-2'>URL: {blog.url}</li>
          <li className='m-2'>Likes: {blog.likes}  <button data-testid='likeBtn' className='btn' onClick={handleAddLike}>like</button></li>
          <li className='m-2'>Author: {blog.author}</li>
        </ul>
        {user.username === blog.user.username ? <button className='btnDanger' onClick={handleRemoveBlog}>remove</button> : ''}
        
      
        <Comments id={id} blog={blog}/>
      </div>
  )
}

export default Blog