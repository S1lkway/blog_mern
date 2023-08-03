import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiFillLike } from "react-icons/ai";
import { BiSolidComment } from "react-icons/bi";
import { toast } from 'react-toastify'
import Carousel from '../../components/Carousel';
import { likeNews, addComment } from '../../features/news/newsSlice';
import NewsComment from './NewsComment';

function NewsItem({ newsItem, user }) {
  const dispatch = useDispatch()
  // Consts for data
  const basePath = '/uploads/articleUploads/'
  const [commentText, setCommentText] = useState('')
  const text = commentText

  //* EDIT formData BY CHANGING DATA IN FORM FIELDS
  const onChange = (e) => {
    setCommentText(e.target.value)
  }

  //* Add comment
  const onSubmit = (e) => {
    e.preventDefault()
    if (commentText === '') {
      toast.error("Comment can't be empty")
    } else {
      const commentData = {
        id: newsItem._id,
        text: text,
      }
      dispatch(addComment(commentData))
      toast.success('Comment added')
      setCommentText('')
    }
  }

  //* Add Like
  const addLike = (newsId) => {
    dispatch(likeNews(newsId))
  }

  // Add class for like button
  const likeButtonClass = newsItem.likedBy.includes(user._id) ? 'newsItemClickedButton' : 'newsItemNormalButton'

  return (
    <>
      <div className='newsItem'>
        <h2>{newsItem.name}</h2>
        {newsItem.images.length > 0 ? (
          <Carousel images={newsItem.images} basePath={basePath} />
        ) : (<></>)}

        <p className='newsItemText'>{newsItem.text}</p>
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
        <div className='commentForm'>
          <form onSubmit={onSubmit}>
            <div className="form-group commentTextArea">
              <textarea
                type="text"
                id="text"
                name='text'
                value={text}
                placeholder='Enter your comment'
                onChange={onChange}
              />
            </div>
            <div className="form-group AddCommentButton">
              <button type='submit' className='btn'>
                Add
              </button>
            </div>
          </form>
        </div>
        {/* COMMENTS */}
        {newsItem.comments.length > 0 ?
          <>
            <div className='commentsList'>
              {newsItem.comments.map((commentData) => (
                <NewsComment key={commentData._id} commentData={commentData} />
              ))}
            </div>
          </> :
          ''}
      </div >
    </>
  )
}

export default NewsItem