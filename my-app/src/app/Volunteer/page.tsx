'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Clock } from "lucide-react"
import { format } from "date-fns"

// Mock data for volunteer opportunities
const opportunities = [
    {
        id: 1,
        title: "Campus Clean-up",
        organization: "World Health Organization (WHO)",
        location: "Main Quad",
        date: "2023-05-15",
        duration: "2 hours",
        category: "Environment"
    },
    {
        id: 2,
        title: "Food Drive",
        organization: "United Nations Children's Fund (UNICEF)",
        location: "Student Center",
        date: "2023-05-20",
        duration: "3 hours",
        category: "Community Service"
    },
    {
        id: 3,
        title: "Tutoring Session",
        organization: "UNESCO",
        location: "Library",
        date: "2023-05-18",
        duration: "1.5 hours",
        category: "Education"
    },
    {
        id: 4,
        title: "Tree Plantation Drive",
        organization: "World Wildlife Fund (WWF)",
        location: "University Park",
        date: "2023-06-05",
        duration: "4 hours",
        category: "Environment"
    },
    {
        id: 5,
        title: "Blood Donation Camp",
        organization: "International Red Cross",
        location: "Health Center",
        date: "2023-06-10",
        duration: "5 hours",
        category: "Healthcare"
    },
    {
        id: 6,
        title: "Beach Clean-up",
        organization: "Greenpeace",
        location: "City Beach",
        date: "2023-06-15",
        duration: "3 hours",
        category: "Environment"
    },
    {
        id: 7,
        title: "Workshop on Mental Health",
        organization: "Doctors Without Borders (MSF)",
        location: "Student Wellness Center",
        date: "2023-06-20",
        duration: "2 hours",
        category: "Healthcare"
    },
    {
        id: 8,
        title: "STEM Workshop for Kids",
        organization: "Save the Children",
        location: "Community Hall",
        date: "2023-06-25",
        duration: "3 hours",
        category: "Education"
    },
    {
        id: 9,
        title: "Clothing Donation Drive",
        organization: "Oxfam International",
        location: "Downtown Center",
        date: "2023-06-30",
        duration: "4 hours",
        category: "Community Service"
    },
    {
        id: 10,
        title: "Fundraising for Animal Shelter",
        organization: "Habitat for Humanity",
        location: "University Grounds",
        date: "2023-07-05",
        duration: "3 hours",
        category: "Community Service"
    },
    {
        id: 11,
        title: "Health Camp for Senior Citizens",
        organization: "CARE International",
        location: "Community Health Center",
        date: "2023-07-10",
        duration: "5 hours",
        category: "Healthcare"
    },
    {
        id: 12,
        title: "Coding Bootcamp for Beginners",
        organization: "GlobalGiving",
        location: "Innovation Lab",
        date: "2023-07-15",
        duration: "6 hours",
        category: "Education"
    },
    {
        id: 13,
        title: "Human Rights Awareness Workshop",
        organization: "Amnesty International",
        location: "Community Hall",
        date: "2023-07-20",
        duration: "3 hours",
        category: "Human Rights"
    }
];

const organizations = Array.from(new Set(opportunities.map(opp => opp.organization)))
const categories = Array.from(new Set(opportunities.map(opp => opp.category)))

export default function VolunteerMarketplace() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedOrg, setSelectedOrg] = useState("all")
    const [selectedDate, setSelectedDate] = useState<Date>()

    const filteredOpportunities = opportunities.filter(opp =>
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || opp.category === selectedCategory) &&
        (!selectedDate || opp.date === format(selectedDate, "yyyy-MM-dd")) &&
        (selectedOrg === "all" || opp.organization === selectedOrg)
    )

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-zinc-950 text-zinc-50 min-h-screen">
            <h1 className="md:block hidden text-3xl font-bold mb-8 text-left text-zinc-50">Volunteer Opportunity Marketplace</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Input
                    type="search"
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow bg-zinc-950 text-zinc-50 border-zinc-800 focus:border-zinc-100"
                />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-[145px] bg-zinc-950 text-zinc-50 border-zinc-800">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 text-zinc-50 border-zinc-800">
                        <SelectItem value="all">Causes</SelectItem>
                        {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                    <SelectTrigger className="w-full md:w-[200px] bg-zinc-950 text-zinc-50 border-zinc-800">
                        <SelectValue placeholder="Organization" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 text-zinc-50 border-zinc-800">
                        <SelectItem value="all">Organization</SelectItem>
                        {organizations.map(org => (
                            <SelectItem key={org} value={org}>{org}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full md:w-[180px] hover:bg-zinc-800 hover:text-zinc-50">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                            className="bg-zinc-900 text-zinc-50"
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {filteredOpportunities.map(opp => (
                    <Card key={opp.id} className="bg-zinc-950 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-zinc-50">{opp.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <Image
                                src="/auth.png"
                                alt="Image"
                                width="1920"
                                height="1080"
                                className="w-[100%] h-[20%] object-cover rounded-md brightness-[0.8]"
                            />
                            <p className="text-sm text-zinc-400 mt-4">{opp.organization}</p>
                            <div className="flex items-center text-sm mb-1 text-zinc-300">
                                <MapPin className="mr-2 h-4 w-4" />
                                {opp.location}
                            </div>
                            <div className="flex items-center text-sm mb-1 text-zinc-300">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {opp.date}
                            </div>
                            <div className="flex items-center text-sm text-zinc-300">
                                <Clock className="mr-2 h-4 w-4" />
                                {opp.duration}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-red-700 text-zinc-50 hover:bg-red-800">Apply</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}