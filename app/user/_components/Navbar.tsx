import Image from "next/image"
import Link from "next/link";
import { useWishlist } from "@/app/hook/useWishList";
import { useState, useEffect } from "react";
import brandlogo from "../../../public/HomePage/brandlogo.png";
import { Heart, ShoppingCart, Search, User } from "lucide-react"
import useCartStore from "@/app/store/cartStore";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useToken } from "@/app/hook/useToken";
interface NavbarProps {
    onOpenCart: () => void;
    onOpenWishListCart: () => void;
    onOpenProfile: () => void;
}
const Navbar = ({ onOpenCart, onOpenWishListCart, onOpenProfile }: NavbarProps) => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState("")
    const [showInput, setShowInput] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            const product = searchParams.get("product");
            if (pathname === "/user/Shop" && product) {
                setShowInput(true);
                setSearch(product);
            } else {
                setShowInput(false);
                setSearch("");
            }
        }, 0);


    }, [pathname, searchParams]);


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setSearch(value)

        if (value.trim() === "") {
            router.push("/user/Shop")
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
            queryString ? `/user/Shop?${queryString}` : `/user/Shop`
        )

    }

    const cartItems = useCartStore((state) => state.cartItems);
    const tokenData = useToken();
    const { wishlist } = useWishlist(tokenData?.id || '');
    return (
        <>
            <nav className="bg-neutral-primary  w-full  z-20 top-0 inset-s-0 border-b border-default">
                <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse xl:ml-20">
                        <Image src={brandlogo} alt="brandlogo" width={48} height={48} />
                        <span className="self-center text-2xl font-bold text-heading  whitespace-nowrap">Furniro</span>
                    </div>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
                            <li>
                                <Link href="/user/Home" className="block  text-heading rounded" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="/user/Shop" className="block  text-heading rounded ">Shop</Link>
                            </li>
                            <li>
                                <Link href="/user/About" className="block  text-heading rounded">About</Link>
                            </li>
                            <li>
                                <Link href="/user/Contact" className="block  text-heading rounded">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
                            <li>
                                <User size={23} onClick={onOpenProfile} />
                            </li>
                            <li>
                                <Search size={23} onClick={() => setShowInput(!showInput)} />
                            </li>
                            <li>
                                <Heart size={23} onClick={onOpenWishListCart} /><div className="absolute top-4 2xl:right-54 3xl:hidden 4xl:hidden  bg-[#E97171] text-white w-3 h-3 rounded-full p-2 flex items-center justify-center text-sm font-semibold shadow-md">{wishlist.length}
                                </div>
                            </li>
                            <li>
                                <ShoppingCart size={23} onClick={onOpenCart} className=" object-cover relative inline-block" /><div className="absolute top-4  3xl:hidden 4xl:hidden 2xl:right-40  bg-[#E97171] text-white w-3 h-3 xl:right-1 rounded-full p-2 flex items-center justify-center text-sm font-semibold shadow-md">{cartItems.length}
                                </div>
                            </li>
                        </ul>

                    </div>
                    <form onSubmit={handleSearch}>
                        <input
                            value={search}
                            onChange={handleChange}
                            placeholder="Search products..." className={`transition-all duration-300 border rounded-full p-2 ${showInput ? "w-40 opacity-100" : "w-0 opacity-0"}`} />
                    </form>
                </div>
            </nav>
        </>
    )
}

export default Navbar