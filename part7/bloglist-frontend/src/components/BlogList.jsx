import Blog from "./Blog"
import { Link } from "react-router-dom"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
const BlogList = ({ blogs, user }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const margin = {
    display: "block",
    marginTop: 20,
    marginBottom: 20,
  }
  return (
    <div>
      <Togglable buttonLabel={"New Blog"}>
        <BlogForm />
      </Togglable>
      <br />
      {sortedBlogs.map((blog) => (
        <div key={blog.id}>
          <Link
            className=' m-2 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline'
            to={`/blogs/${blog.id}`}
          >
            {blog.title}
            <svg
              class='w-4 h-4 ms-2 rtl:rotate-180'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 10'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M1 5h12m0 0L9 1m4 4L9 9'
              />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  )
}
export default BlogList
