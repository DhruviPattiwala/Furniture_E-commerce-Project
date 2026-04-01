"use client";
import PageHeader from "../../_components/PageHeader"
import useCartStore from "@/app/store/cartStore";
import Image from "next/image";
import { Trash } from "lucide-react";
import productBanner from "../../../../public/products/productBanner.png"
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const { removeItem, cartItems } = useCartStore();
    const totalPrice = cartItems.reduce((sum, currentItem) => {
        return sum + currentItem.price * currentItem.quantity;
    }, 0);
    function goToCheckOut() {
            router.push("/user/CheckOut");
    }
    return (
        <>
            <PageHeader path="Cart" />
            <div className="flex">
                <table className="w-250 ml-30 mt-10">
                    <thead>
                        <tr className="bg-[#F9F1E7] font-medium text-[16px] ">
                            <th className="p-5"></th>
                            <th className="p-3">Product</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(cartItems) && cartItems.length > 0 ? (
                                cartItems?.map((product) => (
                                    <tr key={product._id}>
                                        <td className=""><Image src={product.image} alt="product Image" width={88} height={88} className="w-22 h-22 rounded-2xl mt-3" /></td>
                                        <td className="pl-15 m-2 font-normal text-[16px] text-[#888686]">{product.name}</td>
                                        <td className="pl-15 m-2 font-normal text-[16px] text-[#888686]">Rs.{product.price}.00</td>
                                        <td className="pl-15 m-2 "><span className="border rounded-xl p-2 w-5 h-5">{product.quantity}</span></td>
                                        <td className="pl-15 m-2">Rs.{product.quantity * product.price}.00</td>
                                        <td className="pl-15 m-2"><Trash className="text-[#B88E2F]" onClick={() => removeItem(product._id)} /></td>

                                    </tr>
                                ))
                            ) : (
                                <tr><td>No products found</td></tr>
                            )
                        }
                    </tbody>
                </table>
                <div className=" ml-10 mt-10 bg-[#F9F1E7] w-80 h-80">
                    <p className="font-semibold text-[32px] text-center">Cart Totals</p>
                    <p className="text-center font-medium text-[16px] mr-2 mt-10">SubTotal  <span className="font-normal text-[16px] ml-10 text-[#9F9F9F]">Rs.{totalPrice}.00</span></p>
                    <p className="text-center font-medium text-[16px] ml-5 mt-10">Total  <span className="font-medium text-[20px] ml-15 text-[#B88E2F] ">Rs.{totalPrice}.00</span></p>
                    <button className="sticky bottom-0 mt-10 bg-white rounded-md border  text-black border-black hover:bg-black hover:text-white w-50 py-2 ml-15 " onClick={goToCheckOut}>
                        Checkout
                    </button>
                </div>
            </div>
            <Image src={productBanner} alt="heroImage" className=" w-full h-full mt-5 " />

        </>
    )
}

export default Page

