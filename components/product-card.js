import { Star } from "lucide-react"

export default function ProductCard({ product }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="group cursor-pointer">
      <div className="aspect-square overflow-hidden rounded-lg bg-muted mb-4">
        {/* <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        /> */}
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-sm md:text-base line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center">{renderStars(product.rating)}</div>
          <span className="text-sm text-muted-foreground">{product.rating}/5</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${product.price}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">${product.originalPrice}</span>
          )}
          {product.discount && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">-{product.discount}%</span>
          )}
        </div>
      </div>
    </div>
  )
}
