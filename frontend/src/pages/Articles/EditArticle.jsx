// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom';
// import { getArticle, resetArticles } from '../../features/articles/articleSlice'
import Spinner from '../../components/Spinner'

function EditArticle() {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const { user } = useSelector((state) => state.auth)
  // const { id } = useParams()
  // console.log(id)
  const { articles, isLoading } = useSelector(
    (state) => state.articles
  )

  const name = articles.name
  const text = articles.text
  // const images = articles.images

  // console.log(name)
  // console.log(text)
  // console.log(images)


  //* LOADING SPINNER
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>{name + text}</div>
  )
}

export default EditArticle