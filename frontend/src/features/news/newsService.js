import axios from 'axios'

const API_URL = '/api/news/'


//* GET ALL NEWS
const getNews = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

//* LIKE THE NEWS
const likeNews = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put('/api/news/like/' + id, {}, config)
  return response.data
}

const newsService = {
  getNews,
  likeNews,
}

export default newsService