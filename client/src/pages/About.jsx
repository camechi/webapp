import { useAuth } from '../context/AuthContext'

export default function About() {
  const { user } = useAuth()

  return (
    <div className="auth-card">
      <h2>About</h2>
      <p className="auth-subtitle">This page is only available to authenticated users</p>

      <div className="alert alert-success">
        Welcome, {user?.username}. You are viewing a protected page.
      </div>
    </div>
  )
}
