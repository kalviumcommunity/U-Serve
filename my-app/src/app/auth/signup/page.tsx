"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"; // Import useRouter

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Student")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast();
    const router = useRouter(); // Initialize useRouter

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch("/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "signup", email, password, role: role.toLowerCase() }),
            })

            const data = await response.json()

            if (data.success) {
                toast({
                    title: "Account created",
                    description: "Your account has been created successfully. Please log in.",
                    duration: 2500, // Toast will disappear after 2.5 seconds
                    className: "bg-zinc-950 border-zinc-800"
                })

                // Redirect to login page after toast duration
                setTimeout(() => {
                    router.push("/auth/login"); // Redirect to login page
                }, 2500); // Match the toast duration
            } else {
                toast({
                    title: "Sign up failed",
                    description: data.error || "An error occurred during sign up",
                    duration: 2500, // Toast will disappear after 2.5 seconds
                    className: "bg-zinc-950 border-zinc-800"
                })

                if (data.error == "Email already exists for this role") {
                    setTimeout(() => {
                        router.push("/auth/login"); // Redirect to login page
                    }, 2500); // Match the toast duration
                }
            }
        } catch (err) {
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                duration: 2500, // Toast will disappear after 2.5 seconds
                className: "bg-zinc-950 border-zinc-800"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-full">
            <div className="hidden bg-muted lg:block">
                <Image src="/auth.png" alt="Image" width="1920" height="108" className="w-full object-cover brightness-[0.8]" />
            </div>
            <div className="flex items-center justify-center py-40 md:py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Create an account</h1>
                        <Tabs defaultValue="Student" className="w-full" onValueChange={setRole}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="Student">Student</TabsTrigger>
                                <TabsTrigger value="Organization">Organization</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <p className="text-balance text-muted-foreground">Enter your email below to create your account</p>
                    </div>
                    <form className="grid gap-4" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
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
                                    Signing up...
                                </>
                            ) : (
                                "Sign up"
                            )}
                        </Button>
                        <Button variant="outline" className="w-full hover:bg-zinc-800 hover:text-zinc-50 gap-2">
                            <Image src="/google.svg" alt="Image" width="20" height="20" className="h-full object-cover" />Continue with Google
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Have an account?{" "}
                        <Link href="login" className="underline">login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}