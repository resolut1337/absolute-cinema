import { useEffect, useMemo, useState } from 'react'
import { LS_KEYS, load, save } from '../utils/storage'
import defaultMovies from '../data/movies.json'
import defaultSessions from '../data/sessions.json'

export default function AdminPanel() {
  const [movies, setMovies] = useState(()=> load(LS_KEYS.MOVIES, defaultMovies))
  const [sessions, setSessions] = useState(()=> load(LS_KEYS.SESSIONS, defaultSessions))

  useEffect(()=> save(LS_KEYS.MOVIES, movies), [movies])
  useEffect(()=> save(LS_KEYS.SESSIONS, sessions), [sessions])

  const [movieForm, setMovieForm] = useState({ id:'', title:'', year:'', genre:'', rating:7.5, poster:'', trailer:'', description:'' })
  const [sessionForm, setSessionForm] = useState({ id:'', movieId:'', date:'', time:'', hall:1, lang:'UA', format:'2D' })

  const nextMovieId = useMemo(()=> (movies.reduce((m, x)=> Math.max(m, x.id), 0) + 1), [movies])
  const nextSessionId = useMemo(()=> (sessions.reduce((m, x)=> Math.max(m, x.id), 0) + 1), [sessions])

  function addMovie(e){
    e.preventDefault()
    const payload = { ...movieForm, id: nextMovieId, year: Number(movieForm.year), rating: Number(movieForm.rating) }
    setMovies(prev => [...prev, payload])
    setMovieForm({ id:'', title:'', year:'', genre:'', rating:7.5, poster:'', trailer:'', description:'' })
  }
  function removeMovie(id){
    setMovies(prev => prev.filter(m=>m.id!==id))
    setSessions(prev => prev.filter(s=>s.movieId!==id))
  }
  function addSession(e){
    e.preventDefault()
    const payload = { ...sessionForm, id: nextSessionId, hall: Number(sessionForm.hall), movieId: Number(sessionForm.movieId) }
    setSessions(prev => [...prev, payload])
    setSessionForm({ id:'', movieId:'', date:'', time:'', hall:1, lang:'UA', format:'2D' })
  }
  function removeSession(id){ setSessions(prev => prev.filter(s=>s.id!==id)) }

  function exportAll(){
    const data = { movies, sessions }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'cinema-data.json'; a.click(); URL.revokeObjectURL(url)
  }

  function importAll(e){
    const file = e.target.files?.[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        if(parsed.movies && parsed.sessions){
          setMovies(parsed.movies); setSessions(parsed.sessions)
        } else alert('Невірний формат JSON')
      } catch { alert('Не вдалося прочитати JSON') }
    }
    reader.readAsText(file)
  }

  return (
    <div className="container" style={{display:'grid',gap:32,background:'linear-gradient(120deg,#23243a 60%,#7c5cff 100%)',borderRadius:'32px',boxShadow:'0 8px 32px rgba(44,48,80,0.18)',padding:'32px'}}>
      <h2 style={{fontWeight:900,fontSize:'2rem',color:'#fff',textShadow:'0 2px 8px #7c5cff'}}>Панель адміністратора</h2>
      <div className="toolbar" style={{display:'flex',gap:16,marginBottom:16}}>
        <button className="btn" style={{background:'linear-gradient(90deg,#7c5cff,#00d1b2)',color:'#fff',borderRadius:'16px',fontWeight:700,boxShadow:'0 2px 8px #00d1b2'}} onClick={exportAll}>📤 Експорт JSON</button>
        <label className="btn" style={{background:'linear-gradient(90deg,#00d1b2,#7c5cff)',color:'#fff',borderRadius:'16px',fontWeight:700,boxShadow:'0 2px 8px #7c5cff'}}>
          📥 Імпорт JSON
          <input type="file" accept="application/json" onChange={importAll} style={{display:'none'}} />
        </label>
      </div>

      <fieldset style={{borderRadius:'24px',border:'2px solid #7c5cff',padding:'24px',background:'rgba(20,24,36,0.85)',boxShadow:'0 2px 8px #7c5cff'}}>
        <legend style={{fontWeight:700,color:'var(--primary)',fontSize:'1.1rem'}}>Додати фільм</legend>
        <form className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12}} onSubmit={addMovie}>
          <input className="input" placeholder="Назва" value={movieForm.title} onChange={e=>setMovieForm(v=>({...v, title:e.target.value}))} required />
          <input className="input" placeholder="Рік" type="number" value={movieForm.year} onChange={e=>setMovieForm(v=>({...v, year:e.target.value}))} required />
          <input className="input" placeholder="Жанр" value={movieForm.genre} onChange={e=>setMovieForm(v=>({...v, genre:e.target.value}))} required />
          <input className="input" placeholder="Рейтинг" type="number" step="0.1" value={movieForm.rating} onChange={e=>setMovieForm(v=>({...v, rating:e.target.value}))} />
          <input className="input" placeholder="Постер URL" value={movieForm.poster} onChange={e=>setMovieForm(v=>({...v, poster:e.target.value}))} />
          <input className="input" placeholder="YouTube трейлер (embed або watch URL)" value={movieForm.trailer} onChange={e=>setMovieForm(v=>({...v, trailer:e.target.value}))} />
          <textarea className="input" placeholder="Опис" value={movieForm.description} onChange={e=>setMovieForm(v=>({...v, description:e.target.value}))} />
          <button className="btn primary" type="submit">Додати</button>
        </form>
      </fieldset>

      <div style={{overflowX:'auto',margin:'16px 0'}}>
        <table className="table" style={{borderRadius:'16px',overflow:'hidden',background:'rgba(30,34,54,0.85)',color:'#fff'}}>
          <thead><tr><th>ID</th><th>Назва</th><th>Рік</th><th>Жанр</th><th>Рейтинг</th><th></th></tr></thead>
          <tbody>
            {movies.map(m=> (
              <tr key={m.id}>
                <td>{m.id}</td><td>{m.title}</td><td>{m.year}</td><td>{m.genre}</td><td>{m.rating}</td>
                <td><button className="btn ghost" onClick={()=>removeMovie(m.id)}>Видалити</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <fieldset style={{borderRadius:'24px',border:'2px solid #00d1b2',padding:'24px',background:'rgba(20,24,36,0.85)',boxShadow:'0 2px 8px #00d1b2'}}>
        <legend style={{fontWeight:700,color:'var(--accent)',fontSize:'1.1rem'}}>Додати сеанс</legend>
        <form className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12}} onSubmit={addSession}>
          <select className="input" value={sessionForm.movieId} onChange={e=>setSessionForm(v=>({...v, movieId:e.target.value}))} required>
            <option value="">Виберіть фільм</option>
            {movies.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
          </select>
          <input className="input" placeholder="Дата (YYYY-MM-DD)" value={sessionForm.date} onChange={e=>setSessionForm(v=>({...v, date:e.target.value}))} required />
          <input className="input" placeholder="Час (HH:MM)" value={sessionForm.time} onChange={e=>setSessionForm(v=>({...v, time:e.target.value}))} required />
          <input className="input" placeholder="Зал" type="number" value={sessionForm.hall} onChange={e=>setSessionForm(v=>({...v, hall:e.target.value}))} />
          <input className="input" placeholder="Мова" value={sessionForm.lang} onChange={e=>setSessionForm(v=>({...v, lang:e.target.value}))} />
          <input className="input" placeholder="Формат (2D/3D/IMAX)" value={sessionForm.format} onChange={e=>setSessionForm(v=>({...v, format:e.target.value}))} />
          <button className="btn primary" type="submit">Додати</button>
        </form>
      </fieldset>

      <div style={{overflowX:'auto',margin:'16px 0'}}>
        <table className="table" style={{borderRadius:'16px',overflow:'hidden',background:'rgba(30,34,54,0.85)',color:'#fff'}}>
          <thead><tr><th>ID</th><th>Фільм</th><th>Дата</th><th>Час</th><th>Зал</th><th>Мова</th><th>Формат</th><th></th></tr></thead>
          <tbody>
            {sessions.map(s=> (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{movies.find(m=>m.id===s.movieId)?.title || '—'}</td>
                <td>{s.date}</td><td>{s.time}</td><td>{s.hall}</td><td>{s.lang}</td><td>{s.format}</td>
                <td><button className="btn ghost" onClick={()=>removeSession(s.id)}>Видалити</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
