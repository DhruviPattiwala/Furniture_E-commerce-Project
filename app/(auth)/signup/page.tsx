"use client";
import { ChangeEvent } from "react";
import profile from "../../../public/HomePage/profile.jpg"
import { useRef, useState, useCallback } from "react";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import login from "../../../public/HomePage/loginImage.jpg"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/app/utils/validation"
import { SignUpFormInputs, SignUpFormInputsWithProfile } from "@/app/utils/type"
import { api } from "@/app/services/apiClient";
import { useRouter } from "next/navigation";
import { AxiosError } from 'axios';
import { toast } from "sonner";
interface ErrorResponse {
    msg: string;
}
const Page = () => {
    const router = useRouter();
    const { register, handleSubmit,reset, formState: { errors }, } = useForm({
        resolver: zodResolver(signUpSchema), defaultValues: { firstName: "", lastName: "", email: "", password: "" }
    });
    const [fileInput, setFileInput] = useState<string | null | undefined>(null);
    const [imageReview, setImageReview] = useState<string>(profile.src);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = useCallback(() => { fileInputRef.current?.click(); }, []);

    const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setImageReview(`/common/${file.name}`);
            const reader = new FileReader()
            reader.onload = function (e) {
                const fileData = e.target?.result as string;
                setFileInput(fileData);
            }
            reader.readAsDataURL(file)
        };
    }, []);

 
    async function onSubmit(data: SignUpFormInputs) {

        const userData: SignUpFormInputsWithProfile = {
            ...data,
            profile: fileInput,
        }
        try {
            await api.post("api/users/", userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            router.push("/user/Home");
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response && axiosError.response.status == 409) {
                const errorMessage = axiosError.response.data.msg;
                toast.error(errorMessage);
                reset();
            }
            
        }
    }
    return (

        <div className='bg-[#FFF2E3]  flex h-screen items-center justify-center '>
            <div className='bg-white w-300 h-[90vh] rounded-4xl flex '>
                <Image src={login} alt="login page" width={696} height={96} className="rounded-tl-3xl rounded-bl-3xl m-2" />
                <div className="">
                    <Card className="h-max  ml-10 text-black border-0 w-90">
                   
                        <CardContent className="border-0">
                            <form onSubmit={handleSubmit(onSubmit)} className="">
                           
                                <div className="relative z-0 w-full  group">
                                    <div className="flex">
                                        <div className="w-70 lg:w-55 ml-10 mb-8">
                                            <p className="text-lg  ml-8 font-bold text-[#352315]">Create an Account</p>
                                            <div className="flex justify-center my-4">
                                                
                                               {imageReview && <img src={`${imageReview}` || `${profile}`} className="rounded-full  w-25 h-25" alt="profile image" onClick={handleButtonClick} />
                                                
                                            //    <Image
                                            //         src={`${imageReview}`}
                                            //         alt="Profile"
                                            //         width={100}
                                            //         height={100}
                                            //         className="rounded-full w-25 h-25" onClick={handleButtonClick}
                                             //   />
                                             }
                                            </div>

                                        </div>
                                    </div>
                                    <input type="file" ref={fileInputRef} id='file' onChange={handleFileChange} accept="image/png, image/gif,image/jpeg"
                                        className=" py-2.5 px-0 w-full text-sm text-heading border border-black appearance-none focus:outline-none focus:ring-0 focus:border-brand peer pl-3 hidden" placeholder=" " />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="grid gap-2 text-gray-500">
                                        <label htmlFor="firstName" className="text-sm">firstName</label>
                                        <div className="flex ">
                                            <Input className="inline-block" id="firstName" {...register('firstName')} />
                                        </div>
                                        {errors.firstName && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.firstName.message}</span>}
                                    </div>
                                    <div className="grid gap-2 text-gray-500">
                                        <Label htmlFor="email">lastName</Label>
                                        <div className="flex ">
                                            <Input className="inline-block" id="lastName" {...register('lastName')} />
                                        </div>
                                        {errors.lastName && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.lastName.message}</span>}
                                    </div>

                                    <div className="grid gap-2 text-gray-500">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="flex ">
                                            <Input className="inline-block" id="email" {...register('email')} />
                                        </div>
                                        {errors.email && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.email.message}</span>}
                                    </div>
                                    <div className="input-icons grid gap-2 text-gray-500">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <div className="flex"> <Input id="password" type='password' autoComplete="off" {...register('password')} /></div>
                                        {errors.password && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.password.message}</span>}
                                    </div>

                                    <Button type="submit" className="w-full mt-1 bg-[#352315] text-white">
                                        SignUp
                                    </Button>
                                </div>

                            </form>
                        </CardContent>

                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Page

