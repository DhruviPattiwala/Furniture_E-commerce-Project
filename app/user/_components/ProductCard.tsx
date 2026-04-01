"use client";

import { useToken } from "@/app/hook/useToken";
import Share from "../../../public/common/share.png"
import Compare from "../../../public/common/compare.png"
import { Heart } from "lucide-react";
import { products as productType } from "@/app/utils/type";
import Image from 'next/image';
import useCartStore from "@/app/store/cartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/app/hook/useWishList";


const ProductCard = ({ product }: { product: productType }) => {

    const tokenData = useToken();
    const router = useRouter();
    const addToCart = useCartStore((state) => state.addToCart);
    const { addToWishlist, wishlist } = useWishlist(tokenData?.id || '');
    const [isLiked, setIsLiked] = useState(false);

    const isInWishlist = wishlist.some((item) => {
        if (!item) return false;
        return String(item._id) === String(product._id);
    });

    const toggleWishlist = async (product: productType) => {
        setIsLiked(!isLiked);
        const payload = {
            user: tokenData?.id || '',
            itemID: product._id,
        }
        addToWishlist(payload);
    };
    function productDetails(id: string, product: productType) {
        addToCart(product);
        const productID = new URLSearchParams({ id: id }).toString();
        router.push(`/user/ProductDetail?${productID}`);
    }
    return (
        <div key={product?._id} className="bg-[#F4F5F7] 2xl:w-80 xl:w-80 3xl:w-90 4xl:w-120 relative group overflow-hidden ">
            <Image src={product?.image} alt="product" width={320} height={360} className="w-full h-90 object-cover " />
            {product?.discount > 0 && (
                <div className="absolute top-6 right-6 bg-[#E97171] text-white w-13 h-13 rounded-full p-2 flex items-center justify-center text-sm font-semibold shadow-md">
                    {`-${product?.discount}%`}
                </div>
            )}
            {product?.status === "New" && (
                <div className="absolute top-6 right-6 bg-[#2EC1AC] text-white w-13 h-13 rounded-full p-2 flex items-center justify-center text-sm font-semibold shadow-md">
                    {`${product?.status}`}
                </div>
            )}
            <div className="p-4">
                <p className="text-[24px] font-semibold text-[#3A3A3A]">{product?.name}</p>
                <p className="text-[16px] font-medium text-[#898989]">{product?.description}</p>
                {product?.discount == 0 && (<p className="text-[20px] font-semibold text-[#3A3A3A]">Rp.{product?.price}.000</p>)}
                {product?.discount > 0 && (
                    <div className="flex"><p className="text-[20px] font-semibold text-[#3A3A3A]">Rp.{product?.discountPrice}.000</p><p className="text-[16px] font-normal text-[#B0B0B0]"><del className=" ml-10">Rp.{product?.price}.000</del></p></div>
                )}

            </div>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" >
                <button className={`bg-white  font-semibold py-2 px-6 mb-5 mt-10 transition-colors duration-200 ${product?.stock === 0 ? 'text-red-600' : 'text-yellow-600'}`} onClick={() => productDetails(product._id!, product)} disabled={product?.stock === 0}>{product?.stock === 0 ? "Out Of stock" : "Add to Cart"}</button>
                <div className="flex mb-30" >
                    <div className=" ml-1"><p className="text-white text-[16px] font-semibold flex"><Image src={Share} alt="product" width={20} height={20} className="w-5 h-5 mt-0.5" />Share</p></div>
                    <div className="ml-6 mr-5"><p className="text-white text-[16px] font-semibold flex"><Image src={Compare} alt="product" width={20} height={20} className="w-5 h-5 mt-0.5" />Compare</p></div>
                    <div className="ml-2 mr-1"><p className="text-white text-[16px] font-semibold flex"><button><Heart onClick={() => toggleWishlist(product)}
                        className={isInWishlist ? 'fill-red-500 ' : 'text-white'}
                    /></button>Like</p></div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard

