"use client";
import { Suspense } from "react";
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useEffect } from "react";
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToken } from "@/app/hook/useToken";
import { useProfile } from "@/app/hook/useProfile";
import Image from "next/image";
import { Mail, UserRound, Crown } from "lucide-react"
import profile from "../../../../public/common/defaultProfile.png"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/app/utils/validation"
import { SignUpFormInputs } from "@/app/utils/type"
import { toast } from "sonner";

const Page = () => {
    const tokenData = useToken();
    const [open, setOpen] = useState(false);
    const { user, editUser } = useProfile(tokenData?.id || "");
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(signUpSchema), defaultValues: { firstName: "", lastName: "", email: "", password: "" }
    });

    function closeDialog() {
        return setOpen(false);
    }
    useEffect(() => {
        if (user) {
            reset({
                firstName: user.firstName ?? "", lastName: user.lastName ?? "",
                email: user.email ?? "", password: ""
            });
        }
    }, [user, reset]);
    function resetForm() {
        reset();
    }
    async function onSubmit(data: SignUpFormInputs) {
        try {
            editUser({ user: data, id: tokenData?.id ?? "" });
            toast.success(`Your profile updated successfully`, { duration: 2000 })

        } catch (error) {
           toast.error((error as Error).message);
        }
        closeDialog();
    }
    return (
        <>
         <Suspense fallback={"loading..."}>
            <div className=" w-[199vh] 3xl:w-[235vh] 4xl:w-[258vh] h-[84vh]  mt-5">
                <div className="w-full  max-w-sm  mx-auto  p-6 rounded-xl  shadow-lg bg-[#e0e7f3] border 2xl:mt-10 2xl:ml-115 3xl:mt-20 3xl:ml-125 4xl:ml-145 xl:ml-100">
                    <Image src={user?.profile || profile} alt="User image" className="ml-22 rounded-full w-45 h-45" width={180} height={180} priority placeholder="empty" />

                    <div className="flex flex-col h-70">
                        <h5 className="mb-0.5  mt-0 text-2xl font-semibold tracking-tight text-heading ml-22"></h5><br /><br /><hr />
                        <div className="flex mt-5"> <Crown size={30} /><p className="ml-3 text-[20px] font-bold" >{user?.firstName} {user?.lastName}</p></div>
                        <div className="flex mt-5"> <Mail /><p className="ml-3">{user?.email}</p></div>
                        <div className="flex mt-3"><UserRound /><p className="ml-3">@{user?.firstName}</p></div>
                        <br /><hr />

                        <button className="bg-[#4379EE] pt-2 pb-2 pr-8 pl-8  rounded-lg text-white mt-9 " onClick={() => setOpen(true)}>Edit Profile</button>

                    </div>
                </div>
            </div>
            <Dialog open={open} onOpenChange={closeDialog}>
                <DialogContent className="w-120 lg:w-120 max-w-lg m-4 overflow-y-auto  lg:overflow-y-auto sm:max-w-2xl  max-h-[90vh] bg-[#F5F6FA]" onPointerDownOutside={(e) => { e.preventDefault(); }}>
                    <DialogHeader>
                        <DialogTitle className="font-bold sm:ml-33 lg:ml-0">Edit Profile</DialogTitle>
                    </DialogHeader>
                    <hr />
                    <form onSubmit={handleSubmit(onSubmit)} className=" border-none">
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="firstName" className="text-sm">firstName</Label>

                                <Input id="firstName" className="w-10" {...register('firstName')} />

                                {errors.firstName && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.firstName.message}</span>}
                            </Field>
                            <Field>

                                <Label htmlFor="email">lastName</Label>

                                <Input className="inline-block w-10" id="lastName" {...register('lastName')} />

                                {errors.lastName && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.lastName.message}</span>}
                            </Field>
                            <Field>

                                <Label htmlFor="email">Email</Label>

                                <Input className="inline-block w-10" id="email" {...register('email')} />

                                {errors.email && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.email.message}</span>}
                            </Field>
                            <Field>

                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type='password' className="w-10" autoComplete="off" {...register('password')} />
                                {errors.password && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.password.message}</span>}
                            </Field>

                        </FieldGroup>
                        <DialogFooter className="mt-10">
                            <DialogClose asChild>
                                <Button variant="outline" onClick={resetForm}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" className="bg-[#4379EE]">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>



            </Dialog>
            </Suspense>
        </>
    )
}

export default Page