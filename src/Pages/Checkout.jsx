import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../app/cartSlice';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-brand-red">Checkout</h1>
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Your cart is empty.<br />
            <Link to="/" className="text-brand-red underline">Go shopping</Link>
          </div>
        ) : (
          <>
            <div className="mb-6 divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.thumbnail || item.image || 'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp'} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded-md border" 
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="font-semibold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-brand-red">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-black text-white font-bold rounded-lg text-xl shadow-md"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
