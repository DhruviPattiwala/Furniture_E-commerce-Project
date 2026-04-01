import { useForm } from "react-hook-form";
import { category } from "@/app/utils/type";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/services/apiClient";
import Image from "next/image";
import filter2 from "../../../public/common/filter2.png"
import { FilterFormInputs } from "@/app/utils/type";
import { FilterProps } from "@/app/utils/type";
import {toast} from "sonner";
const Filter = ({ isOpen, onClose, setProducts , setCurrentTotal , setResultText}: FilterProps) => {

    const { register, handleSubmit,reset } = useForm({
        defaultValues: { Category: "", Price: "", Rate: "" }
    });

 

    async function onSubmit(data: FilterFormInputs) {
     
        try {
            const res = await api.get(`api/product/?category=${data.Category}&price=${data.Price}&rating=${data.Rate}`);
            setProducts(res.data.msg ?? []);
            setCurrentTotal(res.data.currentCount);
            setResultText(res.data.resultText);
            onClose();
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    const handleShowAll = () => {
    reset({ Category: '', Price: '', Rate: '' }); 
    onSubmit({ Category: '', Price: '', Rate: '' }); 
};

    const fetchCategories = async () => {
        try {
            const res = await api.get("api/category");
            return res.data ?? [];
        } catch (error) {
           toast.error((error as Error).message);
        }
    }

    const { data: categories } = useQuery<category[]>({
        "queryKey": ["categories"],
        "queryFn": fetchCategories
    });

    return (
        <>
            {isOpen && (<div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />)}

            <div id="drawer-left" className={`fixed top-0 left-0 z-50 p-4 overflow-y-auto transition-transform bg-white w-96 h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} tabIndex={-1} aria-labelledby="drawer-left-label">
                <div className="border-b border-gray-500 pb-4 mb-5 flex items-center">
                    <h5 id="drawer-left-label" className="inline-flex items-center text-[24px] text-body font-semibold text-gray-600">Filter Menu</h5>
                    <button type="button" onClick={onClose} className="text-body bg-transparent hover:text-heading hover:bg-neutral-tertiary rounded-base w-9 h-9 absolute top-2.5 right-2.5">✕</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=" border-b">
                        <div className="flex">
                            <Image src={filter2} alt="filter" width={24} height={24} className=" w-6 h-6 ml-10 mt-6 mr-2" /><label htmlFor="lastName" className="ml-5 mt-6">Category Wise Filter</label>
                        </div>
                        <select id="Category" className="pl-5 pr-5 mt-5 mb-5 w-35  text-[20px] text-gray-600 font-normal ml-22 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm appearance-none cursor-pointer" {...register('Category')}>
                            <option value="" >Default</option>
                            {categories?.map((product: category) => (
                                <option key={product._id} value={product._id}>{product.name}</option>))}
                        </select>
                    </div>
                    <div className=" border-b">
                        <div className="flex">
                            <Image src={filter2} alt="filter" width={24} height={24} className=" w-6 h-6 ml-10 mt-6 mr-2" /><label htmlFor="lastName" className="ml-5 mt-6">Price Wise Filter</label>
                        </div>
                        <select id="Price" className="pl-5 pr-5 mt-5 mb-5 w-35  text-[20px] text-gray-600 font-normal ml-22 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm appearance-none cursor-pointer" {...register('Price')}>
                            <option value="" >Default</option>
                            <option value="1000-5000">1000-5000</option>
                            <option value="6000-10000">6000-10000</option>
                            <option value=">10000">{">10000"}</option>
                        </select>
                    </div>
                    <div className=" border-b">
                        <div className="flex">
                            <Image src={filter2} alt="filter" width={24} height={24} className=" w-6 h-6 ml-10 mt-6 mr-2" /><label htmlFor="lastName" className="ml-5 mt-6">Rate Wise Filter</label>
                        </div>
                        <select id="Rate" className="pl-5 pr-5 mt-5 mb-5 w-35  text-[20px] text-gray-600 font-normal ml-22 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm appearance-none cursor-pointer" {...register('Rate')}>
                            <option value="" >Default</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="pl-5 pr-5 mt-5 mb-5  ml-25   text-[20px] text-white font-normal block  py-2 px-3 border border-gray-300 bg-black rounded-md shadow-sm focus:outline-none  sm:text-sm appearance-none cursor-pointer ">Apply Filter</button>
                </form>
                <button type="button"  onClick={handleShowAll} className="pl-5 pr-5 mt-5 mb-5  ml-25   text-[20px] text-white font-normal block  py-2 px-3 border border-gray-300 bg-black rounded-md shadow-sm focus:outline-none  sm:text-sm appearance-none cursor-pointer ">All Products</button>
            </div>
        </>
    )
}

export default Filter

