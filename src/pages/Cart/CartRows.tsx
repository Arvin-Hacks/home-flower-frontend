import { TableCell, TableRow } from '@/components/ui/table'
import { IProduct } from '@/type';
import { Minus, Plus } from 'lucide-react';
import React from 'react'
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

    const Navigate = useNavigate()


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

        </TableRow>
    )
}

export default CartRows