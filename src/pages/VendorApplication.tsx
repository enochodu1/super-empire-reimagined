import { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const VendorApplication = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    businessType: '',
    taxId: '',
    yearEstablished: '',

    // Contact Information
    primaryContactName: '',
    primaryContactEmail: '',
    primaryContactPhone: '',
    businessAddress: '',
    city: '',
    state: '',
    zipCode: '',

    // Products & Services
    productsOffered: '',
    productCategories: [] as string[],
    organicCertified: false,
    gapCertified: false,
    otherCertifications: '',

    // Capacity & Logistics
    monthlyCapacity: '',
    deliveryRadius: '',
    minimumOrder: '',

    // References
    reference1Name: '',
    reference1Company: '',
    reference1Phone: '',
    reference1Email: '',
    reference2Name: '',
    reference2Company: '',
    reference2Phone: '',
    reference2Email: '',

    // Additional Information
    additionalInfo: '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCategoryToggle = (category: string) => {
    const categories = formData.productCategories.includes(category)
      ? formData.productCategories.filter(c => c !== category)
      : [...formData.productCategories, category];
    setFormData({ ...formData, productCategories: categories });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.companyName || !formData.primaryContactEmail || !formData.primaryContactPhone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.productCategories.length === 0) {
      toast.error('Please select at least one product category');
      return;
    }

    console.log('Vendor Application Submitted:', formData);
    setSubmitted(true);
    toast.success('Application submitted successfully!');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">Application Submitted!</CardTitle>
            <CardDescription>
              Thank you for your interest in becoming a Grocery Empire vendor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Our vendor management team will review your application within 3-5 business days</li>
                <li>• We may contact you for additional information or to schedule a facility visit</li>
                <li>• You'll receive an email notification once your application is approved</li>
                <li>• After approval, you'll gain access to the vendor portal and inventory management system</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Application ID</h3>
              <p className="font-mono text-lg">#VA-{Date.now().toString().slice(-8)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Save this ID for your records. You can use it to check your application status.
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => navigate('/')} className="flex-1">
                Return Home
              </Button>
              <Button onClick={() => setSubmitted(false)} variant="outline" className="flex-1">
                Submit Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-green-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Main Site</span>
          </Link>
          <h1 className="text-3xl font-bold">Vendor Application</h1>
          <p className="text-green-100">Apply to become a Grocery Empire supplier</p>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Tell us about your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    placeholder="ABC Farms LLC"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleChange('businessType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farm">Farm/Grower</SelectItem>
                      <SelectItem value="distributor">Distributor</SelectItem>
                      <SelectItem value="manufacturer">Manufacturer</SelectItem>
                      <SelectItem value="cooperative">Cooperative</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / EIN</Label>
                  <Input
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => handleChange('taxId', e.target.value)}
                    placeholder="XX-XXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearEstablished">Year Established</Label>
                  <Input
                    id="yearEstablished"
                    type="number"
                    value={formData.yearEstablished}
                    onChange={(e) => handleChange('yearEstablished', e.target.value)}
                    placeholder="2010"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Primary contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryContactName">Contact Name *</Label>
                  <Input
                    id="primaryContactName"
                    value={formData.primaryContactName}
                    onChange={(e) => handleChange('primaryContactName', e.target.value)}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryContactEmail">Email *</Label>
                  <Input
                    id="primaryContactEmail"
                    type="email"
                    value={formData.primaryContactEmail}
                    onChange={(e) => handleChange('primaryContactEmail', e.target.value)}
                    placeholder="john@abcfarms.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryContactPhone">Phone *</Label>
                  <Input
                    id="primaryContactPhone"
                    type="tel"
                    value={formData.primaryContactPhone}
                    onChange={(e) => handleChange('primaryContactPhone', e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Input
                  id="businessAddress"
                  value={formData.businessAddress}
                  onChange={(e) => handleChange('businessAddress', e.target.value)}
                  placeholder="123 Farm Road"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="Farmville"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    placeholder="VA"
                    maxLength={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleChange('zipCode', e.target.value)}
                    placeholder="12345"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products & Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Products & Certifications</CardTitle>
              <CardDescription>What products do you offer?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Product Categories *</Label>
                <div className="grid md:grid-cols-3 gap-3">
                  {['Vegetables', 'Fruits', 'Herbs', 'Dairy', 'Meat', 'Grains', 'Nuts', 'Prepared Foods'].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={formData.productCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <label htmlFor={category} className="text-sm cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productsOffered">Specific Products Offered</Label>
                <Textarea
                  id="productsOffered"
                  value={formData.productsOffered}
                  onChange={(e) => handleChange('productsOffered', e.target.value)}
                  placeholder="List your main products (e.g., Tomatoes, Lettuce, Bell Peppers...)"
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <Label>Certifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="organicCertified"
                      checked={formData.organicCertified}
                      onCheckedChange={(checked) => handleChange('organicCertified', checked)}
                    />
                    <label htmlFor="organicCertified" className="text-sm cursor-pointer">
                      USDA Organic Certified
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="gapCertified"
                      checked={formData.gapCertified}
                      onCheckedChange={(checked) => handleChange('gapCertified', checked)}
                    />
                    <label htmlFor="gapCertified" className="text-sm cursor-pointer">
                      GAP (Good Agricultural Practices) Certified
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherCertifications">Other Certifications</Label>
                <Input
                  id="otherCertifications"
                  value={formData.otherCertifications}
                  onChange={(e) => handleChange('otherCertifications', e.target.value)}
                  placeholder="GlobalGAP, Fair Trade, etc."
                />
              </div>
            </CardContent>
          </Card>

          {/* Capacity & Logistics */}
          <Card>
            <CardHeader>
              <CardTitle>Capacity & Logistics</CardTitle>
              <CardDescription>Production and delivery capabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyCapacity">Monthly Capacity</Label>
                  <Input
                    id="monthlyCapacity"
                    value={formData.monthlyCapacity}
                    onChange={(e) => handleChange('monthlyCapacity', e.target.value)}
                    placeholder="5,000 lbs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryRadius">Delivery Radius</Label>
                  <Input
                    id="deliveryRadius"
                    value={formData.deliveryRadius}
                    onChange={(e) => handleChange('deliveryRadius', e.target.value)}
                    placeholder="50 miles"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumOrder">Minimum Order</Label>
                  <Input
                    id="minimumOrder"
                    value={formData.minimumOrder}
                    onChange={(e) => handleChange('minimumOrder', e.target.value)}
                    placeholder="$500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* References */}
          <Card>
            <CardHeader>
              <CardTitle>Business References</CardTitle>
              <CardDescription>Provide at least two business references</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Reference 1</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reference1Name">Contact Name</Label>
                    <Input
                      id="reference1Name"
                      value={formData.reference1Name}
                      onChange={(e) => handleChange('reference1Name', e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference1Company">Company</Label>
                    <Input
                      id="reference1Company"
                      value={formData.reference1Company}
                      onChange={(e) => handleChange('reference1Company', e.target.value)}
                      placeholder="XYZ Restaurant"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference1Phone">Phone</Label>
                    <Input
                      id="reference1Phone"
                      value={formData.reference1Phone}
                      onChange={(e) => handleChange('reference1Phone', e.target.value)}
                      placeholder="(555) 987-6543"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference1Email">Email</Label>
                    <Input
                      id="reference1Email"
                      type="email"
                      value={formData.reference1Email}
                      onChange={(e) => handleChange('reference1Email', e.target.value)}
                      placeholder="jane@xyzrestaurant.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Reference 2</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reference2Name">Contact Name</Label>
                    <Input
                      id="reference2Name"
                      value={formData.reference2Name}
                      onChange={(e) => handleChange('reference2Name', e.target.value)}
                      placeholder="Bob Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference2Company">Company</Label>
                    <Input
                      id="reference2Company"
                      value={formData.reference2Company}
                      onChange={(e) => handleChange('reference2Company', e.target.value)}
                      placeholder="ABC Grocery"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference2Phone">Phone</Label>
                    <Input
                      id="reference2Phone"
                      value={formData.reference2Phone}
                      onChange={(e) => handleChange('reference2Phone', e.target.value)}
                      placeholder="(555) 111-2222"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference2Email">Email</Label>
                    <Input
                      id="reference2Email"
                      type="email"
                      value={formData.reference2Email}
                      onChange={(e) => handleChange('reference2Email', e.target.value)}
                      placeholder="bob@abcgrocery.com"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Anything else we should know?</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleChange('additionalInfo', e.target.value)}
                placeholder="Tell us about your unique selling points, sustainability practices, or anything else that makes your business stand out..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Upload className="w-4 h-4 mr-2" />
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorApplication;
