"use client";
import PageHeader from "../../_components/PageHeader"
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image";
import productBanner from "../../../../public/products/productBanner.png"
import useCartStore from "@/app/store/cartStore";
import { CircleSmall } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { orderSchema } from "@/app/utils/validation"
import { OrderFormInputs } from "@/app/utils/type"
import { api } from "@/app/services/apiClient";
import Swal from 'sweetalert2';
import { useToken } from "@/app/hook/useToken";
import { useRouter } from "next/navigation";
const Page = () => {
    const router = useRouter();
    const emptyValue: OrderFormInputs = { firstName: "", lastName: "", Company: "", Country: "", Address: "", City: "", ZipCode: 0, Phone: "", Email: "", paymentMethod: "", }
    const tokenData = useToken();
    const { cartItems , clearCart} = useCartStore();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(orderSchema), defaultValues: emptyValue
    });
    const totalPrice = cartItems.reduce((sum, currentItem) => {
        return sum + currentItem.price * currentItem.quantity;
    }, 0);

    async function onSubmit(data: OrderFormInputs) {
        const payload = {
            customer: {
                first_name: data.firstName,
                last_name: data.lastName
            },
            user: tokenData?.id,
            companyName: data.Company,
            orderItems: cartItems.map(item => ({
                itemID: item._id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: item.quantity,
            })),
            shippingAddress: {
                address: data.Address,
                city: data.City,
                zipCode: data.ZipCode,
                country: data.Country,
            },
            paymentMethod: data.paymentMethod,
            itemsPrice: totalPrice,
            taxPrice: 1000,
            isPaid: true,
        }
        const res = await api.post("api/order", payload);
        Swal.fire({
            title:"Order Success",
            text: `${res.data.msg}`,
            icon: "success",
            draggable: true
        });
        reset(emptyValue);
        clearCart();
        router.push("/user/MyOrder");
    }


    return (
        <>
         <Suspense fallback={"loading..."}>
            <PageHeader path="CheckOut" />
            <div className="flex">
                <div>
                    <Card className="h-max  ml-60 text-black  w-120 mt-15 border-0 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-2xl text-gray-700">Billing details</CardTitle>
                        </CardHeader>
                        <CardContent >
                            <form className="" onSubmit={handleSubmit(onSubmit)} id="myForm">
                                <div className="flex flex-col gap-2">
                                    <div className="grid grid-cols-1  ml-8 lg:ml-0 w-80 lg:w-full lg:grid-cols-2 gap-x-4 gap-y-10 items-start text-gray-500">
                                        <div className="relative z-0 w-full group py-4">
                                            <Label htmlFor="firstName" className="mb-1.5">firstName</Label>
                                            <Input id="firstName" className="h-12 " placeholder=" "  {...register('firstName')} />

                                            <p className="min-h-5 text-sm text-red-600">{errors.firstName?.message}</p>
                                        </div>
                                        <div className="relative z-0 w-full  group py-4">
                                            <Label htmlFor="lastName" className="mb-1.5">lastName</Label>
                                            <Input type="text" id="lastName" className="h-12" placeholder=" " {...register('lastName')} />
                                            <p className="min-h-5 text-sm text-red-600">{errors.lastName?.message}</p>

                                        </div>
                                    </div>

                                    <div className="grid gap-2 text-gray-500 py-4">
                                        <Label htmlFor="Company">Company Name(optional)</Label>
                                        <div className="flex ">
                                            <Input className="inline-block h-12" id="Company" {...register('Company')} />
                                        </div>
                                        {errors.Company && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.Company.message}</span>}
                                    </div>
                                    <div className="input-icons grid gap-2 text-gray-500 py-4">
                                        <div className="flex items-center">
                                            <Label htmlFor="Country">Country</Label>
                                        </div>
                                        <div className="flex"> <Input id="Country" type='text' className="h-12" {...register('Country')} /></div>
                                        {errors.Country && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.Country.message}</span>}
                                    </div>
                                    <div className="input-icons grid  gap-2 py-4 text-gray-500">
                                        <div className="flex items-center">
                                            <Label htmlFor="Address">Street Address</Label>
                                        </div>
                                        <div className="flex"> <Input id="Address" type='text' className="h-12" {...register('Address')} /></div>
                                        {errors.Address && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.Address.message}</span>}
                                    </div>
                                    <div className="input-icons grid  gap-2 py-4 text-gray-500">
                                        <div className="flex items-center">
                                            <Label htmlFor="City">City</Label>
                                        </div>
                                        <div className="flex"> <Input id="City" type='text' className="h-12" {...register('City')} /></div>
                                        {errors.City && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.City.message}</span>}
                                    </div>
                                    <div className="input-icons grid  gap-2 py-4 text-gray-500">
                                        <div className="flex items-center">
                                            <Label htmlFor="ZipCode">Zip Code</Label>
                                        </div>
                                        <div className="flex"> <Input id="ZipCode" type='number' {...register('ZipCode', { valueAsNumber: true })} /></div>
                                        {errors.ZipCode && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.ZipCode.message}</span>}
                                    </div>
                                    <div className="input-icons grid  gap-2 py-4 text-gray-500">
                                        <div className="flex items-center">
                                            <Label htmlFor="Phone">Phone</Label>
                                        </div>
                                        <div className="flex"> <Input id="Phone" type='text' className="h-12" {...register('Phone')} /></div>
                                        {errors.Phone && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.Phone.message}</span>}
                                    </div>
                                    <div className="input-icons grid  gap-2 py-4 text-gray-500">
                                        <div className="flex items-center">
                                            <Label htmlFor="Email">Email</Label>
                                        </div>
                                        <div className="flex"> <Input id="Email" type='email' className="h-12" {...register('Email')} /></div>
                                        {errors.Email && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.Email.message}</span>}
                                    </div>

                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <div className=" ml-10 mt-13  w-100 h-100">
                        <div className="flex ml-9 ">
                            <p className="font-medium text-[24px]">Product </p>
                            <p className="ml-40 font-medium text-[24px] ">SubTotal </p>
                        </div>
                        {
                            Array.isArray(cartItems) && cartItems.length > 0 ? (
                                cartItems?.map((product) => (
                                    <div key={product._id} className="">

                                        <div className="flex mt-10 mb-5">
                                            <p className="w-15 font-normal ml-10 text-[#9F9F9F] text-[16px]">{product.name}   </p><span className="mr-1 ml-5 font-medium  text-[12px] mt-1">✕</span><span className="font-medium  text-[12px] mt-1">{product.quantity}</span>
                                            <div className=" font-normal  text-[#9F9F9F] ml-45 text-[12px] ">Rs.{product.quantity * product.price}.00</div>
                                        </div>
                                    </div>
                                ))
                            ) : (<div className="text-[16px] ml-10 text-[#9F9F9F]">No products found</div>)
                        }
                        <div className="flex border-b pb-5">
                            <p className="w-15 font-normal ml-10 text-[#9F9F9F] text-[16px]">  Total </p>
                            <div className=" font-bold  text-[#B88E2F] ml-50 text-[24px] ">Rs.{totalPrice}.00</div>
                        </div>
                        <div className="flex ml-10 mt-5">
                            <CircleSmall className="" /><p className="font-normal  ml-5 text-[16px]">Direct Bank Transfer</p>
                        </div>
                        <div className="ml-10 text-[16px] text-[#9F9F9F]">
                            <p className="font-light  w-100   text-[16px] mt-3">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                            <input type="radio" className="mt-5 font-medium " id="paymentMethod" value="Direct Bank Transfer" form="myForm" {...register('paymentMethod')}  /> Direct Bank Transfer
                            <br /><input type="radio" className="mt-3 font-medium" value="Cash On Delivery" id="paymentMethod" form="myForm"  {...register('paymentMethod')} /> Cash On Delivery
                            <p className="font-light w-100    text-[16px] mt-3">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</p>
                        </div>
                        <button type="submit" className=" bottom-0 mt-10 bg-white rounded-md border  text-black border-black hover:bg-black hover:text-white w-50 py-2 ml-36 " form="myForm" >
                            Place order
                        </button>
                    </div>
                </div>
            </div>
            <Image src={productBanner} alt="heroImage" className=" w-full h-full mt-5 " />
             </Suspense>           
        </>
    )
}

export default Page