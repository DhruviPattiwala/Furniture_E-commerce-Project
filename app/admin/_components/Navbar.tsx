"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { LogOutIcon, UserIcon } from "lucide-react"
import { useToken } from "@/app/hook/useToken";
import { useProfile } from "@/app/hook/useProfile"
import { api } from "@/app/services/apiClient";
import { useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";


export const Navbar = () => {
    const searchRef = useRef<HTMLInputElement | null>(null);
    const tokenData = useToken();
    const { user } = useProfile(tokenData?.id || "");
    const navigate = useRouter()
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [search, setSearch] = useState("")

    useEffect(() => {
        setTimeout(() => {
            const product = searchParams.get("product");
            if (pathname === "/admin/Product" && product) {
                setSearch(product);
            } else {
                setSearch("");
            }
        }, 0);


    }, [pathname, searchParams]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setSearch(value)

        if (value.trim() === "") {
            router.push("/admin/Product")
        }
    }

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        const params = new URLSearchParams(searchParams);
        if (search) {
            params.set('product', search);
        } else {
            params.delete('product');
        }
        const queryString = params.toString()

        router.push(
            queryString ? `/admin/Product?${queryString}` : `/admin/Product`
        )

    }


    async function logoutUser() {
        await api.post("api/logout")
        navigate.push("/login")
        navigate.refresh();
    }
    const navItems = [
        { name: 'Dashboard', href: '/admin/Dashboard' },
        { name: 'Product', href: '/admin/Product' },];

    return (
        <>
            
                <nav className="fixed top-0 left-0 right-0 h-16 white z-50 flex items-center px-4 text-black">
                    <div className=" flex ml-13 mt-7">
                        <p className="text-[#4379EE] font-extrabold text-[20px] 3xl:text-[23px] 4xl:text-[25px]">Dash</p><p className=" font-extrabold text-[20px] 4xl:text-[25px] 3xl:text-[23px]">Stack</p>

                        <div className="flex gap-2 ">
                            <form onSubmit={handleSearch}>
                                <input className="bg-[#F5F6FA] max-w-sm  p-2 border rounded-full pl-8 ml-50 3xl:w-100 4xl:w-150" placeholder="Search..." ref={searchRef} onChange={handleChange} />
                            </form>


                            <div className="hidden md:flex items-center  gap-2 mr-15  ml-170  2xl:ml-165 xl:ml-100  3xl:ml-130 4xl:ml-185">
                                <DropdownMenu  >
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" className="rounded-full">
                                            <Avatar className="h-10 w-10 3xl:h-13  3xl:w-13 4xl:h-15  4xl:w-15 4xl:mr-2 3xl:mr-2">
                                                <AvatarImage src={user?.profile || ""} />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => navigate.push("/admin/Profile")}>
                                            <UserIcon className="mr-2"  /> <span className="4xl:text-xl">Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={logoutUser}>
                                            <LogOutIcon className="mr-2" /> <span className="4xl:text-xl">Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className="ml-3">
                                    <span className="font-semibold text-xl 4xl:text-2xl 3xl:text-[22px]">{user?.firstName} {user?.lastName}</span><br />
                                    <p className="hidden ml-1 lg:flex text-[14px] 4xl:text-xl 3xl:text-[19px] font-bold text-gray-500">Admin</p>
                                </div>
                            </div>

                            <Button className="p-2 rounded-full   transition md:hidden ml-auto" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user?.profile || ""} />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Button>
                        </div>

                    </div>

                    {isProfileMenuOpen && (
                        <div className="absolute top-16 right-4 bg-sky-100 text-gray-800 shadow-lg shadow-black rounded-md p-2 md:hidden z-40">
                            <div className="p-2  text-base border-b text-purple-500 font-bold">{user?.firstName}</div>
                            <div className="p-2  text-base border-b flex" onClick={() => { navigate.push("/Profile"); setIsProfileMenuOpen(false); }}> <UserIcon className="mr-2" /> Profile</div>
                            <div className="p-2  text-base border-b flex" onClick={() => { logoutUser(); setIsProfileMenuOpen(false); }}> Logout</div>
                        </div>
                    )}


                </nav>

                <aside
                    className={` fixed top-16 left-0 h-full  w-20 lg:w-64  transition-transform duration-300 z-40`}
                >
                    <nav className="flex flex-col p-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center p-4 rounded-md mb-2 font-semibold  text-[14px]  ${isActive
                                        ? 'bg-[#4880FF] text-white'
                                        : 'text-[#4379EE] '
                                        }`}
                                >

                                    <span className="hidden ml-13 lg:flex text-[14px] 3xl:text-[15px] 4xl:text-[16px] 4xl:font-bold">{item.name}</span>

                                </Link>
                            );
                        })}
                        <button
                            onClick={logoutUser}
                            className="text-lg text-[#4379EE]  font-bold rounded-md w-full text-left p-4  hover:bg-[#4880FF] hover:text-white "
                        >
                            <div className="flex"> <span className="hidden  lg:flex ml-14 font-semibold  text-[14px] 3xl:text-[15px] 4xl:text-[16px] 4xl:font-bold ">Logout</span></div>
                        </button>
                    </nav>
                </aside>
           

        </>
    )
}
