"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { StarIcon } from "lucide-react"

export default function FeedbackPage() {
  const [rating, setRating] = useState<number>(0)
  const [feedbackType, setFeedbackType] = useState<string>("")
  const [comments, setComments] = useState<string>("")
  const { toast } = useToast()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the feedback to your server
    console.log({ rating, feedbackType, comments })

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
      duration: 2500, // Toast will disappear after 3 seconds
      className: "bg-zinc-950 border-zinc-800 w-[88%] ml-12"
    })

    // Reset form
    setRating(0)
    setFeedbackType("")
    setComments("")
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 md:pt-28 pt-28 p-3">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">Feedback Form</h1>
          <p className="text-zinc-400 mt-2">We value your feedback. Please let us know how we&apos;re doing.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <Label className="text-zinc-200 block">How would you rate your experience?</Label>
            <RadioGroup
              className="flex space-x-1"
              value={rating.toString()}
              onValueChange={(value) => setRating(parseInt(value))}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <RadioGroupItem
                  key={value}
                  value={value.toString()}
                  id={`rating-${value}`}
                  className="sr-only"
                />
              ))}
              {[1, 2, 3, 4, 5].map((value) => (
                <Label
                  key={value}
                  htmlFor={`rating-${value}`}
                  className={`cursor-pointer ${rating >= value ? "text-amber-400" : "text-zinc-600"
                    }`}
                >
                  <StarIcon className="w-8 h-8 fill-current" />
                </Label>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback-type" className="text-zinc-200">Feedback Type</Label>
            <Select value={feedbackType} onValueChange={setFeedbackType}>
              <SelectTrigger id="feedback-type" className="bg-zinc-950 border-zinc-700 text-zinc-200">
                <SelectValue placeholder="Select feedback type" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 text-zinc-50 border-zinc-800">
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments" className="text-zinc-200">Comments</Label>
            <Textarea
              id="comments"
              placeholder="Please provide any additional comments or suggestions"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="bg-zinc-950 border-zinc-700 text-zinc-200 placeholder-zinc-500 min-h-[150px]"
            />
          </div>
          <Button type="submit" className="w-full bg-red-700 text-zinc-50 hover:bg-red-800">Submit Feedback</Button>
        </form>
      </div>
    </div>
  )
}