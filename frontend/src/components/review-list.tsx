"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, User } from "lucide-react"

interface Review {
  _id: string
  user: {
    username: string
  }
  rating: number
  comment: string
  linkedMovie?: any
  linkedMusic?: any
  linkedFood?: any
  createdAt: string
}

interface ReviewListProps {
  type: string
  itemId: string
}

export function ReviewList({ type, itemId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reviews`)
        if (response.ok) {
          const allReviews = await response.json()
          const filteredReviews = allReviews.filter((review: any) => review.type === type && review.item === itemId)
          setReviews(filteredReviews)
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [type, itemId])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-lg">Cargando reseñas...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reseñas ({reviews.length})</h2>

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No hay reseñas aún. ¡Sé el primero en escribir una!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review._id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{review.user.username}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-muted-foreground">{review.rating}/5</span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{review.comment}</p>

                {(review.linkedMovie || review.linkedMusic || review.linkedFood) && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Recomendaciones:</h4>
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
      )}
    </div>
  )
}
