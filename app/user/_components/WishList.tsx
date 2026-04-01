"use client"
import { CircleX } from "lucide-react";
import { useWishlist } from "@/app/hook/useWishList";
import { useToken } from "@/app/hook/useToken";
import Image from "next/image";
import { products } from "@/app/utils/type";
interface WishListProps {
    isOpen: boolean;
    onClose: () => void;
}
const WishList = ({ isOpen, onClose }: WishListProps) => {
    const tokenData = useToken();
   
    const { wishlist, addToWishlist } = useWishlist(tokenData?.id || '');
    const toggleWishlist = async (product: products) => {
           
            const payload = {
                user: tokenData?.id || '',
                itemID: product._id,
            } 
          
                addToWishlist(payload);
        };
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={onClose}
                />
            )}

            <div id="drawer-right" className={`fixed top-0 right-0 z-50  p-4 overflow-y-auto transition-transform bg-white w-96 h-150 3xl:h-180 4xl:h-180 3xl:w-110 4xl:w-110 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} tabIndex={-1} aria-labelledby="drawer-right-label">
                <div className="border-b border-default pb-4 mb-5 flex items-center">
                    <h5 id="drawer-right" className="inline-flex items-center text-[24px] text-body font-semibold text-[#B88E2F]">WishList Cart</h5>
                    <button type="button" onClick={onClose} className="text-body bg-transparent hover:text-heading hover:bg-neutral-tertiary rounded-base w-9 h-9 absolute top-2.5 inset-e-2.5">✕</button>
                </div>
                <div>
                    <div className="flex flex-col h-120">
                        <div className="grow overflow-y-auto">
                            {
                                Array.isArray(wishlist) && wishlist.length > 0 ? (
                                    wishlist?.map((product) => (
                                        <div key={product.name} className="flex">
                                            <div>
                                                <Image src={product.image} alt="product Image" width={88} height={88} className="w-22 h-22 mt-2 rounded-2xl" />
                                            </div>
                                            <div className="mt-2 flex" >
                                                <div className="w-50">
                                                    <p className="ml-11 font-normal  text-[16px]">{product.name}</p>
                                                    <p className="ml-11 font-normal text-gray-500 text-[12px]">{product.description}</p>
                                                    <p className="ml-11 font-normal  text-[#B88E2F] text-[12px]">Rs.{product.price}.00</p>
                                                </div>

                                                <div className="">
                                                    < CircleX className="text-[#9F9F9F] mt-3" onClick={() => toggleWishlist(product)} />
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    "No products found"
                                )
                            }

                        </div>


                    </div>

                </div>

            </div>

        </>
    )
}

export default WishList

