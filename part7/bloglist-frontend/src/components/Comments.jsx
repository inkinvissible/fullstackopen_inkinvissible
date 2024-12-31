import { useState } from "react"
import { useDispatch } from "react-redux"
import { addComent } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"

const Comments = ({ id, blog }) => {
  const [newComment, setNewComment] = useState("")
  const blogId = id
  const dispatch = useDispatch()
  const comments = blog.comments

  const handleSubmit = (e) => {
    try {
      e.preventDefault()
      const trimmedComment = newComment.trim()
      if (trimmedComment) {
        dispatch(addComent(blogId, trimmedComment))
        setNewComment("")
      }
      setNotification("Comment added", 5000)
    } catch (error) {
        console.error(error)
        setNotification("Error adding comment", 5000)
    }
  }

  return (
    <div>
      <h3 className="text-xl mt-4"> Comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='content'
          value={newComment}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type='submit' className="btn m-2">Add Comment</button>
      </form>
      <p className="text-lg mt-4 mb-2">List of Comments</p>
      {comments.length > 0 ? (
        <ul className="list-disc ml-8">
          {comments.map((comment) => (
            <li key={comment._id}>{comment.content}</li>
          ))}
        </ul>
      ) : (
        <p>No comments</p>
      )}
    </div>
  )
}

export default Comments
