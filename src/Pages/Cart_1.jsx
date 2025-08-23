
import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart } from '../app/cartSlice';



const Cart_1 = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };
    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };
    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <div className='mt-22 max-w-[1200px] mx-auto'>
                <Link to="/" className='flex gap-1.5 items-center'><FaArrowLeft size={18} /> <span className='font-bold text-2xl'>Shopping Cart</span></Link>

                <div className='flex between items-center justify-between p-4'>
                    <h2 className='text-2xl font-semibold'>
                        Cart item({totalItems})
                    </h2>
                    <button onClick={handleClearCart} className='py-1 px-4 flex items-center cursor-pointer border-2 border-black rounded-md'><RiDeleteBinLine size={18} />Clear Cart</button>
                </div>

                <div className='flex flex-col gap-4 p-4 border-[1.8px] border-black rounded-md'>
                    {cartItems.length === 0 ? (
                        <div className='text-center text-gray-500'>Your cart is empty.</div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className='flex items-center justify-between pb-2 border-b last:border-b-0'>
                                <div className='flex items-center gap-4'>
                                    <img src={item.thumbnail || item.image || "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp"} alt={item.title} className='w-20 h-20 object-cover' />
                                    <div>
                                        <h3 className='text-lg font-semibold'>{item.title}</h3>
                                        <p className='text-gray-600'>Price: ${item.price}</p>
                                        <p>{item.category}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-5'>
                                    <button className='text-3xl font-bold' onClick={() => handleDecrement(item.id)} disabled={item.quantity <= 1}>-</button>
                                    <span className='text-3xl font-bold'>{item.quantity}</span>
                                    <button className='text-3xl font-bold' onClick={() => handleIncrement(item.id)}>+</button>
                                </div>
                                <button className='text-red-500 cursor-pointer' onClick={() => handleRemove(item.id)}><RiDeleteBinLine size={24} /></button>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className='flex justify-end mt-4'>
                        <div className='text-xl font-semibold'>Total: ${totalPrice.toFixed(2)}</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart_1;