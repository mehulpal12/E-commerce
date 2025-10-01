"use client"
// pages/cart.js
import { useState } from 'react';
import Head from 'next/head';

export default function CartPage() {
  const [promoCode, setPromoCode] = useState('');
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Gradient Graphic T-shirt',
      size: 'Large',
      color: 'White',
      price: 145,
      quantity: 1,
      image: 'gradient'
    },
    {
      id: 2,
      name: 'Checkered Shirt',
      size: 'Medium',
      color: 'Red',
      price: 180,
      quantity: 1,
      image: 'checkered'
    },
    {
      id: 3,
      name: 'Skinny Fit Jeans',
      size: 'Large',
      color: 'Blue',
      price: 240,
      quantity: 1,
      image: 'jeans'
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getProductImage = (imageType) => {
    const imageStyles = {
      gradient: 'bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100',
      checkered: 'bg-gradient-to-br from-red-400 to-blue-600',
      jeans: 'bg-gradient-to-br from-blue-600 to-blue-800'
    };
    return imageStyles[imageType] || 'bg-gray-200';
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountPercent = 20;
  const discount = subtotal * (discountPercent / 100);
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <>
      <Head>
        <title>Shopping Cart - Shop.co</title>
        <meta name="description" content="Your shopping cart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-black text-white text-center py-2 text-sm relative">
          Sign up and get 20% off to your first order. <span className="underline cursor-pointer ml-1">Sign Up Now</span>
          <button className="absolute right-4 top-2 text-white hover:text-gray-300">✕</button>
        </header>

        {/* Navigation */}
        <nav className="border-b border-gray-200 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold">SHOP.CO</h1>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-gray-600 flex items-center">
                  Shop <span className="ml-1">▼</span>
                </a>
                <a href="#" className="hover:text-gray-600">On Sale</a>
                <a href="#" className="hover:text-gray-600">New Arrivals</a>
                <a href="#" className="hover:text-gray-600">Brands</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="px-4 py-2 pl-10 border border-gray-300 rounded-full w-80 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded">👤</button>
            </div>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-sm text-gray-600">
            <a href="#" className="hover:text-black">Home</a> &gt; 
            <span className="text-black ml-1">Cart</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8">YOUR CART</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 border border-gray-200 rounded-lg">
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                        <div className={`w-full h-full ${getProductImage(item.image)} flex items-center justify-center`}>
                          {item.image === 'gradient' && (
                            <div className="text-2xl font-bold text-purple-600 transform -rotate-12">
                              ART
                            </div>
                          )}
                          {item.image === 'checkered' && (
                            <div className="w-full h-full" style={{
                              backgroundImage: 'repeating-conic-gradient(#ef4444 0% 25%, #3b82f6 25% 50%)',
                              backgroundSize: '20px 20px'
                            }}></div>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
                              </svg>
                            </button>
                          </div>
                          <p className="text-sm text-gray-600">Size: <span className="text-black">{item.size}</span></p>
                          <p className="text-sm text-gray-600">Color: <span className="text-black">{item.color}</span></p>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <p className="font-bold text-xl">${item.price}</p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-gray-100 rounded-full">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-l-full transition"
                            >
                              −
                            </button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-r-full transition"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-black">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount (-{discountPercent}%)</span>
                    <span className="font-semibold text-red-500">-${discount}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-black">${deliveryFee}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Add promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🏷️</span>
                    </div>
                    <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-200">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-black text-white py-4 rounded-full hover:bg-gray-800 transition duration-200 flex items-center justify-center space-x-2">
                  <span>Go to Checkout</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-black text-white py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              STAY UP TO DATE ABOUT<br />OUR LATEST OFFERS
            </h2>
            <div className="max-w-md mx-auto space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 pl-12 rounded-full bg-white text-black focus:outline-none"
                />
                
              </div>
              <button className="w-full bg-white text-black py-3 rounded-full hover:bg-gray-100 transition duration-200">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold mb-4">SHOP.CO</h3>
                <p className="text-gray-600 mb-6">
                  We have clothes that suits your style and which you're proud to wear. 
                  From women to men.
                </p>
                <div className="flex space-x-3">
                  <button className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                    <span className="text-sm">𝕏</span>
                  </button>
                  <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                    <span className="text-sm">f</span>
                  </button>
                  <button className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                    <span className="text-sm">in</span>
                  </button>
                  <button className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                    <span className="text-sm">⊙</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-4 text-sm tracking-wider">COMPANY</h4>
                <ul className="space-y-3 text-gray-600">
                  <li><a href="#" className="hover:text-black transition">About</a></li>
                  <li><a href="#" className="hover:text-black transition">Features</a></li>
                  <li><a href="#" className="hover:text-black transition">Works</a></li>
                  <li><a href="#" className="hover:text-black transition">Career</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-4 text-sm tracking-wider">HELP</h4>
                <ul className="space-y-3 text-gray-600">
                  <li><a href="#" className="hover:text-black transition">Customer Support</a></li>
                  <li><a href="#" className="hover:text-black transition">Delivery Details</a></li>
                  <li><a href="#" className="hover:text-black transition">Terms & Conditions</a></li>
                  <li><a href="#" className="hover:text-black transition">Privacy Policy</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-4 text-sm tracking-wider">FAQ</h4>
                <ul className="space-y-3 text-gray-600">
                  <li><a href="#" className="hover:text-black transition">Account</a></li>
                  <li><a href="#" className="hover:text-black transition">Manage Deliveries</a></li>
                  <li><a href="#" className="hover:text-black transition">Orders</a></li>
                  <li><a href="#" className="hover:text-black transition">Payments</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-4 text-sm tracking-wider">RESOURCES</h4>
                <ul className="space-y-3 text-gray-600">
                  <li><a href="#" className="hover:text-black transition">Free eBooks</a></li>
                  <li><a href="#" className="hover:text-black transition">Development Tutorial</a></li>
                  <li><a href="#" className="hover:text-black transition">How to - Blog</a></li>
                  <li><a href="#" className="hover:text-black transition">Youtube Playlist</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-8">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-sm">Shop.co © 2000-2023, All Rights Reserved</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">VISA</span>
                  </div>
                  <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                    <div className="flex">
                      <div className="w-3 h-3 bg-red-500 rounded-full -mr-1"></div>
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">P</span>
                  </div>
                  <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                    <span className="font-bold text-xs">Pay</span>
                  </div>
                  <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">G</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}