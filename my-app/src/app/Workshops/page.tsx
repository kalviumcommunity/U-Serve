"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from 'lucide-react'

type Workshop = {
    workshop_id: string
    title: string
    description: string
    category: string
    date: string
    start_time: string
    end_time: string
    location: {
        venue: string
        city: string
        state: string
    }
    host: {
        name: string
    }
    capacity: number
    status: string
    tags: string[]
}

const dummyWorkshops: Workshop[] = [
    {
        workshop_id: "1",
        title: "Web Development Basics",
        description: "Learn the fundamentals of web development in this hands-on workshop.",
        category: "Education",
        date: "2024-03-15",
        start_time: "10:00",
        end_time: "16:00",
        location: {
            venue: "Tech Hub",
            city: "San Francisco",
            state: "CA"
        },
        host: {
            name: "CodeMasters Inc."
        },
        capacity: 30,
        status: "Upcoming",
        tags: ["HTML", "CSS", "JavaScript"]
    },
    {
        workshop_id: "2",
        title: "Environmental Conservation Techniques",
        description: "Discover practical ways to contribute to environmental conservation.",
        category: "Environment",
        date: "2024-04-22",
        start_time: "09:00",
        end_time: "14:00",
        location: {
            venue: "Green Park",
            city: "Portland",
            state: "OR"
        },
        host: {
            name: "EcoWarriors"
        },
        capacity: 50,
        status: "Upcoming",
        tags: ["Conservation", "Sustainability", "Ecology"]
    },
    {
        workshop_id: "3",
        title: "Healthcare Innovation Symposium",
        description: "Explore cutting-edge innovations in healthcare technology and practices.",
        category: "Healthcare",
        date: "2024-05-10",
        start_time: "08:30",
        end_time: "17:00",
        location: {
            venue: "MedTech Center",
            city: "Boston",
            state: "MA"
        },
        host: {
            name: "HealthInnovate Foundation"
        },
        capacity: 100,
        status: "Upcoming",
        tags: ["MedTech", "Innovation", "Healthcare"]
    }
]

export default function WorkshopsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")

    const filteredWorkshops = dummyWorkshops.filter(workshop =>
        workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || workshop.category === selectedCategory)
    )

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-zinc-950 text-zinc-50 min-h-screen">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Workshops</h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
                <Input
                    placeholder="Search workshops..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow bg-zinc-950 text-zinc-50 border-zinc-800 focus:border-zinc-100"
                />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className='bg-zinc-900 text-zinc-50 border-zinc-800'>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Environment">Environment</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredWorkshops.map(workshop => (
                    <Card key={workshop.workshop_id} className=" bg-zinc-950 border-zinc-800 w-full flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className=" text-zinc-50 text-lg sm:text-xl">{workshop.title}</CardTitle>
                                <Badge className="ml-2">{workshop.category}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground mb-4">{workshop.description}</p>
                            <div className="flex flex-col gap-2 text-sm text-zinc-50">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                                    <span>{new Date(workshop.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ClockIcon className="w-4 h-4 flex-shrink-0" />
                                    <span>{workshop.start_time} - {workshop.end_time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                                    <span className="break-words">{workshop.location.venue}, {workshop.location.city}, {workshop.location.state}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <UsersIcon className="w-4 h-4 flex-shrink-0" />
                                    <span>Capacity: {workshop.capacity}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-2 pt-4 border-t border-zinc-800">
                            <div className="text-sm">Host: {workshop.host.name}</div>
                            <div className="flex flex-wrap gap-2">
                                {workshop.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}