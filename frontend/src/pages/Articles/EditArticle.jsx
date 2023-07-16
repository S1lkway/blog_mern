import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { RiEdit2Line } from "react-icons/ri";
import { getArticles, resetArticles } from '../../features/articles/articleSlice'

function EditArticle() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  ///Get articleID from the path
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const articleId = searchParams.get('id');
  console.log(articleId)

  const [formData, setFormData] = useState({
    name: 'aa',
    text: 'bb',
  })
  const { name, text } = formData



  //*EDIT formData BY CHANGING DATA IN FORM FIELDS
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  //*EDIT ARTICLE DATA BY SUBMIT
  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <RiEdit2Line /> Edit article
        </h1>
        <p>Save to change the article</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name"><h3>Name</h3></label>
            <input
              type="text" className='form-control'
              id="name"
              name='name'
              value={name}
              placeholder='Enter name of article'
              onChange={onChange}
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="text"><h3>Text</h3></label>
            <textarea
              type="text" className='form-control'
              id="text"
              name='text'
              value={text}
              placeholder='Enter text of article'
              onChange={onChange}
              rows={10}
              autoComplete="text"
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
  )
}

export default EditArticle