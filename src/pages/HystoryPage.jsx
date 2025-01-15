import { GuestPage2 } from '@/components/guard/GuestPage2';
import HystoryItem from '@/components/HystoryItem';
import { axiosInstance } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns'

const HystoryPage = () => {
    const [transactions, setTransactions] = useState([]);
    const userSelector = useSelector((state) => state.user);

    const fetchTransactions = async () => {
        try {
            const hystoryResponse = await axiosInstance.get('/transactions', {
                params: {
                    userId: userSelector.id
                }
            });
            setTransactions(hystoryResponse.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [userSelector.id]);

    return (
        <GuestPage2>
            <div className='min-h-screen max-w-screen-lg mx-auto px-4 mt-8'>
                <h1 className='text-3xl font-bold'>My Orders</h1>
                <div className='flex flex-col mt-8 gap-24'>
                    {transactions.map((transaction) => (
                        <HystoryItem
                            key={transaction.id}
                            id={transaction.id}
                            totalPrice={transaction.totalPrice}
                            tax={transaction.tax}
                            transactionDate={format(new Date(transaction.transactionDate), "dd MMM yyyy")}
                            items={transaction.items}
                        />
                    ))}
                </div>
            </div>
        </GuestPage2>
    );
};

export default HystoryPage;
