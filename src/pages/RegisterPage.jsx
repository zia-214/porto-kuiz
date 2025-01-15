import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from '@/lib/axios';
import { GuestPage } from '@/components/guard/GuestPage';

const RegisterFormSchema = z.object({
    username: z.string()
        .min(3, "Username must be between 3 and 16 characters")
        .max(16, "Username must be between 3 and 16 characters"),
    password: z.string()
        .min(6, "Password must be at least 6 characters long"),
    repeatPassword: z.string()
        .min(6, "Repeat Password must be at least 6 characters long")
})
    .superRefine(({ password, repeatPassword }, ctx) => {
        if (password !== repeatPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["repeatPassword"],
            });
        }
    });

const RegisterPage = () => {
    const form = useForm({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            username: '',
            password: '',
            repeatPassword: '',
        },
        reValidateMode: 'onSubmit'
    });

    const handleRegister = async ({ username, password }) => {

        const userResponse = await axiosInstance.get('/users', {
            params: {
                username: username
            }
        })

        if (userResponse.data.length) {
            alert('kan udh cui nama itumah!')
            return
        }

        try {
            await axiosInstance.post('/users', {
                username: username,
                password: password,
                role: "user",
            })
            alert('User Registered');
        } catch (error) {
            console.log(error);

        }

        form.reset()
    }
    return (
        <GuestPage>
            <div className='px-4 py-8 flex flex-col justify-center items-center h-[80vh]'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)} className='w-full max-w-[540px]'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Create an account</CardTitle>
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
                                                <Input id="password" type='password' {...field} autoComplete="current-password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="repeatPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="repeatPassword">Repeat Password</FormLabel>
                                            <FormControl>
                                                <Input id="repeatPassword" type='password' {...field} autoComplete="current-password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <div className='flex flex-col space-y-4 w-full'>
                                    <Button type='submit'>Register</Button>
                                    <Button variant='link'>Login instead</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
        </GuestPage>

    );
};

export default RegisterPage;
