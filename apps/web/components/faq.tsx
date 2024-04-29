"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/ui/accordion";
import { useEffect, useState } from "react";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is this?",
    answer:
      "BeavBright is a community-driven study platform for Oregon State University students. Our goal is to provide a space for students to share resources, collaborate on projects, and connect with other students. We offer a variety of features, including course materials, study groups, and discussions.",
    value: "item-1",
  },
  {
    question: "How do I get started?",
    answer:
      "To get started, simply create an account and start exploring! You can search for courses, join study groups, and participate in discussions.",
    value: "item-2",
  },
];

export function FAQ() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      {FAQList.map(({ question, answer, value }: FAQProps) => (
        <Accordion key={value} type="single" collapsible>
          <AccordionItem value={value}>
            <AccordionTrigger>
              <h3 className="font-semibold text-lg">{question}</h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{answer}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          href="https://osuapp.club"
          target="_blank"
          rel="noreferrer"
          className="text-orange-500 hover:underline"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
}
