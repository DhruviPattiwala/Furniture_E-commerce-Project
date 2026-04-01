"use client";
import { useProducts } from "@/app/hook/useProduct";
import { useQuery } from "@tanstack/react-query";
import { category } from "@/app/utils/type";
import { type ChangeEvent } from "react";
import { useCallback, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Camera, X } from "lucide-react";
import { api } from "@/app/services/apiClient";
import { products as ProductType } from "@/app/utils/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { productSchema, type productSchemaTypes } from "@/app/utils/validation"; resolver: zodResolver(productSchema)
import "../../globals.css";

export type ProductFormProps = {
  editProductData: ProductType | null,
  openEmpDialog: boolean,
  closeEmpDialog: (open: boolean) => void
  setOpen: (open: boolean) => void
  setRefresh: (data:boolean) => void
}
function ProductForm({ openEmpDialog, closeEmpDialog, editProductData , setRefresh}: ProductFormProps) {
  
  const { addProduct, editProduct } = useProducts();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm<productSchemaTypes>({
    resolver: zodResolver(productSchema), defaultValues: { discount: 0 }
  });

  const [fileData, setFileData] = useState("");
  const [userType, setUserType] = useState<string>('');
  const [imageReview, setImageReview] = useState<string | null | undefined>(null);
  const isDiscountDisabled = userType === 'New';
  const selectedOptionProps = register("status");
  const handleUserTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    selectedOptionProps.onChange(event);
    setUserType(event.target.value);
  };

  useEffect(() => {
    if (editProductData) {
      setTimeout(() => {
        reset(editProductData);
        setFileData(editProductData.image);
        setImageReview(editProductData.image);
      }, 0);
    } else { reset({ name: "", category: "", description: "", status: "", discount: 0, price: 0, stock: 0, rating: 0 }); }
  }, [editProductData]);

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
  const resetForm = () => {
    reset({ name: "", category: "", description: "", status: "", discount: 0, price: 0, stock: 0, rating: 0 });
    clearErrors(); setFileData(""); setImageReview(null);
  };

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageReview(`/products/${file.name}`);
      const reader = new FileReader()
      reader.onload = function (e) {
        const fileData = e.target?.result as string;
        setFileData(fileData);
      }
      reader.readAsDataURL(file)
    };

  }, []);
  const handleButtonClick = useCallback(() => { fileInputRef.current?.click(); }, []);

  function handleImageCancel() {
    setFileData(""); setImageReview(null); if (fileInputRef.current) { fileInputRef.current.value = ""; }
  }

  async function onSubmit(data: productSchemaTypes) {
    setImageReview(null);
    resetForm();
    try {
      const formInput: Partial<ProductType> = { ...data, image: fileData }
      if (editProductData && editProductData._id !== null && editProductData._id !== undefined) {
        editProduct({product: formInput,id: editProductData._id});
        setRefresh(true);
        toast.success("product Edited successfully", {
        duration: 2000
      });
      } else {
        addProduct(formInput);
        setRefresh(true);
        toast.success("product added successfully", {
        duration: 2000
      });
      }
    
    } catch (error) { toast.error((error as Error).message); }
    closeEmpDialog(false)
  }
  return (


    <Dialog open={openEmpDialog} onOpenChange={closeEmpDialog}>
      <DialogContent className="w-120 lg:w-full max-w-lg m-4 overflow-y-auto  lg:overflow-y-auto sm:max-w-2xl  max-h-[90vh]" onPointerDownOutside={(e) => { e.preventDefault(); }}>
        <DialogHeader>
          <DialogTitle className="font-bold sm:ml-33 lg:ml-0">{editProductData ?'Edit Product' : 'Add New Product' }</DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">Fixed the warning</DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-fit mx-auto shadow-3xl p-2 mt-7">
          <div className="grid grid-cols-1  ml-8 lg:ml-0 w-80 lg:w-full lg:grid-cols-2 gap-x-5 gap-y-2 items-start ">
            <div className="relative z-0 w-full group">
              <label htmlFor="name" className="">Product name<span className="text-red-600">*</span></label>
              <Input id="name" className="border border-black w-70" placeholder=" "  {...register('name')} />
              <p className="min-h-5 text-sm text-red-600">{errors.name?.message}</p>
            </div>
            <div className="relative z-0 w-full  group">
              <label htmlFor="price" className="">Price<span className="text-red-600">*</span></label>
              <Input type="number" id="price" className="border border-black w-70" placeholder=" " {...register('price', { valueAsNumber: true })} />
              <p className="min-h-5 text-sm text-red-600">{errors.price?.message}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 ml-8 lg:ml-0 w-80 lg:w-full lg:grid-cols-2 gap-x-10 lg:gap-y-6 items-start  ">
            <div className="relative z-0 w-full mb-3 group">
              <label htmlFor="description" className="">Description</label>
              <textarea rows={2} className="rounded-lg block py-2.5 px-0 w-80 lg:w-70 text-sm text-heading border border-black appearance-nonefocus:outline-none focus:ring-0 focus:border-brand peer pl-3 " {...register('description')} />
            </div>
                 <div className="relative z-0 w-full  group mt-5">
              <div className="flex">
                <div className="w-70 lg:w-55   bg-transparent border-2 border-b-2 border-default-medium rounded-lg">
                  <label htmlFor="file" className=""><Camera className="ml-20" /></label><hr />
                  <button type="button" className="mb-2 ml-6 item-center" onClick={handleButtonClick}>Upload Product Image</button>
                </div>
                <div className="inline-block m-2">
                  {imageReview && <div className="flex">
                    {/* <Image src={`/products/${imageReview}` || ""} alt="profile" width={48} height={48} unoptimized className="w-12 h-12 rounded-3xl" /> 
                     */}
                    <img src={`${imageReview}` || ""} className="w-12 h-12 rounded-3xl" alt="" />
                    <X size={24} onClick={handleImageCancel} />
                  </div>
                  }
                </div>

              </div>
              <input type="file" ref={fileInputRef} id='file' onChange={handleFileChange} accept="image/png, image/gif,image/jpeg"
                className=" py-2.5 px-0 w-full text-sm text-heading border border-black appearance-none focus:outline-none focus:ring-0 focus:border-brand peer pl-3 hidden" placeholder=" " />
            </div>
          </div>
          <div className="grid grid-cols-1 ml-8 lg:ml-0 mt-5 lg:mt-0 w-80 lg:w-full lg:grid-cols-2 gap-x-10 lg:gap-y-6 items-start  ">
            <div className="relative z-0 w-full  group">
              <label htmlFor="rating" className="">Rating<span className="text-red-600">*</span></label>
              <Input id="rating" type="number" className="border border-black w-70" placeholder=" " {...register("rating", { valueAsNumber: true })} />
              <p className="min-h-5 text-sm text-red-600">{errors.rating?.message}</p>
            </div>
            <div className="relative z-0 w-full  group">
              <label htmlFor="category" className="">Category<span className="text-red-600">*</span></label>
              <select id="category" className="block py-1.5 px-0  text-sm text-heading  appearance-none focus:outline-none focus:ring-0 focus:border-brand peer pl-3 border border-black rounded-lg w-70"  {...register("category")} ><option value="">Select Category</option>
                {
                  categories?.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))
                }
              </select>
              {errors.category && <span style={{ color: 'red' }}>{errors.category.message}</span>}
            </div>
          </div>
          <div className="grid grid-cols-1 ml-8 lg:ml-0 w-80 lg:w-full lg:grid-cols-2 gap-x-10 gap-y-2 items-start  ">
            <div className="relative z-0 w-full group">
              <label htmlFor="stock" className="">Stock<span className="text-red-600">*</span></label>
              <Input id="stock" type="number" className="border border-black w-70" placeholder=" " {...register("stock", { valueAsNumber: true })} />
              <p className="min-h-5 text-sm text-red-600">{errors.stock?.message}</p>
            </div>
            <div className="relative z-0 w-full  group">
              <label htmlFor="discount" className="">Discount<span className="text-red-600">*</span></label>
              <Input id="discount" type="number" className="border border-black w-70"  {...register("discount", { valueAsNumber: true })} disabled={isDiscountDisabled} placeholder={isDiscountDisabled ? "Not eligible for discount" : ""} />
              <p className="min-h-5 text-sm text-red-600">{errors.discount?.message}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 ml-8 lg:ml-0 w-80 lg:w-full lg:grid-cols-2 gap-x-10 gap-y-2 items-start  ">
            <div className="relative z-0 w-full  group">
              <label htmlFor="status" className="">Status<span className="text-red-600">*</span></label>
              <select id="status" className="block py-1.5 px-0  text-sm text-heading w-70 appearance-none focus:outline-none focus:ring-0 focus:border-brand peer pl-3 border border-black rounded-lg"
                {...selectedOptionProps}
                onChange={handleUserTypeChange} >
                <option value="">Select Status</option>
                <option value="New">New</option>
                <option value="Old" >Old</option>
              </select>
              {errors.status && <span style={{ color: 'red' }}>{errors.status.message}</span>}
            </div>
          </div><br />
          <hr />
          <div className="flex mt-2">
            <Button type="submit" className="bg-sky-700 w-40 lg:w-70 h-10 ml-0 mr-7 lg:mr-0  mt-1" > Submit</Button>
            <Button type="button" className="w-40 lg:w-70 h-10  mt-1 ml-15" onClick={() => closeEmpDialog(false)}> Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>


  );
}

export default ProductForm;