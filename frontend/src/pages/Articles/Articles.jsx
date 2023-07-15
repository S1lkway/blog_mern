import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlus } from 'react-icons/fa6'
import { FaAlignJustify } from "react-icons/fa";
import ArticleItem from '../../components/ArticleItem'
import Spinner from '../../components/Spinner'
import { getArticles, resetArticles } from '../../features/articles/articleSlice'


function Articles() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //* CONSTANTS FOR DATA
  const { user } = useSelector((state) => state.auth)
  const { articles, isLoading, isError, message } = useSelector(
    (state) => state.articles
  )

  //* GET ARTICLES DATA AND RESET IN REDUX AFTER SUBMIT
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    /// Get articles data
    dispatch(getArticles())
    return () => {
      dispatch(resetArticles())
    }
  }, [user, navigate, isError, message, dispatch])

  //* LOADING SPINNER
  if (isLoading) {
    return <Spinner />
  }

  // ------------------------------------------------------------------ //

  return (
    <>
      <section className='content'>
        {articles.length > 0 ? (
          <>
            <div className="createLink">
              <h1>
                <FaAlignJustify /> My articles
              </h1>
              <ul>
                <li>
                  <Link to='/articles/create'>
                    <FaPlus /> Create Article
                  </Link>
                </li>
              </ul>
            </div>

            <div className='articles'>
              {articles.map((article) => (
                <ArticleItem key={article._id} article={article} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="createLink">
              <h1>You have no articles</h1>
              <ul>
                <li>
                  <Link to='/articles/create'>
                    <FaPlus /> Create Article
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default Articles