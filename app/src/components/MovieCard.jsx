import styled from 'styled-components'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  overflow: hidden;
`

const Image = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
`
const DivTitle = styled.div`
  height: fit-content;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(83, 184, 0, 1) 0%,
    rgba(7, 56, 25, 0.77) 100%
  );
`
const Title = styled.h2`
  font-size: ${(props) => props.fontsize}px;
  margin: 10px 0;
  text-align: center;
`

const MovieCard = ({ movie, height, fontsize, width }) => {
  const { setSelectedMovie } = useContext(GlobalContext)
  const navigate = useNavigate()
  const handleMovieSelect = () => {
    setSelectedMovie(movie)
    navigate('/movies/detail')
  }
  return (
    <Container height={height} width={width} onClick={handleMovieSelect}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <DivTitle>
        <Title fontsize={fontsize}>{movie.title}</Title>
      </DivTitle>
    </Container>
  )
}

export default MovieCard
