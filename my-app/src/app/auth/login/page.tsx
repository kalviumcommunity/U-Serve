"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function Dashboard({}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Student")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast();
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            // Make API call to login
            const response = await fetch("/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "login",
                    email,
                    password,
                    role: role.toLowerCase(),
                }),
            })

            const data = await response.json()

            if (response.ok) {

                // Store the token in cookies
                Cookies.set('token', data.token, { expires: 1 }) // Set cookie for 1 day
                Cookies.set('role',role, {expires: 1})
                Cookies.set('email',email,{expires: 1})

                toast({
                    title: "Login successful",
                    description: "Redirecting to Home page",
                    duration: 2500, // Toast will disappear after 2.5 seconds
                    className: "bg-zinc-950 border-zinc-800"
                })
                setTimeout(() => {
                    router.push("/Volunteer"); // Redirect to login page
                }, 2500); // Match the toast duration
            } else {
                setError(data.error)
            }
        } catch (err) {
            setError("An error occurred during login")
        } finally {
            setIsLoading(false)
        }
    }

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
                        <Tabs defaultValue="Student" className="w-full " onValueChange={setRole}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="Student">Student</TabsTrigger>
                                <TabsTrigger value="Organization">Organization</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    className="focus:border-zinc-100 "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                <Input
                                    id="password"
                                    type="password"
                                    className="focus:border-zinc-100 "
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full bg-red-700 text-zinc-50 hover:bg-red-800"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                            <Button variant="outline" className="w-full hover:bg-zinc-800 hover:text-zinc-50 gap-2">
                                <Image
                                    src="/google.svg"
                                    alt="Image"
                                    width="20"
                                    height="20"
                                    className="h-full object-cover" />Continue with Google
                            </Button>
                        </div>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}