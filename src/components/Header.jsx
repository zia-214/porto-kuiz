import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { IoCart, IoHeart } from "react-icons/io5"
import { Separator } from './ui/separator'
import { Input } from './ui/input'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '@/lib/axios'
import { fetchCart } from './services/cart'
import { History } from 'lucide-react'


const Header = () => {
    const userSelector = useSelector((state) => state.user)
    const cartSelector = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.removeItem('current-user')
        dispatch({
            type: 'USER_LOGOUT',
        })
    }

    fetchCart(userSelector.id)

    return (
        <header className='h-16 border-b flex items-center justify-between px-8'>
            <p className='text-2xl font-bold hover:cursor-pointer'>Toko Gua</p>
            <Input className='max-w-[600px]' placeholder="Search Product..." />
            <div className='flex space-x-4 h-5 items-center'>
                <div className='flex space-x-2'>
                    <Link to='/cart'>
                        <Button variant="ghost">
                            <IoCart style={{ width: '25px', height: '25px' }} />
                            <span className='text-lg font-bold'>{cartSelector.items.length}</span>
                        </Button>
                    </Link>
                    <Link to='/hystory'>
                        <Button size="icon" variant="ghost">
                            <History style={{ width: '25px', height: '25px' }} />
                        </Button>
                    </Link>
                </div>

                <Separator orientation="vertical" className="h-full" />

                <div className='flex space-x-2 items-center'>
                    {
                        userSelector.id ?
                            <>
                                <p>Hello, {userSelector.username}({userSelector.role})</p>
                                <Button onClick={handleLogout} variant='destructive'>Log Out</Button>
                            </>
                            :
                            <>
                                <Link to='/login'>
                                    <Button>Log in</Button>
                                </Link>
                                <Link to='/register'>
                                    <Button variant="outline">Sign Up</Button>
                                </Link>
                            </>
                    }
                </div>

            </div>
        </header>
    )
}

export default Header