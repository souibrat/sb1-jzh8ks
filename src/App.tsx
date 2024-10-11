import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Bird, User, Couple, Nest } from './types'
import BirdList from './components/BirdList'
import BirdForm from './components/BirdForm'
import LoginForm from './components/LoginForm'
import CoupleList from './components/CoupleList'
import CoupleForm from './components/CoupleForm'
import { Bird as BirdIcon, Users, List, PlusCircle } from 'lucide-react'

function App() {
  const [birds, setBirds] = useState<Bird[]>([])
  const [couples, setCouples] = useState<Couple[]>([])
  const [user, setUser] = useState<User | null>(null)

  const addOrUpdateBird = (bird: Bird) => {
    const existingBirdIndex = birds.findIndex(b => b.id === bird.id)
    if (existingBirdIndex !== -1) {
      const updatedBirds = [...birds]
      updatedBirds[existingBirdIndex] = bird
      setBirds(updatedBirds)
    } else {
      setBirds([...birds, { ...bird, ownerId: user!.id }])
    }
  }

  const handleDelete = (birdId: string) => {
    setBirds(birds.filter(b => b.id !== birdId))
  }

  const addOrUpdateCouple = (couple: Couple) => {
    const existingCoupleIndex = couples.findIndex(c => c.id === couple.id)
    if (existingCoupleIndex !== -1) {
      const updatedCouples = [...couples]
      updatedCouples[existingCoupleIndex] = couple
      setCouples(updatedCouples)
    } else {
      setCouples([...couples, couple])
    }
  }

  const addBabyBird = (coupleId: string, babyBird: Bird) => {
    addOrUpdateBird(babyBird)
    // Mise à jour du nombre de bébés dans le nid correspondant
    setCouples(couples.map(couple => {
      if (couple.id === coupleId) {
        const updatedNests = couple.nests.map(nest => ({
          ...nest,
          babyBirdsCount: nest.babyBirdsCount + 1
        }))
        return { ...couple, nests: updatedNests }
      }
      return couple
    }))
  }

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
    // Simuler le chargement des oiseaux de l'utilisateur
    setBirds([
      { id: '1', genre: 'mâle', type: 'canari', bagueName: 'C001', birthDate: '2023-01-01', ownerId: loggedInUser.id, photo: '' },
      { id: '2', genre: 'femelle', type: 'chardonneret', bagueName: 'C002', birthDate: '2023-02-15', ownerId: loggedInUser.id, photo: '' },
    ])
    // Simuler le chargement des couples de l'utilisateur
    setCouples([
      {
        id: '1',
        maleId: '1',
        femaleId: '2',
        nests: [
          { id: '1', couplingYear: '2023', nestNumber: 'N001', babyBirdsCount: 3 }
        ]
      }
    ])
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <BirdIcon className="mr-2" />
              <h1 className="text-2xl font-bold">Gestion d'Élevage d'Oiseaux</h1>
            </div>
            {user && (
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link to="/add-bird" className="flex items-center hover:text-blue-200">
                      <PlusCircle className="mr-1" size={18} />
                      Ajouter un oiseau
                    </Link>
                  </li>
                  <li>
                    <Link to="/birds" className="flex items-center hover:text-blue-200">
                      <List className="mr-1" size={18} />
                      Liste des oiseaux
                    </Link>
                  </li>
                  <li>
                    <Link to="/couples" className="flex items-center hover:text-blue-200">
                      <Users className="mr-1" size={18} />
                      Couples
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
            {user && (
              <button
                onClick={() => {
                  setUser(null)
                  setBirds([])
                  setCouples([])
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Déconnexion
              </button>
            )}
          </div>
        </header>
        <main className="container mx-auto mt-8 p-4">
          {user ? (
            <Routes>
              <Route path="/add-bird" element={<BirdForm addBird={addOrUpdateBird} />} />
              <Route path="/birds" element={<BirdList birds={birds} onEdit={addOrUpdateBird} onDelete={handleDelete} />} />
              <Route path="/couples" element={
                <>
                  <CoupleForm birds={birds} addCouple={addOrUpdateCouple} />
                  <CoupleList couples={couples} birds={birds} addBabyBird={addBabyBird} updateCouple={addOrUpdateCouple} />
                </>
              } />
              <Route path="/" element={<h2 className="text-xl font-semibold mb-4">Bienvenue, {user.username}</h2>} />
            </Routes>
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </main>
      </div>
    </Router>
  )
}

export default App