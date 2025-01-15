import React, { useState } from 'react';
import { Button } from './ui/button';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { axiosInstance } from '@/lib/axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from './services/cart';

const ProductCard = ({ imageUrl, name, price, stock, id }) => {
    const [quantity, setQuantity] = useState(0);
    const userSelector = useSelector((state) => state.user);


    const dispatch = useDispatch()

    const addToCart = async () => {
        if (!userSelector.id) {
            return alert('please login dulu');
        }

        try {
            const cartResponse = await axiosInstance.get('carts', {
                params: {
                    userId: userSelector.id,
                    _embed: "product",
                }
            })

            const existingProduct = cartResponse.data.find(cart => {
                return cart.productId === id
            })

            if (!existingProduct) {

                await axiosInstance.post('/carts/', {
                    userId: userSelector.id,
                    productId: id,
                    quantity,
                });
            } else {
                if (existingProduct.quantity + quantity > existingProduct.product.stock) {
                    alert('quantity is over the stock')
                    return
                }
                await axiosInstance.patch('/carts/' + existingProduct.id, {
                    quantity: existingProduct.quantity + quantity
                })
            }

            alert('item added to cart');

            fetchCart(useSelector.id)

        } catch (error) {
            console.error(error);
        }
    };

    const incrementQuantity = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className='p-4 border rounded-md md:max-w-96 flex flex-col gap-4'>
            <Link to={'/product/' + id} className='aspect-square w-full overflow-hidden'>
                <img src={imageUrl} alt={name} />
            </Link>

            <Link to={'/product/' + id}>
                <p className='text-md'>{name}</p>
                <p className='text-xl font-semibold'>Rp {price.toLocaleString("id-ID")}</p>
                <p className='text-muted-foreground text-sm'>in Stock: {stock}</p>
            </Link>

            <div className='flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                    <Button
                        disabled={quantity <= 0}
                        onClick={decrementQuantity}
                        size="icon"
                        variant="ghost">
                        <IoIosRemove className="h-6 w-6" />
                    </Button>

                    <p className='text-lg font-bold'>{quantity}</p>

                    <Button
                        disabled={quantity >= stock}
                        onClick={incrementQuantity}
                        size="icon"
                        variant="ghost">
                        <IoIosAdd className="h-6 w-6" />
                    </Button>
                </div>

                <Button onClick={addToCart} disabled={quantity <= 0} className="w-full">
                    {stock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
