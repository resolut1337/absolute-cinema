import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { LS_KEYS, load, save } from '../utils/storage'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favMovies, setFavMovies] = useState(() => load(LS_KEYS.FAV_MOVIES, []))
  const [favSessions, setFavSessions] = useState(() => load(LS_KEYS.FAV_SESSIONS, []))

  useEffect(()=> save(LS_KEYS.FAV_MOVIES, favMovies), [favMovies])
  useEffect(()=> save(LS_KEYS.FAV_SESSIONS, favSessions), [favSessions])

  const value = useMemo(()=> ({
    favMovies, favSessions,
    toggleMovie: (id) => setFavMovies(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]),
    toggleSession: (id) => setFavSessions(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]),
  }), [favMovies, favSessions])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
