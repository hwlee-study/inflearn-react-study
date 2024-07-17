import { useEffect, useState } from 'react'
import './Nav.css'

function Nav() {
  const [isScrollShow, setIsScrollShow] = useState(false)

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

  return (
    <nav className={`nav ${isScrollShow && 'nav__black'}`}>
      <img
        alt="netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2014_logo.svg"
        className="nav__log"
        onClick={() => window.location.reload()}
      />
      <img
        alt="user logged"
        src={`${process.env.PUBLIC_URL}/asset/netflix_profile.jpg`}
        className="nav__avatar"
      />
    </nav>
  )
}
export default Nav
