import { createContext, useState } from 'react'

const GlobalContext = createContext()

const GlobalContextProvider = ({ children }) => {
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
  const value = { isLogged, setIsLogged, user, setUser }
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}
export { GlobalContextProvider }
export default GlobalContext
