import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import MovieModal from './movieModal'
import './SwiperRow.css'
// Swiper - https://swiperjs.com/react
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

function SwiperRow({ title, id, fetchUrl, isLargeRow }) {
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
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        navigation // arrow 버튼 사용 유무
        pagination={{ clickable: true }} // 페이지 버튼 사용 유무
        loop={true} // loop 기능 사용 유무
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 몇개씩 슬라이드 할지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <div className="slider">
          <div id={id} className="row__posters">
            {movies.map((movie) => (
              <SwiperSlide>
                <img
                  key={movie.id}
                  className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${process.env.REACT_APP_MOVIE_IMG_ENDPOINT}/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.name}
                  onClick={() => movieHandleClick(movie)}
                />
              </SwiperSlide>
            ))}
          </div>
        </div>
      </Swiper>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  )
}
export default SwiperRow
