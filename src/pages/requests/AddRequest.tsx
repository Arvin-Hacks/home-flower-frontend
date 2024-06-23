import {
    CornerDownLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getImageSrc } from "@/utils/helper"
import UploadButton from "@/components/comman/Fileupload"
import { useAppDispatch } from "@/utils/dispatchconfig"
import { useToast } from "@/components/ui/use-toast"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { RequestProduct } from "@/type"
import { AddProductRequestApi } from "@/features/requests/requestsSlice"
import { useNavigate } from "react-router-dom"

export default function AddRequest() {

    const dispatch = useAppDispatch()
    const Navigate = useNavigate()

    const { toast } = useToast()

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Please Enter Product Name"),
        // category: Yup.string().required("Please Enter Product category"),
        // price: Yup.number().required("Please Enter Product Price"),
        images: Yup.array()
            // .of(
            //   Yup.mixed().test('fileFormat', 'Unsupported Format', value => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
            // )
            .min(1, 'Upload at least one product image')
            .required('Upload at least one product image'),
    })

    const initialValues: RequestProduct = {
        title: '',
        description: '',
        // category: '',
        // price: null,
        // status: '',
        images: []
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log('product values', values)
            const data = {
                title: values.title,
                description: values.description,
            }
            const formdata = new FormData()

            formdata.append('product', JSON.stringify(data))

            if (values.images) {
                values.images.forEach((image) => {
                    formdata.append(`images`, image);
                });

                dispatch(AddProductRequestApi(formdata)).then(res => {

                    console.log('res', res)
                    if (res.type === 'request/add/fulfilled') {
                        formik.resetForm()
                        Navigate('/requests')
                    }
                })

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
        <div className="grid h-screen w-full pl-[6px]">
            <div className="flex flex-col">
                <main className="grid flex-1 gap-4 overflow-auto lg:p-4 sm:p-1 md:grid-cols-2 lg:grid-cols-3">
                    <div
                        className="relative  flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
                    >
                        {/* <form className="grid w-full items-start gap-6"> */}
                        {/* <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Settings
                                </legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="model">Model</Label>
                                    <Select>
                                        <SelectTrigger
                                            id="model"
                                            className="items-start [&_[data-description]]:hidden"
                                        >
                                            <SelectValue placeholder="Select a model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="genesis">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <Rabbit className="size-5" />
                                                    <div className="grid gap-0.5">
                                                        <p>
                                                            Neural{" "}
                                                            <span className="font-medium text-foreground">
                                                                Genesis
                                                            </span>
                                                        </p>
                                                        <p className="text-xs" data-description>
                                                            Our fastest model for general use cases.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="explorer">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <Bird className="size-5" />
                                                    <div className="grid gap-0.5">
                                                        <p>
                                                            Neural{" "}
                                                            <span className="font-medium text-foreground">
                                                                Explorer
                                                            </span>
                                                        </p>
                                                        <p className="text-xs" data-description>
                                                            Performance and speed for efficiency.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="quantum">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <Turtle className="size-5" />
                                                    <div className="grid gap-0.5">
                                                        <p>
                                                            Neural{" "}
                                                            <span className="font-medium text-foreground">
                                                                Quantum
                                                            </span>
                                                        </p>
                                                        <p className="text-xs" data-description>
                                                            The most powerful model for complex computations.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="temperature">Temperature</Label>
                                    <Input id="temperature" type="number" placeholder="0.4" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="top-p">Top P</Label>
                                        <Input id="top-p" type="number" placeholder="0.7" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="top-k">Top K</Label>
                                        <Input id="top-k" type="number" placeholder="0.0" />
                                    </div>
                                </div>
                            </fieldset> */}
                        <fieldset className="grid gap-6 rounded-lg border p-4">
                            <legend className="-ml-1 px-1 text-sm font-medium">
                                Messages
                            </legend>
                            <div className="grid gap-3">
                                <Label htmlFor="role">Role</Label>
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
                                            {(formik.errors.images || formik.touched.images) &&
                                                <Label htmlFor="images" className="text-red-400">{formik.errors.images}</Label>
                                            }
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="Title">Title</Label>
                                <Input
                                    id='title'
                                    placeholder="Title"
                                    className="w-full"
                                    {...formik.getFieldProps('title')}

                                />
                                {(formik.errors.title || formik.touched.title) &&
                                    <Label htmlFor="title" className="text-red-400">{formik.errors.title}</Label>
                                }

                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="Note">Note</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Request note..."
                                    className="min-h-[9.5rem]"
                                    {...formik.getFieldProps('description')}
                                />
                            </div>
                            <Button size="sm" className="ml-auto gap-1.5" onClick={formik.submitForm}>
                                Send Request
                                <CornerDownLeft className="size-3.5" />
                            </Button>
                        </fieldset>
                        {/* </form> */}
                    </div>
                    {/* <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                        <Badge variant="outline" className="absolute right-3 top-3">
                            Output
                        </Badge>
                        <div className="flex-1" />
                        <form
                            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
                        >

                            <Label htmlFor="message" className="sr-only">
                                Message
                            </Label>
                            <Textarea
                                id="message"
                                placeholder="Type your message here..."
                                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                            />
                            <div className="flex items-center p-3 pt-0">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Paperclip className="size-4" />
                                                <span className="sr-only">Attach file</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">Attach File</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Mic className="size-4" />
                                                <span className="sr-only">Use Microphone</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">Use Microphone</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                    Send Message
                                    <CornerDownLeft className="size-3.5" />
                                </Button>
                            </div>
                        </form>
                    </div> */}
                </main>
            </div>
        </div>
    )
}
