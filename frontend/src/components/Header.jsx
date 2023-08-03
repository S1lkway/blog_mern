import { FaComments, FaBookOpen, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaUserEdit, FaGlobe } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  // ------------------------------------------------------------------ //

  return (
    <header className='header'>
      <div className='logo'>
        {user ? (
          <Link to='/news'>
            <h4><i>< FaComments /> News Feed </i></h4>
          </Link>
        ) : (
          <Link to='/'>
            <h4><i>< FaGlobe /> Welcome </i></h4>
          </Link>
        )}

      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to='/articles'>
                <FaBookOpen /> Articles
              </Link>
            </li>
            <li>
              <Link to='/profile'>
                <FaUserEdit /> Profile
              </Link>
            </li>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>

        ) : (
          <>
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
          </>
        )
        }

      </ul >
    </header >
  )
}

export default Header