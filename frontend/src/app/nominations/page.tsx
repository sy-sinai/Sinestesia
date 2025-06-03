"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Star, Film, Music, UtensilsCrossed, Trophy, Calendar } from "lucide-react"

interface TopItem {
  itemDetails: any
  averageRating: number
  reviewCount: number
}

export default function NominationsPage() {
  const [topMovies, setTopMovies] = useState<TopItem[]>([])
  const [topMusic, setTopMusic] = useState<TopItem[]>([])
  const [topFood, setTopFood] = useState<TopItem[]>([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchTopItems()
  }, [])

  const fetchTopItems = async () => {
    setLoading(true)
    setError("")
    try {
      const params = new URLSearchParams()
      if (startDate) params.append("startDate", startDate)
      if (endDate) params.append("endDate", endDate)
      params.append("limit", "5")

      // Verificar conexión al backend
      const healthCheck = await fetch("http://localhost:3000/api/reviews/top/Película", {
        method: "GET",
      }).catch(() => null)

      if (!healthCheck) {
        throw new Error("No se puede conectar al servidor backend")
      }

      const [moviesRes, musicRes, foodRes] = await Promise.all([
        fetch(`http://localhost:3000/api/reviews/top/Película?${params}`),
        fetch(`http://localhost:3000/api/reviews/top/Música?${params}`),
        fetch(`http://localhost:3000/api/reviews/top/Comida?${params}`),
      ])

      // Manejar respuestas, incluso si algunas fallan
      const [moviesData, musicData, foodData] = await Promise.all([
        moviesRes.ok ? moviesRes.json().catch(() => []) : [],
        musicRes.ok ? musicRes.json().catch(() => []) : [],
        foodRes.ok ? foodRes.json().catch(() => []) : [],
      ])

      // Asegurar que los datos sean arrays
      setTopMovies(Array.isArray(moviesData) ? moviesData : [])
      setTopMusic(Array.isArray(musicData) ? musicData : [])
      setTopFood(Array.isArray(foodData) ? foodData : [])
    } catch (error) {
      console.error("Error fetching top items:", error)
      let errorMessage = "Error al cargar las nominaciones."

      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch") || error.message.includes("No se puede conectar")) {
          errorMessage =
            "No se puede conectar al servidor. Verifica que el backend esté ejecutándose en http://localhost:3000"
        } else {
          errorMessage = error.message
        }
      }

      setError(errorMessage)
      setTopMovies([])
      setTopMusic([])
      setTopFood([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchTopItems()
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const renderTopSection = (title: string, items: TopItem[], icon: any, color: string) => {
    const Icon = icon
    return (
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Icon className={`w-8 h-8 ${color}`} />
          <h2 className="text-3xl font-bold">{title}</h2>
          <Trophy className="w-6 h-6 text-yellow-500" />
        </div>

        {!Array.isArray(items) || items.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No hay datos suficientes para mostrar nominaciones</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => {
              // Verificar que el item tenga la estructura correcta
              if (!item.itemDetails || !item.itemDetails._id) {
                return null
              }

              return (
                <Card key={item.itemDetails._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200">
                        <span className="text-xl font-bold text-yellow-700">#{index + 1}</span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold">
                            {item.itemDetails.tittle || item.itemDetails.name || "Sin título"}
                          </h3>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="flex">{renderStars(item.averageRating || 0)}</div>
                              <span className="font-bold text-lg">{(item.averageRating || 0).toFixed(1)}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {item.reviewCount || 0} reseña{item.reviewCount !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-3">
                          {item.itemDetails.description || "Sin descripción"}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {item.itemDetails.genre && <Badge variant="secondary">{item.itemDetails.genre}</Badge>}
                          {item.itemDetails.director && (
                            <Badge variant="outline">Dir: {item.itemDetails.director}</Badge>
                          )}
                          {item.itemDetails.artist && <Badge variant="outline">{item.itemDetails.artist}</Badge>}
                          {item.itemDetails.countryOfOrigin && (
                            <Badge variant="outline">{item.itemDetails.countryOfOrigin}</Badge>
                          )}
                          {item.itemDetails.releaseYear && (
                            <Badge variant="outline">{item.itemDetails.releaseYear}</Badge>
                          )}
                          {item.itemDetails.year && <Badge variant="outline">{item.itemDetails.year}</Badge>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Trophy className="w-10 h-10 text-yellow-500" />
          Nominaciones
        </h1>
        <p className="text-lg text-muted-foreground">Los mejores elementos según las reseñas de la comunidad</p>
      </div>

      {/* Filtros por fecha */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Filtrar por fechas
          </CardTitle>
          <CardDescription>Filtra las nominaciones por un rango de fechas específico</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFilterSubmit} className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de inicio</Label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Fecha de fin</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Filtrando..." : "Aplicar Filtros"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setStartDate("")
                setEndDate("")
                fetchTopItems()
              }}
            >
              Limpiar
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="mb-8">
          <CardContent className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchTopItems}>Reintentar</Button>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-lg">Cargando nominaciones...</div>
        </div>
      ) : (
        <>
          {renderTopSection("Top Películas", topMovies, Film, "text-blue-600")}
          {renderTopSection("Top Música", topMusic, Music, "text-green-600")}
          {renderTopSection("Top Comida", topFood, UtensilsCrossed, "text-orange-600")}
        </>
      )}
    </div>
  )
}
