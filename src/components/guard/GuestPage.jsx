import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const GuestPage = ({ children }) => {
    const userSelector = useSelector((state) => state.user)

    if (userSelector.id) {
        return <Navigate to='/' />
    }

    return children
}
