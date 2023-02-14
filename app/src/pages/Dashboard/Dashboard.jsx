import { API } from '../../services/API'
import { useEffect, useState } from 'react'
import CarrouselList from '../../components/CarrouselList'
import Header from '../../components/Header'

const Dashboard = () => {
  const [movies, setMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nowPlayingResponse = await API.get('/movies/now-playing')
        const popularResponse = await API.get('/movies/popular')
        setNowPlayingMovies(nowPlayingResponse.data.data)
        setPopularMovies(popularResponse.data.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  const updateMovies = async () => {
    try {
      const nowPlayingResponse = await API.get('/movies/now-playing')
      const popularResponse = await API.get('/movies/popular')

      setNowPlayingMovies(nowPlayingResponse.data.data)
      setPopularMovies(popularResponse.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Header />
      <button onClick={updateMovies}>Synchronize</button>
      <CarrouselList movies={nowPlayingMovies} />
      <p>Hola</p>
      <CarrouselList movies={popularMovies} />
    </div>
  )
}

export default Dashboard
