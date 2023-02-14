import { useContext, useState, useEffect } from 'react'
import GlobalContext from '../context/GlobalContext'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  LazyLoadComponent,
  LazyLoadImage
} from 'react-lazy-load-image-component'
import { API } from '../services/API'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
  background-image: ${({ bgImage }) => `url(${bgImage})`};
  height: 250px;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    height: 100px;
  }
`

const InfoContainer = styled.div`
  padding: 0 20px;
  display: flex;
  width: 100%;
  margin: 20px 0;
`

const Poster = styled(LazyLoadImage)`
  height: 200px;
  margin-right: 20px;
  box-shadow: rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px,
    rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px,
    rgba(240, 46, 170, 0.05) 0px 25px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h2`
  font-size: 20px;
  margin: 0 0 10px 0;
`

const Duration = styled.p`
  font-size: 14px;
  color: gray;
  margin: 0;
`

const Rating = styled.p`
  font-size: 14px;
  color: gray;
  margin: 0;
`

const Overview = styled.p`
  padding: 0 20px;
  font-size: 16px;
  margin: 20px 0;
  text-align: justify;
`

const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`
const ActressDiv = styled.div``
const CastName = styled.div`
  text-align: center;
`
const Cast = styled(LazyLoadImage)`
  min-height: 150px;
  width: 100px;
  margin: 5px 20px;
  border-radius: 10px;
`
const MovieDetail = () => {
  const { selectedMovie } = useContext(GlobalContext)
  const [castMovie, setCastmovie] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        const response = await API.get(`/movies/${selectedMovie.id}`)
        const movie = response.data.cast
        setCastmovie(movie)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }

    if (selectedMovie) {
      fetchMovie()
    }
  }, [selectedMovie])

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : selectedMovie !== null ? (
        <>
          <Container
            bgImage={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
          ></Container>
          <InfoContainer>
            <Poster
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
            />
            <Info>
              <Title>{selectedMovie.title}</Title>
              <Duration>{selectedMovie.original_title} </Duration>
              <Rating>{selectedMovie.vote_average}/10</Rating>
            </Info>
          </InfoContainer>
          <Overview>{selectedMovie.overview}</Overview>
          <CastContainer>
            {castMovie?.map((actor) => (
              <ActressDiv>
                <Cast
                  key={actor.credit_id}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  onError={(e) => {
                    e.target.src =
                      'https://res.cloudinary.com/dbxcsf9hc/image/upload/v1675788468/dipsy_wanq24.png'
                  }}
                  alt={actor.name}
                />
                <CastName>{actor.name}</CastName>
              </ActressDiv>
            ))}
          </CastContainer>
        </>
      ) : (
        <Navigate to="/movies" />
      )}
    </>
  )
}

export default MovieDetail
