import axios from '../../api/axios'
import { useEffect, useState } from 'react'
import requests from '../../api/requests'
import './Banner.css'

function Banner() {
  const [movie, setMovie] = useState([])
  const [isPlayClicked, setIsPlayClicked] = useState(false)

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(여러 영화)
    const request = await axios.get(requests.fetchNowPlaying)

    console.log('movie now playing : ', request)

    // //여러영화 중 하나의 영화 ID 가져오기
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id
    // //특정 영화의 더 상세한 정보 가져오기(비디오 정보 포함)
    const { data: movieDetail } = await axios.get(`/movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    })

    setMovie(movieDetail)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 설명글 100자 이상이면 자른 후 ...붙이기
  const stringTruncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  if (!isPlayClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_MOVIE_IMG_ENDPOINT}/original/${movie?.backdrop_path})`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        <div className="banner__contents">
          {/* Title */}
          <h1 className="banner__title">{movie.title || movie.name || movie.original_name}</h1>

          <div className="banner__buttons">
            <button className="banner__button play" onClick={() => setIsPlayClicked(true)}>
              Play
            </button>
            <button className="banner__button info">
              <div className="space">banner info space</div>
              More Information
            </button>
          </div>
          {/* DIV > 2 BUTTONS */}
          <h1 className="banner__description">{stringTruncate(movie.overview, 100)}</h1>
          {/* Description */}
        </div>
        <div className="banner--fadeBottom" />
      </header>
    )
  }

  return <div>clicked</div>
}
export default Banner
