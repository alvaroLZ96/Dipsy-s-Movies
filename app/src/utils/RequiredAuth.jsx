import { useLocation, Navigate } from 'react-router-dom'

const RequiredAuth = ({ children }) => {
  const location = useLocation()

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

export default RequiredAuth
