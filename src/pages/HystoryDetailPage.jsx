7777777777777777777777777yyyyyyyyyyyyyyyyyyyyyyyyy0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000073335555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555yurtfm8m8m8m87
console.error(error);
        }
    };

useEffect(() => {
    fetchHistoryDetail();
}, [params.transactionId]);

if (userSelector.id !== historyDetail.userId && historyDetail.userId) {
    return <Navigate to='/' />
}

return (
    <div className='min-h-screen max-w-screen-lg mx-auto px-4 mt-8'>
        <h1 className='text-3xl font-bold'>{historyDetail.id}</h1>
        <h2 className='text-xl font-bold'>{format(new Date(historyDetail.transactionDate), 'dd MMM yyyy')}</h2>

        <Card className='lg:col-span-4 bg-gray-50 border-0 h-min my-10'>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex pb-4 justify-between border-b'>
                    <span className='text-sm text-muted-foreground'>Subtotal</span>
                    <span>Rp {historyDetail.totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className='flex py-4 justify-between border-b'>
                    <span className='text-sm text-muted-foreground'>Taxes (10%)</span>
                    <span>Rp {historyDetail.tax.toLocaleString('id-ID')}</span>
                </div>
            </CardContent>
            <CardFooter className='flex flex-col gap-6'>
                <div className='w-full justify-between flex'>
                    <span className='font-semibold text-muted-foreground'>Total</span>
                    <span className='font-semibold'>
                        Rp {(historyDetail.totalPrice + historyDetail.tax).toLocaleString('id-ID')}
                    </span>
                </div>
            </CardFooter>
        </Card>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead colSpan={2}>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.isArray(historyDetail.items) ? (
                    historyDetail.items.map((cartItem, index) => (
                        <TableRow key={index} className='text-muted-foreground font-semibold'>
                            <TableCell colSpan={2}>
                                <div className='flex items-center gap-6'>
                                    <div className='aspect-square w-[100px] overflow-hidden rounded-md'>
                                        <img src={cartItem.product.imageUrl} alt={cartItem.product.name} />
                                    </div>
                                    <p className='font-semibold text-primary'>{cartItem.product.name}</p>
                                </div>
                            </TableCell>
                            <TableCell>Rp {cartItem.product.price.toLocaleString('id-ID')}</TableCell>
                            <TableCell>{cartItem.quantity}</TableCell>
                            <TableCell>Rp {(cartItem.product.price * cartItem.quantity).toLocaleString('id-ID')}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className='text-center'>
                            No items found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
);
};

export default HystoryDetailPage;
