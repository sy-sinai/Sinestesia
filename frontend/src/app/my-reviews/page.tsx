"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Star, Edit, Trash2, FileText } from "lucide-react"
import { ReviewForm } from "@/components/review-form"
import { useAuth } from "@/components/auth-provider"

interface Review {
  _id: string
  type: string
  item: string
  rating: number
  comment: string
  linkedMovie?: any
  linkedMusic?: any
  linkedFood?: any
  createdAt: string
}

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [error, setError] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchMyReviews()
    }
  }, [user])

  const fetchMyReviews = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const response = await fetch("http://localhost:5000/api/reviews/myreviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setReviews(data)
      } else {
        setError("Error al cargar las reseñas")
      }
    } catch (error) {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta reseña?")) return

    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setReviews(reviews.filter((review) => review._id !== reviewId))
      } else {
        setError("Error al eliminar la reseña")
      }
    } catch (error) {
      setError("Error de conexión")
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Película":
        return "bg-blue-100 text-blue-800"
      case "Música":
        return "bg-green-100 text-green-800"
      case "Comida":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertDescription>Debes iniciar sesión para ver tus reseñas.</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando tus reseñas...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <FileText className="w-10 h-10 text-blue-600" />
          Mis Reseñas
        </h1>
        <p className="text-lg text-muted-foreground">Gestiona todas tus reseñas en un solo lugar</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No tienes reseñas aún</h3>
            <p className="text-muted-foreground mb-4">
              Comienza explorando películas, música y comida para escribir tu primera reseña
            </p>
            <Button asChild>
              <a href="/">Explorar contenido</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {reviews.length} reseña{reviews.length !== 1 ? "s" : ""}
            </h2>
          </div>

          <div className="grid gap-6">
            {reviews.map((review) => (
              <Card key={review._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge className={getTypeColor(review.type)}>{review.type}</Badge>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="font-semibold">{review.rating}/5</span>
                        </div>
                      </div>
                      <CardDescription>Creada el {new Date(review.createdAt).toLocaleDateString()}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingReview(review)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteReview(review._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{review.comment}</p>

                  {(review.linkedMovie || review.linkedMusic || review.linkedFood) && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Recomendaciones incluidas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {review.linkedMovie && <Badge variant="outline">🎬 {review.linkedMovie.tittle}</Badge>}
                        {review.linkedMusic && <Badge variant="outline">🎵 {review.linkedMusic.name}</Badge>}
                        {review.linkedFood && <Badge variant="outline">🍽️ {review.linkedFood.name}</Badge>}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {editingReview && (
        <ReviewForm
          type={editingReview.type as any}
          itemId={editingReview.item}
          existingReview={editingReview}
          onClose={() => setEditingReview(null)}
          onSuccess={() => {
            setEditingReview(null)
            fetchMyReviews()
          }}
        />
      )}
    </div>
  )
}
