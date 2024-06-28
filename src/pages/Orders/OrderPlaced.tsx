
import { Button } from "@/components/ui/button"
import { Link, useParams } from "react-router-dom"

export function OrderPlaced() {

    const { id } = useParams()


    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr]">
            <div className="flex flex-col min-h-screen w-full" >

                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {/* <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
                    </div> */}
                    <div
                        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                                Thanks for Ordering!
                            </h3>
                            <p className="font-semibold tracking-tight text-muted-foreground">
                                Your order has been Placed Successfully
                            </p>
                            <p className="text-sm text-muted-foreground">
                                we will reach you as soon as possible.
                            </p>
                            {/* <Button className="mt-4">Add Product</Button> */}
                            <div className="flex flex-row gap-2 uppercase text-indent-0.5">
                                <Link to={`/order-details/${id}`}>
                                    <Button className="mt-4 uppercase" variant={"outline"} >View Order</Button>
                                </Link>
                                <Link to={'/'}>
                                    <Button className="mt-4 uppercase text-white">Continue Shopping</Button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}
