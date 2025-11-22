import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click the 'Register' button in the top navigation or visit our registration page. You'll need to provide your business information, tax ID, and contact details. Once submitted, our team will review and approve your account within 24 hours."
        },
        {
          q: "What are the minimum order requirements?",
          a: "Our standard minimum order is $150 for delivery. However, this may vary by location and delivery zone. Contact your account manager for specific requirements in your area."
        },
        {
          q: "What forms of payment do you accept?",
          a: "We accept company checks, ACH transfers, and major credit cards (Visa, Mastercard, American Express). Net 30 terms are available for approved accounts with established credit history."
        }
      ]
    },
    {
      category: "Ordering & Delivery",
      questions: [
        {
          q: "What are your delivery hours?",
          a: "Standard delivery hours are Monday-Friday, 6:00 AM - 4:00 PM, and Saturday, 6:00 AM - 2:00 PM. We offer early morning, mid-day, and afternoon delivery windows. Specific times can be arranged with your account manager."
        },
        {
          q: "Can I place orders for same-day delivery?",
          a: "Same-day delivery is available for emergency orders placed before 10:00 AM, subject to availability and a rush order fee. Contact our customer service team to arrange same-day delivery."
        },
        {
          q: "How do I track my order?",
          a: "Once your order ships, you'll receive an email with tracking information. You can also view order status in real-time through your online account dashboard, including estimated delivery time and driver location."
        },
        {
          q: "What if I need to change or cancel my order?",
          a: "Orders can be modified or cancelled up until 3:00 PM the day before delivery. Contact customer service at (214) 555-7891 or use the 'Modify Order' feature in your online account."
        },
        {
          q: "Do you deliver to my area?",
          a: "We serve Dallas County, Fort Worth and Tarrant County, Plano/Frisco and Collin County, and Arlington and the Mid-Cities. Special arrangements can be made for deliveries outside our standard service area. Contact us to discuss your specific location."
        }
      ]
    },
    {
      category: "Products & Quality",
      questions: [
        {
          q: "How do you ensure product quality?",
          a: "All products go through rigorous quality control checks upon arrival at our facility. We maintain optimal storage conditions with temperature-controlled warehouses and use the FIFO (First In, First Out) inventory method to ensure freshness."
        },
        {
          q: "Do you offer organic produce?",
          a: "Yes! We have an extensive selection of certified organic fruits and vegetables. Look for the 'Organic' label in our online catalog or ask your account manager about organic options."
        },
        {
          q: "Can you source specialty or seasonal items?",
          a: "Absolutely. We can source specialty items, exotic produce, and seasonal specialties. Submit a custom order request through your account or contact your account manager with specific requirements."
        },
        {
          q: "What if I receive damaged or poor-quality products?",
          a: "We stand behind our quality 100%. If you're not satisfied with any product, contact us immediately. We'll provide a credit or replacement on your next delivery, no questions asked."
        },
        {
          q: "How long will my produce stay fresh?",
          a: "Shelf life varies by product. We provide storage and handling recommendations with each delivery. Generally, leafy greens last 3-5 days, root vegetables 1-2 weeks, and citrus fruits 1-3 weeks when properly stored."
        }
      ]
    },
    {
      category: "Pricing & Billing",
      questions: [
        {
          q: "How is pricing determined?",
          a: "Pricing is based on market conditions, seasonality, and volume. Wholesale prices fluctuate based on supply and availability. You'll always see current pricing when you log into your account."
        },
        {
          q: "Do you offer volume discounts?",
          a: "Yes, volume discounts are available for large orders and high-volume customers. Contact your account manager to discuss custom pricing based on your ordering volume."
        },
        {
          q: "When will I be charged for my order?",
          a: "Credit card orders are charged when shipped. Check and ACH payments are due based on your payment terms (typically Net 30 for approved accounts). You'll receive an invoice with each delivery."
        },
        {
          q: "Can I see my purchase history?",
          a: "Yes! Your online account dashboard shows complete order history, invoices, and spending analytics. You can download reports for your accounting needs."
        }
      ]
    },
    {
      category: "Account Management",
      questions: [
        {
          q: "How do I set up standing orders?",
          a: "Log into your account and navigate to 'Standing Orders' in the menu. Select your desired products, quantities, and delivery schedule. Your standing order will automatically process according to your schedule."
        },
        {
          q: "Can I have multiple users on my account?",
          a: "Yes, you can add multiple users with different permission levels. Contact customer service to set up additional users for your account."
        },
        {
          q: "How do I update my account information?",
          a: "Account information can be updated through your online dashboard under 'Account Settings.' For changes to billing information or credit terms, please contact your account manager."
        },
        {
          q: "What if I forget my password?",
          a: "Click 'Forgot Password' on the login page. You'll receive an email with instructions to reset your password. If you need assistance, contact customer service."
        }
      ]
    },
    {
      category: "Food Safety & Compliance",
      questions: [
        {
          q: "Are you USDA certified?",
          a: "Yes, our facility maintains all necessary certifications and undergoes regular inspections. We comply with all USDA, FDA, and local health department regulations."
        },
        {
          q: "Do you provide product traceability?",
          a: "Yes, we maintain complete traceability for all products from grower to delivery. We can provide lot numbers, origin information, and certificates as needed for your records."
        },
        {
          q: "What food safety protocols do you follow?",
          a: "We follow strict HACCP protocols, maintain temperature logs, conduct regular facility sanitization, and require food safety training for all staff. Our facility is regularly inspected and certified."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-brand-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Find answers to common questions about our services, ordering, and more
          </p>
          {/* Search Box */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                className="pl-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {filteredCategories.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  No FAQs found matching "{searchTerm}". Try a different search term or{" "}
                  <a href="/contact" className="text-brand-green hover:underline">
                    contact us
                  </a>{" "}
                  for assistance.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => {
                let questionCount = 0;
                // Calculate running question count before this category
                for (let i = 0; i < categoryIndex; i++) {
                  questionCount += filteredCategories[i].questions.length;
                }

                return (
                  <div key={categoryIndex}>
                    <h2 className="text-2xl font-bold mb-6 text-brand-green">
                      {category.category}
                    </h2>
                    <div className="space-y-3">
                      {category.questions.map((item, questionIndex) => {
                        const globalIndex = questionCount + questionIndex;
                        const isOpen = openIndex === globalIndex;

                        return (
                          <Card
                            key={questionIndex}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => toggleQuestion(globalIndex)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-2 flex items-start gap-2">
                                    <span className="text-brand-green">Q:</span>
                                    <span>{item.q}</span>
                                  </h3>
                                  {isOpen && (
                                    <div className="mt-4 pl-6">
                                      <p className="text-muted-foreground flex items-start gap-2">
                                        <span className="text-brand-green font-semibold">A:</span>
                                        <span>{item.a}</span>
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-shrink-0">
                                  {isOpen ? (
                                    <ChevronUp className="w-5 h-5 text-brand-green" />
                                  ) : (
                                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Can't find what you're looking for? Our customer service team is here to help.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand-green text-white font-semibold hover:bg-brand-green/90 transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="tel:2145557890"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-transparent border-2 border-brand-green text-brand-green font-semibold hover:bg-brand-green/10 transition-colors"
                >
                  Call (214) 555-7890
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Customer Service Hours: Monday-Friday, 6:00 AM - 6:00 PM CST
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
