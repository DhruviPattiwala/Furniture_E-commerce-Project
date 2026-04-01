"use client"
import { ProductListProps } from "@/app/utils/type"
import { ChangeEvent } from "react"
import PageHeader from "./PageHeader"
import ProductCard from "./ProductCard"
import Image from 'next/image'
import filter from "../../../public/common/filter.png"
import filter2 from "../../../public/common/filter2.png"
import filter3 from "../../../public/common/filter3.png"
import { products as productType } from "@/app/utils/type";
import line from "../../../public/common/line.png"
import "../../globals.css"

const ProductList = ({ products, setIsFilterOpen, setSortData, resultText, currentTotal, loading }: ProductListProps) => {

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSortData(value);
    };
    return (
        <>
            <PageHeader path="Shop" />
            <div className=" w-full h-20 mt-0 bg-[#F9F1E7] flex 4xl:ml-0">
                <Image src={filter} alt="filter" width={24} height={24} className=" w-6 h-6 ml-40 mt-6 mr-2" />
                <p className="font-normal cursor-pointer text-[20px] mt-5" onClick={() => setIsFilterOpen(true)}>Filter</p>
                <Image src={filter2} alt="filter" width={24} height={24} className=" w-6 h-6 ml-10 mt-6 mr-2" />
                <Image src={filter3} alt="filter" width={24} height={24} className=" w-6 h-6 ml-10 mt-6 mr-2" />
                <Image src={line} alt="separator" width={2} height={40} className="w-0.5 h-10 mt-3 ml-10" />
                <p className="font-normal text-[16px] ml-10 mt-6">{resultText}</p>
                <p className="font-normal text-[20px] ml-90 mt-5"> Show</p>
                <span className="pl-5 pr-5 mt-5 mb-5    text-[20px] text-[#9F9F9F] font-normal ml-5 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm appearance-none">{currentTotal}</span>
                <p className="font-normal text-[20px] ml-10 mt-5"> Short by</p>
                <select name="" id="" className="pl-5 pr-5 mt-5 mb-5    text-[20px] text-[#9F9F9F] font-normal ml-5 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm appearance-none cursor-pointer" onChange={handleSortChange}>
                    <option value="" >Default</option>
                    <option value="Name_asc">Name - A-Z</option>
                    <option value="Name_dsc">Name - Z-A</option>
                </select>
            </div>

            <div className="2xl:ml-35 mr-35 xl:ml-45 3xl:ml-8 3xl:mr-0 4xl:ml-30 4xl:mr-0">
                <div className="grid grid-cols-1 2xl:grid-cols-4 4xl:grid-cols-3 xl:grid-cols-3 4xl:gap-y-5 4xl:gap-x-5 3xl:gap-y-2 3xl:gap-x-2  gap-y-3 gap-x-3  mt-10">
                    {
                        loading ? (

                            <div className="flex justify-center items-center gap-2 w-200">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 ml-100 border-gray-900"></div>
                                <span className="text-sm font-medium text-gray-700">Loading...</span>
                            </div>

                        ) : (
                            Array.isArray(products) && products.length > 0 ? (
                                products?.map((product: productType, i) => (
                                <div key={product._id} className="opacity-0 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                                        <ProductCard product={product} />
                                </div>
                                ))
                            ) : (
                                <p className="font-medium text-gray-500 text-[20px] text-center pt-10">No products found</p>
                            )
                        )}
                </div>
            </div>

        </>
    )
}

export default ProductList