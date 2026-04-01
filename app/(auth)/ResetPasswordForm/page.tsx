"use client";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import forgotPwd from "../../../public/HomePage/forgotPwd.png"
import logo from "../../../public/HomePage/logo.png"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgetPwdSchema } from "@/app/utils/validation"
import { ForgetPwdFormInputs } from "@/app/utils/type"
import { api } from "@/app/services/apiClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { AxiosError } from 'axios';

interface ErrorResponse {
    msg: string;
}
const Page = () => {
    const router = useRouter();
   
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(ForgetPwdSchema), defaultValues: { email: "", new_password: "",confirm_password:"" }
    });
    async function onSubmit(data: ForgetPwdFormInputs) {
        try {
            const res = await api.put("api/login",data);
            if(res.data.success){
              toast.success(res.data.msg);
              router.push("/login")
            }
            else {toast.error("something went wrong..."); }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response && axiosError.response.status == 404) {
                const errorMessage = axiosError.response.data.msg;
                toast.error(errorMessage);
            }
            else {
                toast.error('something went wrong...');
            }
        }
    }
    
    return (
        <>
        <div className='bg-[#FFF2E3]  flex h-screen items-center justify-center '>
            <div className='bg-white w-300 h-[90vh] rounded-4xl flex'>
                <Image src={forgotPwd} alt="login page" width={600} height={96} className="w-150 rounded-tl-3xl rounded-bl-3xl m-2" />
                <div className="mt-15">
                    <Image src={logo} alt="" width={40} height={40} className=" ml-15" />
                    <Card className="h-max  ml-10 text-black border-none w-90">

                        <CardHeader>
                            <CardTitle className="text-2xl text-gray-700">Forgot Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">

                                    <div className="grid gap-2 text-gray-500">
                                        <label htmlFor="email" className="text-sm">Email</label>
                                        <div className="flex ">
                                            <Input className="inline-block" id="email" {...register('email')} />
                                        </div>
                                        {errors.email && <span style={{ color: 'red' }} className="text-sm">{errors.email.message}</span>}
                                    </div>
                                    <div className="input-icons grid gap-2 text-gray-500">
                                        <div className="flex items-center">
                                            <label htmlFor="new_password" className="text-sm"> New Password</label>
                                        </div>
                                        <div className="flex"> <Input id="new_password" type='password' autoComplete="off" {...register('new_password')} /></div>
                                        {errors.new_password && <span style={{ color: 'red' }} className="text-sm">{errors.new_password.message}</span>}
                                    </div>
                                    <div className="input-icons grid gap-2 text-gray-500">
                                        <div className="flex items-center">
                                            <label htmlFor="confirm_password" className="text-sm">Confirm Password</label>
                                        </div>
                                        <div className="flex"> <Input id="confirm_password" type='password' autoComplete="off" {...register('confirm_password')} /></div>
                                        {errors.confirm_password && <span style={{ color: 'red' }} className="text-sm">{errors.confirm_password.message}</span>}
                                    </div>
                                  
                                    <Button type="submit" className="w-full bg-[#352315] text-white">
                                        Update Password
                                    </Button>
                                </div>

                            </form>
                        </CardContent>

                    </Card>

                    

                </div>
            </div>
        </div>

        </>
    )
}

export default Page

