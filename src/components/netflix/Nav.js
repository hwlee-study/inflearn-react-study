import { useCallback, useEffect, useState } from 'react'
import './Nav.css'
import { useNavigate } from 'react-router-dom'

function Nav() {
  const [isScrollShow, setIsScrollShow] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setIsScrollShow(true)
      } else {
        setIsScrollShow(false)
      }
    })

    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])

  const goToNetflixHome = useCallback(() => {
    if (!!searchValue) {
      setSearchValue('')
    }
    navigate(`/netflix`)
  }, [searchValue])

  const searchBarHandleChange = (event) => {
    setSearchValue(event.target.value)
    navigate(`search?q=${event.target.value}`)
  }

  return (
    <nav className={`nav ${isScrollShow && 'nav__black'}`}>
      <img
        className="nav__log"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2014_logo.svg"
        onClick={() => goToNetflixHome()}
        alt="netflix logo"
      />
      <input
        type="text"
        className="nav__input"
        value={searchValue}
        onChange={searchBarHandleChange}
        placeholder="영화를 검색해주세요."
      />
      <img
        className="nav__avatar"
        src={`${process.env.PUBLIC_URL}/asset/netflix_profile.jpg`}
        alt="user logged"
      />
    </nav>
  )
}
export default Nav
