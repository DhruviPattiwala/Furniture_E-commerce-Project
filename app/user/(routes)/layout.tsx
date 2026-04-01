"use client"
import { Suspense } from "react";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import Cart from "../_components/Cart";
import WishList from "../_components/WishList";
import Profile from "../_components/Profile";
import { useState } from 'react';
function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishListCartOpen, setIsWishListCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);


  return (
    <>
      <Suspense fallback={"loading..."}><Navbar onOpenCart={() => setIsCartOpen(true)} onOpenWishListCart={() => setIsWishListCartOpen(true)} onOpenProfile={() => setProfileOpen(true)} /></Suspense>
       <Suspense fallback={"loading..."}><Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /></Suspense>
      <WishList isOpen={isWishListCartOpen} onClose={() => setIsWishListCartOpen(false)} />
      <Profile isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
      {children}
      <Footer />
    </>


  );
}
export default HomeLayout