import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ArticleForm from '../components/ArticleForm'
// import ArticleItem from '../components/ArticleItem'
import Spinner from '../components/Spinner'
import { getArticles, reset } from '../features/articles/articleSlice'


function Articles() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { articles, isLoading, isError, message } = useSelector(
    (state) => state.articles
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getArticles())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <ArticleForm />

    </>
  )
}

export default Articles