import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function MovieCard({ movie }) {
  const { favMovies, toggleMovie } = useFavorites()
  const isFav = favMovies.includes(movie.id)
  return (
    <div className="card" style={{position:'relative',borderRadius:'24px',overflow:'hidden',boxShadow:'0 8px 32px rgba(44,48,80,0.18)',background:'linear-gradient(120deg,#23243a 60%,#7c5cff 100%)',transition:'transform 0.2s',minHeight:'420px'}}>
      <img src={movie.poster} alt={movie.title} style={{width:'100%',height:'260px',objectFit:'cover',filter:'brightness(0.85)'}} />
      <div style={{position:'absolute',top:'16px',right:'16px',background:'rgba(0,0,0,0.6)',borderRadius:'50%',padding:'8px',boxShadow:'0 2px 8px #7c5cff'}}>
        <span style={{fontSize:'1.3rem',color:'#FFD700'}}>⭐ {movie.rating}</span>
      </div>
      <div className="content" style={{padding:'20px',display:'flex',flexDirection:'column',gap:'10px'}}>
        <h3 style={{margin:0,fontSize:'1.3rem',fontWeight:800,color:'#fff',textShadow:'0 2px 8px #7c5cff'}}>{movie.title}</h3>
        <p style={{margin:0,color:'var(--accent)',fontWeight:600}}>{movie.genre} • {movie.year}</p>
        <p style={{margin:'6px 0 12px',fontSize:14,color:'var(--muted)'}}>{movie.description.slice(0, 100)}...</p>
        <div style={{display:'flex',gap:12,justifyContent:'center'}}>
          <Link className="btn primary" style={{background:'linear-gradient(90deg,#7c5cff,#00d1b2)',color:'#fff',borderRadius:'16px',fontWeight:700,boxShadow:'0 2px 8px #00d1b2',padding:'6px 14px',fontSize:'0.95rem',minWidth:'unset'}} to={`/movie/${movie.id}`}>
            <span role="img" aria-label="details" style={{marginRight:6}}>🔎</span> Детальніше
          </Link>
          <button className="btn ghost" style={{background:isFav?'#FFD700':'#23243a',color:isFav?'#23243a':'#fff',borderRadius:'16px',fontWeight:700,boxShadow:isFav?'0 2px 8px #FFD700':'none',padding:'6px 14px',fontSize:'0.95rem',minWidth:'unset'}} onClick={() => toggleMovie(movie.id)}>
            {isFav ? <span role="img" aria-label="fav" style={{marginRight:6}}>💖</span> : <span role="img" aria-label="add" style={{marginRight:6}}>➕</span>}
            {isFav ? 'В обраному' : 'До обраного'}
          </button>
        </div>
      </div>
    </div>
  )
}
