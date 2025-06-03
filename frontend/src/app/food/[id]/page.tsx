"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, UtensilsCrossed, Plus } from "lucide-react"
import { ReviewForm } from "@/components/review-form"
import { ReviewList } from "@/components/review-list"

interface FoodItem {
  _id: string
  name: string
  description: string
  countryOfOrigin: string
  ingredients: string[]
  averageRating: number
}

export default function FoodDetailPage() {
  const params = useParams()
  const [food, setFood] = useState<FoodItem | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/food/${params.id}`)
        if (response.ok) {
          const foodData = await response.json()
          setFood(foodData)
        }
      } catch (error) {
        console.error("Error fetching food:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFood()
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

  if (!food) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Comida no encontrada</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 rounded-t-lg flex items-center justify-center">
          <UtensilsCrossed className="w-24 h-24 text-orange-600" />
        </div>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl mb-2">{food.name}</CardTitle>
              <CardDescription className="text-lg">Origen: {food.countryOfOrigin}</CardDescription>
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
              <p className="text-muted-foreground mb-4">{food.description}</p>

              <h3 className="text-lg font-semibold mb-2">Ingredientes</h3>
              <div className="flex flex-wrap gap-2">
                {food.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline">
                    {ingredient}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="text-sm">
                  {food.countryOfOrigin}
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Calificación</h3>
              <div className="flex items-center gap-3">
                <div className="flex">{renderStars(food.averageRating)}</div>
                <span className="text-2xl font-bold">{food.averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">/ 5.0</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showReviewForm && (
        <ReviewForm
          type="Comida"
          itemId={food._id}
          onClose={() => setShowReviewForm(false)}
          onSuccess={() => {
            setShowReviewForm(false)
            // Refresh reviews
          }}
        />
      )}

      <ReviewList type="Comida" itemId={food._id} />
    </div>
  )
}
