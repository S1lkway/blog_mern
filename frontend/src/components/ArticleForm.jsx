import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createArticle } from '../features/articles/articleSlice'
import { toast } from 'react-toastify'

function ArticleForm() {

  const [formData, setFormData] = useState({
    name: '',
    text: '',
  })

  const { name, text } = formData
  //dipatch includes actions from redux
  const dispatch = useDispatch()


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  const onSubmit = e => {
    e.preventDefault()

    if (!name || !text) {
      toast.error('Add all fields')
    } else {
      const articleData = {
        name,
        text,
      }

      /// We send data from form to articleSlice to createArticle function and there to server by articleService
      dispatch(createArticle(articleData))
      toast.success('Article created')
    }

    setFormData({
      name: '',
      text: ''
    }
    )
  }


  return (
    <>
      <h1>
        Create article
      </h1>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text" className='form-control'
              id="name"
              name='name'
              value={name}
              placeholder='Enter name of article'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <textarea
              type="text" className='form-control'
              id="text"
              name='text'
              value={text}
              placeholder='Enter text of article'
              onChange={onChange}
              rows={4}
            />
          </div>

          <div className="form-group">
            <button type='submit' className='btn btn-block'>
              Create
            </button>
          </div>

        </form>
      </section>
    </>
  )
}

export default ArticleForm