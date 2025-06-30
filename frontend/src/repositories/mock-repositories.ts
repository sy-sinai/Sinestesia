// Repository Pattern: Implementaciones concretas para datos mock
import type {
  IMovieRepository,
  IMusicRepository,
  IFoodRepository,
  IReviewRepository,
  IAuthRepository,
  Movie,
  Music,
  Food,
  Review,
  User,
} from "@/interfaces/data-interfaces"
import { mockMovies, mockMusic, mockFood, mockReviews, mockUser } from "@/lib/mock-data"

export class MockMovieRepository implements IMovieRepository {
  async getAll(): Promise<Movie[]> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockMovies
  }

  async getById(id: string): Promise<Movie | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockMovies.find((movie) => movie._id === id) || null
  }
}

export class MockMusicRepository implements IMusicRepository {
  async getAll(): Promise<Music[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockMusic
  }

  async getById(id: string): Promise<Music | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockMusic.find((music) => music._id === id) || null
  }
}

export class MockFoodRepository implements IFoodRepository {
  async getAll(): Promise<Food[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockFood
  }

  async getById(id: string): Promise<Food | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockFood.find((food) => food._id === id) || null
  }
}

export class MockReviewRepository implements IReviewRepository {
  private reviews: Review[] = [...mockReviews]

  async getAll(): Promise<Review[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return this.reviews
  }

  async getByTypeAndItem(type: string, itemId: string): Promise<Review[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.reviews.filter((review) => review.type === type && review.item === itemId)
  }

  async getByUser(userId: string): Promise<Review[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.reviews.slice(0, 2) // Simular reseñas del usuario
  }

  async create(reviewData: Partial<Review>): Promise<Review> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newReview: Review = {
      _id: Date.now().toString(),
      user: { username: "current_user" },
      type: reviewData.type || "",
      item: reviewData.item || "",
      rating: reviewData.rating || 0,
      comment: reviewData.comment || "",
      createdAt: new Date().toISOString(),
      ...reviewData,
    }
    this.reviews.push(newReview)
    return newReview
  }

  async update(id: string, reviewData: Partial<Review>): Promise<Review> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const index = this.reviews.findIndex((review) => review._id === id)
    if (index !== -1) {
      this.reviews[index] = { ...this.reviews[index], ...reviewData }
      return this.reviews[index]
    }
    throw new Error("Review not found")
  }

  async delete(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    this.reviews = this.reviews.filter((review) => review._id !== id)
  }
}

export class MockAuthRepository implements IAuthRepository {
  async login(email: string, password: string): Promise<{ user: User; token: string } | null> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Credenciales de admin
    if (email === "admin@reviewplatform.com" && password === "admin123") {
      return {
        user: { ...mockUser, role: "admin", username: "admin", email: "admin@reviewplatform.com" },
        token: "admin-token-123",
      }
    }

    // Credenciales normales
    if (email === "demo@example.com" && password === "demo123") {
      return {
        user: mockUser,
        token: "user-token-456",
      }
    }

    return null
  }

  async register(userData: Partial<User>): Promise<{ user: User; token: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      user: mockUser,
      token: "new-user-token-789",
    }
  }

  async getCurrentUser(token: string): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (token === "admin-token-123") {
      return { ...mockUser, role: "admin", username: "admin", email: "admin@reviewplatform.com" }
    }
    return mockUser
  }
}
