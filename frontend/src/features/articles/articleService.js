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

//* GET USER ARTICLES
const getArticles = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}


const articleService = {
  createArticle,
  getArticles
}

export default articleService