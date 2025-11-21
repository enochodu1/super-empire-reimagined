import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const FAQ = () => {
  const faqs = [
    {
      question: "What is your minimum order quantity?",
      answer: "We work with businesses of all sizes. Our minimum order varies by product and location, but we're flexible to accommodate your needs. Contact us to discuss your specific requirements.",
    },
    {
      question: "How do you ensure produce freshness during delivery?",
      answer: "All deliveries are made in temperature-controlled trucks. Our produce is sourced directly from farms and distributed quickly to ensure maximum freshness. We also have strict quality control checks at every step.",
    },
    {
      question: "What areas do you serve?",
      answer: "We currently serve businesses across Oklahoma, Arkansas, Louisiana, and Texas. Specific delivery areas and schedules vary by region. Contact us to confirm if we serve your location.",
    },
    {
      question: "Can I set up recurring orders?",
      answer: "Absolutely! Many of our partners prefer recurring orders. Your account manager can set up automatic deliveries on your preferred schedule, whether daily, weekly, or custom intervals.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit cards, ACH transfers, and net payment terms for qualified accounts. Payment terms can be discussed with your account manager.",
    },
    {
      question: "Do you offer organic produce options?",
      answer: "Yes, we carry a selection of organic and sustainably-grown produce. Availability varies by season. Ask your account manager about our current organic offerings.",
    },
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card border-0 rounded-xl px-6 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12 animate-fade-up">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <Button variant="hero" size="lg">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
