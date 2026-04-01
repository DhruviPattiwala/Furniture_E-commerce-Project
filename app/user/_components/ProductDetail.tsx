'use client';
import { Suspense } from 'react';
import useCartStore from "@/app/store/cartStore";
import { useSearchParams } from 'next/navigation';
import { api } from "@/app/services/apiClient";
import { products as productType } from "@/app/utils/type";
import { useQuery } from "@tanstack/react-query";
import StarRating from './StarRating';
import Image from "next/image";
import line from "../../../public/common/line.png"
import sofas1 from "../../../public/products/sofas.png"
import sofas2 from "../../../public/products/sofass.png"
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {toast} from "sonner";

const ProductDetail = () => {
    const { addToCart, cartItems, updateQty } = useCartStore();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const cartItem = cartItems.find((item) => item._id === id);
    const quantity = cartItem ? cartItem.quantity : 0;
    const fetchProducts = async () => {
        try {
            const res = await api.get(`api/product/${id}`);
            return res.data.msg ?? [];
        } catch (error) {
            toast.error((error as Error).message);
        }
    }
    const { data: product } = useQuery<productType | undefined>({
        "queryKey": ["products"],
        "queryFn": fetchProducts
    });

    const fetchProductsByCategory = async (categoryId: string) => {
        try {
            const res = await api.get(`api/product/?category=${categoryId}`);
            return res.data.msg ?? [];
        } catch (error) {
           toast.error((error as Error).message);
        }
    }
    const { data: relatedProducts } = useQuery({
        queryKey: ["relatedProducts", product?.category],
        queryFn: () => fetchProductsByCategory(product?.category || ""),
    });

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <div >
                    <div className='border-b-2  pb-10'>
                        <div className=" w-full h-20 mt-0 bg-[#F9F1E7]">
                            <p className=" p-5.5 ml-5 flex"><span className='text-[#9F9F9F] m-3'>Home</span> <span className='font-extrabold m-3'>{'>'} </span><span className='text-[#9F9F9F] m-3'>Shop</span> <span className='font-extrabold m-3 mr-7'>{'>'} </span>
                                <Image src={line} alt="separator" width={2} height={40} className="w-0.5 h-10 mb-2" /> <span className='m-3 ml-7'>{product?.name}</span></p>
                        </div>

                        <div className='flex'>
                            <div className="ml-22 mt-9">
                                <span><Image src={product?.image || sofas1} alt="product category" width={88} height={88} className="w-22 h-22 mt-2 rounded-2xl" /></span>
                                <span><Image src={product?.image || sofas1} alt="product category" width={88} height={88} className="w-22 h-22 mt-2 rounded-2xl" /></span>
                                <span><Image src={product?.image || sofas1} alt="product category" width={88} height={88} className="w-22 h-22 mt-2 rounded-2xl" /></span>
                                <span><Image src={product?.image || sofas1} alt="product category" width={88} height={88} className="w-22 h-22 mt-2 rounded-2xl" /></span>
                            </div>
                            <div className='w-95.25 h-120 mt-10  ml-10  bg-[#F9F1E7] rounded-2xl'>
                                <Image src={product?.image || sofas1} alt="product category" width={381} height={480} className="w-95.25 h-120 rounded-2xl" />
                            </div>
                            <div>
                                <p className='text-[46px] fort-normal ml-25 mt-7'> {product?.name}</p>
                                <p className='text-[24px] text-[#9F9F9F] fort-medium ml-27 mt-5'> Rs.{product?.price}.00</p>
                                <div className='flex'><div className='ml-27 mt-5 inline-block'><StarRating rating={product?.rating} /></div>
                                    <Image src={line} alt="separator" width={2} height={40} className="w-0.5 h-10 m-5" />
                                    <p className='text-[13px]  fort-normal  mt-6 w-130 text-[#9F9F9F]'> 5 Customer Review</p>
                                </div>
                                <p className='text-[13px]  fort-normal ml-27 mt-2 w-130 '> {product?.description} , Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil earum dolor commodi sed deserunt id, expedita optio sequi quasi repellendus ab, iste tempore? Hic corporis assumenda quas ex quae adipisci!</p>
                                <div className='flex border-b-2 ml-27 pb-10'>
                                    <div className='border border-[#9F9F9F] p-4 w-30 mt-8  rounded-md flex'>
                                        <button className='font-medium text-[16px] mr-5 ' onClick={() => updateQty(product!._id!, quantity - 1)} disabled={quantity == 0} >-</button>
                                        <span className='font-normal text-[16px] ml-2 mt-1' onClick={() => alert(quantity)}>{quantity}</span>
                                        <button className='font-medium text-[16px] ml-5 ' disabled={quantity >= (product?.stock ?? 0) || (product?.stock ?? 0) === 0}
                                            onClick={() => updateQty(product!._id!, quantity + 1)}>+</button>
                                    </div>
                                    <button className={`font-normal text-[20px] mr-5 border border-black  p-4 w-50 mt-8 ml-3 rounded-2xl hover:bg-black hover:text-[#F9F1E7] ${product?.stock === 0 ? 'text-red-600' : 'text-yellow-600'} `} disabled={quantity >= (product?.stock ?? 0) || (product?.stock ?? 0) === 0}
                                        onClick={() => addToCart(product!)}>{product?.stock === 0 ? "Out Of stock" : "Add to Cart"}</button>
                                        {
                                            quantity >= (product?.stock ?? 0) || (product?.stock ?? 0) === 0 ? <p className='text-red-700 font-bold text-[16px] mt-12'>Sorry, This item just went out of stock</p> : <p></p>

                                        }
                                </div>
                                <div className='ml-27 mt-10'>
                                    <p className='font-normal text-[#9F9F9F] text-[16px]'><span className='m-25 ml-2 '>SKU</span><span className=''>: <span className='ml-3'>SS001</span></span></p>
                                    <p className='font-normal text-[#9F9F9F] text-[16px]'><span className='m-20.5 ml-2 mr-16'>Category</span><span className=''>: <span className='ml-3'>Furniture</span></span></p>
                                    <p className='font-normal text-[#9F9F9F] text-[16px]'><span className='m-25 ml-2 '>Tags</span><span className=''>: <span className='ml-3'>Sofa, Chair, Home, Shop</span></span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=' text-center mt-10 border-b-2  pb-13'><span className='font-medium  text-[24px] m-5'>Description</span> <span className='font-normal text-[#9F9F9F] text-[24px] m-5'>Additional Information</span> <span className='font-normal text-[#9F9F9F] text-[24px] m-5'>Reviews [5]</span>
                        <p className='font-normal text-[#9F9F9F] text-[16px] mt-5 ml-40 mr-40 text-left'>Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</p>
                        <p className='font-normal text-[#9F9F9F] text-[16px] mt-5 ml-40 mr-40 text-left'>Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</p>
                        <div className='flex ml-25  mr-25 mt-10'>
                            <Image src={sofas1} alt="product category" width={600} height={320} className="w-150 h-80 rounded-2xl ml-20" />
                            <Image src={sofas2} alt="product category" width={600} height={320} className="w-150 h-80 rounded-2xl ml-7" />
                        </div>
                    </div>
                    <div >
                        <p className='font-medium text-center text-[36px] mt-10'>Related Products</p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-3 gap-x-3 mt-10 ml-13">
                            {relatedProducts?.map((product: productType) => (
                                <ProductCard key={product._id} product={product} />
                            ))}</div>
                        <div className="flex justify-center items-center">
                            <Button className="ml-15 pl-15 pr-15 pt-3 pb-3 text-sm mt-10 bg-white text-[#B88E2F] border-2 border-[#b88e2f] rounded-none"><Link href="/Shop">Show More</Link></Button>
                        </div>

                    </div>
                </div>
            </Suspense>

        </>
    )
}

export default ProductDetail