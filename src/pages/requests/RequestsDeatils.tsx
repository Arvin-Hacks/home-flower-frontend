import {
    Bird,
    Book,
    Bot,
    Code2,
    CornerDownLeft,
    LifeBuoy,
    Mic,
    Paperclip,
    Rabbit,
    Settings,
    Settings2,
    Share,
    SquareTerminal,
    SquareUser,
    Triangle,
    Turtle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/utils/dispatchconfig"
import { getProductsRequestDetailsApi } from "@/features/requests/requestsSlice"
import { useCookies } from "react-cookie"
import { AddRequestMessageApi, MessagesType } from "@/features/requests/messagesSlice"


export function RequestDetails() {

    const { id } = useParams()
    const cookie = useCookies(['user'])
    const user = JSON.parse(localStorage.getItem('user'))
    console.log('from Local', user)
    // console.log('from Local', isAdmin)

    console.log('cookie', cookie)
    const dispatch = useAppDispatch()
    const [message, setMessage] = useState('')
    const { getProductsRequestDetailsData, loading } = useAppSelector(store => store.productRequestReducer)
    const { addMessageData } = useAppSelector(store => store.messageSliceReducer)



    console.log('id', id)

    useEffect(() => {
        id && dispatch(getProductsRequestDetailsApi(id)).then(res => console.log(res))
    }, [addMessageData])

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };


    const submitMessage = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault(); // Prevent form from reloading the page

        if (message.trim() === '') {
            return; // Do nothing if the message is empty
        }

        dispatch(AddRequestMessageApi({
            message,
            userId: user?._id,
            requestId: id ?? '',
            type: user?.isAdmin ? "Admin" : 'User',
        })).then(res => console.log('message response', res))

    }

    return (
        <div className="grid h-screen w-full">
            <div className="flex flex-col">

                <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                    <div
                        className="flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
                    >
                        <div className="grid w-full items-start gap-6">
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Images
                                </legend>
                                {/* <div className="grid gap-3">
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
                                </div>                                 */}
                                <Carousel
                                    plugins={[plugin.current]}
                                    className="w-full max-w-xs"
                                    onMouseEnter={plugin.current.stop}
                                    onMouseLeave={plugin.current.reset}
                                >
                                    <CarouselContent>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                                            {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                                            <img
                                                                className=""
                                                                src={getProductsRequestDetailsData?.data?.images[0]}
                                                                alt={getProductsRequestDetailsData?.data?.title} />
                                                        </CardContent>

                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>

                            </fieldset>
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Product Deatils
                                </legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="">Title</Label>
                                    <Input
                                        id="top-p"
                                        value={getProductsRequestDetailsData?.data?.title}
                                        type="text"
                                        placeholder="Title"
                                        readOnly

                                    />

                                    {/* <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select> */}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Description"
                                        className="min-h-[9.5rem]"
                                        value={getProductsRequestDetailsData?.data?.description}
                                        // disabled
                                        readOnly


                                    />
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                        <Badge variant="outline" className="absolute right-3 top-3">
                            Output
                        </Badge>
                        <div className="flex-1 overflow-auto">
                            {getProductsRequestDetailsData?.data?.messages?.length > 0 ? getProductsRequestDetailsData?.data?.messages.map((msg: MessagesType, index: number) => (
                                <div key={index} className={`flex ${msg.type === 'User' ? 'justify-start' : 'justify-end'} mb-2`}>
                                    <div className={`p-2 rounded-lg ${msg.type === 'User' ? 'bg-blue-100' : 'bg-green-100'}`}>
                                        <p>{msg.message}</p>
                                        <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))
                                :
                                <p>No messages</p>
                            }
                        </div>
                        <form
                            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
                            onSubmit={submitMessage}
                        >
                            <Label htmlFor="message" className="sr-only">
                                Message
                            </Label>
                            <Textarea
                                id="message"
                                placeholder="Type your message here..."
                                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                                value={message}
                                onChange={handleInputChange}

                            />
                            <div className="flex items-center p-3 pt-0">
                                {/* <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip> */}
                                {/* <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip> */}
                                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                    Send Message
                                    <CornerDownLeft className="size-3.5" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}
