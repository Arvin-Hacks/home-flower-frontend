
import {
    ChevronLeft,
    PlusCircle,
    X,
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
import { useAppDispatch, useAppSelector } from "@/utils/dispatchconfig"
import { AddProductApi, getAProductDetailsApi, updateProductApi } from "@/features/product/product.Slice"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import RemoveIcon from "@/components/helper/RemoveIcon"


export function AddProduct() {

    const { id } = useParams()
    console.log('id', id)

    const Navigate=useNavigate()
    const dispatch = useAppDispatch()
    const { getProductsDetailsData } = useAppSelector(store => store?.productReducer)

    const { toast } = useToast()

    useEffect(() => {
        id && dispatch(getAProductDetailsApi(id)).then(rs => console.log(rs))
    }, [])

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Please Enter Product Title"),
        category: Yup.string().required("Please Enter Product category"),
        price: Yup.number().required("Please Enter Product Price"),
    })
    console.log('getProductsDetailsData?.data?.title', getProductsDetailsData?.data?.title)
    const initialValues: IProduct = {
        title: id ? getProductsDetailsData?.data?.title : '',
        category: id ? getProductsDetailsData?.data?.category : '',
        price: id ? getProductsDetailsData?.data?.price : '',
        description: id ? getProductsDetailsData?.data?.description : '',
        imageUrl: id ? getProductsDetailsData?.data?.imageUrl : [],
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
            if (!id) {
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
            }
            if (id) {

                dispatch(updateProductApi({ id, data })).then((res) => console.log('reee', res))

            }

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

    const handleRemoveImage = (index: number) => {
        // setImages(prevImages => prevImages.filter((_, i) => i !== index));        
        console.log('first', formik?.values?.images, index)
        let data = formik?.values?.images?.filter((_, i) => i !== index)
        console.log('data', data)
        formik.setFieldValue('images', data);
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-1">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-2 sm:py-0 md:gap-8">
                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            {/* <Link to={'/manage-product'}> */}
                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={()=>Navigate('/manage-product')}>
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Back</span>
                                </Button>
                            {/* </Link> */}
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                {id ? "Update" : "Add"} Product
                            </h1>
                            {/* <Badge variant="outline" className="ml-auto sm:ml-0">
                                In stock
                            </Badge> */}
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
                                                <Label htmlFor="title" className="text-left">Title</Label>
                                                <Input
                                                    id="title"
                                                    type="text"
                                                    className="w-full"
                                                    {...formik.getFieldProps('title')}
                                                    placeholder="Product Title"
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="price" className="text-left">Price</Label>
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
                                                <Label htmlFor="description" className="text-left">Description</Label>
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
                                {/* <Card x-chunk="dashboard-07-chunk-1">
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
                                </Card> */}
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">

                                <Card
                                    className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                                >
                                    <CardHeader>
                                        <CardTitle>Images</CardTitle>
                                        <CardDescription>
                                            Upload product images here
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-2">

                                            <button>
                                                <img
                                                    alt="Product img"
                                                    className="aspect-square w-full rounded-md object-cover"
                                                    height="300"
                                                    src={getImageSrc(formik.values?.images!)}
                                                    width="300"
                                                    role=""
                                                />
                                                {formik.values?.images?.[0] && <button onClick={() => handleRemoveImage(0)} className="relative bottom-3 left-6 bg-red-600 rounded-full p-1" style={{ bottom: "14.75rem", left: "6.5rem" }}>
                                                    <X className="h-4 w-4 text-white" />
                                                </button>}
                                            </button>

                                            <div className="grid grid-cols-3 gap-2">
                                                <button>
                                                    <img
                                                        alt="Product img"
                                                        className="aspect-square w-full rounded-md object-cover"
                                                        height="84"
                                                        src={getImageSrc(formik.values?.images!, 1) ?? '/img.png'}
                                                        width="84"
                                                    />
                                                    {formik.values?.images?.[1] && <RemoveIcon onClick={() => handleRemoveImage(1)} />}
                                                </button>
                                                <button>
                                                    <img
                                                        alt="Product img"
                                                        className="aspect-square w-full rounded-md object-cover"
                                                        height="84"
                                                        src={getImageSrc(formik.values?.images!, 2) ?? '/img.png'}
                                                        width="84"
                                                    />
                                                    {formik.values?.images?.[2] && <RemoveIcon onClick={() => handleRemoveImage(2)} />}

                                                </button>
                                                {!id && <UploadButton onUpload={handleFileUpload} />}
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
                            <Button size="sm" onClick={() => console.log(formik.values)}>Save Product</Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
