import { API } from '../../services/API'
import { useEffect, useState, useRef } from 'react'
import CarrouselList from '../../components/CarrouselList'
import Header from '../../components/Header'
import BasicCarrousel from '../../components/BasicCarrousel'
import Footer from '../../components/Footer'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const Text = styled.div`
  padding: 0 0 10px 60px;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: #62ff85;
  text-shadow: 0px 0px 0 #29ef29, 1px 1px 0 #1ce119, 2px 2px 0 #20d71c,
    3px 3px 0 #25c31f, 4px 4px 0 #2ba922, 5px 5px 0 #30a526, 6px 6px 0 #36912a,
    7px 7px 0 #3b7d2d, 8px 8px 0 #417930, 9px 9px 0 #466534, 10px 10px 0 #4c5237,
    11px 11px 0 #513d3a, 12px 12px 0 #57293e, 0px 0px 20px rgba(0, 0, 0, 0.2),
    2px 2px 2px rgba(22, 237, 22, 0.7);
`

const Button = styled.button`
  margin: 10px auto;
  height: 40px;
  cursor: pointer;
  width: 40px;
  background-color: transparent;
  border: none;
  border-radius: 450%;
  background-image: url('https://res.cloudinary.com/dbxcsf9hc/image/upload/v1676491615/sincronizar_fvhczo.png');
  background-size: 40px;
`

const Dashboard = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])

  const nowPlayingPageRef = useRef(1)
  const popularPageRef = useRef(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nowPlayingResponse = await API.get(
          `/movies/now-playing?page=${nowPlayingPageRef.current}`
        )
        const popularResponse = await API.get(
          `/movies/popular?page=${popularPageRef.current}`
        )

        setNowPlayingMovies([
          ...nowPlayingMovies,
          ...nowPlayingResponse.data.data
        ])
        setPopularMovies([...popularMovies, ...popularResponse.data.data])
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  const updateMovies = async () => {
    try {
      const nowPlayingResponse = await API.get('/movies/now-playing?page=1')
      const popularResponse = await API.get('/movies/popular?page=1')

      nowPlayingPageRef.current = 1
      popularPageRef.current = 1
      setNowPlayingMovies(nowPlayingResponse.data.data)
      setPopularMovies(popularResponse.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  const loadMoreMovies = async (type) => {
    try {
      if (type === 'nowPlaying') {
        const response = await API.get(
          `/movies/now-playing?page=${nowPlayingPageRef.current + 1}`
        )
        setNowPlayingMovies([...nowPlayingMovies, ...response.data.data])
        nowPlayingPageRef.current += 1
      } else if (type === 'popular') {
        const response = await API.get(
          `/movies/popular?page=${popularPageRef.current + 1}`
        )
        setPopularMovies([...popularMovies, ...response.data.data])
        popularPageRef.current += 1
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Wrapper>
      <Header />
      <Button onClick={updateMovies} />
      <Text>En cines</Text>
      <CarrouselList
        movies={nowPlayingMovies}
        onLoadMore={() => loadMoreMovies('nowPlaying')}
      />
      <Text>Populares</Text>
      <BasicCarrousel
        movies={popularMovies}
        onLoadMore={() => loadMoreMovies('popular')}
      />
      <Footer />
    </Wrapper>
  )
}

export default Dashboard
