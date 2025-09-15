import { useEffect, useMemo, useState } from 'react'
import SessionCard from '../components/SessionCard'
import defaultMovies from '../data/movies.json'
import defaultSessions from '../data/sessions.json'
import { LS_KEYS, load } from '../utils/storage'

export default function SessionsPage(){
  const [movies, setMovies] = useState(()=> load(LS_KEYS.MOVIES, defaultMovies))
  const [sessions, setSessions] = useState(()=> load(LS_KEYS.SESSIONS, defaultSessions))

  useEffect(()=>{
    const onStorage = () => {
      setMovies(load(LS_KEYS.MOVIES, defaultMovies))
      setSessions(load(LS_KEYS.SESSIONS, defaultSessions))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const [filters, setFilters] = useState({ date:'', time:'', genre:'' })

  const filtered = useMemo(()=> sessions.filter(s => {
    const movie = movies.find(m=>m.id===s.movieId)
    if(!movie) return false
    const dateOk = !filters.date || s.date === filters.date
    const timeOk = !filters.time || s.time >= filters.time
    const genreOk = !filters.genre || movie.genre === filters.genre
    return dateOk && timeOk && genreOk
  }), [sessions, movies, filters])

  const genres = useMemo(()=> Array.from(new Set(movies.map(m=>m.genre))).filter(Boolean), [movies])

  return (
    <div className="container">
      <h2>Розклад сеансів</h2>
      <div className="toolbar">
        <input className="input" type="date" value={filters.date} onChange={e=>setFilters(v=>({...v, date:e.target.value}))} />
        <input className="input" type="time" value={filters.time} onChange={e=>setFilters(v=>({...v, time:e.target.value}))} />
        <select value={filters.genre} onChange={e=>setFilters(v=>({...v, genre:e.target.value}))}>
          <option value="">Усі жанри</option>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <div className="grid">
        {filtered.map(s => <SessionCard key={s.id} session={s} movieTitle={movies.find(m=>m.id===s.movieId)?.title} />)}
      </div>
    </div>
  )
}
