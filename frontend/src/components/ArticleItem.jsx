import { useDispatch } from 'react-redux'
import { deleteArticle } from '../features/articles/articleSlice'
import { FaEdit, FaRegWindowClose } from "react-icons/fa";
import { toast } from 'react-toastify'

function ArticleItem({ article }) {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(deleteArticle(article._id))
    toast.info(`Article '${article.name}' deleted`)
  }

  // ------------------------------------------------------------------ //

  return (
    <div className='article'>
      <div className='articleName'>
        <h3>{article.name}</h3>
        <p>{article.text}</p>
      </div>

      <h5 className='articleCreatedAt'>{new Date(article.createdAt).toLocaleString('en-US')}</h5>
      <div className='close'>
        <button onClick={onClick} className='closeButton'>
          <FaEdit />
        </button>
        <button onClick={onClick} className='closeButton'>
          <FaRegWindowClose />
        </button>

      </div>

    </div>
  )
}

export default ArticleItem