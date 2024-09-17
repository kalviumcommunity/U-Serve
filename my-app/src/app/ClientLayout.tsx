"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/ui/navbar";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    
    const hideNavbarRoutes = ["/auth/signup", "/auth/login"];

    return (
        <>
            {!hideNavbarRoutes.includes(pathname) && <Navbar />}
            {children}
        </>
    );
}
