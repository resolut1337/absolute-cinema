import { useFavorites } from '../context/FavoritesContext'

export default function SessionCard({ session, movieTitle }) {
  const { favSessions, toggleSession } = useFavorites()
  const isFav = favSessions.includes(session.id)
  return (
    <div className="card" style={{borderRadius:'20px',background:'linear-gradient(90deg,#00d1b2 0%,#7c5cff 100%)',boxShadow:'0 4px 16px rgba(44,48,80,0.12)',padding:'0',overflow:'hidden',minHeight:'120px',display:'flex',alignItems:'center'}}>
      <div className="content" style={{padding:'20px',width:'100%'}}>
        <h3 style={{margin:0,fontSize:'1.1rem',fontWeight:800,color:'#fff',textShadow:'0 2px 8px #7c5cff'}}>{movieTitle}</h3>
        <p className="badge" style={{color:'#23243a',fontWeight:700,background:'#FFD700',borderRadius:'8px',padding:'2px 8px',display:'inline-block',margin:'8px 0'}}>{session.date} • {session.time} • Зал {session.hall}</p>
        <p style={{margin:0,color:'#fff'}}>Мова: <span style={{color:'#00d1b2'}}>{session.lang}</span> • Формат: <span style={{color:'#7c5cff'}}>{session.format}</span></p>
        <div style={{display:'flex',gap:12,marginTop:12}}>
          <button className="btn primary" style={{background:'linear-gradient(90deg,#FFD700,#00d1b2)',color:'#23243a',borderRadius:'16px',fontWeight:700,boxShadow:'0 2px 8px #FFD700'}} onClick={() => alert('тут могла бути купiвля квиткiв, але її немає')}>
            <span role="img" aria-label="buy" style={{marginRight:6}}>💳</span> Купити
          </button>
          <button className="btn ghost" style={{background:isFav?'#FFD700':'#23243a',color:isFav?'#23243a':'#fff',borderRadius:'16px',fontWeight:700,boxShadow:isFav?'0 2px 8px #FFD700':'none'}} onClick={() => toggleSession(session.id)}>
            {isFav ? <span role="img" aria-label="fav" style={{marginRight:6}}>💖</span> : <span role="img" aria-label="add" style={{marginRight:6}}>➕</span>}
            {isFav ? 'В обраному' : 'До обраного'}
          </button>
        </div>
      </div>
    </div>
  )
}
