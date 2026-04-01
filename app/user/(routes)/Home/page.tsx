"use client"
import { useState } from "react";
import Link from "next/link";
import image from "../../../../public/HomePage/image2.png"
import Carousel from "../../../../public/HomePage/Carousel.png"
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImage from "../../../../public/HomePage/heroImage.jpg"
import { api } from "@/app/services/apiClient";
import { category, products as productType } from "@/app/utils/type";
import ProductCard from "../../_components/ProductCard";
import CarouselProductCard from "../../_components/CarouselProductCard"
import {toast} from "sonner";
const Page = () => {
    const [loading, setLoading] = useState(true);
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get("api/product?limit=8");
            return res.data.msg ?? [];
        } catch (error) {
          toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    }
    const { data: products } = useQuery<productType[]>({
        "queryKey": ["products"],
        "queryFn": fetchProducts
    });
    const fetchCategories = async () => {
        try {
            const res = await api.get("api/category");
            return res.data ?? [];
        } catch (error) {
           toast.error((error as Error).message);
        }
    }

    const { data: categories } = useQuery<category[]>({
        "queryKey": ["categories"],
        "queryFn": fetchCategories
    });

    return (
        <>
            <div className="relative w-full h-150 mt-0 xl:ml-5 2xl:ml-0 3xl:ml-0 4xl:ml-0">
                <Image src={heroImage} alt="heroImage" className="absolute inset-0 w-full h-full object-cover animate-fadeIn [animation-delay:0.6s]" />
                <div className="absolute inset-0 ml-200 mt-40 bg-[#FFF3E3] h-90 w-140 xl:ml-150 3xl:ml-200 3xl:w-170 4xl:ml-230 4xl:w-200">
                    <p className="mt-15  ml-10">NEW ARRIVAL</p>
                    <p className="mt-5  ml-10 text-5xl text-[#B88E2F] font-bold animate-fadeIn [animation-delay:0.6s]">Discover Our New Collection</p>
                    <p className="ml-10 mt-5 animate-fadeIn [animation-delay:0.8s] 3xl:text-lg 4xl:text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
                    <Button className="ml-10 pl-12 pr-12 pt-7 pb-7 text-sm mt-5 bg-[#B88E2F] rounded-none animate-fadeIn [animation-delay:0.10s]"> <Link href="/user/Shop">BUY NOW</Link></Button>
                </div>
            </div>
            <div className="mt-10 ">
                <h2 className="font-Poppins font-bold text-center text-[32px] 4xl:text-[42px] 4xl:ml-50 3xl:ml-50">Browse The Range</h2>
                <h2 className="font-Poppins font-normal text-center text-[20px] text-gray-500  4xl:ml-50 3xl:ml-50">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 2xl:ml-40 mr-35 xl:ml-70 3xl:ml-45 4xl:ml-50 mt-10 xl:gap-10  justify-center items-center">
                    {categories?.map((product: category,i) => (
                        <div key={product._id} className="opacity-0 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                            <Image src={product.image} alt="product category" width={381} height={480} className="2xl:w-95.25 h-120 3xl:w-120 xl:w-100" />
                            <h2 className="text-xl  font-normal text-gray-800 text-center  mr-20 mt-3">{product.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" mt-10 ml-30 2xl:ml-10 mr-25 ">
                <h2 className="font-Poppins font-bold text-center text-[32px] 4xl:text-[42px] 4xl:ml-50 3xl:ml-50">Our Products</h2>
                <div className="grid grid-cols-1 xl:grid-cols-3 4xl:grid-cols-3  2xl:grid-cols-4  xl:gap-10 4xl:gap-3  mt-10 2xl:ml-15 xl:ml-29 3xl:ml-10 4xl:ml-30">
                    {
                        loading ? (
                            
                            <div className="flex justify-center items-center gap-5 w-200">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 ml-100 border-gray-900"></div>
                                <span className="text-sm font-medium text-gray-700">Loading...</span>
                            </div>

                        ) : (
                        Array.isArray(products) && products.length > 0 ? (
                            products?.map((product: productType) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                    ) : (
                    <p>No products found</p>
                    )
                    )}
                </div>
                <div className="flex justify-center items-center">
                    <Button className="ml-10 pl-15 pr-15 pt-3 pb-3 text-sm mt-5 bg-white text-[#B88E2F] border-2 border-[#b88e2f] rounded-none"><Link href="/user/Shop">Show More</Link></Button>
                </div>
            </div>
            <div className="flex items-center justify-center">
            <div className=" mt-10   bg-[#FCF8F3] w-screen h-130 flex xl:ml-5 2xl:ml-0 4xl:ml-40">
                <div className="ml-25 mt-50">
                    <p className="text-[40px] font-bold text-[#3A3A3A] w-150 ">50+ Beautiful rooms inspiration</p>
                    <p className="text-[16px] font-medium text-gray-600 w-95 ">Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
                    <Button className=" pl-12 pr-12 pt-5 pb-5 text-sm mt-5 bg-[#B88E2F] rounded-none">Explore More</Button>
                </div>
                <div className="flex 3xl:ml-40 4xl:ml-70 justify-center items-center">
                    <Image src={Carousel} alt="Carousel Image" width={340} height={440} className="mt-5 ml-3 3xl:w-90 3xl:h-110" />
                    <CarouselProductCard />
                </div>
            </div>
            </div>
            <div className=" mt-10  bg-white w-full h-160 mb-40">
                <div>
                    <p className="text-[20px] font-semibold text-[#616161]  text-center">Share your setup with</p>
                    <p className="text-[40px] font-bold text-[#3A3A3A]   text-center">#FuniroFurniture</p><br />
                </div>
                <Image src={image} alt="Product Images" className=" w-500  h-full object-cover xl:ml-13" />
            </div>

        </>
    )
}

export default Page

