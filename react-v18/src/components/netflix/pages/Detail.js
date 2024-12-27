import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../../api/axios'

function Detail() {
  const { movieId } = useParams()
  const [searchMovieDetails, setSearchMovieDetails] = useState({})
  const getSearchMovieDetails = async (searchMovieId) => {
    try {
      const {
        data: { backdrop_path: bgImg, title },
      } = await axiosInstance.get(`/movie/${searchMovieId}`)

      setSearchMovieDetails({ bgImg, title })
    } catch (error) {
      console.log('getSearchMovieDetails Error : ', error)
    }
  }

  useEffect(() => {
    getSearchMovieDetails(movieId)
  }, [movieId])

  return (
    <section>
      <img
        className="modal__poster-img"
        src={`${process.env.REACT_APP_MOVIE_IMG_ENDPOINT}/original/${searchMovieDetails.bgImg}`}
        alt={searchMovieDetails.title}
      />
    </section>
  )
}

export default Detail
