"use client"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function Dashboard() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-full ">
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/auth.png"
                    alt="Image"
                    width="1920"
                    height="108"
                    className="w-full object-cover brightness-[0.8]"
                />
            </div>
            <div className="flex items-center justify-center py-40 md:py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <Tabs defaultValue="Student" className="w-full ">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="Student">Student</TabsTrigger>
                                <TabsTrigger value="Organisation">Organisation</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                className="focus:border-zinc-100 "
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" className="focus:border-zinc-100 " required />
                        </div>
                        <Button type="submit" className="w-full bg-red-700 text-zinc-50 hover:bg-red-800">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full hover:bg-zinc-800 hover:text-zinc-50 gap-2">
                            <Image src="/google.svg"
                                alt="Image"
                                width="20"
                                height="20"
                                className="h-full  object-cover" />Continue with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}