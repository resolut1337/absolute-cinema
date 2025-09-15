export default function SearchBar({ query, setQuery, filters, setFilters, genres }) {
  return (
    <div className="toolbar" style={{display:'flex',gap:18,alignItems:'center',background:'linear-gradient(90deg,#23243a 0%,#7c5cff 100%)',borderRadius:'18px',boxShadow:'0 2px 8px #7c5cff',padding:'18px 24px',marginBottom:'24px'}}>
      <input className="input" style={{flex:1,padding:'12px 18px',borderRadius:'12px',border:'2px solid #7c5cff',fontSize:'1.1rem',transition:'border 0.2s'}} placeholder="🔍 Пошук за назвою…" value={query} onChange={e=>setQuery(e.target.value)} />
      <select style={{padding:'10px',borderRadius:'10px',border:'2px solid #00d1b2',background:'#23243a',color:'#fff',fontWeight:600}} value={filters.genre} onChange={e=>setFilters(v=>({...v, genre:e.target.value}))}>
        <option value="">🎬 Усі жанри</option>
        {genres.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
      <select style={{padding:'10px',borderRadius:'10px',border:'2px solid #FFD700',background:'#23243a',color:'#fff',fontWeight:600}} value={filters.year} onChange={e=>setFilters(v=>({...v, year:e.target.value}))}>
        <option value="">📅 Будь-який рік</option>
        {Array.from({length: 11}).map((_,i)=>{
          const y = 2025 - i
          return <option key={y} value={y}>{y}</option>
        })}
      </select>
      <select style={{padding:'10px',borderRadius:'10px',border:'2px solid #7c5cff',background:'#23243a',color:'#fff',fontWeight:600}} value={filters.minRating} onChange={e=>setFilters(v=>({...v, minRating:Number(e.target.value)}))}>
        <option value={0}>⭐ Рейтинг від 0</option>
        <option value={5}>⭐ Рейтинг від 5</option>
        <option value={6}>⭐ Рейтинг від 6</option>
        <option value={7}>⭐ Рейтинг від 7</option>
        <option value={8}>⭐ Рейтинг від 8</option>
      </select>
    </div>
  )
}
