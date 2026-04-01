"use client"
import useCartStore from "@/app/store/cartStore";
import Image from "next/image";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}
const Cart = ({ isOpen, onClose }: CartProps) => {
    const router = useRouter();
    const {removeItem , cartItems} = useCartStore();
    const totalPrice = cartItems.reduce((sum, currentItem) => {
        return sum + currentItem.price * currentItem.quantity;
    }, 0);
    function goToCart() {
            router.push("/user/Cart");
    }
    function goToCheckOut() {
            router.push("/user/CheckOut");
    }
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
                    <h5 id="drawer-right" className="inline-flex items-center text-[24px] text-body font-semibold text-[#B88E2F]">Shopping Cart</h5>
                    <button type="button" onClick={onClose} className="text-body bg-transparent hover:text-heading hover:bg-neutral-tertiary rounded-base w-9 h-9 absolute top-2.5 inset-e-2.5">✕</button>
                </div>
                <div>
                    <div className="flex flex-col h-120">
                        <div className="grow overflow-y-auto">
                            {
                                Array.isArray(cartItems) && cartItems.length > 0 ? (
                                    cartItems?.map((product) => (
                                        <div key={product._id} className="flex">
                                            <div><Image src={product.image} alt="product Image" width={88} height={88} className="w-22 h-22 mt-2 rounded-2xl" /></div>
                                            <div className="mt-2" ><p className="ml-11">{product.name}</p>
                                                <div className="ml-11 flex">
                                                    <div className="flex ">
                                                        <p className="w-7 m-1">{product.quantity} ✕  </p><p className='font-normal  text-[#B88E2F] text-[12px] mt-1.5'>Rs.{product.price}.00</p>
                                                    </div>
                                                    
                                                    < CircleX className="text-[#9F9F9F] ml-20" onClick={() => removeItem(product._id)} /></div>
                                                <div className="ml-11 font-normal text-[#9F9F9F] text-[12px]">SubTotal : {product.quantity * product.price}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No products found</div>
                                )
                            }

                        </div>
                        <div className="flex border-b ">
                            <p className=" ml-10 mb-2 font-normal text-[16px] ">Total </p>
                            <p className="ml-16  mb-2 font-semibold text-[#B88E2F]  text-[16px] "> ${totalPrice.toFixed(2)} </p>
                        </div>
                        <div className="flex">

                            <button className="sticky bottom-0 mt-4 bg-white rounded-full border  text-black border-black hover:bg-black hover:text-white w-150 py-2" onClick={goToCart}>
                                Cart
                            </button>
                            <button className="sticky bottom-0 mt-4 bg-white rounded-full border  text-black border-black hover:bg-black hover:text-white w-150 py-2 ml-2" onClick={goToCheckOut}>
                                Checkout
                            </button>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Cart

