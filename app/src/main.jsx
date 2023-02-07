import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import RequiredAuth from './utils/RequiredAuth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import NowMovies from './pages/NowMovies/NowMovies'
import PopularMovies from './pages/PopularMovies/PopularMovies'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
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
          path="movies/popular"
          element={
            <RequiredAuth>
              <PopularMovies />
            </RequiredAuth>
          }
        />
        <Route
          path="movies/now-playing"
          element={
            <RequiredAuth>
              <NowMovies />
            </RequiredAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
