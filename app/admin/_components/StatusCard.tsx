import Image from "next/image"
import CountUp from 'react-countup';
import { ArrowUpRight } from "lucide-react"
interface StatusCardProps {
    title: string,
    icon: string,
    value: number  ,
    msg: string,
    rate: string
}
const StatusCard = ({ title, icon, value, msg, rate }: StatusCardProps) => {
    return (
        <> 
            <div className='w-77 ml-2 mr-2 lg:m-2 m-10  xl:m-1 2xl:m-3 3xl:m-2 4xl:m-4  h-35  border rounded-2xl shadow-lg 3xl:w-79 4xl:w-94'>
                <div className="flex">
                    <div >
                        <p className="font-semibold text-[16px] xl:text-[18px] 2xl:text-[16px] 3xl:text-xl  4xl:text-[19px] text-[#202224] mt-3 ml-6 mb-3">{title}</p>
                        <CountUp start={0} end={value} >
                            {({ countUpRef }) => (
                                <div>
                                    <span className="font-bold text-[28px] xl:text-[22px] mt-3 ml-6" ref={countUpRef} />
                                </div>
                            )}
                        </CountUp>
                    </div>
                    <div>
                        <Image src={icon} alt="icons" width={52} height={52} className="w-13 h-13 mt-5  ml-30 xl:ml-15 2xl:ml-32 3xl:ml-27 4xl:ml-40" />
                    </div>

                </div>
                <div className="flex ml-5 mt-3"><ArrowUpRight className="text-[#00B69B] mr-0 2xl:text-[16px]" /><p className="text-[16px] xl:text-[16px] 2xl:text-[19px] font-semibold text-[#00B69B]  ">{rate}</p><p className="text-[15px] 2xl:text-[19px] font-medium text-gray-500 ml-2">{msg}</p></div>
            </div>
        </>
    )
}

export default StatusCard