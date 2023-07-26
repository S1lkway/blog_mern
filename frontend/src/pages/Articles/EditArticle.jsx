
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReactModal from 'react-modal';
import { RiCloseFill, RiEdit2Line } from "react-icons/ri";
import { toast } from 'react-toastify'
import { editArticle, deleteImage, getArticle } from '../../features/articles/articleSlice'
import Spinner from '../../components/Spinner'

function EditArticle() {
  //* CONSTANTS FOR DATA
  const { id } = useParams() /// Article ID
  const basePath = '/uploads/articleUploads/' /// Path to files on server
  const dispatch = useDispatch()
  const navigate = useNavigate()
  ///Get articleData
  useEffect(() => {
    dispatch(getArticle(id))
  }, [id, dispatch])
  const { user } = useSelector((state) => state.auth) /// User data from Redux
  const { articles, isLoading, isError, message } = useSelector(
    (state) => state.articles
  )
  //* DATA FOR FORM and FILES
  const [oldFilesData, setOldFilesData] = useState([]); /// Uploaded files
  const [newFilesData, setNewFilesData] = useState([]); /// New files to upload
  const [formData, setFormData] = useState({}); /// Data to fill the form field
  /// Modals
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageIdToDelete, setImageIdToDelete] = useState('');

  //* SET DATA ON PAGE
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
  const files = newFilesData

  //* EDIT FORMDATA BY CHANGING DATA IN FORM FIELDS
  const onChange = (e) => {
    if (e.target.name === 'files') {
      const selectedFile = e.target.files;
      ///Add files to newFilesData
      if ((oldFilesData.length + selectedFile.length) > 5 || (oldFilesData.length + newFilesData.length) > 5) {
        toast.error('Maximum 5 files allowed for article')
        setNewFilesData([])
      } else {
        setNewFilesData(() => [...selectedFile])
      }
    }
    else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  }

  //* DELETE UPLOAD IMAGE
  /// Modals settings
  const openDeleteModal = (imageId) => {
    setImageIdToDelete(imageId)
    setModalIsOpen(true);
  };
  const closeDeleteModal = () => {
    setModalIsOpen(false);
    setImageIdToDelete('')
  };
  ///Delete old image
  const deleteOldImage = (imageId) => {
    const imageData = { articleId: id, imageId: imageId }
    dispatch(deleteImage(imageData))
    toast.success('Article edited')
    closeDeleteModal()
  };

  //* EDIT ARTICLE DATA BY SUBMIT
  const onSubmit = (e) => {
    e.preventDefault()
    ///Check that name and text are not empty
    if (!name || !text) {
      toast.error('Add all fields')
    } else {
      ///We make FormData object to send data with pictures to backend
      const articleData = new FormData();
      articleData.append('id', id);
      articleData.append('name', name);
      articleData.append('text', text);
      files.forEach((file) => articleData.append('images', file));
      dispatch(editArticle(articleData))
      setNewFilesData([])
      toast.success('Article edited')
    }
  }

  //* DELETE PICKED IMAGE
  const deletePickedImage = (index) => {
    ///Make example of filesData and delete file by index
    const pickedFiles = [...newFilesData];
    pickedFiles.splice(index, 1);
    ///Set new filesData
    setNewFilesData(pickedFiles);
  };

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
        <p>Save to change data and upload new images</p>
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

                <button onClick={() => openDeleteModal(file._id)} className='articleButton editButtonDeleteImage' title="Delete old file">
                  <RiCloseFill />
                </button>
              </div>
            ))) :
            (<></>)
          }
          {newFilesData.length > 0 ?
            (newFilesData.map((file, index) => (
              <div key={index} className="editImageDiv" style={{ background: 'rgba(0, 205, 15, 0.2)' }}>
                <img
                  key={file._id}
                  src={URL.createObjectURL(file)}
                  alt={`File "${file.originalname}" wasn't found`}
                  className='editImage'
                />

                <button onClick={() => deletePickedImage(index)} className='articleButton editButtonDeleteImage' title="Delete new file">
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
              multiple
              onChange={onChange}
              accept='image/*'
              key={newFilesData.length}
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

      {/* Delete Image Modal */}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeDeleteModal}
        className="deleteArticleModal"
        overlayClassName="deleteArticleoverlay"
      >
        <h3>Are you sure?</h3>
        <div className='modalButtons'>
          <button onClick={() => deleteOldImage(imageIdToDelete)} className='btn'>Yes</button>
          <button onClick={closeDeleteModal} className='btn'>No</button>
        </div>
      </ReactModal>
    </div>
  )
}

export default EditArticle