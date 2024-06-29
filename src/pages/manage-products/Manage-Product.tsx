// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { File, ListFilter, MoreHorizontal, PlusCircle, Search } from 'lucide-react';
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
import { useCallback, useEffect, useState } from 'react';
import { deleteProductApi, getAllProductsApi } from '@/features/product/product.Slice';
import { IProduct } from '@/type';
import Swal from 'sweetalert2'
import { debounce } from '@/utils/debounceFunction';
import { Input } from '@/components/ui/input';
import PaginationComponent from '@/components/comman/Pagination';
// import { Image } from '@radix-ui/react-avatar';

const ManageProducts = () => {

    const Navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { getAllProductsData, deleteProductData, loading } = useAppSelector(store => store.productReducer)



    const [page, setPage] = useState<number>(1)
    const [limit,] = useState<number>(10)
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        dispatch(getAllProductsApi({ page, limit })).then(res => console.log('products', res))

    }, [page, limit, deleteProductData])

    const debouncedFetchData = useCallback(debounce((search: string) => {
        dispatch(getAllProductsApi({
            search,
            page: 1,
            limit
        })).then(res =>
            console.log('first', res))
    }, 500), [])

    useEffect(() => {
        if (!loading) {
            debouncedFetchData(search);
        }
    }, [search, debouncedFetchData]);

    const handlePageChange = (pag: number) => {
        // console.log('p', pag)
        setPage(pag);
        // Add logic here to fetch data for the new page
    };

    console.log('getAllProductsData', getAllProductsData)


    const handleDeleteProduct = (id: string) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(deleteProductApi(id)).then((res) => {
                    console.log('res', res)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Product has been deleted.",
                        icon: "success"
                    });
                })


            }
        });

    }

    return (
        <div>
            <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center mb-4">
                        {/* <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="draft">Draft</TabsTrigger>
                            <TabsTrigger value="archived" className="hidden sm:flex">
                                Archived
                            </TabsTrigger>
                        </TabsList> */}
                        <div className="ml-auto flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-7 gap-1 py-3">
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only py-2  sm:not-sr-only sm:whitespace-nowrap">Filter</span>
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
                            <Button size="sm" className="h-7 gap-1" onClick={() => Navigate('/add-product')}>
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only  sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                            </Button>
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
                                            <TableHead className="hidden md:table-cell">Status</TableHead>
                                            <TableHead >Price</TableHead>
                                            <TableHead className="hidden md:table-cell">Category</TableHead>
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

                                            getAllProductsData?.data?.length > 0 ?
                                                getAllProductsData?.data?.map((product: IProduct, index: number) => {
                                                    const { title, category, price, imageUrl, status, _id } = product
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell >
                                                                <img alt="Product image" className="aspect-square rounded-md object-cover" height="64" src={imageUrl?.[0]} width="64" />
                                                            </TableCell>
                                                            <TableCell className="font-medium" style={{textAlign:'left'}}>{title}</TableCell>
                                                            <TableCell className="hidden sm:table-cell"><Badge variant="outline">{status}</Badge></TableCell>
                                                            <TableCell >${price}</TableCell>
                                                            <TableCell className="hidden md:table-cell">{category}</TableCell>
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
                                                                        <DropdownMenuItem onClick={() => Navigate(`/edit-product/${_id}`)}>Edit</DropdownMenuItem>
                                                                        <DropdownMenuItem onClick={() => handleDeleteProduct(_id!)}>Delete</DropdownMenuItem>
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
                                    Showing <strong>{getAllProductsData?.data?.lenght - (limit * page)}-{limit * page}</strong> of <strong>{getAllProductsData?.data?.lenght ?? 0}</strong> products
                                </div>
                                {
                                    getAllProductsData?.data?.lenght > limit && <PaginationComponent

                                        currentPage={page}
                                        totalPages={getAllProductsData?.meta?.totalPages || 1}
                                        onPageChange={handlePageChange}
                                    />
                                }
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default ManageProducts;
