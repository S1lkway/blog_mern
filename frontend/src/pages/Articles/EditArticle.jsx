import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RiCloseFill, RiEdit2Line } from "react-icons/ri";
import { toast } from 'react-toastify'
import { editArticle, deleteImage, getArticle } from '../../features/articles/articleSlice'
import Spinner from '../../components/Spinner'

function EditArticle() {
  //* CONSTANTS FOR DATA
  const { id } = useParams()
  const basePath = '/uploads/articleUploads/'
  const dispatch = useDispatch()
  const navigate = useNavigate()
  ///Get articleData
  useEffect(() => {
    dispatch(getArticle(id))
  }, [id, dispatch])
  const { user } = useSelector((state) => state.auth)
  const { articles, isLoading, isError, message } = useSelector(
    (state) => state.articles
  )
  ///Data for FORM and FILES
  const [oldFilesData, setOldFilesData] = useState([]);
  const [formData, setFormData] = useState({});
  ///Set DATA on page
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    if (!isLoading) {
      setFormData({
        id: articles._id || '',
        name: articles.name || '',
        text: articles.text || '',
      });
      setOldFilesData(articles.images || [])
    }
  }, [articles, isLoading, user, navigate, isError, message, dispatch]);

  const { name, text } = formData;

  //* EDIT formData BY CHANGING DATA IN FORM FIELDS
  const onChange = (e) => {
    if (e.target.name === 'files') {
      const selectedFile = e.target.files[0];
      console.log(selectedFile)
      // ///Add files to oldFilesData
      // if (oldFilesData.length > 5) {
      //   toast.error('Maximum 5 files allowed')
      //   setOldFilesData([])
      // } else {
      //   setOldFilesData((prevFiles) => [...prevFiles, ...selectedFile])
      // }
    }
    // else {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // }
  }

  //* DELETE UPLOAD IMAGE
  const deleteOldImage = (imageId) => {
    const imageData = { articleId: id, imageId: imageId }
    dispatch(deleteImage(imageData))
  };

  //* EDIT ARTICLE DATA BY SUBMIT
  const onSubmit = (e) => {
    e.preventDefault()

    if (!name || !text) {
      toast.error('Add all fields')
    } else {
      const articleData = {
        id,
        name,
        text,
      }
      /// We send data from form to articleSlice to createArticle function and there to server by articleService
      dispatch(editArticle(articleData))
      toast.success('Article edited')
    }
  }

  //* LOADING SPINNER
  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <section className='heading'>
        <h1>
          <RiEdit2Line />Edit article
        </h1>
        <p>Save to change article data</p>
      </section>

      {/* Images to display and delete */}
      <section className='form'>
        <div className='editImages'>
          {oldFilesData.length > 0 ?
            (oldFilesData.map((file, index) => (
              <div key={file._id} className="editImageDiv">
                <img
                  key={file._id}
                  src={basePath + file.filename}
                  alt={`File "${file.originalname}" wasn't found`}
                  className='editImage'
                />

                <button onClick={() => deleteOldImage(file._id)} className='articleButton editButtonDeleteImage' title="Delete file">
                  <RiCloseFill />
                </button>

              </div>
            ))) :
            (<></>)
          }
        </div>
      </section>

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
              onChange={onChange}
              accept='image/*'
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
              rows={8}
            />
          </div>

          <div className="form-group">
            <button type='submit' className='btn btn-block'>
              Save changes
            </button>
          </div>

        </form>
      </section>
    </div>
  )
}

export default EditArticle