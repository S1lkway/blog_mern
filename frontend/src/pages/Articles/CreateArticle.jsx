import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'
import { RiCloseFill } from "react-icons/ri";
import { createArticle } from '../../features/articles/articleSlice'
import { toast } from 'react-toastify'

function CreateArticle() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //* CONSTANTS FOR DATA
  const [filesData, setFilesData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    text: '',
  })
  const { name, text } = formData
  const files = filesData

  //* EDIT formData BY CHANGING DATA IN FORM FIELDS
  const onChange = (e) => {
    if (e.target.name === 'files') {
      const selectedFiles = Array.from(e.target.files).filter(
        (file) => file.type.startsWith('image/')
      )
      if (selectedFiles.length > 5) {
        toast.error('Maximum 5 files allowed')
        setFilesData([])
      } else {
        setFilesData(selectedFiles);
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  }

  //* DELETE PICKED IMAGE
  const deleteImage = (index) => {
    ///Make example of filesData and delete file by index
    const newFilesData = [...filesData];
    newFilesData.splice(index, 1);
    ///Set new filesData
    setFilesData(newFilesData);

  };

  //* ADD ARTICLE BY SUBMIT
  const onSubmit = e => {
    e.preventDefault()

    if (!name || !text) {
      toast.error('Add all fields')
    } else {
      ///We make FormData object to send data with pictures to backend
      const articleData = new FormData();
      articleData.append('name', name);
      articleData.append('text', text);
      files.forEach((file) => articleData.append('images', file));

      /// We send data from form to articleSlice to createArticle function and there to server by articleService
      dispatch(createArticle(articleData))
      toast.success('Article created')
      navigate('/articles')
    }

    setFormData({
      name: '',
      text: ''
    }
    )
  }

  // ------------------------------------------------------------------ //

  return (
    <>
      <section className='heading'>
        <h1>
          <FaPlus />Create article
        </h1>
        <p>Add name and text of article</p>
      </section>
      {/* Images to display and delete */}
      <section className='form'>
        <div className='editImages'>
          {filesData.length > 0 ?
            (filesData.map((file, index) => (
              <div key={file._id} className="editImageDiv">
                <img
                  key={file._id}
                  src={URL.createObjectURL(file)}
                  alt={`File "${file.originalname}" wasn't found`}
                  className='editImage'
                />

                <button onClick={() => deleteImage(index)} className='articleButton editButtonDeleteImage' title="Delete file">
                  <RiCloseFill />
                </button>

              </div>
            ))) :
            (<></>)
          }
        </div>
      </section>

      {/* FROM to create an article */}
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
            <input
              type="file"
              className="form-control"
              id="files"
              name="files"
              multiple
              onChange={onChange}
              accept='image/*'
              key={filesData.length}
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
              rows={10}
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

export default CreateArticle