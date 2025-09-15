export const LS_KEYS = {
  MOVIES: 'cinema_movies',
  SESSIONS: 'cinema_sessions',
  FAV_MOVIES: 'cinema_fav_movies',
  FAV_SESSIONS: 'cinema_fav_sessions',
}

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
