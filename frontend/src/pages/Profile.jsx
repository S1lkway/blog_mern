import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserEdit } from 'react-icons/fa'
import { edit, reset } from '../features/auth/authSlice'
// import Spinner from '../components/Spinner'

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //* CONSTANTS FOR DATA
  // const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = formData

  //* RESET USER DATA IN REDUX AFTER SUBMIT
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success('Credentials changed')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  //* EDIT formData BY CHANGING DATA IN FORM FIELDS
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  //* EDIT USER DATA BY SUBMIT
  const onSubmit = (e) => {
    e.preventDefault()
    ///Check passwords fields
    if (password !== password2) {
      toast.error('Password do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      ///We send data from form to authSlice to register function and there to server by authService
      dispatch(edit(userData))
    }
  }

  // if (isLoading) {
  //   return <Spinner />
  // }

  // ------------------------------------------------------------------ //

  return <>
    <section className='heading'>
      <h1>
        <FaUserEdit /> Profile
      </h1>
      <p>Save to change your profile</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text" className='form-control'
            id="name"
            name='name'
            value={name}
            placeholder='Enter your name'
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email" className='form-control'
            id="email"
            name='email'
            value={email}
            placeholder='Enter your email'
            readOnly
          />
        </div>
        <div className="form-group">
          <input
            type="password" className='form-control'
            id="password"
            name='password'
            value={password}
            placeholder='Enter the new password'
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password" className='form-control'
            id="password2"
            name='password2'
            value={password2}
            placeholder='Confirm the new password'
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <button type='submit' className='btn btn-block'>
            Save changes
          </button>
        </div>

      </form>
    </section>
  </>
}

export default Profile