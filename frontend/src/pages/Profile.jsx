import { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import { FaUserEdit } from 'react-icons/fa'
// import { register, reset } from '../features/auth/authSlice'
// import Spinner from '../components/Spinner'

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }


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
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password" className='form-control'
            id="password"
            name='password'
            value={password}
            placeholder='Enter password'
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password" className='form-control'
            id="password2"
            name='password2'
            value={password2}
            placeholder='Confirm password'
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