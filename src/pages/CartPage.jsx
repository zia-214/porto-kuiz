import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '@/components/CartItem';
import { GuestPage2 } from '@/components/guard/GuestPage2';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { axiosInstance } from '@/lib/axios';
import { fetchCart } from '@/components/services/cart';

const CartPage = () => {
    const cartSelector = useSelector((state) => state.cart);
    const userSelector = useSelector((state) => state.user);

    const handleCheckout = async () => {
        for (let i = 0; i < cartSelector.items.length; i++) {
            const currentCartItem = cartSelector.items[i];

            if (currentCartItem.quantity > currentCartItem.product.stock) {
                alert('One of your items is unavailable');
                return;
            }
        }

        const totalPrice = 1.1 * cartSelector.items.reduce((a, b) => a + b.quantity * b.product.price, 0);
        const tax = totalPrice / 10;

        try {
            await axiosInstance.post('/transactions', {
                userId: userSelector.id,
                totalPrice,
                tax,
                transactionDate: new Date(),
                items: cartSelector.items
            });

            // Update stock and delete items in cart
            for (const cartItem of cartSelector.items) {
                await axiosInstance.patch(`/products/${cartItem.productId}`, {
                    stock: cartItem.product.stock - cartItem.quantity
                });
                await axiosInstance.delete(`/carts/${cartItem.id}`);
            }

            alert('Checkout success');

            // Refetch cart items to update state
            fetchCart(userSelector.id);
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('An error occurred during checkout. Please try again.');
        }
    };

    return (
        <GuestPage2>
            <div className='max-w-screen-lg min-h-screen mx-auto px-4 mt-8'>
                <h1 className='text-3xl font-bold'>My Cart</h1>
                <div className='mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8'>
                    <div className='lg:col-span-8 gap-6 flex flex-col'>
                        {cartSelector.items.map((cartItem) => (
                            <CartItem
                                key={cartItem.id}
                                name={cartItem.product.name}
                                price={cartItem.product.price}
                                imageUrl={cartItem.product.imageUrl}
                                quantity={cartItem.quantity}
                                stock={cartItem.product.stock}
                                cartId={cartItem.id}
                            />
                        ))}
                    </div>
                    <Card className='lg:col-span-4 bg-gray-50 border-0 h-min'>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex pb-4 justify-between border-b'>
                                <span className='text-sm text-muted-foreground'>Subtotal</span>
                                <span>Rp {cartSelector.items.reduce((a, b) => a + b.quantity * b.product.price, 0).toLocaleString('id-ID')}</span>
                            </div>
                            <div className='flex py-4 justify-between border-b'>
                                <span className='text-sm text-muted-foreground'>Taxes (10%)</span>
                                <span>Rp {(0.1 * cartSelector.items.reduce((a, b) => a + b.quantity * b.product.price, 0)).toLocaleString('id-ID')}</span>
                            </div>
                        </CardContent>
                        <CardFooter className='flex flex-col gap-6'>
                            <div className='w-full justify-between flex'>
                                <span className='font-semibold text-muted-foreground'>Total</span>
                                <span className='font-semibold'>
                                    Rp {(1.1 * cartSelector.items.reduce((a, b) => a + b.quantity * b.product.price, 0)).toLocaleString('id-ID')}
                                </span>
                            </div>
                            <Button onClick={handleCheckout} className='w-full'>Checkout</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </GuestPage2>
    );
};

export default CartPage;
