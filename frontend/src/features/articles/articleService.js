import axios from 'axios'

const API_URL = '/api/articles/'

//* CREATE NEW ARTICLE
const createArticle = async (articleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, articleData, config)
  return response.data
}

//* GET ALL ARTICLES
const getArticles = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

//* GET ONE ARTICLE
const getArticle = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + id, config)
  return response.data
}

//* EDIT ARTICLE
const editArticle = async (articleData, token) => {
  const articleId = articleData.get('id')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + articleId, articleData, config)
  return response.data
}

//* DELETE ARTICLE IMAGE
const deleteArticleImage = async (imageData, token) => {
  ///Constants
  const articleId = imageData.articleId
  const imageId = imageData.imageId
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  ///Get data from backend
  const response = await axios.delete(API_URL + articleId + '/deleteimage/' + imageId, config)

  return response.data
}

//* DELETE ARTICLE
const deleteArticle = async (articleId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + articleId, config)
  return response.data
}


const articleService = {
  createArticle,
  getArticles,
  getArticle,
  editArticle,
  deleteArticleImage,
  deleteArticle
}

export default articleService