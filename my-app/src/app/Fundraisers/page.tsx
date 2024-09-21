'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, DollarSign, Target } from "lucide-react"
import { format } from "date-fns"

// Mock data for fundraising campaigns
const campaigns = [
    {
        id: 1,
        title: "Clean Water Initiative",
        organization: "Water for All",
        location: "Global",
        endDate: "2023-08-15",
        goal: 50000,
        raised: 35000,
        category: "Environment"
    },
    {
        id: 2,
        title: "Education to poor",
        organization: "Teach for Tomorrow",
        location: "India",
        endDate: "2023-09-01",
        goal: 75000,
        raised: 45000,
        category: "Education"
    },
    {
        id: 3,
        title: "Wildlife Conservation",
        organization: "Save the Animals",
        location: "Africa",
        endDate: "2023-08-30",
        goal: 100000,
        raised: 80000,
        category: "Animal Welfare"
    },
    {
        id: 4,
        title: "Disaster Relief Fund",
        organization: "Global Aid",
        location: "Worldwide",
        endDate: "2023-09-15",
        goal: 200000,
        raised: 150000,
        category: "Disaster Relief"
    },
    {
        id: 5,
        title: "Cancer Research",
        organization: "Hope for Cure",
        location: "United States",
        endDate: "2023-10-01",
        goal: 500000,
        raised: 300000,
        category: "Healthcare"
    },
    {
        id: 6,
        title: "Hunger Eradication",
        organization: "Food for All",
        location: "Global",
        endDate: "2023-09-30",
        goal: 150000,
        raised: 100000,
        category: "Hunger"
    },
    {
        id: 7,
        title: "Refugee Support",
        organization: "Safe Haven",
        location: "Europe",
        endDate: "2023-10-15",
        goal: 250000,
        raised: 180000,
        category: "Humanitarian Aid"
    },
    {
        id: 8,
        title: "Ocean Cleanup",
        organization: "Clean Seas",
        location: "Pacific Ocean",
        endDate: "2023-11-01",
        goal: 300000,
        raised: 200000,
        category: "Environment"
    },
    {
        id: 9,
        title: "Mental Health Awareness",
        organization: "Mind Matters",
        location: "Worldwide",
        endDate: "2023-10-10",
        goal: 100000,
        raised: 75000,
        category: "Healthcare"
    },
    {
        id: 10,
        title: "Reforestation Project",
        organization: "Green Earth",
        location: "Amazon Rainforest",
        endDate: "2023-12-01",
        goal: 400000,
        raised: 320000,
        category: "Environment"
    }
];

const organizations = Array.from(new Set(campaigns.map(camp => camp.organization)))
const categories = Array.from(new Set(campaigns.map(camp => camp.category)))

export default function FundraiserMarketplace() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedOrg, setSelectedOrg] = useState("all")
    const [selectedDate, setSelectedDate] = useState<Date>()

    const filteredCampaigns = campaigns.filter(camp =>
        camp.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || camp.category === selectedCategory) &&
        (!selectedDate || camp.endDate >= format(selectedDate, "yyyy-MM-dd")) &&
        (selectedOrg === "all" || camp.organization === selectedOrg)
    )

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-zinc-950 text-zinc-50 min-h-screen">
            <h1 className=" md:block hidden text-3xl font-bold mb-8 text-left text-zinc-50">Fundraisers</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Input
                    type="search"
                    placeholder="Search campaigns..."
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
                            {selectedDate ? format(selectedDate, "PPP") : "End date after"}
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
                {filteredCampaigns.map(camp => (
                    <Card key={camp.id} className="bg-zinc-950 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-zinc-50">{camp.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src="/fundraiser.jpg"
                                alt="Campaign Image"
                                width={400}
                                height={200}
                                className="w-full h-40 object-cover rounded-md brightness-[0.8] mb-4"
                            />
                            <p className="text-sm text-zinc-400 mb-2">{camp.organization}</p>
                            <div className="flex items-center text-sm mb-1 text-zinc-300">
                                <MapPin className="mr-2 h-4 w-4" />
                                {camp.location}
                            </div>
                            <div className="flex items-center text-sm mb-1 text-zinc-300">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                End Date: {camp.endDate}
                            </div>
                            <div className="flex items-center text-sm mb-1 text-zinc-300">
                                <Target className="mr-2 h-4 w-4" />
                                Goal: ${camp.goal.toLocaleString()}
                            </div>
                            <div className="flex items-center text-sm text-zinc-300">
                                <DollarSign className="mr-2 h-4 w-4" />
                                Raised: ${camp.raised.toLocaleString()}
                            </div>
                            <div className="mt-2 bg-zinc-800 rounded-full h-2">
                                <div
                                    className="bg-red-600 h-2 rounded-full"
                                    style={{ width: `${(camp.raised / camp.goal) * 100}%` }}
                                ></div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-red-700 text-zinc-50 hover:bg-red-800">Donate Now</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}