import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { axiosInstance } from '@/lib/axios';
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { Link, useSearchParams } from 'react-router-dom';

const MIN_PAGE = 1; // Tetap menggunakan batas minimum halaman

const ProductManagementPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [productName, setProductName] = useState('');
    const [selectedProductId, setSelectedProductId] = useState([]);

    const validatePage = (page) => Math.max(MIN_PAGE, page); // Hapus batas maksimum

    const updatePage = (delta) => {
        const newPage = validatePage(Number(searchParams.get('page')) + delta);
        searchParams.set('page', newPage);
        setSearchParams(searchParams);
    };

    const searchProduct = () => {
        searchParams.set('search', productName);
        searchParams.set('name', productName); // Set the name parameter for search
        searchParams.set('page', 1); // Reset to the first page for new search
        setSearchParams(searchParams);
    };

    const fetchProduct = async () => {
        const page = validatePage(Number(searchParams.get('page')) || 1);

        try {
            const response = await axiosInstance.get('/products', {
                params: {
                    _per_page: 5,
                    _page: page,
                    search: searchParams.get('search') || '',
                    name: searchParams.get('name') || '',
                },
            });
            setHasNextPage(Boolean(response.data.next));
            setProducts(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProduct = async () => {
        const shouldDelete = confirm(`Are you sure you want to delete ${selectedProductId.length} products?`);
        if (!shouldDelete) {
            return;
        }

        const deletePromises = selectedProductId.map((productId) => axiosInstance.delete('/products/' + productId));

        try {
            await Promise.all(deletePromises);
            fetchProduct()
            setSelectedProductId([]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCheckedProduct = (productId, checked) => {
        setSelectedProductId(prevSelectedProductId =>
            checked
                ? [...prevSelectedProductId, productId]
                : prevSelectedProductId.filter(id => id !== productId)
        );
    };

    useEffect(() => {
        const page = searchParams.get('page');
        if (!page) {
            searchParams.set('page', 1);
            setSearchParams(searchParams);
        } else {
            fetchProduct();
        }
    }, [searchParams]);

    return (
        <AdminLayout
            title="Product Management"
            description="Managing Our Product"
            rightSection={
                <div className='flex gap-2'>
                    {selectedProductId.length ? (
                        <Button variant='destructive' onClick={handleDeleteProduct}>
                            Delete {selectedProductId.length} Products
                        </Button>
                    ) : null}
                    <Link to='/admin/products/create'>
                        <Button onClick={searchProduct} className="flex gap-3">
                            <IoAdd style={{ width: '25px', height: '25px' }} />
                            Add Product
                        </Button>
                    </Link>
                </div>
            }
        >
            <div className='mb-8'>
                <Label>Search Product Name</Label>
                <div className='flex gap-4'>
                    <Input
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                        className='w-[400px]'
                        placeholder='Search Product...'
                    />
                    <Button onClick={searchProduct}>Search</Button>
                </div>
            </div>

            <Table className="p-4 border rounded-md">
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedProductId.includes(product.id)}
                                    onCheckedChange={(checked) => handleCheckedProduct(product.id, checked)}
                                />
                            </TableCell>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>Rp {(product.price).toLocaleString('id-ID')}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                                <Link to={'/admin/products/edit/' + product.id}>
                                    <Button variant="ghost" size="icon">
                                        <Edit style={{ width: '25px', height: '25px' }} />
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <Button disabled={Number(searchParams.get('page')) <= MIN_PAGE} onClick={() => updatePage(-1)} variant="ghost">
                            <ChevronLeft style={{ width: '25px', height: '25px' }} className="mr-2" />
                            Previous
                        </Button>
                    </PaginationItem>

                    <PaginationItem className="mx-6 font-semibold">
                        Page {searchParams.get('page')}
                    </PaginationItem>

                    <PaginationItem>
                        <Button disabled={!hasNextPage} onClick={() => updatePage(1)} variant="ghost">
                            Next
                            <ChevronRight style={{ width: '25px', height: '25px' }} className="ml-2" />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </AdminLayout>

    );
};

export default ProductManagementPage;
