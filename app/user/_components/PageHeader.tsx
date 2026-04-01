import Image from 'next/image'
import pageHeader from "../../../public/common/pageHeader.jpg"
import brandlogo from "../../../public/HomePage/brandlogo.png"

const PageHeader = ({ path }: { path: string }) => {
    return (
        <div className="relative w-full h-80 mt-0 4xl:ml-0">
            <Image src={pageHeader} alt="heroImage" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px]" />
            <div className="absolute inset-0  ">
                <Image src={brandlogo} alt="brandlogo" width={48} height={48} className='ml-190 mt-20'/>
                <p className="text-[48px] font-medium  text-center mt-0 m-5">{path}</p>
                <p className="text-center text-[16px] font-medium ">Home {'>'} <span className='font-normal'>{path}</span></p>
            </div>
        </div>
    )
}

export default PageHeader