import React, { useState } from 'react'
import { Bird } from '../types'
import { Pencil, Trash2 } from 'lucide-react'
import BirdForm from './BirdForm'

interface BirdListProps {
  birds: Bird[]
  onEdit: (bird: Bird) => void
  onDelete: (birdId: string) => void
}

const BirdList: React.FC<BirdListProps> = ({ birds, onEdit, onDelete }) => {
  const [editingBird, setEditingBird] = useState<Bird | null>(null)

  const handleEdit = (bird: Bird) => {
    setEditingBird(bird)
  }

  const handleUpdate = (updatedBird: Bird) => {
    onEdit(updatedBird)
    setEditingBird(null)
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Liste de vos oiseaux</h3>
      {birds.length === 0 ? (
        <p>Vous n'avez pas encore ajouté d'oiseaux.</p>
      ) : (
        <ul className="space-y-4">
          {birds.map((bird) => (
            <li key={bird.id} className="bg-white p-4 rounded shadow flex items-center">
              {bird.photo && (
                <img src={bird.photo} alt={`${bird.type} ${bird.genre}`} className="w-24 h-24 object-cover rounded mr-4" />
              )}
              <div className="flex-grow">
                <p><strong>Genre:</strong> {bird.genre}</p>
                <p><strong>Type:</strong> {bird.type}</p>
                <p><strong>Numéro de bague:</strong> {bird.bagueName}</p>
                <p><strong>Date de naissance:</strong> {bird.birthDate}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleEdit(bird)}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => onDelete(bird.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {editingBird && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Modifier l'oiseau</h4>
          <BirdForm addBird={handleUpdate} editBird={editingBird} onCancel={() => setEditingBird(null)} />
        </div>
      )}
    </div>
  )
}

export default BirdList