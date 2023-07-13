import { useDispatch } from 'react-redux'
import { deleteArticle } from '../features/articles/articleSlice'
import { toast } from 'react-toastify'

function ArticleItem({ article }) {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(deleteArticle(article._id))
    toast.info('Article deleted')
  }

  return (
    <div className='article'>
      <p>{article.name}</p>
      <span>{article.text}</span>
      <div>{new Date(article.createdAt).toLocaleString('en-US')}</div>
      <button onClick={onClick} className='close'>
        X
      </button>
    </div>
  )
}

export default ArticleItem