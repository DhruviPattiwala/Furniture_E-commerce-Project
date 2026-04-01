import { useToken } from "@/app/hook/useToken";
import { useProfile } from "@/app/hook/useProfile";
import Image from "next/image";
import { Mail, UserRound, Crown } from "lucide-react"
import profile from "../../../public/common/defaultProfile.png"
import { useRouter } from "next/navigation"
import { api } from "@/app/services/apiClient";
interface ProfileProps {
    isOpen: boolean;
    onClose: () => void;
}
const Profile = ({ isOpen, onClose }: ProfileProps) => {
    const router = useRouter();
    const tokenData = useToken();

    async function logoutUser() {
        await api.post("api/logout")
        router.push("/login")
        router.refresh()
    }

    async function myOrder() {
        router.push("/user/MyOrder");
    }

    const { user } = useProfile(tokenData?.id || "");

    return (
        <>
            {isOpen && (<div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />)}

            <div id="drawer-right" className={`fixed top-0 right-0 z-50  p-4 overflow-y-auto transition-transform bg-white w-96 h-140 3xl:h-180 4xl:h-180 3xl:w-110 4xl:w-110 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} tabIndex={-1} aria-labelledby="drawer-right-label">
                <div className="border-b border-default pb-4 mb-5 flex items-center">
                    <h5 id="drawer-right" className="inline-flex text-[24px] text-body text-[#B88E2F] font-semibold">Your Profile</h5>
                    <button type="button" onClick={onClose} className="text-body bg-transparent hover:text-heading hover:bg-neutral-tertiary rounded-base w-9 h-9 absolute top-2.5 inset-e-2.5">✕</button>
                </div>
                <div>
                    <Image src={user?.profile || profile} alt="filter" width={160} height={160} className="w-40 h-40 rounded-full ml-22 mt-4 mr-2 object-cover" />
                    <div className="flex flex-col h-75">
                        <div className="grow overflow-y-auto">
                            <h5 className="mb-0.5  mt-0 text-2xl font-semibold tracking-tight text-heading ml-22"></h5><br /><br /><hr />
                            <div className="flex mt-5"> <Crown size={30} /><p className="ml-3 text-[20px] font-bold" >{user?.firstName} {user?.lastName}</p></div>
                            <div className="flex mt-5"> <Mail /><p className="ml-3">{user?.email}</p></div>
                            <div className="flex mt-3"><UserRound /><p className="ml-3">@{user?.firstName}</p></div>
                            <br /><hr />

                            <div className="flex"><button type="submit" className="bg-gray-600 pt-2 pb-2 pr-8 pl-8  rounded-lg text-white mt-9 ml-10" onClick={logoutUser}>Logout</button>
                            <button type="submit" className="bg-[#B88E2F] pt-2 pb-2 pr-8 pl-8  rounded-lg text-white mt-9 ml-5" onClick={myOrder}>My Orders</button></div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile