"use client"

import Link from 'next/link'
import Image from 'next/image'
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { Bell, Calendar, BookText, MessageSquare, HelpCircle, HandCoins, HeartHandshake } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
    { name: 'Volunteer', icon: HeartHandshake },
    { name: 'Calendar', icon: Calendar },
    { name: 'Workshops', icon: BookText },
    { name: 'Fundraisers', icon: HandCoins },
    { name: 'Feedback', icon: MessageSquare },
    { name: 'FAQs', icon: HelpCircle },
]

export default function Navbar() {
    const handleLogout = () => {
        Cookies.remove("token");
        window.location.href = "/auth/login";
    };

    const pathname = usePathname();
    const normalizedPath = pathname.toLowerCase();

    // Find the current nav item name based on the route
    const currentNavItem = navItems.find(item => `/${item.name.toLowerCase()}` === normalizedPath);


    return (
        <>
            {/* Desktop Navbar */}
            <nav className="hidden w-screen md:block border-b-2 border-zinc-800 fixed top-0 right-0 left-0 z-50 backdrop-blur-lg bg-zinc-950/70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className='flex items-center'>
                            <Link href="/" className="flex items-center space-x-2">
                                <Image src="/Logo.svg"
                                    alt="Image"
                                    width="200"
                                    height="200"
                                    className=" h-[40%] w-[40%]" />
                                <div>
                                    <h4 className='text-xl leading-4 font-semibold tracking-wide'>U&#8209;Serve</h4>
                                    <p className='leading-3 text-xs font-extralight'>Student</p>
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={`/${item.name}`}
                                    className="text-zinc-400 hover:text-zinc-300 focus:text-zinc-50 transition-colors font-medium text-sm"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className='hover:bg-zinc-800 hover:text-zinc-50 h-10 w-10 p-2'>
                                        <Bell className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className='bg-zinc-950 border-l-2 border-zinc-900'>
                                    <SheetHeader>
                                        <SheetTitle className='flex items-center gap-2'><Bell className="h-5 w-5" />Notifications</SheetTitle>
                                        <SheetDescription>
                                            All your notifications, here.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <SheetFooter>
                                        <SheetClose asChild>{/*Modal close*/}

                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center space-x-2">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Top Bar */}
            <nav className="md:hidden flex justify-between items-center fixed top-0 right-0 left-0 p-3 z-50 backdrop-blur-lg bg-zinc-950/70 border-b-2 border-zinc-800 transition-colors">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <Image src="/Logo.svg"
                            alt="Image"
                            width="200"
                            height="200"
                            className=" h-[40%] w-[40%]" />
                        <div>
                            <h4 className='text-xl leading-5 font-semibold tracking-wide'>{currentNavItem ? currentNavItem.name : "Home"}</h4>
                        </div>
                    </div>
                </Link>
                <div className='flex space-x-6'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className='hover:bg-zinc-800 hover:text-zinc-50 h-10 w-10 p-2'>
                                <Bell className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className='bg-zinc-950 border-l-2 border-zinc-900'>
                            <SheetHeader>
                                <SheetTitle className='flex items-center gap-2'><Bell className="h-5 w-5" />Notifications</SheetTitle>
                                <SheetDescription>
                                    All your notifications, here.
                                </SheetDescription>
                            </SheetHeader>
                            <SheetFooter>
                                <SheetClose asChild>{/*Modal close*/}

                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center space-x-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {/* Spacer for alignment */}
            </nav>

            {/* Mobile Bottom Navbar */}
            <nav className="md:hidden fixed border-t-2 border-zinc-800 bottom-0 left-0 right-0 z-50 backdrop-blur-lg bg-zinc-950/70">
                <div className="flex justify-around items-center h-16">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={`/${item.name}`}
                            className="text-zinc-50 focus:text-red-600 flex flex-col items-center transition-colors"
                        >
                            <item.icon className="h-6 w-6" />
                            {/* <span className="text-xs font-medium mt-1">{item.name}</span> */}
                        </Link>
                    ))}
                </div>
            </nav>
        </>


    )
}