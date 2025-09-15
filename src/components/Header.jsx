import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <aside className="sidebar" style={{position:'fixed',left:0,top:0,height:'100vh',width:'120px',background:'linear-gradient(180deg,#23243a 0%,#141824 100%)',boxShadow:'2px 0 16px rgba(44,48,80,0.10)',display:'flex',flexDirection:'column',alignItems:'center',padding:'24px 0',zIndex:100}}>
      <div style={{marginBottom:'32px',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <span style={{fontSize:'2.8rem',color:'#fff',textShadow:'0 2px 12px #7c5cff'}}>🎥</span>
        <span style={{fontWeight:900,fontSize:'1.1rem',letterSpacing:'2px',color:'var(--primary)',marginTop:'8px'}}>ABSOLUTE</span>
        <span style={{fontWeight:900,fontSize:'1.1rem',letterSpacing:'2px',color:'var(--primary)',marginTop:'8px'}}>CINEMA</span>
      </div>
      <nav style={{display:'flex',flexDirection:'column',gap:'24px',width:'100%',alignItems:'center'}}>
        <NavLink to="/" style={({isActive})=>({display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',color:isActive?'var(--accent)':'var(--muted)',fontWeight:isActive?800:500,fontSize:'1.2rem',padding:'8px 0',borderRadius:'12px',background:isActive?'rgba(0,209,178,0.12)':'none',width:'80px',transition:'all 0.2s'})}>
          <span style={{fontSize:'1.6rem'}}>🏠</span>
          <span style={{fontSize:'0.9rem'}}>Головна</span>
        </NavLink>
        <NavLink to="/sessions" style={({isActive})=>({display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',color:isActive?'var(--accent)':'var(--muted)',fontWeight:isActive?800:500,fontSize:'1.2rem',padding:'8px 0',borderRadius:'12px',background:isActive?'rgba(0,209,178,0.12)':'none',width:'80px',transition:'all 0.2s'})}>
          <span style={{fontSize:'1.6rem'}}>🎟️</span>
          <span style={{fontSize:'0.9rem'}}>Сеанси</span>
        </NavLink>
        <NavLink to="/favorites" style={({isActive})=>({display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',color:isActive?'var(--accent)':'var(--muted)',fontWeight:isActive?800:500,fontSize:'1.2rem',padding:'8px 0',borderRadius:'12px',background:isActive?'rgba(0,209,178,0.12)':'none',width:'80px',transition:'all 0.2s'})}>
          <span style={{fontSize:'1.6rem'}}>❤️</span>
          <span style={{fontSize:'0.9rem'}}>Обране</span>
        </NavLink>
        <NavLink to="/admin" style={({isActive})=>({display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',color:isActive?'var(--primary)':'var(--muted)',fontWeight:isActive?800:500,fontSize:'1.2rem',padding:'8px 0',borderRadius:'12px',background:isActive?'rgba(124,92,255,0.12)':'none',width:'80px',transition:'all 0.2s'})}>
          <span style={{fontSize:'1.6rem'}}>🛠️</span>
          <span style={{fontSize:'0.9rem'}}>Адмін</span>
        </NavLink>
      </nav>
    </aside>
  )
}
