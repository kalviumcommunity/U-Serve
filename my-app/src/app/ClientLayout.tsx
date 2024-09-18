"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer"; // Assuming Footer is located in the same directory

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    // Define routes where the Navbar and Footer will be hidden
    const hideLayoutRoutes = ["/auth/signup", "/auth/login"];

    return (
        <>
            {/* Conditionally render Navbar */}
            {!hideLayoutRoutes.includes(pathname) && <Navbar />}

            {/* Render children (main content) */}
            {children}

            {/* Conditionally render Footer */}
            {!hideLayoutRoutes.includes(pathname) && <Footer />}
        </>
    );
}
