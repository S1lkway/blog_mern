import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaThList } from "react-icons/fa";
import Spinner from '../../components/Spinner'
import { getNews, resetNews } from '../../features/news/newsSlice'

function News() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //* CONSTANTS FOR DATA
  const { user } = useSelector((state) => state.auth)
  const { news, isLoading, isError, message } = useSelector(
    (state) => state.news
  )

  //* GET NEWS DATA AND RESET IN REDUX AFTER SUBMIT
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    /// Get articles data
    dispatch(getNews())
    return () => {
      dispatch(resetNews())
    }
  }, [user, navigate, isError, message, dispatch])
  if (news.length > 0) {
    console.log(news)
  }

  //* LOADING SPINNER
  if (isLoading) {
    return <Spinner />
  }

  return (
    <section className='content'>
      <h1>
        <FaThList /> News
      </h1>
    </section>
  )
}

export default News