import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import './Row.css'
import MovieModal from './movieModal'

function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [movieSelected, setMovieSelected] = useState({})

  const fetchMovieDatas = async () => {
    const { status, data } = await axiosInstance.get(fetchUrl)

    if (status === 200) {
      const { results } = data
      setMovies(results)
    }
  }

  useEffect(() => {
    fetchMovieDatas()
  }, [])

  const movieHandleClick = (movie) => {
    setModalOpen(true)
    setMovieSelected(movie)
  }

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => (document.getElementById(id).scrollLeft -= window.innerWidth - 80)}
          >
            {'<'}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
              src={`${process.env.REACT_APP_MOVIE_IMG_ENDPOINT}/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => movieHandleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => (document.getElementById(id).scrollLeft += window.innerWidth - 80)}
          >
            {'>'}
          </span>
        </div>
      </div>
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  )
}
export default Row
