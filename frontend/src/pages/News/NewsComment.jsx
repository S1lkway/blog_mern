import { RiCloseFill } from "react-icons/ri";
// import { HiOutlineHeart } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from "../../features/news/newsSlice";

function NewsComment(params) {
  const dispatch = useDispatch()
  const comment = params.commentData
  const { user } = useSelector((state) => state.auth)

  //* Delete comment
  const removeComment = (commentId) => {
    const commentData = {
      id: comment.article,
      commentId: commentId
    }
    dispatch(deleteComment(commentData))
  }

  return (
    <>
      <div className='commentItem'>

        <div className='commentHeader'>
          <h5 className='commentUser'>{comment.user.name}</h5>
          {/* DELETE BUTTON */}
          {user._id === comment.user._id ? (
            <button
              className='commentButton'
              title="Delete comment"
              onClick={() => removeComment(comment._id)}
            >
              <RiCloseFill />
            </button>) : ''}
        </div>

        <p className='commentText'>{comment.text}</p>

        <div className="commentBottom">
          <span className='commentDate'>
            {new Date(comment.createdAt).toLocaleString('en-US')}
          </span>
          {/* <button className='commentButton' title="Like comment">
            <HiOutlineHeart />
          </button> */}
        </div>

      </div >
      <hr />
    </>
  )
}

export default NewsComment