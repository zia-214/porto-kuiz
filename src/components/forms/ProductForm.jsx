import { useForm } from "react-hook-form";
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const productFormSchema = z.object({
    name: z.string()
        .min(3, "Product name must be at least 3 characters")
        .max(80, "Product name must be at most 80 characters"),
    price: z.coerce.number()
        .min(10000, "Price must be at least 10,000"),
    stock: z.coerce.number()
        .min(1, "Stock must be at least 1"),
    imageUrl: z.string().url('Please use a valid URL'),
});

export const ProductForm = ({ onSubmit, cardTitle, defaultName, defaultPrice, defaultStock, defaultImageurl }) => {
    const form = useForm({
        defaultValues: {
            name: defaultName || '',
            price: defaultPrice || 0,
            stock: defaultStock || 0,
            imageUrl: defaultImageurl || '',
        },
        resolver: zodResolver(productFormSchema)
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-[540px] w-full'>
                <Card>
                    <CardHeader>
                        <CardTitle className='font-bold'>{cardTitle}</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-2'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pice</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Image</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please use a image URL
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </CardContent>
                    <CardFooter>
                        <Button type='submit' className='w-full'>
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}