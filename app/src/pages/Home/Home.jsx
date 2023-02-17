import { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'
import Dashboard from '../Dashboard/Dashboard'

const Home = () => {
  const { isLogged } = useContext(GlobalContext)

  return (
    <>
      <div className="HomeDiv">{isLogged && <Dashboard />}</div>
    </>
  )
}

export default Home
