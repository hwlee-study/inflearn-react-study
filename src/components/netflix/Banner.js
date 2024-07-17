import axios from '../../api/axios'
import { useEffect, useState } from 'react'
import requests from '../../api/requests'
import './Banner.css'
import styled from 'styled-components'

function Banner() {
  const [movie, setMovie] = useState([])
  const [isPlayClicked, setIsPlayClicked] = useState(false)

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(여러 영화)
    const request = await axios.get(requests.fetchNowPlaying)

    //여러영화 중 하나의 영화 ID 가져오기
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id

    //특정 영화의 더 상세한 정보 가져오기(비디오 정보 포함)
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

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    border: 1px solid red;
  `

  const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
  `

  const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `

  return (
    <Container>
      <HomeContainer>
        <Iframe
          width="640"
          height="360"
          // src="https://www.youtube.com/embed/7B5UwngqBGg?si=MZ_ZReHJWIgJRGxy"
          src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
          title="YouTube video player"
          frameborder="0"
          allow="autoplay; fullscreen"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></Iframe>
      </HomeContainer>
    </Container>
  )
}
export default Banner
