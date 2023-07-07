import { FaSignInAlt, FaUserPlus, FaUserEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <h4>Articles</h4>
        </Link>
      </div>
      <ul>
        <li>
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUserPlus /> Register
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            <FaUserEdit /> Profile
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header