// DIP: Definimos abstracciones para no depender de implementaciones concretas
export interface Movie {
  _id: string
  tittle: string
  description: string
  genre: string
  releaseYear: number
  director: string
  averageRating: number
}

export interface Music {
  _id: string
  name: string
  album: string
  artist: string
  genre: string
  year: number
  averageRating: number
}

export interface Food {
  _id: string
  name: string
  description: string
  countryOfOrigin: string
  ingredients: string[]
  averageRating: number
}

export interface Review {
  _id: string
  user: { username: string }
  type: string
  item: string
  rating: number
  comment: string
  linkedMovie?: Movie
  linkedMusic?: Music
  linkedFood?: Food
  createdAt: string
}

export interface User {
  id: string
  username: string
  email: string
  role?: string
}

// DIP: Interfaces para repositorios
export interface IMovieRepository {
  getAll(): Promise<Movie[]>
  getById(id: string): Promise<Movie | null>
}

export interface IMusicRepository {
  getAll(): Promise<Music[]>
  getById(id: string): Promise<Music | null>
}

export interface IFoodRepository {
  getAll(): Promise<Food[]>
  getById(id: string): Promise<Food | null>
}

export interface IReviewRepository {
  getAll(): Promise<Review[]>
  getByTypeAndItem(type: string, itemId: string): Promise<Review[]>
  getByUser(userId: string): Promise<Review[]>
  create(review: Partial<Review>): Promise<Review>
  update(id: string, review: Partial<Review>): Promise<Review>
  delete(id: string): Promise<void>
}

export interface IAuthRepository {
  login(email: string, password: string): Promise<{ user: User; token: string } | null>
  register(userData: Partial<User>): Promise<{ user: User; token: string }>
  getCurrentUser(token: string): Promise<User | null>
}
