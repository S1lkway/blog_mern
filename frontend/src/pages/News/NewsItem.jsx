import { useDispatch } from 'react-redux'
import { AiFillLike } from "react-icons/ai";
import { BiSolidComment } from "react-icons/bi";
import Carousel from '../../components/Carousel';
import { likeNews } from '../../features/news/newsSlice';

function NewsItem({ newsItem, user }) {
  const dispatch = useDispatch()
  /// basePath to show picture from backend
  const basePath = '/uploads/articleUploads/'

  /// Add comment
  const addComment = (newsId) => {
    console.log(newsId)
  }

  /// Add like
  const addLike = (newsId) => {
    dispatch(likeNews(newsId))
  }

  /// Add class for like button
  const likeButtonClass = newsItem.likedBy.includes(user._id) ? 'newsItemClickedButton' : 'newsItemNormalButton'
  return (
    <>
      <div className='newsItem'>
        <div className="articleContent">
          <h2>{newsItem.name}</h2>
          {newsItem.images.length > 0 ? (
            <Carousel images={newsItem.images} basePath={basePath} />
          ) : (<></>)}

          <p className='newsItemText'>{newsItem.text}</p>
        </div>
      </div>
      <div className='newsItemBottom'>
        <div className="newsItemButtons">
          <button
            className={likeButtonClass}
            onClick={() => addLike(newsItem._id)}
            title='Add like'>
            <AiFillLike />
          </button>
          {(newsItem.likes > 0) ? <span>{newsItem.likes}</span> : <span>0</span>}
          <button
            className="newsItemNormalButton"
            onClick={() => addComment(newsItem._id)}
            title='Add comment'>
            <BiSolidComment />
          </button>
          {newsItem.comments.length > 0 ? <span>{newsItem.comments.length}</span> : 0}
        </div>
        <h5>
          {new Date(newsItem.createdAt).toLocaleString('en-US')}
        </h5>
      </div>
      <div className='newsItemComments'>
        <form className='commentForm'>
          <div className="form-group commentDiv">
            <input
              type="text"
              id="text"
              name='text'
              // value={name}
              placeholder='Enter your comment'
            // onChange={onChange}
            />
          </div>
          <div className="form-group AddCommentButton">
            <button type='submit' className='btn'>
              Add
            </button>
          </div>
        </form>
        {newsItem.comments.length > 0 ? (
          newsItem.comments.map((news) => (
            <div key={news._id} className='commentItem'>
              <h4 className='commentUser'>Имя</h4>
              <span className='commentText'>{news.text}</span>
              <p className='commentDate'>{new Date(news.createdAt).toLocaleString('en-US')}</p>
            </div>
          ))
        ) : ''}
      </div>
    </>
  )
}

export default NewsItem