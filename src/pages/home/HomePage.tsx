import { Navbar } from '@/components/comman/Navbar'
import PaginationComponent from '@/components/comman/Pagination'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { addToCartApi, getUserCartApi, removeFromCartApi } from '@/features/cart/cartSlice'
import { getAllProductsApi } from '@/features/product/product.Slice'
import { IProduct } from '@/type'
import { useAppDispatch, useAppSelector } from '@/utils/dispatchconfig'
import { Check, DoorClosedIcon, Search, ShoppingCart, StarIcon, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Product = () => {
    const Navigate = useNavigate()
    const dispatch = useAppDispatch()
    const cookie = useCookies(['user'])
    const { getAllProductsData, loading } = useAppSelector(store => store.productReducer)
    const { getCartData, addToCartData, removeFromCartData, loading: cartLoading } = useAppSelector(store => store.cartReducer)

    console.log('cookie', cookie)

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(20)
    const [search, setSearch] = useState<string>('')
    useEffect(() => {
        dispatch(getAllProductsApi({ page, limit, search }))
            .then(res => console.log('products', res))
    }, [page, limit])

    useEffect(() => {
        dispatch(getUserCartApi({ userId: cookie?.[0].user?._id }))
            .then(res => console.log('cart', res))
    }, [addToCartData, removeFromCartData])

    const handleAddtoCart = async (id: string) => {
        dispatch(addToCartApi({
            productId: id,
            userId: cookie?.[0].user?._id,
        })).then(res => {
            console.log('add cart', res)
        })
        console.log('add', id)
    }
    const handleRemovetFromCart = async (id: string) => {
        console.log('remove', id)
        dispatch(removeFromCartApi({
            productId: id,
            userId: cookie?.[0].user?._id,

        })).then(res => {
            console.log('add cart', res)
        })
    }

    const handlePageChange = (pag: number) => {
        // console.log('p', pag)
        setPage(pag);
        // Add logic here to fetch data for the new page
    };


    console.log('getCartData?.data?.items', getCartData?.data?.[0]?.items)

    return (
        <div>
            {/* <h1>Products</h1> */}
            {/* <Navbar /> */}

            <div className="container mx-auto p-4">

                <div className=''>
                    <div className=''>

                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-6">Products</h1>
                <div>
                    {/* <form className="ml-auto flex-1 sm:flex-initial" > */}
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                    {/* </form> */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* {getAllProductsData?.data?.map(({ title, price, category, description, imageUrl, _id }: IProduct, index: number) => (
                        <div className="border rounded-lg shadow-lg overflow-hidden" key={index}>
                            <img src={imageUrl?.[0]} alt={title} className="w-full h-48 object-cover" onClick={() => Navigate(`/product-details/${_id}`)} />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{title}</h2>
                                <p className="text-gray-600">${price}</p>
                                <p className="mt-2 text-gray-500">{description}</p>
                            </div>
                        </div>
                    ))} */}
                    {getAllProductsData?.data?.map(({ title, price, category, description, imageUrl, _id }: IProduct, index: number) => (

                        <div className="flex justify-center p-4 bg-gray-100 " key={index}>
                            <div className="max-w-xs w-full bg-white rounded-lg shadow-sm overflow-hidden">
                                <img
                                    className="w-full h-48 object-cover"
                                    src={imageUrl?.[0]}
                                    alt={title}
                                />
                                <div className="p-4 ">
                                    <h3 className="text-xl font-semibold text-center">{title}</h3>
                                    <p className="text-gray-600 text-center mt-2">
                                        Lorem ipsum dolor sit amet, lorem, ipsum dolor.
                                    </p>
                                    <div className="text-center mt-4">
                                        <span className="text-xl font-bold text-red-500">$69.99</span>
                                    </div>
                                    <div className="flex justify-center items-center mt-2">
                                        {[...Array(5)].map((_, index) => (
                                            <StarIcon key={index} className="w-5 h-5 text-yellow-500" />
                                        ))}
                                    </div>
                                    {getCartData?.data?.[0]?.items?.some((item: any) => item?.product?._id === _id) ?
                                        <div className='flex gap-2 '>
                                            <Button className="w-full mt-4 bg-emerald-500 text-white gap-2" variant="default" onClick={() => handleRemovetFromCart(_id!)}>
                                                Added to cart
                                                <Check />
                                            </Button>
                                            <Button className="w-full mt-4 bg-red-400 text-white gap-2" variant="default" onClick={() => handleRemovetFromCart(_id!)}>
                                                <X />
                                            </Button>
                                        </div >
                                        :
                                        <Button className="w-full mt-4 bg-violet-400 text-white gap-1" variant="default" onClick={() => handleAddtoCart(_id!)}>
                                            Add to Cart
                                            <ShoppingCart />
                                        </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
            {getAllProductsData?.data?.lenght > limit && <PaginationComponent

                currentPage={page}
                totalPages={getAllProductsData?.meta?.totalPages || 1}
                onPageChange={handlePageChange}
            />}
        </div>
    )
}

export default Product


