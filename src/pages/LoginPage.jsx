import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

const LoginPage = () => {
    const [inputUsername, setInputUsername] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const [messageUsername, setMessageUsername] = useState('')
    const [messagePassword, setMessagePassword] = useState('')

    const [checked, setChecked] = useState(false)

    const handleLogin = () => {
        const username = inputUsername.length >= 3
        const Password = inputPassword.length >= 8
        if (!username) {
            alert("username woi")
            return
        }
        if (!Password) {
            alert("password woi")
            return
        }
    }

    return (
        <div className='px-4 py-8 flex flex-col justify-center items-center h-[80vh]'>
            <form onSubmit={handleLogin} className='w-full max-w-[540px]'>
                <Card >
                    <CardHeader>
                        <CardTitle>Welcome Back</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-2'>
                        <div>
                            <Label htmlFor="username" >Username</Label>
                            <Input
                                onChange={(e) => {
                                    if (e.target.value.length < 3) {
                                        setMessageUsername('harus 3 huruf bro')
                                    } else {
                                        setMessageUsername('')
                                    }
                                    setInputUsername(e.target.value)
                                }
                                }
                                id="username" />
                            <p className='text-sm text-muted-foreground'>{messageUsername}</p>
                        </div>
                        <div>
                            <Label htmlFor="password" >Password</Label>
                            <Input
                                onChange={(e) => {
                                    if (e.target.value.length < 8) {
                                        setMessagePassword('harus 8 huruf bro')
                                    } else {
                                        setMessagePassword('')
                                    }
                                    setInputPassword(e.target.value)
                                }
                                }
                                id="password"
                                type={checked ? "text" : "password"} />
                            <p className='text-sm text-muted-foreground'>{messagePassword}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                onCheckedChange={(checked) => setChecked(checked)}
                                id="show-password" />
                            <Label htmlFor="show-password">Show Password</Label>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className='flex flex-col space-y-4 w-full'>
                            <Button type='submit' disabled={inputUsername.length < 3 || inputPassword.length < 8}>Login</Button>
                            <Button variant='link'>Sign up instead</Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>

        </div>
    )
}

export default LoginPage