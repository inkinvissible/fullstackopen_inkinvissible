import { useState } from "react"
import blogService from "../services/blogs"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"

const BlogForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const dispatch = useDispatch()

  const handleCreateBlogs = async (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    try {
      setAuthor("")
      setTitle("")
      setUrl("")
      dispatch(
        setNotification(
          `A new blog ${newBlog.title} by ${newBlog.author} added`,
          5000
        )
      )
      dispatch(createBlog(newBlog))
    } catch (e) {
      dispatch(setNotification("Error creating blog", 5000))
    }
  }

  return (
    <>
      <form className="max-w-sm mx-auto">
      <div className="mb-5">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          data-testid="title"
          placeholder="Title..."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="author"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Author:
        </label>
        <input
          type="text"
          id="author"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          data-testid="author"
          placeholder="Author..."
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="url"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          URL:
        </label>
        <input
          type="text"
          id="url"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          data-testid="url"
          placeholder="URL..."
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button
        className="btn"
        type="submit"
      >
        Crear blog
      </button>
    </form>
    </>
  )
}
export default BlogForm
