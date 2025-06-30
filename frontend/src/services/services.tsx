// DIP: Servicio que depende de abstracciones, no de implementaciones concretas
import type {
  IMovieRepository,
  IMusicRepository,
  IFoodRepository,
  IReviewRepository,
  IAuthRepository,
} from "@/interfaces/data-interfaces"
import {
  MockMovieRepository,
  MockMusicRepository,
  MockFoodRepository,
  MockReviewRepository,
  MockAuthRepository,
} from "@/repositories/mock-repositories"

export class DataService {
  private static instance: DataService

  public movieRepository: IMovieRepository
  public musicRepository: IMusicRepository
  public foodRepository: IFoodRepository
  public reviewRepository: IReviewRepository
  public authRepository: IAuthRepository

  private constructor() {
    // DIP: Inyectamos las implementaciones concretas
    this.movieRepository = new MockMovieRepository()
    this.musicRepository = new MockMusicRepository()
    this.foodRepository = new MockFoodRepository()
    this.reviewRepository = new MockReviewRepository()
    this.authRepository = new MockAuthRepository()
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService()
    }
    return DataService.instance
  }
}
