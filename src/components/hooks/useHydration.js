import { axiosInstance } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useHydration = () => {
    const dispatch = useDispatch();
    const [isHydrated, setisHydrated] = useState(false)

    const hydrateAuth = async () => {

        try {
            const currentUser = localStorage.getItem('current-user');
            if (!currentUser) return;
            const { data } = await axiosInstance.get(`/users/${currentUser}`);
            dispatch({
                type: 'USER_LOGIN',
                payload: { username: data.username, id: data.id, role: data.role }
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setisHydrated(true)
        }
    };

    useEffect(() => {
        hydrateAuth();
    }, []);
    return { isHydrated }
};
