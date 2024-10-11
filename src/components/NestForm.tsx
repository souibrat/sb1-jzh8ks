import React, { useState, useEffect } from 'react'
import { Nest } from '../types'

interface NestFormProps {
  addNest: (nest: Nest) => void
  editNest?: Nest | null
  onCancel: () => void
}

const NestForm: React.FC<NestFormProps> = ({ addNest, editNest, onCancel }) => {
  const [couplingYear, setCouplingYear] = useState('')
  const [nestNumber, setNestNumber] = useState('')
  const [babyBirdsCount, setBabyBirdsCount] = useState(0)

  useEffect(() => {
    if (editNest) {
      setCouplingYear(editNest.couplingYear)
      setNestNumber(editNest.nestNumber)
      setBabyBirdsCount(editNest.babyBirdsCount)
    }
  }, [editNest])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nestData: Nest = {
      id: editNest?.id || Date.now().toString(),
      couplingYear,
      nestNumber,
      babyBirdsCount
    }
    addNest(nestData)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-4">
      <h4 className="text-lg font-semibold mb-4">{editNest ? 'Modifier' : 'Ajouter'} un nid</h4>
      <div className="space-y-4">
        <div>
          <label htmlFor="couplingYear" className="block mb-1">Année de couplage</label>
          <input
            type="number"
            id="couplingYear"
            value={couplingYear}
            onChange={(e) => setCouplingYear(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="nestNumber" className="block mb-1">Numéro du nid</label>
          <input
            type="text"
            id="nestNumber"
            value={nestNumber}
            onChange={(e) => setNestNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="babyBirdsCount" className="block mb-1">Nombre de bébés</label>
          <input
            type="number"
            id="babyBirdsCount"
            value={babyBirdsCount}
            onChange={(e) => setBabyBirdsCount(parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editNest ? 'Modifier' : 'Ajouter'} le nid
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
            Annuler
          </button>
        </div>
      </div>
    </form>
  )
}

export default NestForm