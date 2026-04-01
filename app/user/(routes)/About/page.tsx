import PageHeader from "../../_components/PageHeader"
import Image from 'next/image'
import heroImage from "../../../../public/common/about.png"
const page = () => {
  return (
    <>
      <PageHeader path="About Us" />
      <div className='flex'>
        <div className=' h-120 mt-10  ml-50 xl:ml-30 bg-[#F9F1E7] rounded-2xl'>
          <Image src={heroImage} alt="product category" width={800} height={480} className="w-200 h-120 rounded-2xl animate-fadeIn [animation-delay:0.6s]" />
        </div>
        <div>
          <p className='w-50 ml-40 2xl:ml-40 4xl:ml-90 mt-5 font-bold text-[36px]'>About Us</p>
          <div className='font-light text-[18px] text-gray-700' >
            <p className='w-100 4xl:w-180 ml-20 mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam ex inventore neque? Nemo cum reprehenderit, quidem temporibus debitis similique quaerat? Reprehenderit nemo, voluptatem impedit culpa numquam ab sed! Sit, illo.</p>
            <p className='w-100 4xl:w-180 ml-20 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam ex inventore neque? Nemo cum reprehenderit, quidem temporibus debitis similique quaerat? Reprehenderit nemo, voluptatem impedit culpa numquam ab sed! Sit, illo.</p>
            <p className='w-100 4xl:w-180 ml-20 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam ex inventore neque? Nemo cum reprehenderit, quidem temporibus debitis similique quaerat? Reprehenderit nemo, voluptatem impedit culpa numquam ab sed! Sit, illo.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default page