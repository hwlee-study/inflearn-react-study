import { useRef } from 'react'
import './MovieModal.css'
import useOnClickOutSide from '../../../hooks/useOnClickOutSide'

function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) {
  const modalRef = useRef()

  useOnClickOutSide(modalRef, () => {
    setModalOpen(false)
  })

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={modalRef}>
          <span className="modal-close" onClick={() => setModalOpen(false)}>
            X
          </span>
          <img
            className="modal__poster-img"
            src={`${process.env.REACT_APP_MOVIE_IMG_ENDPOINT}/original/${backdrop_path}`}
            alt="modal__poster-img"
          />
          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">100% for you</span>
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점 : {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
