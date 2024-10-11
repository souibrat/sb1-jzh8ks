import React, { useState, useEffect } from 'react'
import { Bird, Couple, Nest } from '../types'

interface CoupleFormProps {
  birds: Bird[]
  addCouple: (couple: Couple) => void
  editCouple?: Couple | null
  onCancel?: () => void
}

const CoupleForm: React.FC<CoupleFormProps> = ({ birds, addCouple, editCouple, onCancel }) => {
  const [maleId, setMaleId] = useState('')
  const [femaleId, setFemaleId] = useState('')

  useEffect(() => {
    if (editCouple) {
      setMaleId(editCouple.maleId)
      setFemaleId(editCouple.femaleId)
    }
  }, [editCouple])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (maleId && femaleId) {
      const coupleData: Couple = {
        id: editCouple?.id || Date.now().toString(),
        maleId,
        femaleId,
        nests: editCouple?.nests || []
      }
      addCouple(coupleData)
      resetForm()
    }
  }

  const resetForm = () => {
    setMaleId('')
    setFemaleId('')
    if (onCancel) onCancel()
  }

  const males = birds.filter(bird => bird.genre === 'mâle')
  const females = birds.filter(bird => bird.genre === 'femelle')

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
      <h3 className="text-lg font-semibold mb-4">{editCouple ? 'Modifier' : 'Créer'} un couple</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="male" className="block mb-1">Mâle</label>
          <select
            id="male"
            value={maleId}
            onChange={(e) => setMaleId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Sélectionnez un mâle</option>
            {males.map(male => (
              <option key={male.id} value={male.id}>{male.type} - {male.bagueName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="female" className="block mb-1">Femelle</label>
          <select
            id="female"
            value={femaleId}
            onChange={(e) => setFemaleId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Sélectionnez une femelle</option>
            {females.map(female => (
              <option key={female.id} value={female.id}>{female.type} - {female.bagueName}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editCouple ? 'Modifier' : 'Créer'} le couple
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
              Annuler
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default CoupleForm