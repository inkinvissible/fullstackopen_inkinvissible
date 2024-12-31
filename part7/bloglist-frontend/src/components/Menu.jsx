import { Link } from "react-router-dom"
const Menu = ({user}) => {
  

  return (
    <div>
      <nav>
        <ul className="shadow-sm flex justify-around items-center">
          <Link className="m-4 hover:text-green-700"  to='/'>
            Home
          </Link>
          <Link className="m-4 hover:text-green-700"  to='/blogs'>
            Blogs
          </Link>
          <Link className="m-4 hover:text-green-700"  to='/users'>
            Users
          </Link>
          <p className="m-4">
          {user.username ? `${user.username} logged in` : ''}
          </p>
          <button className="m-4 hover:text-green-700"  onClick={() => dispatch(logout())}>
            logout
          </button>
        </ul>
      </nav>
    </div>
  )
}
export default Menu
