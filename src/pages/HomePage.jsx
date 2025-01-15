import ProductCard from '@/components/ProductCard';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axios';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const [products, setProduct] = useState([]);

    const userSelector = useSelector((state) => state.user)

    const productsList = products.map((product) => {
        return (
            <ProductCard
                id={product.id}
                key={product.id}  // Pastikan setiap produk memiliki ID unik
                imageUrl={product.imageUrl}
                name={product.name}
                stock={product.stock}
                price={product.price}
            />
        );
    });

    const fetchProduck = async () => {
        try {
            const response = await axiosInstance.get("/products");
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProduck(userSelector.id)
    }, [])

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='min-h-[700px] max-w-screen-md mx-auto px-4 mb-8'>
                <div className='pb-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                        Become a Trend Center-setter with us.
                    </h1>
                    <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
                        Afghalkdj asdhgkskdfgkhsdkjgh asdfgjaksdhf fdsah
                    </p>
                </div>

                <div className='grid grid-cols-2 gap-4'>{productsList}</div>

            </div>
        </div>
    );
};

export default HomePage;
