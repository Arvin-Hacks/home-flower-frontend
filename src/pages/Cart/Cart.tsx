import {
  IndianRupee,
  ListFilter,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { getUserCartApi } from "@/features/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@/utils/dispatchconfig"
import { useCookies } from "react-cookie"
import CartRows, { CartItem } from "./CartRows"
import { OrderData, placeOrderApi } from "@/features/order/OrderSlice"
import { Link, useNavigate } from "react-router-dom"

const ShoppingCart = () => {

  const dispatch = useAppDispatch()
  const Navigate=useNavigate()
  const cookie = useCookies(['user'])

  const { getCartData, addToCartData, removeFromCartData } = useAppSelector(store => store.cartReducer)
  const { placeOrderData } = useAppSelector(store => store.orderReducer)

  const [cartItems, setCartItems] = useState<CartItem[]>(getCartData?.data?.[0]?.items ?? [])


  useEffect(() => {
    dispatch(getUserCartApi({ userId: cookie?.[0].user?._id }))
      .then(res => setCartItems(res?.payload?.data?.[0]?.items ??[]))
  }, [addToCartData, removeFromCartData, placeOrderData])


  const handlePlaceOrder = () => {
    console.log('order', cartItems)


    const orderData: OrderData = {

      items: cartItems?.map((item) => ({
        product: item?.product,
        quantity: item?.quantity
      })),
      user: cookie?.[0]?.user?._id

    }
    dispatch(placeOrderApi(orderData)).then((res) => {
      console.log('rss', res)
      if (res?.type === 'order/add/fulfilled') {
        Navigate(`/order-details/${res?.payload?.data?._id}`)
      }
    })
    // console.log('cc', orderData)

  }

  // console.log('cartItems',cartItems)

  const handleIncrease = (itemId: string) => {
    console.log('id', itemId)
    setCartItems(prevItems =>
      prevItems?.map(item =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (itemId: string) => {
    console.log('decrease', itemId)
    setCartItems(prevItems =>
      prevItems?.map(item =>
        item._id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  console.log('first,', cartItems)



  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            {/* <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card
                                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle>Your Orders</CardTitle>
                                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                                        Introducing Our Dynamic Orders Dashboard for Seamless
                                        Management and Insightful Analysis.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button>Create New Order</Button>
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription>This Week</CardDescription>
                                    <CardTitle className="text-4xl">$1,329</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +25% from last week
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={25} aria-label="25% increase" />
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-2">
                                <CardHeader className="pb-2">
                                    <CardDescription>This Month</CardDescription>
                                    <CardTitle className="text-4xl">$5,329</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +10% from last month
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={12} aria-label="12% increase" />
                                </CardFooter>
                            </Card>
                        </div> */}
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <File className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">Export</span>
                                    </Button> */}
                </div>
              </div>
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Cart</CardTitle>
                    <CardDescription>
                      ProductS you Added in cart.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>#</TableHead>
                          <TableHead>Image</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Quantity
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Subtotal
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems?.length > 0 ?
                          cartItems?.map((item: any, index: number) => {
                            // const { title, price, imageUrl, _id, } = item?.product
                            // console.log('item', item)

                            // console.log('imageUrl', imageUrl)
                            return (
                              <CartRows item={item} onIncrease={handleIncrease} onDecrease={handleDecrease} index={index} key={index} />
                            )

                          })

                          :
                          <TableRow>
                            <TableCell colSpan={7}>
                              <Link to={'/'}>
                                <div className="font-medium font-bold">Add Some Products in cart</div>
                              </Link>

                            </TableCell>
                          </TableRow>
                        }

                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          {cartItems?.length > 0 && <div>
            <Card
              className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Order Summary
                    {/* <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Copy className="h-3 w-3" />
                                            <span className="sr-only">Copy Order ID</span>
                                        </Button> */}
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                {/* <div className="ml-auto flex items-center gap-1">
                                    <Button size="sm" variant="outline" className="h-8 gap-1">
                                        <Truck className="h-3.5 w-3.5" />
                                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                            Track Order
                                        </span>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="outline" className="h-8 w-8">
                                                <MoreVertical className="h-3.5 w-3.5" />
                                                <span className="sr-only">More</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Export</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Trash</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div> */}
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Order Details</div>
                  <ul className="grid gap-3">
                    {cartItems?.map((item, index) => {
                      return (
                        <li className="flex items-center justify-between" key={index}>
                          <span className="text-muted-foreground">
                            {item?.product?.title} x <span>{item?.quantity}</span>
                          </span>
                          <span>₹{item?.product?.price! * item?.quantity}</span>
                        </li>
                      )
                    })}
                    {/* <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Aqua Filters x <span>1</span>
                      </span>
                      <span>₹49.00</span>
                    </li> */}
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{cartItems?.reduce((total, item) => (item?.quantity * item?.product?.price!) + total, 0)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>₹0.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>₹0.00</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>₹{cartItems?.reduce((total, item) => (item?.quantity * item?.product?.price!) + total, 0)}</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">Shipping Information</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>Liam Johnson</span>
                      <span>1234 Main St.</span>
                      <span>Anytown, CA 12345</span>
                    </address>
                  </div>
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Billing Information</div>
                    <div className="text-muted-foreground">
                      Same as shipping address
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Customer Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Customer</dt>
                      <dd>Liam Johnson</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href="mailto:">liam@acme.com</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href="tel:">+1 234 567 890</a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Payment Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        <IndianRupee className="h-4 w-4" />
                        Cash On Delivery
                      </dt>
                      {/* <dd>**** **** **** 4532</dd> */}
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">

                <Button className="w-full bg-green-400" onClick={handlePlaceOrder}>
                  Order Now

                </Button>
                {/* <div className="text-xs text-muted-foreground">
                                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                                </div>
                                <Pagination className="ml-auto mr-0 w-auto">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Button size="icon" variant="outline" className="h-6 w-6">
                                                <ChevronLeft className="h-3.5 w-3.5" />
                                                <span className="sr-only">Previous Order</span>
                                            </Button>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <Button size="icon" variant="outline" className="h-6 w-6">
                                                <ChevronRight className="h-3.5 w-3.5" />
                                                <span className="sr-only">Next Order</span>
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination> */}
              </CardFooter>
            </Card>
          </div>}
        </main>
      </div>
    </div>
  )
}
// export default Cart

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select } from '@/components/ui/select';
// import React from 'react';
// // import { Button, Input, Select } from '@shadcn/ui';

// const ShoppingCart = () => {





//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Shopping Bag</h2>
//           <p className="text-gray-600 mb-6">2 items in your bag.</p>

//           {/* Product Item */}
//           <div className="border-b pb-4 mb-4">
//             <div className="flex items-center">
//               <img
//                 className="w-20 h-20 rounded-lg object-cover"
//                 src="https://via.placeholder.com/150"
//                 alt="Product"
//               />
//               <div className="ml-4 flex-1">
//                 <h3 className="font-semibold">Floral Print Wrap Dress</h3>
//                 <p className="text-gray-600">Women</p>
//                 <p className="text-gray-600">Color: Blue</p>
//                 <p className="text-gray-600">Size: 42</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-semibold">$20.50</p>
//                 <div className="flex items-center mt-2">
//                   <Button className="p-2 bg-gray-200">-</Button>
//                   <input
//                     className="w-12 text-center border mx-2"
//                     type="number"
//                     defaultValue="2"
//                   />
//                   <Button className="p-2 bg-gray-200">+</Button>
//                 </div>
//               </div>
//               <div className="text-right ml-6">
//                 <p className="font-semibold text-orange-500">$41.00</p>
//               </div>
//             </div>
//           </div>

//           {/* Another Product Item */}
//           <div className="border-b pb-4 mb-4">
//             <div className="flex items-center">
//               <img
//                 className="w-20 h-20 rounded-lg object-cover"
//                 src="https://via.placeholder.com/150"
//                 alt="Product"
//               />
//               <div className="ml-4 flex-1">
//                 <h3 className="font-semibold">Floral Print Wrap Dress</h3>
//                 <p className="text-gray-600">Women</p>
//                 <p className="text-gray-600">Color: Red</p>
//                 <p className="text-gray-600">Size: 42</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-semibold">$30.50</p>
//                 <div className="flex items-center mt-2">
//                   <Button className="p-2 bg-gray-200">-</Button>
//                   <input
//                     className="w-12 text-center border mx-2"
//                     type="number"
//                     defaultValue="1"
//                   />
//                   <Button className="p-2 bg-gray-200">+</Button>
//                 </div>
//               </div>
//               <div className="text-right ml-6">
//                 <p className="font-semibold text-orange-500">$30.50</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">Calculated Shipping</h2>
//           <Select >
//             <option>Country</option>
//           </Select>
//           <Input className="mb-4" placeholder="State / City" />
//           <Input className="mb-4" placeholder="ZIP Code" />
//           <Button className="w-full mb-4 bg-black text-white">Update</Button>

//           <h2 className="text-xl font-semibold mb-4">Coupon Code</h2>
//           <Input className="mb-4" placeholder="Coupon Code" />
//           <Button className="w-full mb-6 bg-black text-white">Apply</Button>

//           <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
//           <div className="mb-4">
//             <p className="flex justify-between">
//               <span>Cart Subtotal</span>
//               <span>$71.50</span>
//             </p>
//             <p className="flex justify-between">
//               <span>Design by Fluttertop</span>
//               <span>Free</span>
//             </p>
//             <p className="flex justify-between">
//               <span>Discount</span>
//               <span>-$4.00</span>
//             </p>
//             <p className="flex justify-between font-semibold text-lg">
//               <span>Cart Total</span>
//               <span>$67.50</span>
//             </p>
//           </div>
//           <Button className="w-full bg-orange-500 text-white">Apply</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default ShoppingCart;


