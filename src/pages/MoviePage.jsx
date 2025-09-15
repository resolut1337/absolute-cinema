import { useParams } from 'react-router-dom'
import defaultMovies from '../data/movies.json'
import { LS_KEYS, load } from '../utils/storage'
import { useFavorites } from '../context/FavoritesContext'

function toEmbed(url){
  if(!url) return ''
  if(url.includes('embed/')) return url
  // convert watch?v= to embed/
  return url.replace('watch?v=', 'embed/')
}

export default function MoviePage(){
  const { id } = useParams()
  const movies = load(LS_KEYS.MOVIES, defaultMovies)
  const movie = movies.find(m => String(m.id) === String(id))

  const { favMovies, toggleMovie } = useFavorites()
  const isFav = favMovies.includes(movie?.id)

  if(!movie) return <div className="container"><p>Фільм не знайдено.</p></div>

  return (
    <div className="container" style={{display:'grid', gap:16}}>
      <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:16}}>
        <img src={movie.poster} alt={movie.title} style={{width:'100%', borderRadius:16}} />
        <div style={{display:'grid', gap:8}}>
          <h2 style={{margin:0}}>{movie.title}</h2>
          <div className="badge">Жанр: {movie.genre} • Рік: {movie.year} • Рейтинг: ⭐ {movie.rating}</div>
          <p>{movie.description}</p>
          <div style={{display:'flex', gap:8}}>
            <button className="btn primary" onClick={()=> toggleMovie(movie.id)}>{isFav ? 'В обраному' : 'Додати в обране'}</button>
          </div>
        </div>
      </div>
      {movie.cast && movie.cast.length > 0 && (
        <div>
          <h3>Акторський склад</h3>
          <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
            {movie.cast.map((c,i)=> <span key={i} className="badge">{c}</span>)}
          </div>
        </div>
      )}
      {movie.trailer && (
        <div>
          <h3>Трейлер</h3>
          <div style={{position:'relative', paddingTop:'56.25%'}}>
            <iframe src={toEmbed(movie.trailer)} title="Трейлер" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen
              style={{position:'absolute', inset:0, width:'100%', height:'100%', border:0, borderRadius:16}} />
          </div>
        </div>
      )}
    </div>
  )
}
