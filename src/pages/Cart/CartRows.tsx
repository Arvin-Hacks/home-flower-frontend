import Dialog from '@/components/comman/Dialoag';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table'
import { removeFromCartApi } from '@/features/cart/cartSlice';
import { IProduct } from '@/type';
import { useAppDispatch } from '@/utils/dispatchconfig';
import { Minus, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export interface CartItem {
    product: IProduct,
    quantity: number,
    _id: string;
}


type CartItemProps = {
    item: CartItem,
    index: number,
    onIncrease: (itemId: string) => void;
    onDecrease: (itemId: string) => void;
}


const CartRows: React.FC<CartItemProps> = ({ item, index, onIncrease, onDecrease }) => {

    const { product, quantity } = item

    const dispatch = useAppDispatch()
    const Navigate = useNavigate()
    const cookie = useCookies(['user'])
    const [isOpen, setIsOpen] = useState(false);



    const handleRemovetFromCart = async (id: string) => {
        console.log('remove', id)
        dispatch(removeFromCartApi({
            productId: id,
            userId: cookie?.[0].user?._id,

        })).then(res => {
            console.log('add cart', res)
        })
    }




    return (
        <TableRow className="bg-accent">
            <TableCell className="hidden sm:table-cell">{index + 1}</TableCell>
            <TableCell >
                <img
                    height={70}
                    width={70}
                    className="cursor-pointer"
                    src={product?.imageUrl?.[0]}
                    alt={product?.title}
                    onClick={() => Navigate(`/product-details/${product?._id}`)}

                />
            </TableCell>
            <TableCell>
                <div className="font-medium">{product?.title}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                    liam@example.com
                </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <div className="flex items-center">
                    <button
                        onClick={() => onDecrease(item?._id)}
                        className="px-1 py-1 text-md font-bold text-white bg-red-400 rounded hover:bg-red-700"
                    >
                        <Minus />
                    </button>
                    <div className="px-4 text-lg fw-bold">{quantity}</div>
                    <button
                        onClick={() => onIncrease(item?._id)}
                        className="px-1 py-1 text-md font-bold text-white bg-green-400 rounded hover:bg-green-700"
                    >
                        <Plus />
                    </button>
                </div>
            </TableCell>
            <TableCell className="hidden md:table-cell text-slate-500 font-bold">
                ₹{product?.price}
            </TableCell>
            <TableCell className="text-right text-slate-700  font-bold ">₹{product?.price! * quantity}</TableCell>
            <TableCell className="text-right text-slate-700  font-bold ">


                {/* <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setIsOpen(true)}>Share</Button>
                </DialogTrigger> */}
                <Dialog
                    // isOpen={isOpen}
                    // onOpenChange={setIsOpen}
                    triggerLabel='Delete'
                    title="Remove From Cart"
                    description="Anyone who has this link will be able to view this."
                    footer={
                        <div className="flex justify-end space-x-2">
                            <DialogClose asChild>
                                <Button variant="secondary">Close</Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={() => handleRemovetFromCart(product?._id!)}>Delete</Button>
                            {/* <Button variant="primary" onClick={() => navigator.clipboard.writeText('https://ui.shadcn.com/docs/installation')}>Copy Link</Button> */}
                        </div>
                    }
                >
                    <p>Are you sure to delete this item</p>
                </Dialog>
            </TableCell>

        </TableRow >
    )
}

export default CartRows