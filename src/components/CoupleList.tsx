import React, { useState } from 'react'
import { Bird, Couple, Nest } from '../types'
import BirdForm from './BirdForm'
import CoupleForm from './CoupleForm'
import NestForm from './NestForm'
import { Pencil, PlusCircle } from 'lucide-react'

interface CoupleListProps {
  couples: Couple[]
  birds: Bird[]
  addBabyBird: (coupleId: string, babyBird: Bird) => void
  updateCouple: (updatedCouple: Couple) => void
}

const CoupleList: React.FC<CoupleListProps> = ({ couples, birds, addBabyBird, updateCouple }) => {
  const [selectedCouple, setSelectedCouple] = useState<string | null>(null)
  const [editingCouple, setEditingCouple] = useState<Couple | null>(null)
  const [addingNest, setAddingNest] = useState<string | null>(null)
  const [editingNest, setEditingNest] = useState<{ coupleId: string, nest: Nest } | null>(null)

  const getBirdById = (id: string) => birds.find(bird => bird.id === id)

  const handleAddBabyBird = (babyBird: Bird) => {
    if (selectedCouple) {
      addBabyBird(selectedCouple, babyBird)
      setSelectedCouple(null)
    }
  }

  const handleEditCouple = (couple: Couple) => {
    setEditingCouple(couple)
  }

  const handleUpdateCouple = (updatedCouple: Couple) => {
    updateCouple(updatedCouple)
    setEditingCouple(null)
  }

  const handleAddNest = (coupleId: string) => {
    setAddingNest(coupleId)
  }

  const handleEditNest = (coupleId: string, nest: Nest) => {
    setEditingNest({ coupleId, nest })
  }

  const handleSaveNest = (newNest: Nest) => {
    const coupleId = addingNest || (editingNest?.coupleId as string)
    const updatedCouple = couples.find(c => c.id === coupleId)
    if (updatedCouple) {
      const updatedNests = addingNest
        ? [...updatedCouple.nests, newNest]
        : updatedCouple.nests.map(n => n.id === newNest.id ? newNest : n)
      updateCouple({ ...updatedCouple, nests: updatedNests })
    }
    setAddingNest(null)
    setEditingNest(null)
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Liste des couples</h3>
      {couples.length === 0 ? (
        <p>Aucun couple n'a été créé.</p>
      ) : (
        <ul className="space-y-4">
          {couples.map((couple) => {
            const male = getBirdById(couple.maleId)
            const female = getBirdById(couple.femaleId)
            return (
              <li key={couple.id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold mb-2">Couple {male?.type} x {female?.type}</h4>
                    <p><strong>Mâle:</strong> {male?.bagueName}</p>
                    <p><strong>Femelle:</strong> {female?.bagueName}</p>
                  </div>
                  <button
                    onClick={() => handleEditCouple(couple)}
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                  >
                    <Pencil size={20} />
                  </button>
                </div>
                <h5 className="font-semibold mt-4 mb-2">Nids:</h5>
                <ul className="space-y-2">
                  {couple.nests.map(nest => (
                    <li key={nest.id} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                      <span>
                        Année: {nest.couplingYear}, Numéro: {nest.nestNumber}, Bébés: {nest.babyBirdsCount}
                      </span>
                      <button
                        onClick={() => handleEditNest(couple.id, nest)}
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                      >
                        <Pencil size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleAddNest(couple.id)}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Ajouter un nid
                </button>
              </li>
            )
          })}
        </ul>
      )}
      {selectedCouple && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Ajouter un bébé au couple</h4>
          <BirdForm addBird={handleAddBabyBird} />
        </div>
      )}
      {editingCouple && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Modifier le couple</h4>
          <CoupleForm
            birds={birds}
            addCouple={handleUpdateCouple}
            editCouple={editingCouple}
            onCancel={() => setEditingCouple(null)}
          />
        </div>
      )}
      {(addingNest || editingNest) && (
        <div className="mt-8">
          <NestForm
            addNest={handleSaveNest}
            editNest={editingNest?.nest}
            onCancel={() => {
              setAddingNest(null)
              setEditingNest(null)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default CoupleList