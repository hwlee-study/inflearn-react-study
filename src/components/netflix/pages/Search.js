import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axiosInstance from '../../../api/axios'
import './Search.css'
import useDebounce from '../../../hooks/useDebounce'

/**
 * @returns 검색화면
 */
function Search() {
  const [searchParams] = useSearchParams()
  const searchMovie = searchParams.get('q')
  const debouncedQuestionValue = useDebounce(searchMovie, 500)
  const navigate = useNavigate()
  const [searchResults, setSearchResults] = useState([])

  /**
   * 검색한 영화 api 호출
   */
  const getSearchMovies = async (searchValue) => {
    try {
      console.log('searchValue: ', searchValue)
      const { data } = await axiosInstance.get(
        `/search/multi?include_adult=false&query=${searchValue}`
      )

      setSearchResults(data.results)
    } catch (error) {
      console.log('erro : ', error)
    }
  }

  useEffect(() => {
    if (!!debouncedQuestionValue) {
      getSearchMovies(debouncedQuestionValue)
    }
  }, [debouncedQuestionValue])

  const searchRender = () => {
    return searchResults.length > 0 ? (
      <div className="movie__container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'persion') {
            const movieImgUrl = `${process.env.REACT_APP_MOVIE_IMG_ENDPOINT}/w500/${movie.backdrop_path}`
            return (
              <div className="movie" key={movie.id}>
                <div
                  className="movie__column-poster"
                  onClick={() => navigate(`/netflix/${movie.id}`)}
                >
                  <img
                    className="movie__poster"
                    src={movieImgUrl}
                    alt="movie"
                  />
                </div>
              </div>
            )
          }
        })}
      </div>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자 하는 검색어 "{debouncedQuestionValue}"에 맞는 영화가
            없습니다.
          </p>
        </div>
      </section>
    )
  }

  return searchRender()
}

export default Search
