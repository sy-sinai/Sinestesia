"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Star, X } from "lucide-react"

interface ReviewFormProps {
  type: "Película" | "Música" | "Comida"
  itemId: string
  onClose: () => void
  onSuccess: () => void
  existingReview?: any
}

export function ReviewForm({ type, itemId, onClose, onSuccess, existingReview }: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0)
  const [comment, setComment] = useState(existingReview?.comment || "")
  const [linkedMovie, setLinkedMovie] = useState(existingReview?.linkedMovie || "")
  const [linkedMusic, setLinkedMusic] = useState(existingReview?.linkedMusic || "")
  const [linkedFood, setLinkedFood] = useState(existingReview?.linkedFood || "")
  const [movies, setMovies] = useState([])
  const [music, setMusic] = useState([])
  const [food, setFood] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (type !== "Película") {
          const moviesRes = await fetch("http://localhost:3000/api/movies")
          const moviesData = await moviesRes.json()
          setMovies(moviesData)
        }
        if (type !== "Música") {
          const musicRes = await fetch("http://localhost:3000/api/music")
          const musicData = await musicRes.json()
          setMusic(musicData)
        }
        if (type !== "Comida") {
          const foodRes = await fetch("http://localhost:3000/api/food")
          const foodData = await foodRes.json()
          setFood(foodData)
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      }
    }

    fetchRecommendations()
  }, [type])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const token = localStorage.getItem("token")
    if (!token) {
      setError("Debes iniciar sesión para crear una reseña")
      setLoading(false)
      return
    }

    try {
      const reviewData = {
        rating,
        comment,
        linkedMovie: linkedMovie || undefined,
        linkedMusic: linkedMusic || undefined,
        linkedFood: linkedFood || undefined,
      }

      const url = existingReview
        ? `http://localhost:3000/api/reviews/${existingReview._id}`
        : `http://localhost:3000/api/reviews/${type}/${itemId}`

      const method = existingReview ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      })

      if (response.ok) {
        onSuccess()
      } else {
        const data = await response.json()
        setError(data.error || "Error al guardar la reseña")
      }
    } catch (error) {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 cursor-pointer transition-colors ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"
        }`}
        onClick={() => setRating(i + 1)}
      />
    ))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{existingReview ? "Editar Reseña" : "Nueva Reseña"}</CardTitle>
              <CardDescription>
                {existingReview ? "Modifica tu reseña" : `Añade una reseña para esta ${type.toLowerCase()}`}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>Calificación</Label>
              <div className="flex items-center gap-1">
                {renderStars()}
                <span className="ml-2 text-sm text-muted-foreground">{rating}/5</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Comentario</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe tu reseña..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">Recomendaciones (Opcional)</Label>

              {type !== "Película" && (
                <div className="space-y-2">
                  <Label htmlFor="linkedMovie">Película recomendada</Label>
                  <Select value={linkedMovie} onValueChange={setLinkedMovie}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una película" />
                    </SelectTrigger>
                    <SelectContent>
                      {movies.map((movie: any) => (
                        <SelectItem key={movie._id} value={movie._id}>
                          {movie.tittle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {type !== "Música" && (
                <div className="space-y-2">
                  <Label htmlFor="linkedMusic">Música recomendada</Label>
                  <Select value={linkedMusic} onValueChange={setLinkedMusic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una canción" />
                    </SelectTrigger>
                    <SelectContent>
                      {music.map((song: any) => (
                        <SelectItem key={song._id} value={song._id}>
                          {song.name} - {song.artist}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {type !== "Comida" && (
                <div className="space-y-2">
                  <Label htmlFor="linkedFood">Comida recomendada</Label>
                  <Select value={linkedFood} onValueChange={setLinkedFood}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una comida" />
                    </SelectTrigger>
                    <SelectContent>
                      {food.map((dish: any) => (
                        <SelectItem key={dish._id} value={dish._id}>
                          {dish.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading || rating === 0}>
                {loading ? "Guardando..." : existingReview ? "Actualizar" : "Crear Reseña"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
