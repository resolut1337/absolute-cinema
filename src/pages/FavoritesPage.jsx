import { useMemo } from 'react'
import { useFavorites } from '../context/FavoritesContext'
import defaultMovies from '../data/movies.json'
import defaultSessions from '../data/sessions.json'
import { LS_KEYS, load } from '../utils/storage'
import MovieCard from '../components/MovieCard'
import SessionCard from '../components/SessionCard'

export default function FavoritesPage(){
  const { favMovies, favSessions } = useFavorites()
  const movies = load(LS_KEYS.MOVIES, defaultMovies)
  const sessions = load(LS_KEYS.SESSIONS, defaultSessions)

  const favMoviesList = useMemo(()=> movies.filter(m=> favMovies.includes(m.id)), [movies, favMovies])
  const favSessionsList = useMemo(()=> sessions.filter(s=> favSessions.includes(s.id)), [sessions, favSessions])

  return (
    <div className="container" style={{display:'grid', gap:16}}>
      <h2>Обрані</h2>

      <section>
        <h3>Фільми</h3>
        {favMoviesList.length === 0 ? <p>Немає збережених фільмів.</p> : (
          <div className="grid">
            {favMoviesList.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
        )}
      </section>

      <section>
        <h3>Сеанси</h3>
        {favSessionsList.length === 0 ? <p>Немає збережених сеансів.</p> : (
          <div className="grid">
            {favSessionsList.map(s => <SessionCard key={s.id} session={s} movieTitle={movies.find(m=>m.id===s.movieId)?.title} />)}
          </div>
        )}
      </section>
    </div>
  )
}
