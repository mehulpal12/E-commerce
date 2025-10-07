"use client"
import { Button } from "@/components/ui/button"
import ProductCard from "./product-card"
import { useState, useEffect } from "react"
import Link from "next/link"




// const topSelling = [
//   {
//     id: 5,
//     name: "Vertical Striped Shirt",
//     price: 212,
//     originalPrice: 232,
//     discount: 20,
//     rating: 5.0,
//     image: "/vertical-striped-shirt.jpg",
//   },
//   {
//     id: 6,
//     name: "Courage Graphic T-shirt",
//     price: 145,
//     rating: 4.0,
//     image: "/orange-graphic-tee.png",
//   },
//   {
//     id: 7,
//     name: "Loose Fit Bermuda Shorts",
//     price: 80,
//     rating: 3.0,
//     image: "/bermuda-shorts.jpg",
//   },
//   {
//     id: 8,
//     name: "Faded Skinny Jeans",
//     price: 210,
//     rating: 4.5,
//     image: "/faded-skinny-jeans.jpg",
//   },
// ]

export default function ProductSections() {
const [newArrivals, setNewArrivals] = useState([])


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:7000/api/products/"); // your backend route
        const data = await res.json();
        setNewArrivals(data.products); 
        // assuming backend returns { products: [...] }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    // console.log(newArrivals);
    

    fetchProducts();
  }, []);
  return (
    <div className="space-y-4">
      {/* New Arrivals */}
      <section className="container px-4 ">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">NEW ARRIVALS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {newArrivals.map((product) => (
           <Link key={product._id} href={`/products/${product._id}`  }>
            <ProductCard  product={product} />
           </Link>
          ))}
        </div>
        <div className="text-center">
          <Button variant="outline" size="lg">
            View All
          </Button>
        </div>
      </section>

      {/* Divider */}
      <div className="container px-4">
        <hr className="border-muted" />
      </div>

      {/* Top Selling */}
      <section className="container px-4 ">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">TOP SELLING</h2>
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {topSelling.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            View All
          </Button>
        </div>
      </section>
    </div>
  )
}
