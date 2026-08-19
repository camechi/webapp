import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) {
        setMessage('Session expired. Please log in again.')
        return
      }

      const data = await res.json()
      setMessage(`Welcome to your dashboard, ${data.user.username}! You are successfully authenticated.`)
    } catch {
      setMessage('Failed to load profile.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-card">
      <h2>Dashboard</h2>
      <p className="auth-subtitle">You are logged in</p>

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : (
        <>
          <div className="profile-card">
            <div className="profile-avatar">{user?.username?.[0]?.toUpperCase()}</div>
            <div className="profile-info">
              <h3>{user?.username}</h3>
              <p>{user?.email}</p>
            </div>
          </div>

          <div className="alert alert-success">{message}</div>

          <div className="dashboard-actions">
            <p className="text-muted">Your JWT token is stored in localStorage and sent with each request.</p>
          </div>
        </>
      )}
    </div>
  )
}
