import { useDispatch } from 'react-redux'
import { AiFillLike } from "react-icons/ai";
import { BiSolidComment } from "react-icons/bi";
import Carousel from '../../components/Carousel';
import { likeNews } from '../../features/news/newsSlice';

function NewsItem({ newsItem }) {
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
          <button className="newsItemButton" onClick={() => addLike(newsItem._id)}><AiFillLike /></button>
          {(newsItem.likes > 0) ? <span>{newsItem.likes}</span> : ''}
          <button className="newsItemButton" onClick={() => addComment(newsItem._id)}><BiSolidComment /></button>
          {/* {newsItem.likes > 0 ? <span>{newsItem.likes}</span> : ''} */}
        </div>
        <h5>
          {new Date(newsItem.createdAt).toLocaleString('en-US')}
        </h5>
      </div>
    </>
  )
}

export default NewsItem