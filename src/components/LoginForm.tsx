import React, { useState } from 'react'
import { User } from '../types'

interface LoginFormProps {
  onLogin: (user: User) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simuler une vérification d'authentification
    // Dans une vraie application, vous devriez vérifier les identifiants avec un backend
    if (username === 'demo' && password === 'password') {
      const user: User = {
        id: 'user123',
        username: username,
        password: password // Ne stockez jamais les mots de passe en clair dans une vraie application
      }
      onLogin(user)
    } else {
      alert('Identifiants incorrects')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Connexion</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Se connecter
        </button>
      </div>
    </form>
  )
}

export default LoginForm