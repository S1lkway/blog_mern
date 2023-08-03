import axios from 'axios'

const API_URL = '/api/news/'

// router.route('/').get(protect, getAllNews)
// router.route('/like/:id').put(protect, toggleLike)
// router.route('/comment/:id').post(protect, addComment)
// router.route('/comment/:id/delete/:commentId').delete(protect, deleteComment)


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

//* ADD NEW COMMENT
const addComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + '/comment/' + commentData.id, commentData, config)
  return response.data
}

//* DELETE COMMENT
const deleteComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + '/comment/' + commentData.id + '/delete/' + commentData.commentId, config)
  return response.data
}

const newsService = {
  getNews,
  likeNews,
  addComment,
  deleteComment,
}

export default newsService