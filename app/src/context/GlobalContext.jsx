import { createContext, useState } from 'react'

const GlobalContext = createContext()

const GlobalContextProvider = ({ children }) => {
  const [jwt, setJwt] = useState(() => {
    const savedJwt = localStorage.getItem('token')
    return savedJwt || null
  })
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    const initialValue = JSON.parse(savedUser)
    return initialValue || null
  })
  const [isLogged, setIsLogged] = useState(() => {
    const savedUser = localStorage.getItem('user')
    const initialValue = JSON.parse(savedUser)

    return user || initialValue
  })
  const logout = () => {
    setUser(null)
    setJwt(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
  const [selectedMovie, setSelectedMovie] = useState(null)
  const value = {
    isLogged,
    setIsLogged,
    user,
    setUser,
    jwt,
    setJwt,
    logout,
    selectedMovie,
    setSelectedMovie
  }
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}
export { GlobalContextProvider }
export default GlobalContext
