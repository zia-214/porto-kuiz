import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { axiosInstance } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { IoHeartOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const params = useParams();
    const [quantity, setQuantity] = useState(0);

    const [product, setProduct] = useState({
        name: 'zia',
        price: 0,
        imageUrl: '',
        stock: 0,
        id: 0,
    });

    const [productLoading, setProductLoading] = useState(false)

    const incrementQuantity = () => {
        if (quantity < 10) setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 0) setQuantity(quantity - 1);
    };

    const fetchProduct = async () => {
        setProductLoading(true)
        try {
            const response = await axiosInstance.get(`/products/${params.productId}`);

            setProduct(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setProductLoading(false)
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <main className='min-h-screen max-w-screen-xl mx-auto px-4 mt-8'>
            <div className='grid grid-cols-2 gap-8'>
                <img src={product.imageUrl} alt={product.name} className='w-full' />
                <div className='flex flex-col gap-1 justify-center'>

                    {
                        productLoading ? <Skeleton className='w-[200px] h-[32px]' /> :
                            <div className='text-xl'>{product.name}</div>

                    }
                    <div className='text-3xl font-bold'>{product.price.toLocaleString('id-ID')}</div>
                    <div className='text-sm text-muted-foreground mt-4'>
                        Do eiusmod fugiat nisi adipisicing reprehenderit adipisicing ut amet consectetur eiusmod laboris nulla. Consequat in incididunt velit laboris cupidatat nulla incididunt reprehenderit excepteur laboris. Et tempor sit mollit aute. Dolor proident exercitation nulla reprehenderit id magna sunt ea sint magna sit.
                    </div>
                    <div className='flex items-center gap-8 mt-6'>
                        <Button
                            disabled={quantity <= 0}
                            onClick={decrementQuantity}
                            size="icon"
                            variant="ghost">
                            <IoIosRemove className="h-6 w-6" />
                        </Button>
                        <p className='text-lg font-bold'>{quantity}</p>
                        <Button
                            disabled={quantity >= 10}
                            onClick={incrementQuantity}
                            size="icon" variant="ghost">
                            <IoIosAdd className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className='flex items-center mt-8 gap-4'>
                        <Button className='w-full' size="lg">
                            Add to cart
                        </Button>
                        <Button size="icon" variant='ghost'>
                            <IoHeartOutline className='h-6 w-6' />
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
