"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FAQPage() {
  const faqs = [
    {
      question: "What is a volunteer marketplace?",
      answer: "A volunteer marketplace is a platform that connects individuals who want to volunteer with organizations that need help. It allows people to find and sign up for volunteer opportunities that match their skills and interests."
    },
    {
      question: "How do I sign up to volunteer?",
      answer: "To sign up as a volunteer, create an account on our platform, complete your profile with your skills and interests, and browse available opportunities. When you find a suitable role, you can apply directly through the website."
    },
    {
      question: "Can organizations post volunteer opportunities?",
      answer: "Yes, organizations can create an account and post volunteer opportunities after being verified. They can specify the skills required, time commitment, and other relevant details for each role."
    },
    {
      question: "Is there a fee for using the platform?",
      answer: "Our platform is free for individual volunteers. Organizations may have different subscription tiers depending on their needs and the number of opportunities they want to post."
    },
    {
      question: "How are volunteers vetted?",
      answer: "While we don't directly vet volunteers, we encourage organizations to conduct their own screening processes. We provide tools for organizations to review volunteer profiles, conduct interviews, and request references if needed."
    },
    {
      question: "Can I volunteer remotely?",
      answer: "Yes, many organizations offer remote volunteering opportunities. You can filter opportunities by location type (remote, on-site, or hybrid) when searching for roles."
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-zinc-950 text-zinc-50 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <Card className="bg-zinc-900 border border-zinc-800">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-6 text-zinc-100">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="border-zinc-800">
                  <AccordionTrigger className="text-left text-zinc-100 hover:text-zinc-300">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}