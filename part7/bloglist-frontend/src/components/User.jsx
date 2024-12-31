import { useParams } from "react-router-dom"

const User = ({ blogs }) => {
  const id = useParams().id

  const groupBlogsByUser = (blogs) => {
    const grouped = blogs.reduce((acc, blog) => {
      const userId = blog.user.id

      if (!acc[userId]) {
        acc[userId] = {
          userInfo: blog.user,
          blogs: [],
        }
      }

      acc[userId].blogs.push(blog)
      return acc
    }, {})

    return grouped
  }

  const groupedByUser = groupBlogsByUser(blogs)
  const userBlogs = groupedByUser[id]
 
  if(!userBlogs) return null

  return (
    <div>
      <h3>{userBlogs.userInfo.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {userBlogs.blogs.map(blog => (
            <li key={blog.id}>
                {blog.title}
            </li>
        ))}
      </ul>
    </div>
  )
}
export default User
