import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: Show success message
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: [
        "Main Office: (214) 555-7890",
        "Orders: (214) 555-7891",
        "Toll Free: 1-800-PRODUCE"
      ]
    },
    {
      icon: Mail,
      title: "Email",
      details: [
        "General: info@groceryempire.com",
        "Orders: orders@groceryempire.com",
        "Support: support@groceryempire.com"
      ]
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "Grocery Empire",
        "2500 Commerce Street, Suite 100",
        "Dallas, TX 75201"
      ]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 5:00 AM - 6:00 PM",
        "Saturday: 6:00 AM - 4:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-brand-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get in touch with our team. We're here to help with all your wholesale produce needs.
          </p>
        </div>
      </div>

      {/* Contact Information Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactInfo.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-green/10 mb-4">
                  <item.icon className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <div className="space-y-1">
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">{detail}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@restaurant.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Restaurant or Business"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Visit Our Facility</h2>
              <Card>
                <CardContent className="p-0">
                  {/* Map Placeholder */}
                  <div className="w-full h-64 bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Interactive Map</p>
                      <p className="text-sm">2500 Commerce Street, Suite 100</p>
                      <p className="text-sm">Dallas, TX 75201</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Delivery Areas</h3>
                  <p className="text-muted-foreground mb-4">
                    We proudly serve the following areas with daily deliveries:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                      <span>Dallas County and surrounding areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                      <span>Fort Worth and Tarrant County</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                      <span>Plano, Frisco, and Collin County</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                      <span>Arlington and Mid-Cities</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Special delivery arrangements available for areas outside our standard service zone.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
                  <p className="text-muted-foreground mb-4">
                    Our dedicated customer service team is available to assist you:
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-foreground">Phone Support:</strong><br />
                        Monday - Friday, 6:00 AM - 6:00 PM<br />
                        Saturday, 6:00 AM - 2:00 PM
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-foreground">Email Support:</strong><br />
                        We respond to all emails within 24 hours
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Place an Order</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse our catalog and start ordering
                </p>
                <a href="/products" className="text-brand-green font-medium hover:underline">
                  Shop Products →
                </a>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Create Account</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sign up for exclusive wholesale pricing
                </p>
                <a href="/register" className="text-brand-green font-medium hover:underline">
                  Register Now →
                </a>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">View FAQs</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find answers to common questions
                </p>
                <a href="/faq" className="text-brand-green font-medium hover:underline">
                  Read FAQs →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
