import Link from "next/link"
const Footer = () => {

    return (
        <div className="mt-10   bg-white w-full h-70 flex 2xl:ml-25 3xl:ml-25 4xl:ml-80 mr-25 xl:ml-15">
            <div>
                <p className="text-[24px] font-bold text-black ">Funiro.</p>
                <p className="text-[16px] font-normal text-[#9F9F9F] w-80">400 University Drive Suite 200 Coral Gables,FL 33134 USA</p>
            </div>
            <div className="ml-20">
                <p className="text-[16px] font-medium text-[#9F9F9F] w-70 m-5">Links</p>
                <p className="text-[16px] font-medium   m-5"><Link href="/Home">Home</Link></p>
                <p className="text-[16px] font-medium   m-5"><Link href="/Shop">Shop</Link></p>
                <p className="text-[16px] font-medium   m-5"><Link href="/About">About</Link></p>
                <p className="text-[16px] font-medium   m-5"><Link href="/Contact">Contact</Link></p>
            </div>
            <div className="">
                <p className="text-[16px] font-medium text-[#9F9F9F] w-70 m-5">Helps</p>
                <p className="text-[16px] font-medium   m-5"><Link href="/Home">Payment options</Link></p>
                <p className="text-[16px] font-medium   m-5"><Link href="/Home">Returns</Link></p>
                <p className="text-[16px] font-medium   m-5"><Link href="/Home">Privacy Policies</Link></p>
            </div>
            <div className="">
                <p className="text-[16px] font-medium text-[#9F9F9F] w-70 m-5">Newsletter</p>
                <div className="flex"><input type="text" className="text-[14px] font-medium text-[#9F9F9F] border-b-2 m-5 xl:w-20 " placeholder="Enter Your Email Address" /><button type="submit" className="text-[14px] font-medium border-b-2 m-5 "><Link href="/Home">SUBSCRIBE</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Footer