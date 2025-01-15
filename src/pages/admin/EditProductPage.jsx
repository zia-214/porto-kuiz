import { ProductForm } from '@/components/forms/ProductForm';
import AdminLayout from '@/components/layout/AdminLayout';
import { axiosInstance } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProductPage = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        imageUrl: '',
        stock: 0,
        id: 0,
    });

    const params = useParams();

    const fetchProduct = async () => {
        try {
            const response = await axiosInstance.get('/products/' + params.productId);
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleEditProduct = async (values) => {
        try {
            await axiosInstance.patch('/products/' + params.productId, values);
            console.log('Product edited successfully');
            navigate('/admin/products');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminLayout title="Edit Product" description="Editing Product">
            {product.id ? (
                <ProductForm
                    defaultName={product.name}
                    defaultPrice={product.price}
                    defaultStock={product.stock}
                    defaultImageurl={product.imageUrl}
                    cardTitle={'Editing ' + product.name}
                    onSubmit={handleEditProduct}
                />
            ) : null}
        </AdminLayout>
    );
};

export default EditProductPage;
