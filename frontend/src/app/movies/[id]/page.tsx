"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Film, Plus } from "lucide-react"
import { ReviewForm } from "@/components/review-form"
import { ReviewList } from "@/components/review-list"

interface Movie {
  _id: string
  tittle: string
  description: string
  genre: string
  releaseYear: number
  director: string
  averageRating: number
}

export default function MovieDetailPage() {
  const params = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/movies/${params.id}`)
        if (response.ok) {
          const movieData = await response.json()
          setMovie(movieData)
        }
      } catch (error) {
        console.error("Error fetching movie:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [params.id])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Película no encontrada</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg flex items-center justify-center">
          <Film className="w-24 h-24 text-blue-600" />
        </div>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl mb-2">{movie.tittle}</CardTitle>
              <CardDescription className="text-lg">
                Dirigida por {movie.director} • {movie.releaseYear}
              </CardDescription>
            </div>
            <Button onClick={() => setShowReviewForm(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Añadir Reseña
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground mb-4">{movie.description}</p>

              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {movie.genre}
                </Badge>
                <span className="text-sm text-muted-foreground">Año: {movie.releaseYear}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Calificación</h3>
              <div className="flex items-center gap-3">
                <div className="flex">{renderStars(movie.averageRating)}</div>
                <span className="text-2xl font-bold">{movie.averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">/ 5.0</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showReviewForm && (
        <ReviewForm
          type="Película"
          itemId={movie._id}
          onClose={() => setShowReviewForm(false)}
          onSuccess={() => {
            setShowReviewForm(false)
            // Refresh reviews
          }}
        />
      )}

      <ReviewList type="Película" itemId={movie._id} />
    </div>
  )
}
