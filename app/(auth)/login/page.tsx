"use client";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import login from "../../../public/HomePage/loginImage.jpg"
import logo from "../../../public/HomePage/logo.png"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/app/utils/validation"
import { LoginFormInputs } from "@/app/utils/type"
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
        resolver: zodResolver(signInSchema), defaultValues: { email: "", password: "", }
    });
    async function onSubmit(data: LoginFormInputs) {
        try {
            const res = await api.post("api/login", {
                type: "login",
                password: data.password,
                email: data.email,
            });
           
            if (res.data.user.role === "admin") {
                router.push("/admin/Dashboard")
            } else { router.push("/user/Home") }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response && axiosError.response.status == 404) {
                const errorMessage = axiosError.response.data.msg;
                toast.error(errorMessage);
            }
            else if (axiosError.response && axiosError.response.status == 401) {
                const errorMessage = axiosError.response.data.msg;
                toast.error(errorMessage);
            }
            else {
                toast.error('something went wrong...');
            }
        }
    }
    function handleForgetPWD() {
        router.push(`/ResetPasswordForm`);
    }
    return (
        <>
        <div className='bg-[#FFF2E3]  flex h-screen items-center justify-center '>
            <div className='bg-white w-300 h-[90vh] rounded-4xl flex'>
                <Image src={login} alt="login page" width={696} height={96} className="rounded-tl-3xl rounded-bl-3xl m-2" />
                <div className="mt-15">
                    <Image src={logo} alt="" width={40} height={40} className=" ml-15" />
                    <Card className="h-max  ml-10 text-black border-none w-90">

                        <CardHeader>
                            <CardTitle className="text-2xl text-gray-700">Login to your Account</CardTitle>
                            <CardDescription className="text-gray-400">see what is going with your business</CardDescription>
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
                                            <label htmlFor="password" className="text-sm"> Password</label>
                                        </div>
                                        <div className="flex"> <Input id="password" type='password' autoComplete="off" {...register('password')} /></div>
                                        {errors.password && <span style={{ color: 'red' }} className="text-sm">{errors.password.message}</span>}
                                    </div>
                                    <div className='flex items-center ms-3'>
                                        <input type="checkbox" className="accent-[#352315]"
                                        /><span className='ml-3 text-sm text-gray-500'>Remember me</span>
                                        <p className="ml-auto inline-block text-sm no-underline text-[#352315] cursor-pointer" onClick={handleForgetPWD}>Forgot your password?
                                        </p></div>
                                    <Button type="submit" className="w-full bg-[#352315] text-white">
                                        Login
                                    </Button>
                                </div>

                            </form>
                        </CardContent>

                    </Card>

                    <p className=" mt-7 text-gray-500 text-sm ml-25">Not Registered Yet?<Link href="/signup" className="ml-2 text-[#352315]">Create an Account</Link></p>

                </div>
            </div>
        </div>

        </>
    )
}

export default Page

