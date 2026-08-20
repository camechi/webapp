// ThemeContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'

const ThemeContext = createContext(null)

const VALID_THEMES = ['light', 'grey', 'dark']
const STORAGE_KEY = 'theme'  // fallback local key

function getInitialTheme() {
  // Priority: stored user theme > localStorage theme > light
  try {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const theme = JSON.parse(storedUser).theme
      if (VALID_THEMES.includes(theme)) return theme
    }
  } catch {}
  const local = localStorage.getItem(STORAGE_KEY)
  if (VALID_THEMES.includes(local)) return local
  return 'light'
}

export function ThemeProvider({ children }) {
  const { user } = useAuth()
  const [theme, setThemeState] = useState(getInitialTheme)

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Sync theme when the logged-in user changes (e.g., after login)
useEffect(() => {
  if (user && user.theme && VALID_THEMES.includes(user.theme)) {
    setThemeState(user.theme)
  } else if (!user) {
    setThemeState('light')
  }
}, [user])

  const setTheme = useCallback(async (newTheme) => {
    if (!VALID_THEMES.includes(newTheme)) return
    setThemeState(newTheme)
    // Persist locally so it's remembered immediately
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const parsed = JSON.parse(storedUser)
        parsed.theme = newTheme
        localStorage.setItem('user', JSON.stringify(parsed))
        localStorage.setItem(STORAGE_KEY, newTheme)
      }
    } catch {}
    // Persist to backend if logged in
    const token = localStorage.getItem('token')
    if (token) {
      try {
        await fetch('/api/auth/theme', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ theme: newTheme })
        })
      } catch (e) {
        console.error('Failed to save theme preference', e)
      }
    }
  }, [])

  const value = { theme, setTheme }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}