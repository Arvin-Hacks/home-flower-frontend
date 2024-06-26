// import Link from "next/link"
import { CircleUser, Menu, Package2, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

export function Navbar() {

    const [cookie, setCookie, removeCookie] = useCookies(['tete_user'])
    // const cookies=useCookies()
    const navigate = useNavigate()


    const handleLogout = () => {
        removeCookie('tete_user')
        navigate('/login')
    }

    console.log('cookie', cookie?.tete_user)
    return (
        // <div className="flex w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                {cookie?.tete_user?.flower && <Link
                    to="/dashboard"
                    className="text-foreground transition-colors hover:text-foreground"
                >
                    Dashboard
                </Link>}
                <Link
                    to="/"
                    className="text-muted-foreground hover:text-foreground"
                >
                    Home
                </Link>
                {cookie?.tete_user && <Link
                    to="/orders"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Orders
                </Link>}
                {cookie?.tete_user?.flower && <Link
                    to="/manage-product"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Products
                </Link>}
                {<Link
                    to="/requests"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Requests
                </Link>}
                {/* <Link
                    to="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Analytics
                </Link> */}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        {cookie?.tete_user?.flower && <Link
                            to="/dashboard"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Dashboard
                        </Link>}
                        <Link
                            to="/"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Home
                        </Link>
                        {cookie?.tete_user && <Link
                            to="/orders"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Orders
                        </Link>}
                        {cookie?.tete_user?.flower &&<Link
                            to="/manage-product"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Products
                        </Link>}
                        <Link
                            to="/requests"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Request
                        </Link>
                        {/* <Link
                            to="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Customers
                        </Link> */}
                        {/* <Link to="#" className="hover:text-foreground">
                            Settings
                        </Link> */}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        /> */}
                    </div>
                </form>
                <Link to={'/cart'}>
                    <Button variant="secondary" size="icon" className="rounded-full" >
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {cookie?.tete_user ? <>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem></> :
                            <DropdownMenuItem onClick={() => navigate('/login')}>Login</DropdownMenuItem>}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
        // </div>
    )
}
