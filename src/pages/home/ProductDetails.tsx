import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { getAProductDetailsApi } from '@/features/product/product.Slice';
import { useAppDispatch, useAppSelector } from '@/utils/dispatchconfig';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Autoplay from "embla-carousel-autoplay"
// import { Carousel } from '@headlessui/react';
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
// import { Button } from '@shadcn/button';
// import { Badge } from '@shadcn/badge';

const ProductDetails = () => {

    const dispatch = useAppDispatch()
    const { id } = useParams()

    const { getProductsDetailsData: product, loading } = useAppSelector(store => store.productReducer)

    useEffect(() => {
        id && dispatch(getAProductDetailsApi(id))
    }, [])

    console.log('product', product)


    const images = [
        '/images/apple1.jpg',
        '/images/apple2.jpg',
        '/images/apple3.jpg',
        '/images/apple4.jpg',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4" style={{backgroundColor:"rgb(229 246 255)"}}>
            <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl">
                <div className="relative flex-shrink-0 w-full lg:w-1/2 h-80 lg:h-auto">
                    <div className="absolute inset-0 flex items-center justify-between">
                        <button onClick={handlePrevious} className="p-2 bg-white bg-opacity-50 rounded-full">
                            <ChevronLeftIcon className="w-6 h-6" />
                        </button>
                        <button onClick={handleNext} className="p-2 bg-white bg-opacity-50 rounded-full">
                            <ChevronRightIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full max-w-xs"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >

                        <CarouselContent>
                            {/* {Array.from({ length: 5 }).map((_, index) => ( */}
                            {product?.data?.imageUrl.map((imgae: string, index: number) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                                <img
                                                    className="object-cover w-full h-full"
                                                    src={imgae}
                                                    alt={product?.data?.title} />
                                            </CardContent>

                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    {/* <img
                        src={images[currentIndex]}
                        alt={`Product Image ${currentIndex + 1}`}
                        className="object-cover w-full h-full"
                    /> */}
                </div>
                <div className="flex flex-col p-6 space-y-4 lg:w-1/2">
                    <Badge variant="outline" className="absolute right-3 top-3">
                        Output
                    </Badge>
                    <h1 className="text-2xl font-bold">{product?.data?.title}</h1>
                    <p className="text-xl text-red-500">Rs&npbsp;{product?.data?.price}</p>
                    <div>
                        <h2 className="text-lg font-semibold">Select a color</h2>
                        <div className="flex space-x-2 mt-2">
                            <span className="w-6 h-6 bg-green-400 rounded-full"></span>
                            <span className="w-6 h-6 bg-red-400 rounded-full"></span>
                            <span className="w-6 h-6 bg-yellow-400 rounded-full"></span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Description</h2>
                        <p>{product?.data?.description}</p>
                        {/* <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Apples are nutritious</li>
                            <li>Apples may be good for weight loss</li>
                            <li>Apples may be good for bone health</li>
                            <li>They're linked to a lower risk of diabetes</li>
                        </ul> */}
                    </div>
                    <Button className="self-start mt-4 bg-red-500 text-white">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
