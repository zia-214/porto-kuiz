import { ProductForm } from '@/components/forms/ProductForm';
import AdminLayout from '@/components/layout/AdminLayout'
import { axiosInstance } from '@/lib/axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';


const CreateProductPage = () => {

    const navigate = useNavigate()

    const handleCreateProduct = async (values) => {
        try {
            await axiosInstance.post('products', values)
            alert('udh masuk cuy')
            navigate('/admin/products')
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <AdminLayout title='Create Product' description='Add New Products'>
            <ProductForm cardTitle='Create Product' onSubmit={handleCreateProduct} />
        </AdminLayout>
    )
}

export default CreateProductPage