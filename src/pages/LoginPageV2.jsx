import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from '@/lib/axios';
import { useDispatch } from 'react-redux';
import { GuestPage } from '@/components/guard/GuestPage';

const loginFormSchema = z.object({
    username: z.string()
        .min(3, "username has to be between 3 and 16 characters")
        .max(16, "username has to be between 3 and 16 characters"),
    password: z.string()
        .min(3, "password has to be between 3 and 16 characters")
        .max(16, "password has to be between 3 and 16 characters")
});

const LoginPageV2 = () => {
    const dispatch = useDispatch('')

    const [checked, setChecked] = useState(false);

    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: '',
            password: '',
        },
        reValidateMode: 'onSubmit'
    });

    const handleLogin = async ({ username, password }) => {
        try {
            const { data } = await axiosInstance.get('/users', { params: { username } });
            if (!data.length) return alert('user not found');
            if (data[0].password !== password) return alert('wrong password');
            alert('success');

            dispatch({
                type: 'USER_LOGIN',
                payload: {
                    username: data[0].username,
                    id: data[0].id,
                    role: data[0].role,
                }
            });

            localStorage.setItem('current-user', data[0].id)
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <GuestPage>
            <div className='px-4 py-8 flex flex-col justify-center items-center h-[80vh]'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className='w-full max-w-[540px]'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Welcome Back</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="username">Username</FormLabel>
                                            <FormControl>
                                                <Input id="username" {...field} autoComplete="username" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <FormControl>
                                                <Input id="password" type={checked ? "text" : "password"} {...field} autoComplete="current-password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="show-password"
                                        onCheckedChange={(checked) => setChecked(checked)}
                                    />
                                    <Label htmlFor="show-password">Show Password</Label>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className='flex flex-col space-y-4 w-full'>
                                    <Button type='submit'>Login</Button>
                                    <Button variant='link'>Sign up instead</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
        </GuestPage>

    );
};

export default LoginPageV2;
