import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const GuestPage2 = ({ children }) => {
    const userSelector = useSelector((state) => state.user)

    if (!userSelector.id) {
        return <Navigate to='/' />
    }
    return children
}
