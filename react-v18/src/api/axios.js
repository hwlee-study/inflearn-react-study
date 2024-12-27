import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_MOVIE_ENDPOINT}`,
  params: {
    api_key: `${process.env.REACT_APP_MOVIE_API_KEY}`,
    language: `${process.env.REACT_APP_LANGUAGE}`,
  },
})

export default axiosInstance
