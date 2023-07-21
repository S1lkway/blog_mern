import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ReactModal from 'react-modal';
import { deleteArticle } from '../../features/articles/articleSlice'
import { RiCloseFill, RiEdit2Line } from "react-icons/ri";
import { toast } from 'react-toastify'
import { editArticle } from '../../features/articles/articleSlice'
import Carousel from '../../components/Carousel';

function ArticleItem({ article }) {
  //* CONSTANTS FOR DATA
  const dispatch = useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: article._id,
    name: article.name,
    text: article.text,
  })
  const { id, name, text } = formData
  /// basePath to show picture from backend
  const basePath = '/uploads/articleUploads/'
  // const imagPath = '/uploads/articleUploads/' + article.images[0].filename

  //*EDIT ARTICLE IN MODAL
  const openEditModal = () => {
    setModalEditOpen(true);
  };

  const closeEditModal = () => {
    setModalEditOpen(false);
    setFormData(() => ({
      id: article._id,
      name: article.name,
      text: article.text,
    }))
  };
  ///EDIT formData BY CHANGING DATA IN FORM FIELDS
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  ///EDIT ARTICLE DATA BY SUBMIT
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
      closeEditModal()
    }
  }

  //*DELETE ARTICLE IN MODAL
  const openDeleteModal = () => {
    setModalIsOpen(true);
  };
  const closeDeleteModal = () => {
    setModalIsOpen(false);
  };
  /// Use dispatch if user clicked 'yes' in deletemModal
  const onDeleteArticle = () => {
    dispatch(deleteArticle(article._id));
    toast.info(`Article '${article.name}' deleted`);
    closeDeleteModal();
  };

  // ------------------------------------------------------------------ //

  return (
    <div className='article'>
      <div className='articleName'>
        <h2>{article.name}</h2>
        {article.images.length > 0 ? (
          <Carousel images={article.images} basePath={basePath} />
        ) : (<></>)}
        <p>{article.text}</p>
      </div>

      <h5 className='articleCreatedAt'>{new Date(article.createdAt).toLocaleString('en-US')}</h5>
      <div className='close'>

        {/* EDIT BUTTON AND MODAL */}
        <button onClick={openEditModal} className='articleButton' title="Edit article">
          <RiEdit2Line />
        </button>

        <ReactModal
          isOpen={modalEditOpen}
          onRequestClose={closeEditModal}
          className="editArticleModal"
          overlayClassName="editArticleoverlay"
        >
          <section className='heading'>
            <h1>
              <RiEdit2Line /> Edit article
            </h1>
            <p>Save to change the article</p>
          </section>

          <section className=''>
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
                  className='form-control'
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
                <div className='modalButtons'>
                  <button
                    type='submit'
                    className='btn'>
                    Save
                  </button>
                  <button
                    id="back"
                    name='back'
                    type='button'
                    onClick={closeEditModal}
                    className='btn'>
                    Back
                  </button>
                </div>
              </div>

            </form>
          </section>
        </ReactModal>

        {/* DELETE BUTTON AND MODAL */}
        <button onClick={openDeleteModal} className='articleButton' title="Delete article">
          <RiCloseFill />
        </button>

        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeDeleteModal}
          className="deleteArticleModal"
          overlayClassName="deleteArticleoverlay"
        >
          <h3>Are you sure?</h3>
          <div className='modalButtons'>
            <button onClick={onDeleteArticle} className='btn'>Yes</button>
            <button onClick={closeDeleteModal} className='btn'>No</button>
          </div>
        </ReactModal>
      </div>
    </div >
  )
}

export default ArticleItem