import React from 'react';
import { Button } from '../ui/button';
import { IoCart, IoPerson, IoPricetag } from 'react-icons/io5';
// import { AdminPage } from '../guard/AdminPage';

const SidebarItem = ({ children }) => (
    <Button variant='ghost' size='lg' className='w-full rounded-none justify-start flex gap-2'>
        {children}
    </Button>
);

const AdminLayout = ({ title, description, rightSection, children }) => {
    return (
        // <AdminPage>
        <div className='flex'>
            <aside className='w-72 border-r h-screen'>
                <div className='flex flex-col items-center h-16 justify-center border-b'>
                    <h1 className='font-semibold text-3xl'>Admin Dashboard</h1>
                </div>
                <div className='flex flex-col space-y-0 py-4'>
                    <SidebarItem key="product-management">
                        <IoPricetag style={{ width: '25px', height: '25px' }} />
                        Product Management
                    </SidebarItem>
                    <SidebarItem key="orders-management">
                        <IoCart style={{ width: '25px', height: '25px' }} />
                        Orders Management
                    </SidebarItem>
                </div>
            </aside>
            <div className='flex-1'>
                <header className='h-16 border-b w-full flex justify-end items-center px-8'>
                    <Button className='rounded-full' size='icon'>
                        <IoPerson style={{ width: '25px', height: '25px' }} />
                    </Button>
                </header>

                <main className='flex flex-col p-4'>
                    <div className='flex justify-between items-center pb-4 border-b mb-8'>
                        <div>
                            <h1 className='font-bold text-4xl'>{title}</h1>
                            <p className='text-muted-foreground'>{description}</p>
                        </div>
                        {rightSection}
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
