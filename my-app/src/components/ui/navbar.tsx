"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { Bell, Calendar, BookText, MessageSquare, HelpCircle, HandCoins, HeartHandshake, User, Settings, LogOut, Award, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from './scroll-area';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
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

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const navItems = [
    { name: 'Volunteer', icon: HeartHandshake },
    { name: 'Calendar', icon: Calendar },
    { name: 'Workshops', icon: BookText },
    { name: 'Fundraisers', icon: HandCoins },
    { name: 'Feedback', icon: MessageSquare },
    { name: 'FAQs', icon: HelpCircle },
]

export default function Navbar() {
    const [role, setRole] = useState('volunteer')

    const handleLogout = () => {
        Cookies.remove("token");
        window.location.reload();
    };

    const pathname = usePathname();
    const normalizedPath = pathname.toLowerCase();

    const currentNavItem = navItems.find(item => `/${item.name.toLowerCase()}` === normalizedPath);

    const handleSaveProfile = () => {
        console.log('Saving profile:', { role })
    }

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
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <button className="flex items-center space-x-2">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-56 bg-zinc-900 text-zinc-50 border-zinc-800 p-2">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold mb-2">My Account</h3>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="w-full text-left flex items-center space-x-2 hover:bg-zinc-100 hover:text-zinc-950 p-2 rounded-md">
                                                        <User className="h-4 w-4" />
                                                        <span>Profile</span>
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800">
                                                    <DialogHeader className='gap-2'>
                                                        <DialogTitle>Edit Profile</DialogTitle>
                                                        <DialogDescription>
                                                            Make changes to your profile here. Click save when you&apos;re done.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-2">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="email" className="text-left">
                                                                Email
                                                            </Label>
                                                            <Input
                                                                id="email"
                                                                className="col-span-3"
                                                            />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="role" className="text-left">
                                                                Role
                                                            </Label>
                                                            <Select onValueChange={setRole} defaultValue={role}>
                                                                <SelectTrigger className="col-span-3">
                                                                    <SelectValue placeholder="Select a role" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="volunteer">Volunteer</SelectItem>
                                                                    <SelectItem value="coordinator">Coordinator</SelectItem>
                                                                    <SelectItem value="admin">Admin</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" onClick={handleSaveProfile}>Save changes</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="w-full text-left flex items-center space-x-2 hover:bg-zinc-100 hover:text-zinc-950 p-2 rounded-md">
                                                        <Settings className="h-4 w-4" />
                                                        <span>Settings</span>
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800">
                                                    <DialogHeader>
                                                        <DialogTitle>Settings</DialogTitle>
                                                        <DialogDescription>Manage your account settings and preferences.</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="flex items-center space-x-2">
                                                            <input type="checkbox" id="notifications" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                                            <Label htmlFor="notifications">Enable email notifications</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <input type="checkbox" id="privacy" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                                            <Label htmlFor="privacy">Make profile public</Label>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="language" className="text-right">
                                                                Language
                                                            </Label>
                                                            <Select defaultValue="english">
                                                                <SelectTrigger className="col-span-3">
                                                                    <SelectValue placeholder="Select a language" />
                                                                </SelectTrigger>
                                                                <SelectContent className='bg-zinc-950 text-zinc-50 border-zinc-800'>
                                                                    <SelectItem value="english">English</SelectItem>
                                                                    <SelectItem value="spanish">Spanish</SelectItem>
                                                                    <SelectItem value="french">French</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit">Save changes</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">Volunteering</h3>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="w-full text-left flex items-center space-x-2 hover:bg-zinc-100 hover:text-zinc-950 p-2 rounded-md">
                                                        <Award className="h-4 w-4" />
                                                        <span>Achievements</span>
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800">
                                                    <DialogHeader>
                                                        <DialogTitle>Achievements</DialogTitle>
                                                        <DialogDescription>Your volunteer achievements and milestones.</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="py-4">
                                                        <h3 className="font-medium mb-2">Recent Achievements</h3>
                                                        <ul className="list-disc pl-5 space-y-2">
                                                            <li>100 Hours of Service</li>
                                                            <li>Community Leader Award</li>
                                                            <li>Environmental Champion Badge</li>
                                                        </ul>
                                                        <h3 className="font-medium mt-4 mb-2">Milestones</h3>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                <span>Total Hours</span>
                                                                <span className="font-bold">150</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span>Projects Completed</span>
                                                                <span className="font-bold">12</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span>Skills Acquired</span>
                                                                <span className="font-bold">5</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="button">Close</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="w-full text-left flex items-center space-x-2 hover:bg-zinc-100 hover:text-zinc-950 p-2 rounded-md">
                                                        <FileText className="h-4 w-4" />
                                                        <span>Certificates</span>
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800">
                                                    <DialogHeader>
                                                        <DialogTitle>Certificates</DialogTitle>
                                                        <DialogDescription>Your earned certificates and qualifications.</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="py-4">
                                                        <h3 className="font-medium mb-2">Your Certificates</h3>
                                                        <ul className="space-y-6">
                                                        <ScrollArea className="h-[300px] w-full rounded-md p-4">
                                                            <li>
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <span className="font-semibold">First Aid Certification</span>
                                                                    <Button size="sm">Download</Button>
                                                                </div>
                                                                <div className="relative w-[50%] h-24">
                                                                    <Image
                                                                        src="/placeholder.svg"
                                                                        alt="First Aid Certificate Preview"
                                                                        layout="fill"
                                                                        objectFit="cover"
                                                                        className="rounded-md"
                                                                    />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <span className="font-semibold">Leadership Training</span>
                                                                    <Button size="sm">Download</Button>
                                                                </div>
                                                                <div className="relative w-[50%] h-24">
                                                                    <Image
                                                                        src="/placeholder.svg"
                                                                        alt="First Aid Certificate Preview"
                                                                        layout="fill"
                                                                        objectFit="cover"
                                                                        className="rounded-md"
                                                                    />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <span className="font-semibold">Environmental Stewardship</span>
                                                                    <Button size="sm">Download</Button>
                                                                </div>
                                                                <div className="relative w-[50%] h-24">
                                                                    <Image
                                                                        src="/placeholder.svg"
                                                                        alt="First Aid Certificate Preview"
                                                                        layout="fill"
                                                                        objectFit="cover"
                                                                        className="rounded-md"
                                                                    />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <span className="font-semibold">First Aid Certification</span>
                                                                    <Button size="sm">Download</Button>
                                                                </div>
                                                                <div className="relative w-[50%] h-24">
                                                                    <Image
                                                                        src="/placeholder.svg"
                                                                        alt="First Aid Certificate Preview"
                                                                        layout="fill"
                                                                        objectFit="cover"
                                                                        className="rounded-md"
                                                                    />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <span className="font-semibold">Leadership Training</span>
                                                                    <Button size="sm">Download</Button>
                                                                </div>
                                                                <div className="relative w-[50%] h-24">
                                                                    <Image
                                                                        src="/placeholder.svg"
                                                                        alt="First Aid Certificate Preview"
                                                                        layout="fill"
                                                                        objectFit="cover"
                                                                        className="rounded-md"
                                                                    />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <span className="font-semibold">Environmental Stewardship</span>
                                                                    <Button size="sm">Download</Button>
                                                                </div>
                                                                <div className="relative w-[50%] h-24">
                                                                    <Image
                                                                        src="/placeholder.svg"
                                                                        alt="First Aid Certificate Preview"
                                                                        layout="fill"
                                                                        objectFit="cover"
                                                                        className="rounded-md"
                                                                    />
                                                                </div>
                                                            </li>
                                                            </ScrollArea>
                                                        </ul>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                        <button
                                            className="w-full text-left flex items-center space-x-2 hover:bg-zinc-100 hover:text-zinc-950 p-2 rounded-md"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Log out</span>
                                        </button>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
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
                                <SheetContent side="top" className='bg-zinc-950 border-l-2 border-zinc-900'>
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
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <button className="flex items-center space-x-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-56">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">My Account</h3>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="w-full text-left flex items-center space-x-2 hover:bg-zinc-100 p-2 rounded-md">
                                                <User className="h-4 w-4" />
                                                <span>Profile</span>
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Edit Profile</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your profile here. Click save when you&apos;re done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">
                                                        Name
                                                    </Label>
                                                    <Input id="name" value="John Doe" className="col-span-3" />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="email" className="text-right">
                                                        Email
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="role" className="text-right">
                                                        Role
                                                    </Label>
                                                    <Select onValueChange={setRole} defaultValue={role}>
                                                        <SelectTrigger className="col-span-3">
                                                            <SelectValue placeholder="Select a role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="volunteer">Volunteer</SelectItem>
                                                            <SelectItem value="coordinator">Coordinator</SelectItem>
                                                            <SelectItem value="admin">Admin</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" onClick={handleSaveProfile}>Save changes</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="w-full text-left flex items-center space-x-2 hover:bg-zinc-100 p-2 rounded-md">
                                                <Settings className="h-4 w-4" />
                                                <span>Settings</span>
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Settings</DialogTitle>
                                                <DialogDescription>Manage your account settings and preferences.</DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <input type="checkbox" id="notifications" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                                    <Label htmlFor="notifications">Enable email notifications</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <input type="checkbox" id="privacy" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                                    <Label htmlFor="privacy">Make profile public</Label>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="language" className="text-right">
                                                        Language
                                                    </Label>
                                                    <Select defaultValue="english">
                                                        <SelectTrigger className="col-span-3">
                                                            <SelectValue placeholder="Select a language" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="english">English</SelectItem>
                                                            <SelectItem value="spanish">Spanish</SelectItem>
                                                            <SelectItem value="french">French</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Save changes</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Volunteering</h3>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="w-full text-left flex items-center space-x-2 hover:bg-zinc-100 p-2 rounded-md">
                                                <Award className="h-4 w-4" />
                                                <span>Achievements</span>
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Achievements</DialogTitle>
                                                <DialogDescription>Your volunteer achievements and milestones.</DialogDescription>
                                            </DialogHeader>
                                            <div className="py-4">
                                                <h3 className="font-medium mb-2">Recent Achievements</h3>
                                                <ul className="list-disc pl-5 space-y-2">
                                                    <li>100 Hours of Service</li>
                                                    <li>Community Leader Award</li>
                                                    <li>Environmental Champion Badge</li>
                                                </ul>
                                                <h3 className="font-medium mt-4 mb-2">Milestones</h3>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span>Total Hours</span>
                                                        <span className="font-bold">150</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span>Projects Completed</span>
                                                        <span className="font-bold">12</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span>Skills Acquired</span>
                                                        <span className="font-bold">5</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="button">Close</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="w-full text-left flex items-center space-x-2 hover:bg-zinc-100 p-2 rounded-md">
                                                <FileText className="h-4 w-4" />
                                                <span>Certificates</span>
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                            <DialogHeader>
                                                <DialogTitle>Certificates</DialogTitle>
                                                <DialogDescription>Your earned certificates and qualifications.</DialogDescription>
                                            </DialogHeader>
                                            <div className="py-4">
                                                <h3 className="font-medium mb-2">Your Certificates</h3>
                                                <ul className="space-y-6">
                                                <ScrollArea className="h-[300px] w-full rounded-md p-4">
                                                    <li>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="font-semibold">First Aid Certification</span>
                                                            <Button size="sm">Download</Button>
                                                        </div>
                                                        <Image
                                                            src="/placeholder.svg"
                                                            alt="First Aid Certificate Preview"
                                                            width={200}
                                                            height={100}
                                                            className="rounded-md"
                                                        />
                                                    </li>
                                                    <li>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="font-semibold">Leadership Training</span>
                                                            <Button size="sm">Download</Button>
                                                        </div>
                                                        <Image
                                                            src="/placeholder.svg"
                                                            alt="Leadership Training Certificate Preview"
                                                            width={200}
                                                            height={100}
                                                            className="rounded-md"
                                                        />
                                                    </li>
                                                    <li>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="font-semibold">Environmental Stewardship</span>
                                                            <Button size="sm">Download</Button>
                                                        </div>
                                                        <Image
                                                            src="/placeholder.svg"
                                                            alt="Environmental Stewardship Certificate Preview"
                                                            width={200}
                                                            height={100}
                                                            className="rounded-md"
                                                        />
                                                    </li>
                                                    </ScrollArea>
                                                </ul>
                                            </div>
                                            <DialogFooter>
                                                <Button type="button">Close</Button>
                                            </DialogFooter>
                                            </ScrollArea>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <button
                                    className="w-full text-left flex items-center space-x-2 hover:bg-zinc-100 p-2 rounded-md"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Log out</span>
                                </button>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
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
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    )
}