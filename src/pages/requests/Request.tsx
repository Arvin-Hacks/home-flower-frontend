// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/utils/dispatchconfig';
import { useEffect, useState } from 'react';
import { getAllProductsRequestApi } from '@/features/requests/requestsSlice';
// import { Image } from '@radix-ui/react-avatar';

const ManageRequest = () => {

    const dispatch = useAppDispatch()
    const Navigate = useNavigate()
    const { getAllProductsRequestData, loading } = useAppSelector(store => store.productRequestReducer)



    const [page,] = useState<number>(1)
    const [limit, ] = useState<number>(10)
    useEffect(() => {
        dispatch(getAllProductsRequestApi({ page, limit })).then(res => console.log('products', res))

    }, [page, limit])

    console.log('getAllProductsData', getAllProductsRequestData)

    return (
        <div>
            {/* <header className="flex justify-between items-center p-4 bg-white shadow-md">
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/products">Products</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>All Products</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                            <Image
                                src="/placeholder-user.jpg"
                                width={36}
                                height={36}
                                alt="Avatar"
                                className="overflow-hidden rounded-full"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header> */}
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center mb-4">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="draft">Draft</TabsTrigger>
                            <TabsTrigger value="archived" className="hidden sm:flex">
                                Archived
                            </TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-7 gap-1">
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {/* <Button size="sm" variant="outline" className="h-7 gap-1">
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                            </Button> */}
                            <Link to='/add-request'>
                                <Button size="sm" className="h-7 gap-1" >
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card>
                            <CardHeader>
                                <CardTitle>Products</CardTitle>
                                <CardDescription>Manage your products and view their sales performance.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {/* <TableHead className="hidden w-[100px] sm:table-cell">
                                                <span className="sr-only">Image</span>
                                            </TableHead> */}
                                            <TableHead>Image</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Requeted By</TableHead>
                                            <TableHead>Date</TableHead>
                                            {/* <TableHead className="hidden md:table-cell">Created at</TableHead> */}
                                            <TableHead>
                                                Actions
                                                <span className="sr-only"></span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {/* Replace these rows with dynamic content */}
                                        {!loading ?

                                            getAllProductsRequestData?.data?.length > 0 ?
                                                getAllProductsRequestData?.data?.map((product:any, index: number) => {
                                                    const { title, images, status, _id } = product 

                                                    console.log('first')

                                                    // console.log('status', status);
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell className="hidden sm:table-cell cursor-pointer" onClick={() => Navigate(`/requests-details/${_id}`)}>
                                                              <img alt="Product image" className="aspect-square rounded-md object-cover" height="64" src={images?.[0]} width="64" />
                                                            </TableCell>
                                                            <TableCell className="font-medium">{title}</TableCell>
                                                            <TableCell><Badge variant="outline">{status}</Badge></TableCell>
                                                            <TableHead className="hidden md:table-cell">Category</TableHead>
                                                            <TableHead className="hidden md:table-cell">12-12-2023</TableHead>
                                                            <TableCell>
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                            <MoreHorizontal className="h-4 w-4" />
                                                                            <span className="sr-only">Toggle menu</span>
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end">
                                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })

                                                :
                                                <TableRow >
                                                    <TableCell className="hidden sm:table-cell " colSpan={6}>
                                                        No Product Available
                                                        {/* <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" /> */}
                                                    </TableCell>
                                                </TableRow>
                                            :
                                            <TableRow >
                                                <TableCell className="hidden sm:table-cell " colSpan={6}>
                                                    loading...
                                                    {/* <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src="/placeholder.svg" width="64" /> */}
                                                </TableCell>
                                            </TableRow>
                                        }
                                        {/* Add more rows as needed */}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter>
                                <div className="text-xs text-muted-foreground">
                                    Showing <strong>1-10</strong> of <strong>32</strong> products
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default ManageRequest;
