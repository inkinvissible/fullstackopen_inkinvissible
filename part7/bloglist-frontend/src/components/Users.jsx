import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const Users = () => {
  const blogs = useSelector((state) => state.blogs)

  const authorInfo = blogs.reduce((acc, blog) => {
    if (!acc[blog.author]) {
      acc[blog.author] = {
        count: 1,
        userId: blog.user.id,
      }
    } else {
      acc[blog.author].count += 1
    }
    return acc
  }, {})
  console.log(Object.entries(authorInfo))
  

return (
    <div>
        <h2>Users</h2>
        <table>
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Blogs Created</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(authorInfo).map(([author, info]) => (
                    <tr key={author}>
                        <td>
                            <Link to={`/users/${info.userId}`}>{author}</Link>
                        </td>
                        <td>{info.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)
}
export default Users
