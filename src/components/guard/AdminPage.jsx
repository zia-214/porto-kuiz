import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const AdminPage = ({ children }) => {
    const { role } = useSelector((state) => state.user);

    return role === "admin" ? children : <Navigate to='/' />;
}

