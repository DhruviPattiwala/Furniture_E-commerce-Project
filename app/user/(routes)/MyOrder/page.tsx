"use client";
import sofas1 from "../../../../public/products/sofas.png"
import PageHeader from "../../_components/PageHeader"
import Image from 'next/image'
import { api } from "@/app/services/apiClient";
import { useState, useCallback, useEffect } from "react";
import { useToken } from "@/app/hook/useToken";
import { Order } from "@/app/utils/type";
import {toast} from "sonner";
const Page = () => {
    const tokenData = useToken();
    const id = tokenData?.id || "";
    const [orderData, setOrderData] = useState<Order[]>();
    const [loading, setLoading] = useState(false);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get(`api/order?userID=${id}`, {
            headers: { 'Cache-Control': 'no-cache' }
        });
            setOrderData(res.data.userOrderItem ?? []);

        } catch (error) {
           toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        setTimeout(() => {
            fetchProducts();
        }, 0);
    }, [fetchProducts]);
    return (
        <>
            <PageHeader path="My Order" />
            {
                loading ? (

                    <div className="flex justify-center items-center ml-50 mt-15 gap-2 w-200">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 ml-100 border-gray-900"></div>
                        <span className="text-sm font-medium text-gray-700">Loading...</span>
                    </div>

                ) : (
                    Array.isArray(orderData) && orderData.length > 0 ? (
                        
                        orderData?.map((order: Order) => (
                            <div
                                key={order._id.date}
                                className="w-300 ml-48 mt-3 bg-white rounded-2xl shadow-2xl hover:shadow-xl transition p-4 lg:p-5 xl:p-6 mb-4  border " >
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Order Date</p>
                                        <h2 className="font-semibold text-gray-800">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </h2>
                                    </div>
                                    <span  className={` px-3 py-1 rounded-full text-sm ${order.isDelivered ? "bg-green-100 text-green-700": "bg-yellow-100 text-yellow-700"}`}>
                                        {order.isDelivered ? "Delivered" : "Pending"}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {order.items.map((item,index) => (
                                        <div key={index} className=" flex justify-between items-center border-b pb-2">
                                            <Image src={item.image || sofas1} alt="product Image" width={80} height={80} className="w-20 h-20 mt-2 rounded-full p-2" />
                                            <div >
                                                <p className="text-gray-800 font-medium">
                                                    {item.name}
                                                </p>
                                                 <p className="text-sm text-gray-500">
                                                    Price: {item.price}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="text-gray-700 font-medium">
                                                ₹{item.price * item.quantity}
                                            </p>

                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center mt-4 pt-3 border-t">

                                    <span className="text-gray-600 font-medium">
                                        Total
                                    </span>

                                    <span className="text-lg font-bold text-gray-900">
                                        ₹{order.totalOrderAmount}
                                    </span>

                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="font-medium text-gray-500 text-[20px] text-center pt-10">No Orders Yet</p>
                    )
                )}
        </>
    )
}

export default Page