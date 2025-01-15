import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const HystoryItem = ({ transactionDate, id, totalPrice, tax, items }) => {
    return (
        <div>
            <div className='rounded-md p-4 bg-slate-50 flex justify-between items-center'>
                <div className='flex flex-col justify-center'>
                    <span className='text-muted-foreground text-sm'>
                        {transactionDate}
                    </span>
                    <span className='text-muted-foreground font-semibold'>
                        INV-{id}
                    </span>
                </div>
                <div className='flex flex-col justify-center items-end'>
                    <span className='text-xl font-bold'>
                        Rp {(totalPrice + tax).toLocaleString('id-ID')}
                    </span>
                    <Link to={'/hystory/' + id}>
                        <Button variant='link'>
                            View Detail
                        </Button>
                    </Link>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead colSpan={2}>
                            Product
                        </TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((cartItem, index) => {
                        return (
                            <TableRow key={index} className='text-muted-foreground font-semibold'>
                                <TableCell colSpan={2}>
                                    <div className='flex items-center gap-6'>
                                        <div className='aspect-square w-[100px] overflow-hidden rounded-md'>
                                            <img src={cartItem.product.imageUrl} alt={cartItem.product.name} />
                                        </div>
                                        <p className='font-semibold text-primary'>{cartItem.product.name}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    Rp {(cartItem.product.price).toLocaleString('id-ID')}
                                </TableCell>
                                <TableCell>
                                    {cartItem.quantity}
                                </TableCell>
                                <TableCell>
                                    Rp {(cartItem.product.price * cartItem.quantity).toLocaleString('id-ID')}
                                </TableCell>
                            </TableRow>
                        )
                    })}

                </TableBody>
            </Table>
        </div>
    )
}

export default HystoryItem