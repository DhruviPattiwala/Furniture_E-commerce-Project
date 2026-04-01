"use client"
import Swal from 'sweetalert2';
import { contactSchema } from "@/app/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form";
import { ContactFormInputs } from "@/app/utils/type";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PageHeader from "../../_components/PageHeader"
import { api } from '@/app/services/apiClient';
import { MapPin, Phone, Clock } from "lucide-react"
const Page = () => {
  const emptyValue: ContactFormInputs = { name: "", email: "", subject: "", message: "" }
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema), defaultValues: emptyValue
  });
  async function onSubmit(data: ContactFormInputs) {

    const res = await api.post("api/contact", data);
    Swal.fire({
      text: `${res.data.msg}`,
      icon: "success",
      draggable: true
    });
    reset(emptyValue);
  }
  return (
    <>
      <PageHeader path="Contact" />
      <div className="mt-15">
        <p className="font-semibold text-[36px] text-center 3xl:ml-5 4xl:ml-60">Get In Touch With Us</p>
        <p className="font-normal text-[16px] text-center text-[#9F9F9F] w-150 ml-125 3xl:ml-145 xl:ml-95 2xl:ml-122 4xl:ml-190">For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
        <div className="flex mt-25 xl:mr-100">
          <div className="ml-80">
            <div className="m-10">
              <div className="flex"><MapPin className="mr-10" size={30} /><p className="font-medium text-[24px]">Address</p>
              </div>
              <p className="w-50 ml-18 font-normal text-[16px]">236 5th SE Avenue, New York NY10000, United States</p>
            </div>
            <div className="m-10">
              <div className="flex"><Phone className="mr-10" size={30} /><p className="font-medium text-[24px]">Phone</p>
              </div>
              <p className="w-50 ml-18  font-normal text-[16px]">Mobile: +(84) 546-6789
                Hotline: +(84) 456-6789</p>
            </div>
            <div className="m-10">
              <div className="flex"><Clock className="mr-10" size={30} /><p className="font-medium text-[24px]">Working Time</p>
              </div>
              <p className="w-50 ml-18 font-normal text-[16px]">Monday-Friday: 9:00 - 22:00
                Saturday-Sunday: 9:00 - 21:00</p>
            </div>
          </div>
          <div>
            <Card className="h-max  ml-40 text-black  w-120 mt-0 border-0 shadow-none">

              <CardContent >
                <form className="" onSubmit={handleSubmit(onSubmit)} id="myForm">
                  <div className="flex flex-col gap-2">

                    <div className="input-icons grid gap-2 text-gray-500 py-4">
                      <div className="flex items-center">
                        <Label htmlFor="name">Name</Label>
                      </div>
                      <div className="flex"> <Input id="name" type='text' className="h-12" {...register('name')} /></div>
                      {errors.name && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.name.message}</span>}
                    </div>


                    <div className="input-icons grid  gap-2 py-4 text-gray-500">
                      <div className="flex items-center">
                        <Label htmlFor="email">Email</Label>
                      </div>
                      <div className="flex"> <Input id="email" type='email' className="h-12" {...register('email')} /></div>
                      {errors.email && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.email.message}</span>}
                    </div>
                    <div className="input-icons grid gap-2 text-gray-500 py-4">
                      <div className="flex items-center">
                        <Label htmlFor="subject">Subject</Label>
                      </div>
                      <div className="flex"> <Input id="subject" type='text' className="h-12" {...register('subject')} /></div>
                      {errors.subject && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.subject.message}</span>}
                    </div>
                    <div className="input-icons grid  gap-2 py-4 text-gray-500">
                      <div className="flex items-center">
                        <Label htmlFor="message">Message</Label>
                      </div>
                      <div className="flex"> <Input id="message" type='text' className="h-12" {...register('message')} /></div>
                      {errors.message && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.message.message}</span>}
                    </div>
                    <button type="submit" className="pl-5 pr-5 mt-5 mb-5  w-45 h-12 text-[20px] text-white   py-2 px-3 border border-gray-300 bg-[#B88E2F] rounded-none shadow-sm focus:outline-none  sm:text-sm appearance-none cursor-pointer ">Submit</button>
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