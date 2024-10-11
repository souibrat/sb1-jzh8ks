export interface Bird {
  id: string
  genre: string
  type: string
  bagueName: string
  birthDate: string
  ownerId: string
  photo: string
}

export interface User {
  id: string
  username: string
  password: string
}

export interface Nest {
  id: string
  couplingYear: string
  nestNumber: string
  babyBirdsCount: number
}

export interface Couple {
  id: string
  maleId: string
  femaleId: string
  nests: Nest[]
}