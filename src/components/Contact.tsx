import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, User } from "lucide-react";
import { COMPANY_INFO, getCallUrl, getEmailUrl, getDirectionsUrl, isCurrentlyOpen } from "@/lib/companyInfo";

export const Contact = () => {
  const isOpen = isCurrentlyOpen();

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to order? Contact our sales team for personalized service and bulk pricing.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Sales Contact - Sindy Castillo */}
          <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">{COMPANY_INFO.contacts.sales.name}</CardTitle>
                  <CardDescription className="text-green-100">Sales Manager</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Direct Line</p>
                  <a
                    href={`tel:${COMPANY_INFO.contacts.sales.phone.replace(/\D/g, '')}`}
                    className="text-lg font-semibold text-green-600 hover:text-green-700"
                  >
                    {COMPANY_INFO.contacts.sales.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href={`mailto:${COMPANY_INFO.contacts.sales.email}`}
                    className="text-sm font-medium text-green-600 hover:text-green-700 break-all"
                  >
                    {COMPANY_INFO.contacts.sales.email}
                  </a>
                </div>
              </div>
              <Button className="w-full mt-4" size="lg" asChild>
                <a href={`tel:${COMPANY_INFO.contacts.sales.phone.replace(/\D/g, '')}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Main Office */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Main Office</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <p className="font-medium">{COMPANY_INFO.address.street}</p>
                <p className="font-medium">{COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} {COMPANY_INFO.address.zip}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Main Phone</p>
                <a
                  href={getCallUrl()}
                  className="text-lg font-semibold text-blue-600 hover:text-blue-700"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">General Inquiries</p>
                <a
                  href={getEmailUrl()}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              <Button variant="outline" className="w-full mt-4" size="lg" asChild>
                <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span>Business Hours</span>
              </CardTitle>
              <div className="flex items-center space-x-2 mt-2">
                {isOpen ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-green-600">Open Now</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-sm font-semibold text-red-600">Closed</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Office</p>
                <p className="font-medium">{COMPANY_INFO.hours.office}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Warehouse</p>
                <p className="font-medium">{COMPANY_INFO.hours.warehouse}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Deliveries</p>
                <p className="font-medium">{COMPANY_INFO.hours.deliveries}</p>
              </div>
              <div className="pt-3 border-t">
                <p className="text-sm text-gray-500 mb-1">Online Ordering</p>
                <p className="font-semibold text-green-600">{COMPANY_INFO.operations.orderingHours}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Area Banner */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
            <CardContent className="py-8">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-2">
                {COMPANY_INFO.serviceArea.description}
              </h3>
              <p className="text-white/90 text-lg">
                Serving {COMPANY_INFO.serviceArea.states.join(', ')}
              </p>
              <p className="text-white/80 text-sm mt-2">
                USDOT #{COMPANY_INFO.business.usdotNumber} • Licensed & Insured
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
