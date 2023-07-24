import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import Carousel from '../../components/Carousel';
import { RiCloseFill, RiEdit2Line } from "react-icons/ri";
import { toast } from 'react-toastify'
import { deleteArticle, resetArticles, getArticle } from '../../features/articles/articleSlice'


function ArticleItem({ article }) {

  //* CONSTANTS FOR DATA
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /// basePath to show picture from backend
  const basePath = '/uploads/articleUploads/'

  //*EDIT ARTICLE IN MODAL
  // const openEditModal = () => {
  //   setModalEditOpen(true);
  // };

  // const closeEditModal = () => {
  //   setModalEditOpen(false);
  //   setFormData(() => ({
  //     id: article._id,
  //     name: article.name,
  //     text: article.text,
  //     images: article.images,
  //   }))
  // };
  ///EDIT formData BY CHANGING DATA IN FORM FIELDS
  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }))
  // }
  ///EDIT ARTICLE DATA BY SUBMIT
  // const onSubmit = (e) => {
  //   e.preventDefault()

  //   if (!name || !text) {
  //     toast.error('Add all fields')
  //   } else {
  //     const articleData = {
  //       id,
  //       name,
  //       text,
  //     }

  //     /// We send data from form to articleSlice to createArticle function and there to server by articleService
  //     dispatch(editArticle(articleData))
  //     toast.success('Article edited')
  //     closeEditModal()
  //   }
  // }

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

  //*GO TO EDIT PAGE
  const goToEditPage = () => {
    navigate(`/articles/edit/${article._id}`)
    dispatch(resetArticles())
    dispatch(getArticle(article._id))
  }

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
        <button onClick={goToEditPage} className='articleButton' title="Edit article">
          <RiEdit2Line />
        </button>


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