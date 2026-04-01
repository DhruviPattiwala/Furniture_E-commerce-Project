"use client"
import Image from "next/image";
import productBanner from "../../../public/products/productBanner.png"
import { products as productType } from "@/app/utils/type";
import { api } from "@/app/services/apiClient";
import { useState, useEffect, useCallback } from "react";
import ProductList from "./ProductList";
import Filter from "./Filter"
import Pagination from "./Pagination";
import {toast} from "sonner";
const ProductPage = ({searchProduct}:{searchProduct:string}) => {
 
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<productType[]>([]);
    const [sortData, setSortData] = useState("");
    const [resultText, setResultText] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [currentTotal, setCurrentTotal] = useState(0);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get(`api/product?sortData=${sortData}&currentPage=${page}&limit=8&query=${searchProduct}`);
            setProducts(res.data.msg ?? []);
            setTotalPage(res.data.totalPages);
            setResultText(res.data.resultText);
            setCurrentTotal(res.data.currentCount);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    }, [sortData, page,searchProduct]);

    useEffect(() => {
        setTimeout(() => {
            fetchProducts();
        }, 0);
    }, [fetchProducts]);
    return (
        <>
            <ProductList products={products} loading={loading} setIsFilterOpen={setIsFilterOpen} setSortData={setSortData} resultText={resultText} currentTotal={currentTotal} />
            <Pagination totalPages={totalPage} currentPage={page} setPage={setPage} />
            <Image src={productBanner} alt="heroImage" className="w-full h-full mt-5 4xl:ml-27" />
            <Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} setProducts={setProducts} setCurrentTotal={setCurrentTotal} setResultText={setResultText} />
        </>
    )
}

export default ProductPage