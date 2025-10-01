"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container flex h-16 items-center justify-between  md:px-16 px-8">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold pe-16">SHOP.CO</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Shop
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            On Sale
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            New Arrivals
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Brands
          </a>
          <button href="#" className="text-sm font-medium hover:text-primary transition-colors">
            products
          </button>
           <Link href={"/category"}>
          <button href="#" className="text-sm font-medium hover:text-primary transition-colors">
            category
          </button>
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search for products..." className="pl-10 bg-muted/50" />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
         
          <Link href={"/cart"}>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          </Link>
         <Link href={'/user/userDetail'}>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
         </Link>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search for products..." className="pl-10 bg-muted/50" />
            </div>
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Shop
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                On Sale
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                New Arrivals
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Brands
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
