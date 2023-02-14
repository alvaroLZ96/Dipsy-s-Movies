import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import RequiredAuth from './utils/RequiredAuth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { GlobalContextProvider } from './context/GlobalContext'
import Dashboard from './pages/Dashboard/Dashboard'
import MovieDetail from './components/MovieDetail'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            index
            element={
              <RequiredAuth>
                <Home />
              </RequiredAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="movies"
            element={
              <RequiredAuth>
                <Dashboard />
              </RequiredAuth>
            }
          />
          <Route
            path="/movies/detail"
            element={
              <RequiredAuth>
                <MovieDetail />
              </RequiredAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
)
