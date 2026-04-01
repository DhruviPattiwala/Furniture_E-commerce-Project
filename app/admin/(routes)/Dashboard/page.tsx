"use client"
import { Suspense } from "react"
import sofas1 from "../../../../public/products/sofas.png"
import users from "../../../../public/cardIcons/users.png"
import sales from "../../../../public/cardIcons/sales.png"
import orders from "../../../../public/cardIcons/orders.png"
import pending from "../../../../public/cardIcons/pending.png"
import { useState, useEffect, useCallback } from "react";
import { ChangeEvent } from "react";
import SalesChart from "../../_components/SalesChart";
import { fetchDashboardData } from "@/app/utils/dashBoardData";
import StatusCard from "../../_components/StatusCard";
import { products as productType } from "@/app/utils/type";
import { api } from "@/app/services/apiClient"
import Image from "next/image"
import {toast} from "sonner";
interface CardProps {
    totalUsers: number; totalOrders: number; totalSales: number; totalPending: number;
}
const Page = () => {

    const [chartType, setChartType] = useState("");
    const [data, setData] = useState<CardProps>();
    const handleChartChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setChartType(event.target.value);
    };

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<productType[]>([]);
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get(`api/order`);
            setProducts(res.data.DeliveredProducts ?? []);
        } catch (error) {
           toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            fetchProducts();
        }, 0);
    }, [fetchProducts]);
    useEffect(() => {
        async function loadData() {
            try {
                const result = await fetchDashboardData();
                setData(result);
            } catch (err) {
                toast.error((err as Error).message);
            }
        }

        loadData();
    }, []);
    const cardData = [
        { title: 'Total Users', value: data?.totalUsers, icon: users.src, rate: "8.5%", msg: " Up from yesterday" },
        { title: 'Total Orders', value: data?.totalOrders, icon: orders.src, rate: "1.3%", msg: " Up from past week" },
        { title: 'Total Sales', value: data?.totalSales, icon: sales.src, rate: "2.5%", msg: " Up from last month" },
        { title: 'Total Pending', value: data?.totalPending, icon: pending.src, rate: "1.8%", msg: " Up from yesterday" },
    ];

    return (
        <>
       
            <Suspense fallback={"loading..."}>
            <div className="flex mt-5 mb-5 mr-10">
          
                {cardData.map((card) => (
                    <StatusCard key={card.title} title={card.title} value={card.value ?? 0} icon={card.icon} rate={card.rate} msg={card.msg} />))}
                   
            </div>


            <div className='border rounded-2xl shadow-lg bg-white p-4 mr-10 w-327 2xl:w-327 xl:w-313 3xl:w-330 4xl:w-403 '>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-Poppins font-bold text-[32px] ml-7 text-gray-700">Sales Details</h2>
                    <select name="" id=""   className="pl-5 pr-5 mt-5 mb-5 ml-225 text-[20px] text-[#9F9F9F] font-normal block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm appearance-none cursor-pointer"
                        onChange={handleChartChange}>
                        <option value="DateWise">Date Wise</option>
                        <option value="MonthWise">Month Wise</option>
                        <option value="YearWise">Year Wise</option>
                    </select>
                </div>
                
                <div className="w-full h-62.5 lg:h-75 xl:h-87.5 2xl:h-100">
                    <SalesChart chartType={chartType} />
                </div>
            </div>

            <div className=' border rounded-2xl  shadow-lg p-5 mt-5 w-327 2xl:w-327 xl:w-313 3xl:w-330 4xl:w-403'>
                <p className="font-Poppins font-bold  text-[32px] ml-7 text-gray-700 pb-5">Deals Details</p>
                <table className="w-full  table-fixed rounded-xl mr-5">
                    <thead className="bg-gray-100 rounded-xl ">
                        <tr >
                            <th></th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'> Name</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Location</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date - Time</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Piece</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200 '>

                        {
                            loading ? (
                                <tr>
                                    <td className="h-24 text-center">
                                        <div className="flex justify-center items-center ml-140 gap-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                                            Loading...
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                Array.isArray(products) && products.length > 0 ? (
                                    products?.map((product) => (
                                        <tr key={product._id}>
                                            <td>
                                                <Image src={product.image || sofas1} alt="product Image" width={80} height={80} className="w-20 h-20 mt-2 rounded-full p-2" />
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>{product.name}</td>
                                            <td className='px-6 py-4 comma-wrap'><p className="w-5">{product.shippingAddresses}</p>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>{new Date(product.DeliverTime).toLocaleDateString('en-CA')}</td>
                                            <td className='px-6 py-4 whitespace-nowrap'>{product.totalSold}</td>
                                            <td className='px-6 py-4 whitespace-nowrap'>${product.totalRevenue}</td>
                                            <td className='px-6 py-4 whitespace-nowrap'><span className="bg-[#00B69B] pl-3 pr-3 pt-1 pb-1 text-white rounded-full">{product.status}</span></td>
                                        </tr>

                                    ))
                                ) : (
                                    <tr><td>No products found</td></tr>
                                )
                            )}

                    </tbody>
                </table>
            </div>
            </Suspense>
        </>

    )
}

export default Page
