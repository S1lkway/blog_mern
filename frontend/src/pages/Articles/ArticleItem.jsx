import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ReactModal from 'react-modal';
import { deleteArticle } from '../../features/articles/articleSlice'
import { RiCloseFill, RiEdit2Line } from "react-icons/ri";
import { toast } from 'react-toastify'

function ArticleItem({ article }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch()
  const editLink = '/articles/' + article._id

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // const onClick = () => {
  //   dispatch(deleteArticle(article._id))
  //   toast.info(`Article '${article.name}' deleted`)
  // }

  /// Use dispatch if user clicked 'yes' in modal
  const onDeleteArticle = () => {
    dispatch(deleteArticle(article._id));
    toast.info(`Article '${article.name}' deleted`);
    closeModal();
  };

  // ------------------------------------------------------------------ //

  return (
    <div className='article'>
      <div className='articleName'>
        <h3>{article.name}</h3>
        <p>{article.text}</p>
      </div>

      <h5 className='articleCreatedAt'>{new Date(article.createdAt).toLocaleString('en-US')}</h5>
      <div className='close'>

        <Link to={editLink} className='articleButton' title="Edit article">
          <RiEdit2Line />
        </Link>
        <button onClick={openModal} className='articleButton' title="Delete article">
          <RiCloseFill />
        </button>

        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="mymodal"
          overlayClassName="myoverlay"
        >
          <h3>Are you sure you want to delete?</h3>
          <div className='modalButtons'>
            <button onClick={onDeleteArticle} className='btn'>Yes</button>
            <button onClick={closeModal} className='btn'>No</button>
          </div>
        </ReactModal>

      </div>
    </div >
  )
}

export default ArticleItem