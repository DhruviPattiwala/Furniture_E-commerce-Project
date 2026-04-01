"use client"

import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import React from 'react'

const CarouselProductCard = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
const images = [
  "/Carousel/image1.png",
  "/Carousel/image2.png",
  "/Carousel/image3.png",
  "/Carousel/image4.png",
  "/Carousel/image5.png",
];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-40 sm:max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((url, index) => (
          <CarouselItem key={index} className="">
            <div className="p-1">
              <Card className="rounded-none mt-4 ml-3 border-none">
                <CardContent className="flex aspect-square items-center justify-center p-2">
                  <Image
                    src={url} 
                    alt={`Slide ${index + 1}`} width={340} height={440}
                    className=" object-cover w-full h-full"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CarouselProductCard

 