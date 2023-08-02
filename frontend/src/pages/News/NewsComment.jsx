import { RiCloseFill } from "react-icons/ri";
import { HiOutlineHeart } from "react-icons/hi";
import { useSelector } from 'react-redux'

function NewsComment(params) {
  const comment = params.commentData
  const { user } = useSelector((state) => state.auth)


  return (
    <>
      <div className='commentItem'>

        <div className='commentHeader'>
          <h5 className='commentUser'>{comment.user.name}</h5>
          {/* DELETE BUTTON */}
          {user._id === comment.user._id ? (
            <button className='commentButton' title="Delete comment">
              <RiCloseFill />
            </button>) : ''}
        </div>

        <p className='commentText'>{comment.text}</p>

        <div className="commentBottom">
          <span className='commentDate'>
            {new Date(comment.createdAt).toLocaleString('en-US')}
          </span>
          <button className='commentButton' title="Like comment">
            <HiOutlineHeart />
          </button>
        </div>

      </div >
      <hr />
    </>
  )
}

export default NewsComment