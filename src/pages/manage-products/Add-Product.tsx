
import {
    ChevronLeft,
    PlusCircle,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useToast, } from "@/components/ui/use-toast"
import UploadButton from "@/components/comman/Fileupload"
import { IProduct } from "@/type"
import { getImageSrc } from "@/utils/helper"
import { useAppDispatch } from "@/utils/dispatchconfig"
import { AddProductApi } from "@/features/product/product.Slice"


export function AddProduct() {

    const dispatch = useAppDispatch()

    const { toast } = useToast()

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Please Enter Product Title"),
        category: Yup.string().required("Please Enter Product category"),
        price: Yup.number().required("Please Enter Product Price"),
    })

    const initialValues: IProduct = {
        title: '',
        description: '',
        category: '',
        price: null,
        status: '',
        images: []
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (value) => {
            console.log('product values', value)

            const data = {
                title: value.title,
                description: value.description,
                category: value.category,
                price: value.price,
            }
            const formdata = new FormData()

            formdata.append('product', JSON.stringify(data))

            if (value.images) {
                value.images.forEach((image) => {
                    formdata.append(`images`, image);
                });

                dispatch(AddProductApi(formdata)).then(res => console.log('res', res))
            }
            // formdata.append('images',value?.images)

            toast({ title: "Product Added Successfully" })

        },
        validate(values) {
            console.log('valid value', values)
        },
    })

    const handleFileUpload = (files: FileList | null) => {
        if (files) {
            // Handle file upload logic here
            console.log(files[0]);
            const newFiles = Array.from(files);

            // Create a copy of the current images array and push new files
            const updatedImages = [...formik.values.images ?? [], ...newFiles];

            // Set the updated images array in Formik
            formik.setFieldValue('images', updatedImages);
        }
    };


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-1">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-2 sm:py-0 md:gap-8">
                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="icon" className="h-7 w-7">
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Back</span>
                            </Button>
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Pro Controller
                            </h1>
                            <Badge variant="outline" className="ml-auto sm:ml-0">
                                In stock
                            </Badge>
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Button variant="outline" size="sm">
                                    Discard
                                </Button>
                                <Button size="sm" onClick={formik.submitForm}>Save Product</Button>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <Card x-chunk="dashboard-07-chunk-0">
                                    <CardHeader>
                                        <CardTitle>Product Details</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="title"
                                                    type="text"
                                                    className="w-full"
                                                    {...formik.getFieldProps('title')}
                                                    placeholder="Product Title"
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="price">Price</Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    className="w-full"
                                                    placeholder="00.00"
                                                    {...formik.getFieldProps('price')}
                                                // defaultValue="Gamer Gear Pro Controller"
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    placeholder="Produt Description."
                                                    className="min-h-32"
                                                    {...formik.getFieldProps('description')}

                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card x-chunk="dashboard-07-chunk-2">
                                    <CardHeader>
                                        <CardTitle>Product Category</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6 sm:grid-cols-3">
                                            <div className="grid gap-3">
                                                <Label htmlFor="category">Category</Label>
                                                <Select onValueChange={(val) => formik.setFieldValue('category', val)}>
                                                    <SelectTrigger
                                                        id="category"
                                                        aria-label="Select category"
                                                    >
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="clothing">Clothing</SelectItem>
                                                        <SelectItem value="electronics">
                                                            Electronics
                                                        </SelectItem>
                                                        <SelectItem value="accessories">
                                                            Accessories
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="status">Status</Label>
                                                <Select>
                                                    <SelectTrigger id="status" aria-label="Select status">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="draft">Draft</SelectItem>
                                                        <SelectItem value="published">Active</SelectItem>
                                                        <SelectItem value="archived">Archived</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card x-chunk="dashboard-07-chunk-1">
                                    <CardHeader>
                                        <CardTitle>Stock</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[100px]">SKU</TableHead>
                                                    <TableHead>Stock</TableHead>
                                                    <TableHead>Price</TableHead>
                                                    <TableHead className="w-[100px]">Size</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="font-semibold">
                                                        GGPC-001
                                                    </TableCell>
                                                    <TableCell>
                                                        <Label htmlFor="stock-1" className="sr-only">
                                                            Stock
                                                        </Label>
                                                        <Input
                                                            id="stock-1"
                                                            type="number"
                                                            defaultValue="100"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Label htmlFor="price-1" className="sr-only">
                                                            Price
                                                        </Label>
                                                        <Input
                                                            id="price-1"
                                                            type="number"
                                                            defaultValue="99.99"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <ToggleGroup
                                                            type="single"
                                                            defaultValue="s"
                                                            variant="outline"
                                                        >
                                                            <ToggleGroupItem value="s">S</ToggleGroupItem>
                                                            <ToggleGroupItem value="m">M</ToggleGroupItem>
                                                            <ToggleGroupItem value="l">L</ToggleGroupItem>
                                                        </ToggleGroup>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-semibold">
                                                        GGPC-002
                                                    </TableCell>
                                                    <TableCell>
                                                        <Label htmlFor="stock-2" className="sr-only">
                                                            Stock
                                                        </Label>
                                                        <Input
                                                            id="stock-2"
                                                            type="number"
                                                            defaultValue="143"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Label htmlFor="price-2" className="sr-only">
                                                            Price
                                                        </Label>
                                                        <Input
                                                            id="price-2"
                                                            type="number"
                                                            defaultValue="99.99"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <ToggleGroup
                                                            type="single"
                                                            defaultValue="m"
                                                            variant="outline"
                                                        >
                                                            <ToggleGroupItem value="s">S</ToggleGroupItem>
                                                            <ToggleGroupItem value="m">M</ToggleGroupItem>
                                                            <ToggleGroupItem value="l">L</ToggleGroupItem>
                                                        </ToggleGroup>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-semibold">
                                                        GGPC-003
                                                    </TableCell>
                                                    <TableCell>
                                                        <Label htmlFor="stock-3" className="sr-only">
                                                            Stock
                                                        </Label>
                                                        <Input
                                                            id="stock-3"
                                                            type="number"
                                                            defaultValue="32"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Label htmlFor="price-3" className="sr-only">
                                                            Stock
                                                        </Label>
                                                        <Input
                                                            id="price-3"
                                                            type="number"
                                                            defaultValue="99.99"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <ToggleGroup
                                                            type="single"
                                                            defaultValue="s"
                                                            variant="outline"
                                                        >
                                                            <ToggleGroupItem value="s">S</ToggleGroupItem>
                                                            <ToggleGroupItem value="m">M</ToggleGroupItem>
                                                            <ToggleGroupItem value="l">L</ToggleGroupItem>
                                                        </ToggleGroup>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                    <CardFooter className="justify-center border-t p-4">
                                        <Button size="sm" variant="ghost" className="gap-1">
                                            <PlusCircle className="h-3.5 w-3.5" />
                                            Add Variant
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                
                                <Card
                                    className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                                >
                                    <CardHeader>
                                        <CardTitle>Product imgs</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-2">
                                            <img
                                                alt="Product img"
                                                className="aspect-square w-full rounded-md object-cover"
                                                height="300"
                                                src={getImageSrc(formik.values?.images!)}
                                                width="300"
                                            />
                                            <div className="grid grid-cols-3 gap-2">
                                                <button>
                                                    <img
                                                        alt="Product img"
                                                        className="aspect-square w-full rounded-md object-cover"
                                                        height="84"
                                                        src={getImageSrc(formik.values?.images!, 1)}
                                                        width="84"
                                                    />
                                                </button>
                                                <button>
                                                    <img
                                                        alt="Product img"
                                                        className="aspect-square w-full rounded-md object-cover"
                                                        height="84"
                                                        src="/placeholder.svg"
                                                        width="84"
                                                    />
                                                </button>
                                                <UploadButton onUpload={handleFileUpload} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>                                
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 md:hidden">
                            <Button variant="outline" size="sm">
                                Discard
                            </Button>
                            <Button size="sm" onClick={() => console.log(formik.values)}>Save Productsss</Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
