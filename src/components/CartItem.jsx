import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { IoCheckmark, IoClose } from 'react-icons/io5';
import { axiosInstance } from '@/lib/axios';
import { useSelector } from 'react-redux';
import { fetchCart } from './services/cart';
import { useDebouncedCallback } from 'use-debounce';

const CartItem = ({ imageUrl, name, price, quantity, stock, cartId }) => {
    const [quantiti, setQuantity] = useState(quantity);
    const userSelector = useSelector((state) => state.user);
    const debounceUpdateCart = useDebouncedCallback(() => {
        updateQuantity()
    }, 500)

    const removeItem = async () => {
        try {
            await axiosInstance.delete(`/carts/${cartId}`);
            fetchCart(userSelector.id);
            alert('Item dihapus');
        } catch (error) {
            console.log(error);
        }
    };

    const updateQuantity = async () => {
        try {
            await axiosInstance.patch('/carts/' + cartId, {
                quantity: quantiti
            })
            fetchCart(userSelector.id)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        debounceUpdateCart()
    }, [quantiti])

    return (
        <div className='flex gap-4'>
            <div className='aspect-square w-full overflow-hidden rounded-md max-w-52'>
                <img src={imageUrl} alt={name} />
            </div>

            <div className='flex flex-col justify-between w-full'>
                <div className='flex flex-col'>
                    <p>{name}</p>
                    <p className='font-bold'>Rp {price.toLocaleString("id-ID")}</p>
                </div>

                <div className='flex items-center gap-3'>
                    <Button variant='ghost' size='icon' onClick={() => setQuantity(quantiti - 1)} disabled={quantiti <= 1}>
                        <IoIosRemove style={{ width: '25px', height: '25px' }} />
                    </Button>
                    <p className='text-lg font-bold'>{quantiti}</p>
                    <Button variant='ghost' size='icon' onClick={() => setQuantity(quantiti + 1)} disabled={quantiti >= stock}>
                        <IoIosAdd style={{ width: '25px', height: '25px' }} />
                    </Button>
                </div>

                <div className='flex justify-between w-full'>
                    <div className='flex gap-2 items-center'>
                        {stock < quantity ? (
                            <>
                                <IoClose className='text-red-500' style={{ width: '25px', height: '25px' }} />
                                <span className='text-sm text-muted-foreground'>Not Available</span>
                            </>
                        ) : (
                            <>
                                <IoCheckmark className='text-green-500' style={{ width: '25px', height: '25px' }} />
                                <span className='text-sm text-muted-foreground'>Available</span>
                            </>
                        )}
                    </div>

                    <Button onClick={removeItem} className='text-destructive' variant='link'>
                        Remove Item
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
