"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    loadCart();
  }, []);

  // Load cart from localStorage
  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  };

  // Save cart to localStorage
  const saveCart = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    console.log(id);
    
    const updatedCart = cart.filter(item => item._id !== id);
    saveCart(updatedCart);
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedCart);
  };

  // Calculate totals
  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getProductImage = (imageType) => {
    const styles = {
      gradient: 'bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100',
      checkered: 'bg-gradient-to-br from-red-400 to-blue-600',
      jeans: 'bg-gradient-to-br from-blue-600 to-blue-800',
      polo: 'bg-gradient-to-br from-green-400 to-green-600',
      striped: 'bg-gradient-to-r from-gray-800 via-white to-gray-800',
      hoodie: 'bg-gradient-to-br from-gray-400 to-gray-600'
    };
    return styles[imageType] || 'bg-gray-200';
  };

  const subtotal = getSubtotal();
  const discount = subtotal * 0.2; // 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => router.push('/products')}
              className="text-2xl font-bold hover:text-gray-600 transition flex items-center"
            >
              <span className="mr-2">←</span> SHOP.CO
            </button>
            <div className="text-sm text-gray-600">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">YOUR CART</h1>

        {cart.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <button 
              onClick={() => router.push('/products')}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className={`w-24 h-24 rounded-lg flex-shrink-0 ${getProductImage(item.image)}`}></div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-600">Size: {item.size}</p>
                          <p className="text-sm text-gray-600">Color: {item.color}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-bold">${item.price}</span>

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
              ))}

              <Link href={"/home"}>
              <button 
                onClick={() => router.push('/products')}
                className="w-full border-2 border-black text-black py-3 rounded-full hover:bg-black hover:text-white transition font-medium"
              >
                ← Continue Shopping
              </button>
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount (-20%)</span>
                    <span className="font-semibold text-red-500">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">${deliveryFee}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-black text-white py-4 rounded-full hover:bg-gray-800 transition font-medium mb-3">
                  Proceed to Checkout →
                </button>

                <button 
                  onClick={() => {
                    if (confirm('Are you sure you want to clear your cart?')) {
                      saveCart([]);
                    }
                  }}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-50 transition font-medium"
                >
                  Clear Cart
                </button>

                <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
