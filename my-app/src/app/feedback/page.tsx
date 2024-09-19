"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

export default function Feedback() {
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
      };
  
    return (
      <div className="bg-black min-h-screen flex flex-col">
        <Navbar />
        <div className="text-center text-white py-8 mt-40 flex-grow">
          <h1 className="text-3xl font-bold mb-4">
            Hi Subham, share your feedback
          </h1>
          <div className="w-1/2 mx-auto mt-20">
            <select
              id="feedback-select"
              className="w-full p-2 border rounded bg-white text-black"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="">Please Select</option>
              <option value="events">Events/Opportunities</option>
              <option value="workshops">Workshops</option>
              <option value="fundraisers">Fundraisers</option>
            </select>
          </div>
  
          {/* Conditionally render the form based on the selected option */}
          {selectedOption && (
            <div className="w-1/2 mx-auto mt-5">
              <div className="mb-6">
                <Input placeholder="Name" id="name" className="w-full p-2 border rounded bg-white text-black" />
              </div>
              <div className="mb-2">
                <Input placeholder="Email Address" id="email" className="w-full p-2 border rounded bg-white text-black" />
              </div>
              <div className="mb-4">
                <Label htmlFor="details">Add details</Label>
                <textarea
                id="details"
                className="w-full p-2 border rounded bg-white text-black"
                rows={4}
                />
              </div>
              <Button className="w-full bg-red-500 text-white">Continue</Button>
            </div>
          )}
        </div>
      </div>
    );
  }
  