import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import MoviePage from './pages/MoviePage'
import SessionsPage from './pages/SessionsPage'
import FavoritesPage from './pages/FavoritesPage'
import AdminPage from './pages/AdminPage'
import { FavoritesProvider } from './context/FavoritesContext'

export default function App(){
  return (
    <FavoritesProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<div className="container"><p>Сторінку не знайдено.</p></div>} />
      </Routes>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Absolute Cinema</span>
        <br />
        <span style={{fontSize:'0.95rem',color:'var(--muted)'}}>поставте 9 будь ласка</span>
      </footer>
    </FavoritesProvider>
  )
}
