import { useEffect, useMemo, useState } from 'react'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import defaultMovies from '../data/movies.json'
import { LS_KEYS, load } from '../utils/storage'

export default function Home(){
  const [movies, setMovies] = useState(() => load(LS_KEYS.MOVIES, defaultMovies))
  useEffect(()=>{
    // sync with localStorage changes from Admin
    const onStorage = () => setMovies(load(LS_KEYS.MOVIES, defaultMovies))
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({ genre:'', year:'', minRating:0 })

  const genres = useMemo(()=> Array.from(new Set(movies.map(m=>m.genre))).filter(Boolean), [movies])

  const filtered = useMemo(()=> movies.filter(m=> {
    const q = m.title.toLowerCase().includes(query.toLowerCase())
    const g = !filters.genre || m.genre === filters.genre
    const y = !filters.year || String(m.year) === String(filters.year)
    const r = (m.rating ?? 0) >= (filters.minRating ?? 0)
    return q && g && y && r
  }), [movies, query, filters])

  return (
    <div className="container">
      <h2>Актуальні фільми та новинки</h2>
      <SearchBar query={query} setQuery={setQuery} filters={filters} setFilters={setFilters} genres={genres} />
      <div className="grid">
        {filtered.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}
