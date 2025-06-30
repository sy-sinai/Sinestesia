"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const starSize = sizeClasses[size]

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={`${starSize} ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} ${
            interactive ? "cursor-pointer hover:text-yellow-400 transition-colors" : ""
          }`}
          onClick={interactive && onRatingChange ? () => onRatingChange(i + 1) : undefined}
        />
      ))}
    </div>
  )
}
