"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Film, MusicIcon, UtensilsCrossed } from "lucide-react"
import Link from "next/link"

interface Movie {
  _id: string
  tittle: string
  description: string
  genre: string
  releaseYear: number
  director: string
  averageRating: number
}

interface Food {
  _id: string
  name: string
  description: string
  countryOfOrigin: string
  ingredients: string[]
  averageRating: number
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [music, setMusic] = useState<any[]>([])
  const [food, setFood] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, musicRes, foodRes] = await Promise.all([
          fetch("http://localhost:5000/api/movies"),
          fetch("http://localhost:5000/api/music"),
          fetch("http://localhost:5000/api/food"),
        ])

        const [moviesData, musicData, foodData] = await Promise.all([moviesRes.json(), musicRes.json(), foodRes.json()])

        setMovies(moviesData.slice(0, 6))
        setMusic(musicData.slice(0, 6))
        setFood(foodData.slice(0, 6))
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Plataforma de Reseñas</h1>
        <p className="text-lg text-muted-foreground">Descubre y reseña películas, música y comida</p>
      </div>

      {/* Sección de Películas */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Film className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold">Películas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <Card key={movie._id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg flex items-center justify-center">
                <Film className="w-16 h-16 text-blue-600" />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{movie.tittle}</CardTitle>
                <CardDescription className="line-clamp-2">{movie.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{movie.genre}</Badge>
                  <span className="text-sm text-muted-foreground">{movie.releaseYear}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{renderStars(movie.averageRating)}</div>
                  <span className="text-sm text-muted-foreground">{movie.averageRating.toFixed(1)}</span>
                </div>
                <Link href={`/movies/${movie._id}`}>
                  <Button className="w-full">Ver Detalles</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sección de Música */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <MusicIcon className="w-8 h-8 text-green-600" />
          <h2 className="text-3xl font-bold">Música</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {music.map((song) => (
            <Card key={song._id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-t-lg flex items-center justify-center">
                <MusicIcon className="w-16 h-16 text-green-600" />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{song.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {song.artist} • {song.album}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{song.genre}</Badge>
                  <span className="text-sm text-muted-foreground">{song.year}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{renderStars(song.averageRating)}</div>
                  <span className="text-sm text-muted-foreground">{song.averageRating.toFixed(1)}</span>
                </div>
                <Link href={`/music/${song._id}`}>
                  <Button className="w-full">Ver Detalles</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sección de Comida */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <UtensilsCrossed className="w-8 h-8 text-orange-600" />
          <h2 className="text-3xl font-bold">Comida</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {food.map((dish) => (
            <Card key={dish._id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 rounded-t-lg flex items-center justify-center">
                <UtensilsCrossed className="w-16 h-16 text-orange-600" />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{dish.name}</CardTitle>
                <CardDescription className="line-clamp-2">{dish.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{dish.countryOfOrigin}</Badge>
                  <span className="text-sm text-muted-foreground">{dish.ingredients.length} ingredientes</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{renderStars(dish.averageRating)}</div>
                  <span className="text-sm text-muted-foreground">{dish.averageRating.toFixed(1)}</span>
                </div>
                <Link href={`/food/${dish._id}`}>
                  <Button className="w-full">Ver Detalles</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
