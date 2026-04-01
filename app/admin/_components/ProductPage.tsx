"use client"
import { products as ProductType } from '@/app/utils/type'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'
import { Plus } from "lucide-react"
const ProductPage = ({searchProduct}:{searchProduct:string}) => {
  const [editproduct, setEditProduct] = useState<ProductType | null>(null);
  const [open, setOpen] = useState(false);
   const [refresh, setRefresh] = useState(false);
   
  function handleEdit(product: ProductType) {
    setEditProduct(product);
    setOpen(true);
  }

  function handleAdd() {
    setEditProduct(null);
    setOpen(true);
  }
  function closeDialog() {
    return setOpen(false);
  }

  return (
    <>
    <Suspense fallback="Loading....">
      <div className="flex-1 p-4">
        <div className="w-full overflow-x-auto">
         <div className='flex bg-[#e0e7f3] rounded-xl mt-5  w-full'>
            <h2 className="font-Poppins font-bold text-center text-[32px] xl:text-[19px] lg:text-[15px] text-gray-700 p-5 4xl:text-[22px]">Product Catalog</h2> <Button className="bg-[#4880FF] text-white p-5.5 rounded-md ml-185 lg:ml-100  xl:ml-135  2xl:ml-200  mt-5 4xl:w-50 4xl:text-xl 4xl:p-7 4xl:ml-240  4xl:mb-3 3xl:ml-220 2xl:mb-3.5 xl:mr-30 " onClick={() => handleAdd()}><Plus />Add New Product</Button></div><br />
          <ProductTable  onEdit={handleEdit} searchProduct={searchProduct} setRefresh={setRefresh} refresh={refresh}/></div></div>
      <ProductForm openEmpDialog={open} closeEmpDialog={closeDialog} setOpen={setOpen} editProductData={editproduct} setRefresh={setRefresh}/>
      </Suspense>
    </>
  )
}

export default ProductPage

