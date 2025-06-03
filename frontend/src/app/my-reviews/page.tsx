"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Music, Plus } from "lucide-react"
import { ReviewForm } from "@/components/review-form"
import { ReviewList } from "@/components/review-list"

interface MusicItem {
  _id: string
  name: string
  album: string
  artist: string
  genre: string
  year: number
  averageRating: number
}

export default function MusicDetailPage() {
  const params = useParams()
  const [music, setMusic] = useState<MusicItem | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/music/${params.id}`)
        if (response.ok) {
          const musicData = await response.json()
          setMusic(musicData)
        }
      } catch (error) {
        console.error("Error fetching music:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMusic()
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

  if (!music) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Música no encontrada</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-t-lg flex items-center justify-center">
          <Music className="w-24 h-24 text-green-600" />
        </div>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl mb-2">{music.name}</CardTitle>
              <CardDescription className="text-lg">
                {music.artist} • {music.album} • {music.year}
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
              <h3 className="text-lg font-semibold mb-2">Detalles</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Artista:</span> {music.artist}
                </p>
                <p>
                  <span className="font-medium">Álbum:</span> {music.album}
                </p>
                <p>
                  <span className="font-medium">Año:</span> {music.year}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="text-sm">
                  {music.genre}
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Calificación</h3>
              <div className="flex items-center gap-3">
                <div className="flex">{renderStars(music.averageRating)}</div>
                <span className="text-2xl font-bold">{music.averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">/ 5.0</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showReviewForm && (
        <ReviewForm
          type="Música"
          itemId={music._id}
          onClose={() => setShowReviewForm(false)}
          onSuccess={() => {
            setShowReviewForm(false)
            // Refresh reviews
          }}
        />
      )}

      <ReviewList type="Música" itemId={music._id} />
    </div>
  )
}
