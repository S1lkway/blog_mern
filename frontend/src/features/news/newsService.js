import axios from 'axios'

const API_URL = '/api/news/'

//* GET ALL ARTICLES
const getNews = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const newsService = {
  getNews,
}

export default newsService