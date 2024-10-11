import React, { useState, useEffect } from 'react'
import { Bird } from '../types'

interface BirdFormProps {
  addBird: (bird: Bird) => void
  editBird?: Bird | null
  onCancel?: () => void
}

const BirdForm: React.FC<BirdFormProps> = ({ addBird, editBird, onCancel }) => {
  const [genre, setGenre] = useState('')
  const [type, setType] = useState('')
  const [bagueName, setBagueName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [photo, setPhoto] = useState<string | null>(null)

  useEffect(() => {
    if (editBird) {
      setGenre(editBird.genre)
      setType(editBird.type)
      setBagueName(editBird.bagueName)
      setBirthDate(editBird.birthDate)
      setPhoto(editBird.photo)
    } else {
      resetForm()
    }
  }, [editBird])

  const resetForm = () => {
    setGenre('')
    setType('')
    setBagueName('')
    setBirthDate('')
    setPhoto(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const birdData: Bird = {
      id: editBird?.id || Date.now().toString(),
      genre,
      type,
      bagueName,
      birthDate,
      ownerId: editBird?.ownerId || '',
      photo: photo || ''
    }
    addBird(birdData)
    if (!editBird) {
      resetForm()
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
      <h3 className="text-lg font-semibold mb-4">{editBird ? 'Modifier' : 'Ajouter'} un oiseau</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="genre" className="block mb-1">Genre</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Sélectionnez un genre</option>
            <option value="mâle">Mâle</option>
            <option value="femelle">Femelle</option>
          </select>
        </div>
        <div>
          <label htmlFor="type" className="block mb-1">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Sélectionnez un type</option>
            <option value="canari">Canari</option>
            <option value="chardonneret">Chardonneret</option>
          </select>
        </div>
        <div>
          <label htmlFor="bagueName" className="block mb-1">Numéro de bague</label>
          <input
            type="text"
            id="bagueName"
            value={bagueName}
            onChange={(e) => setBagueName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="birthDate" className="block mb-1">Date de naissance</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="photo" className="block mb-1">Photo</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full px-3 py-2 border rounded"
          />
          {photo && (
            <img src={photo} alt="Aperçu" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editBird ? 'Modifier' : 'Ajouter'} l'oiseau
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

export default BirdForm