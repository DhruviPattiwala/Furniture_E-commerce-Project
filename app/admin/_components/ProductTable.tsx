"use client"
import sofas1 from "../../../public/products/sofas.png"
import { useQuery } from "@tanstack/react-query";
import { api } from '@/app/services/apiClient';
import { useEffect, useCallback, useState } from 'react';
import { useProducts } from "@/app/hook/useProduct";
import Image from 'next/image';
import { PencilLine, Trash2 } from "lucide-react"
import { toast } from "sonner";
import { products as productType } from "@/app/utils/type";
import Pagination from '@/app/user/_components/Pagination';
interface TableProps {

    refresh: boolean,
    onEdit: (product: productType) => void
    setRefresh: (data: boolean) => void
    searchProduct: string
}
const ProductTable = ({ onEdit, setRefresh, searchProduct }: TableProps) => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ["products", totalPage, page, searchProduct],
        queryFn: async () => {
            const res = await api.get(
                `api/product?limit=4&currentPage=${page}&query=${searchProduct}`
            );
            return res.data;
        },
        enabled: true,
        staleTime: 1000,
    });
    const products = data?.msg || [];
    useEffect(() => {
        setTimeout(() => {
            if (data?.totalPages) {
                setTotalPage(data.totalPages);
            }
        }, 0);

    }, [data]);
   

    const { deleteProduct } = useProducts();
    function removeProduct(id: string) {
        deleteProduct(id);
        setRefresh(true);
        toast.success(`Product remove successfully`, { duration: 2000 })
    }

    return (
        <div>

            <table className="w-full  table-fixed rounded-xl mr-5">

                <thead className="bg-gray-100 rounded-xl ">
                    <tr >
                        <th></th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'> Name</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Discount</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Discount Price</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Edit</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Delete</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>

                    {
                        isLoading ? (
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
                                    <tr key={product._id} className="border-t hover:bg-gray-100 transition">

                                        <td>
                                            <Image src={product.image || sofas1} alt="product Image" width={80} height={80} className="w-20 h-20 mt-2 rounded-full p-2" />
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{product.name}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{product.description}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>Rs.{product.price}.00</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{product.discount}%</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>Rs.{product.discountPrice}.00</td>
                                        <td className='px-6 py-4 whitespace-nowrap'><button><PencilLine className='text-[#4880FF]' onClick={() => onEdit(product)} /></button></td>
                                        <td className='px-6 py-4 whitespace-nowrap'><Trash2 className='text-red-400' onClick={() => removeProduct(product._id!)} /></td>
                                    </tr>

                                ))
                            ) : (
                                <tr><td>No products found</td></tr>
                            )
                        )
                    }

                </tbody>
            </table>
            <Pagination totalPages={totalPage} currentPage={page} setPage={setPage} />
        </div>
    )
}

export default ProductTable

